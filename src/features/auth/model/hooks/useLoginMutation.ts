import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { loginFn } from '../api/auth.service';
import { AuthErrorResponse } from '../types/auth.types';
import { LoginRequest, LoginResponse } from '../types/LoginDto';

import { useAuthStore } from '@/entities/session';
import { useUserStore } from '@/entities/user';

import { AppRouter } from '@/shared/config/AppRouter';

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const authActions = useAuthStore((s) => s.actions);
  const userActions = useUserStore((s) => s.actions);

  const router = useRouter();

  return useMutation<LoginResponse, AuthErrorResponse, LoginRequest>({
    mutationKey: ['auth', 'login'],
    mutationFn: async (payload) => {
      const response = await loginFn('/auth/login', { arg: payload });
      return response.data;
    },
    onSuccess: (data) => {
      authActions.setAccessToken(data.accessToken);
      authActions.setStatus('authenticated');
      userActions.setUser(data.user);

      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      queryClient.setQueryData(['auth', 'me'], { user: data.user });

      router.push(AppRouter.me);
    },
  });
};
