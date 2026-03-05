'use client';

import { useEffect } from 'react';

import { useAttachAuthToken, useRefreshToken } from '@/features/session';

import { $api } from '@/shared/api/api';

export default function useInterceptor() {
  const { attachToken } = useAttachAuthToken();
  const { refreshToken } = useRefreshToken();

  useEffect(() => {
    const requestId = $api.interceptors.request.use(attachToken);
    const responseId = $api.interceptors.response.use(
      (response) => response,
      refreshToken,
    );

    return () => {
      $api.interceptors.request.eject(requestId);
      $api.interceptors.response.eject(responseId);
    };
  }, [attachToken, refreshToken]);
}
