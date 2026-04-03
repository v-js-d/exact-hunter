import { useCallback, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';

import { refreshAuthTokenFn, useAuthStore } from '@/entities/session';
import { useUserStore } from '@/entities/user';

const REFRESH_URL = '/auth/refresh';

export function useSessionRefreshQuery() {
  const refreshPromiseRef = useRef<Promise<string> | null>(null);
  const { logout, setAccessToken } = useAuthStore((s) => s.actions);
  const setUser = useUserStore((s) => s.actions.setUser);

  const { mutateAsync } = useMutation({
    mutationKey: ['auth', 'refresh'],
    mutationFn: async () => {
      const { data } = await refreshAuthTokenFn(REFRESH_URL, { arg: null });
      return data;
    },
    retry: 2,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      if (data.user) {
        setUser(data.user);
      }
    },
    onError: () => {
      logout();
    },
  });

  const refreshToken = useCallback((): Promise<string> => {
    if (refreshPromiseRef.current) {
      return refreshPromiseRef.current;
    }

    refreshPromiseRef.current = mutateAsync()
      .then((data) => data.accessToken)
      .finally(() => {
        refreshPromiseRef.current = null;
      });

    return refreshPromiseRef.current;
  }, [mutateAsync]);

  return { refreshToken };
}
