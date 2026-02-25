import { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { env } from '../config/env';

import { ApiError } from './api-error';
import {
  createApiClient,
  QueryInputType,
  RequestType,
} from './createApiClient';
import {
  getAccessToken,
  notifySessionExpired,
  notifyTokenRefreshed,
  setAccessToken,
} from './session';

const {
  instance: $api,
  mutation,
  query,
} = createApiClient(
  { baseURL: env.NEXT_PUBLIC_API_URL },
  { withCredentials: true },
);

$api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeToRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshSuccess(newToken: string) {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
}

function onRefreshFailure() {
  refreshSubscribers = [];
}

$api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;
    const status = error.response?.status ?? 0;
    const data = error.response?.data;

    if (!originalRequest || error.response?.status !== 401) {
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
      return new Promise((resolve) => {
        subscribeToRefresh((newToken: string) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          resolve($api(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { data } = await $api.post<{ accessToken: string }>(
        '/auth/refresh',
      );

      const newToken = data.accessToken;

      setAccessToken(newToken);
      onRefreshSuccess(newToken);

      notifyTokenRefreshed(newToken);

      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return $api(originalRequest);
    } catch {
      onRefreshFailure();

      notifySessionExpired();

      return Promise.reject(new ApiError(status, data));
    } finally {
      isRefreshing = false;
    }
  },
);

export { $api, mutation, query, type QueryInputType, RequestType };
