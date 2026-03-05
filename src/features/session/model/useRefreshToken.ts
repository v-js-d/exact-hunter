'use client';

import { useMemo } from 'react';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { useAuthStore } from '@/entities/session';

import { $api } from '@/shared/api/api';
import { ApiError } from '@/shared/api/api-error';

interface RetryableRequest extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

function isRetryableRequest(
  config: InternalAxiosRequestConfig | undefined,
): config is RetryableRequest {
  return config != null;
}

const REFRESH_URL = '/auth/refresh';

export function useRefreshToken() {
  const refreshToken = useMemo(() => {
    let isRefreshing = false;
    const refreshSubscribers: Array<{
      onSuccess: (token: string) => void;
      onFailure: (err: unknown) => void;
    }> = [];

    return async function handleRefreshToken(error: AxiosError) {
      const status = error.response?.status ?? 0;
      const data = error.response?.data;

      if (!isRetryableRequest(error.config) || status !== 401) {
        return Promise.reject(new ApiError(status, data));
      }

      const originalRequest = error.config;

      if (originalRequest.url?.includes(REFRESH_URL)) {
        useAuthStore.getState().actions.logout();

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
        const { data: refreshData } = await $api.post<{ accessToken: string }>(
          REFRESH_URL,
        );
        const newToken = refreshData.accessToken;
        const { setAccessToken, setStatus } = useAuthStore.getState().actions;

        setAccessToken(newToken);
        setStatus('authenticated');

        refreshSubscribers.forEach((s) => s.onSuccess(newToken));
        refreshSubscribers.length = 0;

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return $api(originalRequest);
      } catch (err) {
        refreshSubscribers.forEach((s) => s.onFailure(err));
        refreshSubscribers.length = 0;

        useAuthStore.getState().actions.logout();

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    };
  }, []);

  return { refreshToken };
}
