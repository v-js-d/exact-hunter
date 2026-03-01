'use client';

import { useEffect } from 'react';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { $api } from '../api';
import { ApiError } from '../api-error';
import {
  getAccessToken,
  notifySessionExpired,
  notifyTokenRefreshed,
  setAccessToken,
} from '../session';

export function useInterceptor() {
  useEffect(() => {
    const requestId = $api.interceptors.request.use((config) => {
      const token = getAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    let isRefreshing = false;
    const refreshSubscribers: Array<{
      onSuccess: (token: string) => void;
      onFailure: (err: unknown) => void;
    }> = [];

    const responseId = $api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as
          | (InternalAxiosRequestConfig & { _retry?: boolean })
          | undefined;
        const status = error.response?.status ?? 0;
        const data = error.response?.data;

        if (!originalRequest || status !== 401) {
          return Promise.reject(new ApiError(status, data));
        }

        if (originalRequest.url?.includes('/auth/refresh')) {
          notifySessionExpired();

          return Promise.reject(new ApiError(status, data));
        }

        if (originalRequest._retry) {
          return Promise.reject(new ApiError(status, data));
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            refreshSubscribers.push({
              onSuccess: (newToken: string) => {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                resolve($api(originalRequest));
              },
              onFailure: (err) => {
                reject(err);
              },
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { data: refreshData } = await $api.post<{
            accessToken: string;
          }>('/auth/refresh');
          const newToken = refreshData.accessToken;

          setAccessToken(newToken);
          notifyTokenRefreshed(newToken);
          refreshSubscribers.forEach((s) => s.onSuccess(newToken));
          refreshSubscribers.length = 0;

          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return $api(originalRequest);
        } catch (err) {
          refreshSubscribers.forEach((s) => s.onFailure(err));
          refreshSubscribers.length = 0;
          notifySessionExpired();

          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      },
    );

    return () => {
      $api.interceptors.request.eject(requestId);
      $api.interceptors.response.eject(responseId);
    };
  }, []);
}
