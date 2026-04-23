'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import { useSessionRefreshQuery } from '@/features/auth';

import { useAuthStore } from '@/entities/session';
import { useAuthMeQuery } from '@/entities/user';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/auth';

  const { setStatus, logout } = useAuthStore((s) => s.actions);
  const isAuth = useAuthStore((s) => s.status === 'authenticated');

  const { refreshToken } = useSessionRefreshQuery();
  const [isRefreshDone, setIsRefreshDone] = useState(isLoginPage);
  const isFirstMount = useRef(true);

  const { data, isSuccess, isError, isLoading } = useAuthMeQuery({
    enabled: isRefreshDone && isAuth,
  });

  // При загрузке делаем первый рефреш
  useEffect(() => {
    if (!isFirstMount.current) {
      return;
    }
    isFirstMount.current = false;

    // На странице логина мы не делаем рефреш
    if (isLoginPage) {
      return;
    }

    refreshToken()
      .catch(() => {
        setStatus('anonymous');
      })
      .finally(() => {
        setIsRefreshDone(true);
      });
  }, [isLoginPage, refreshToken, setStatus]);

  useEffect(() => {
    if (isSuccess && data?.user) {
      setStatus('authenticated');
    }

    if (isError) {
      logout();
    }
  }, [isSuccess, isError, data, setStatus, logout]);

  if (!isRefreshDone || isLoading) {
    return null;
  }

  return <>{children}</>;
};

export default AuthProvider;
