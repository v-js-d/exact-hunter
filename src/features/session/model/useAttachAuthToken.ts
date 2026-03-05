'use client';

import { useMemo } from 'react';
import type { InternalAxiosRequestConfig } from 'axios';

import { useAuthStore } from '@/entities/session';

export function useAttachAuthToken() {
  const attachToken = useMemo(
    () =>
      function attachAuthToken(config: InternalAxiosRequestConfig) {
        const token = useAuthStore.getState().accessToken;

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
    [],
  );

  return { attachToken };
}
