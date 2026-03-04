import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuthStore } from '../auth.store';

import { logoutFn } from '@/entities/session';

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const authActions = useAuthStore((s) => s.actions);

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      await logoutFn('/auth/logout', { arg: null });
    },
    onSuccess: () => {
      authActions.logout();
      void queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
  });
};
