'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useAuthStore, useSessionRefreshQuery } from '@/entities/session';
import { useAuthMeQuery, useUserStore } from '@/entities/user';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/auth';

  const { setStatus, logout } = useAuthStore((s) => s.actions);
  const isAuth = useAuthStore((s) => s.status === 'authenticated');
  const { setUser, clearUser } = useUserStore((s) => s.actions);

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
        clearUser();
        setStatus('anonymous');
      })
      .finally(() => {
        setIsRefreshDone(true);
      });
  }, [isLoginPage, refreshToken, clearUser, setStatus]);

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data.user);
      setStatus('authenticated');
    }

    if (isError) {
      logout();
      clearUser();
    }
  }, [
    isSuccess,
    isError,
    data,
    setUser,
    setStatus,
    logout,
    clearUser,
    router,
    isLoginPage,
  ]);

  if (!isRefreshDone || isLoading) {
    return null;
  }

  return <>{children}</>;
};

export default AuthProvider;
