import { useMutation, useQueryClient } from '@tanstack/react-query';

import { registerFn } from '../../api';
import { useAuthStore } from '../auth.store';

import { useUserStore } from '@/entities/user';

import type {
  RegisterRequest,
  RegisterResponse,
} from '@/shared/api/contracts/auth';

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
      void queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
    },
  });
};
