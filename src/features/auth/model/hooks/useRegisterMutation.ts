import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { registerFn } from '../api/auth.service';
import { AuthErrorResponse } from '../types/auth.types';
import { RegisterRequest, RegisterResponse } from '../types/RegDto';

import { useAuthStore } from '@/entities/session';

import { AppRouter } from '@/shared/config/AppRouter';

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  const authActions = useAuthStore((s) => s.actions);

  const router = useRouter();

  return useMutation<RegisterResponse, AuthErrorResponse, RegisterRequest>({
    mutationKey: ['auth', 'register'],
    mutationFn: async (payload) => {
      const response = await registerFn('/auth/register', { arg: payload });
      return response.data;
    },
    onSuccess: (data) => {
      authActions.setAccessToken(data.accessToken);
      authActions.setStatus('authenticated');

      queryClient.setQueryData(['auth', 'me'], { user: data.user });

      router.push(AppRouter.me);
    },
  });
};
