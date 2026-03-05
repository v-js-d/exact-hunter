'use client';

import { useEffect } from 'react';

import { useAttachAuthToken, useRefreshToken } from '@/features/session';

import { $api } from '@/shared/api/api';

export default function useInterceptor() {
  const { attachAuthToken } = useAttachAuthToken();
  const { refreshAuthToken } = useRefreshToken();

  useEffect(() => {
    const requestId = $api.interceptors.request.use(attachAuthToken);
    const responseId = $api.interceptors.response.use(
      (response) => response,
      refreshAuthToken,
    );

    return () => {
      $api.interceptors.request.eject(requestId);
      $api.interceptors.response.eject(responseId);
    };
  }, [attachAuthToken, refreshAuthToken]);
}
