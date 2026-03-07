import { useMutation, useQueryClient } from '@tanstack/react-query';

import { loginFn, useAuthStore } from '@/entities/session';
import { useUserStore } from '@/entities/user';

import type { LoginRequest, LoginResponse } from '@/shared/api/contracts/auth';

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const authActions = useAuthStore((s) => s.actions);
  const userActions = useUserStore((s) => s.actions);

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (payload) => {
      const response = await loginFn('/auth/login', { arg: payload });
      return response.data;
    },
    onSuccess: (data) => {
      authActions.setAccessToken(data.accessToken);
      authActions.setStatus('authenticated');
      userActions.setUser(data.user);

      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
  });
};
