import { useMutation, useQueryClient } from '@tanstack/react-query';

import { logoutFn } from '../api/session.service';
import { useAuthStore } from '../store/auth.store';

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const authActions = useAuthStore((s) => s.actions);

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      await logoutFn('/auth/logout', { arg: null });
    },
    onSuccess: () => {
      authActions.logout();

      queryClient.removeQueries({ queryKey: ['auth', 'me'] });
    },
  });
};
