import { useMutation, useQueryClient } from '@tanstack/react-query';

import { logoutFn, useAuthStore } from '@/entities/session';
import { useUserStore } from '@/entities/user';

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const authActions = useAuthStore((s) => s.actions);
  const userActions = useUserStore((s) => s.actions);

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      await logoutFn('/auth/logout', { arg: null });
    },
    onSuccess: () => {
      authActions.logout();
      userActions.clearUser();

      queryClient.removeQueries({ queryKey: ['auth', 'me'] });
    },
  });
};
