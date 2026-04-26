'use client';

import { useEffect } from 'react';
import type { InternalAxiosRequestConfig } from 'axios';

import { useRefreshSessionMutation } from '@/entities/session';

import { $api } from '@/shared/api/api';
import { ApiError } from '@/shared/api/api-error';

const authPaths = ['/auth/login', '/auth/register', '/auth/refresh'];

type RetriableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const isAuthRequest = (url = '') =>
  authPaths.some((path) => url.includes(path));

export default function useInterceptor() {
  const { refreshSession } = useRefreshSessionMutation();

  useEffect(() => {
    const responseId = $api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status ?? 0;
        const data = error.response?.data;
        const originalConfig = error.config as
          | RetriableRequestConfig
          | undefined;

        if (
          status !== 401 ||
          !originalConfig ||
          isAuthRequest(originalConfig.url) ||
          originalConfig._retry
        ) {
          return Promise.reject(new ApiError(status, data));
        }

        originalConfig._retry = true;

        await refreshSession();

        return $api(originalConfig);
      },
    );

    return () => {
      $api.interceptors.response.eject(responseId);
    };
  }, [refreshSession]);
}
