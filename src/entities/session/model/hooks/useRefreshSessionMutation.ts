import { useMutation } from '@tanstack/react-query';

import { refreshAuthTokenFn } from '../api/session.service';
import { useAuthStore } from '../store/auth.store';

const REFRESH_URL = '/auth/refresh';

export function useRefreshSessionMutation() {
  const { logout, setStatus } = useAuthStore((s) => s.actions);

  const { mutateAsync: refreshSession, ...mutation } = useMutation({
    mutationKey: ['auth', 'refresh'],
    mutationFn: async () => {
      const { data } = await refreshAuthTokenFn(REFRESH_URL, { arg: null });
      return data;
    },
    retry: 2,
    onSuccess: () => {
      setStatus('authenticated');
    },
    onError: () => {
      logout();
    },
  });

  return {
    refreshSession,
    ...mutation,
  };
}
