'use client';

import { useQuery } from '@tanstack/react-query';

import { getMe } from '../api/user.service';
import { MeResponse } from '../types/user.types';

export const useAuthMeQuery = (options?: { enabled?: boolean }) =>
  useQuery<MeResponse>({
    queryKey: ['auth', 'me'],
    queryFn: async () => getMe('/auth/me').then((resp) => resp.data),
    enabled: !!options?.enabled,
    retry: 0,
  });
