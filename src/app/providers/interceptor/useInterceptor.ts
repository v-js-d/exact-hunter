'use client';

import { useEffect, useRef } from 'react';

import { useAttachAuthToken, useSessionRefreshQuery } from '@/features/auth';

import { $api } from '@/shared/api/api';
import { ApiError } from '@/shared/api/api-error';

const authPaths = ['/auth/login', '/auth/register', '/auth/refresh'];

export default function useInterceptor() {
  const { attachAuthToken } = useAttachAuthToken();
  const { refreshToken } = useSessionRefreshQuery();

  const refreshTokenRef = useRef(refreshToken);

  useEffect(() => {
    refreshTokenRef.current = refreshToken;
  }, [refreshToken]);

  useEffect(() => {
    const requestId = $api.interceptors.request.use(attachAuthToken);

    const responseId = $api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status ?? 0;
        const data = error.response?.data;
        const originalUrl = error.config?.url ?? '';

        // Проверяем: содержит ли originalUrl хотя бы одну строку из массива
        const isAuthRequest = authPaths.some((path) =>
          originalUrl.includes(path),
        );

        // если initial refresh возращает 401 выкидываем ошибку
        if (status !== 401 || isAuthRequest) {
          return Promise.reject(new ApiError(status, data));
        }

        const newToken = await refreshTokenRef.current();
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return $api(error.config);
      },
    );

    return () => {
      $api.interceptors.request.eject(requestId);
      $api.interceptors.response.eject(responseId);
    };
  }, [attachAuthToken]);
}
