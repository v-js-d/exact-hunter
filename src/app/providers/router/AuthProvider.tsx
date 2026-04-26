'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import {
  selectStatus,
  useAuthStore,
  useRefreshSessionMutation,
} from '@/entities/session';
import { useUser } from '@/entities/user';

import { AppRouter } from '@/shared/config/AppRouter';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAuthPage = pathname === AppRouter.auth;

  const status = useAuthStore(selectStatus);
  const { setStatus } = useAuthStore((s) => s.actions);
  const { refreshSession } = useRefreshSessionMutation();

  const isInitialRefreshStarted = useRef(false);

  useUser({
    enabled: status === 'authenticated',
  });

  useEffect(() => {
    if (isInitialRefreshStarted.current) {
      return;
    }

    isInitialRefreshStarted.current = true;

    if (isAuthPage) {
      setStatus('anonymous');
      return;
    }

    refreshSession().catch(() => undefined);
  }, [isAuthPage, refreshSession, setStatus]);

  if (status === 'loading') {
    return <div>Загрузка...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;
