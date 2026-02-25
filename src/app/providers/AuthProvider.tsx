'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/features/auth';

import { useUserStore } from '@/entities/user';

import { $api } from '@/shared/api/api';
import type { MeResponse } from '@/shared/api/contracts/auth';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setStatus, logout } = useAuthStore((s) => s.actions);
  const { setUser } = useUserStore((s) => s.actions);

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      setStatus('loading');

      try {
        const { data } = await $api.get<MeResponse>('/auth/me');

        if (cancelled) return;

        setUser(data.user);
        setStatus('authenticated');
      } catch {
        if (cancelled) return;

        logout();
      }
    }

    void restoreSession();

    return () => {
      cancelled = true;
    };
  }, [logout, setStatus, setUser]);

  return <>{children}</>;
}
