import { useMutation, useQueryClient } from '@tanstack/react-query';

import { registerFn } from '../api/auth.service';
import { RegisterRequest, RegisterResponse } from '../types/RegDto';

import { useAuthStore } from '@/entities/session';
import { useUserStore } from '@/entities/user';

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  const authActions = useAuthStore((s) => s.actions);
  const userActions = useUserStore((s) => s.actions);

  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: async (payload) => {
      const response = await registerFn('/auth/register', { arg: payload });
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
