import { useMutation, useQueryClient } from '@tanstack/react-query';

import { loginFn } from '../api/auth.service';
import { LoginRequest, LoginResponse } from '../types/LoginDto';

import { useAuthStore } from '@/entities/session';
import { useUserStore } from '@/entities/user';

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
