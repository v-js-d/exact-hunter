'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/features/auth';

import { useUserStore } from '@/entities/user';

import { $api } from '@/shared/api/api';
import { ApiError } from '@/shared/api/api-error';
import type { MeResponse } from '@/shared/api/contracts/auth';

let restoreSessionDidRun = false;

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setStatus, logout } = useAuthStore((s) => s.actions);
  const { setUser } = useUserStore((s) => s.actions);

  useEffect(() => {
    if (restoreSessionDidRun) {
      return;
    }
    restoreSessionDidRun = true;

    let cancelled = false;

    async function restoreSession() {
      setStatus('loading');

      try {
        const { data } = await $api.get<MeResponse>('/auth/me');

        if (cancelled) {
          return;
        }

        setUser(data.user);
        setStatus('authenticated');
      } catch (err) {
        if (cancelled) {
          return;
        }

        const isSessionExpired = err instanceof ApiError && err.status === 401;

        if (!isSessionExpired) {
          logout();
        }
      }
    }

    void restoreSession();

    return () => {
      cancelled = true;
    };
  }, [logout, setStatus, setUser]);

  return children;
}
