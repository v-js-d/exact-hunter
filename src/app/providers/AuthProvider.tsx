'use client';

import { useEffect } from 'react';

import { useAuthMeQuery, useAuthStore } from '@/entities/session';
import { useUserStore } from '@/entities/user';

import { EG } from '@/shared/lib';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setStatus, logout } = useAuthStore((s) => s.actions);
  const { setUser } = useUserStore((s) => s.actions);

  const { data, error, isSuccess, isError, isPending } = useAuthMeQuery({
    enabled: true,
  });

  useEffect(() => {
    if (isPending) {
      setStatus('loading');

      return;
    }

    if (isSuccess && data) {
      setUser(data.user);
      setStatus('authenticated');

      return;
    }

    if (isError && error) {
      if (!EG.isUnauthorized(error)) {
        logout();
      }
    }
  }, [data, error, isSuccess, isError, isPending, logout, setStatus, setUser]);

  return children;
}
