import { useQuery } from '@tanstack/react-query';

import { getMe } from '@/entities/session';

import type { MeResponse } from '@/shared/api/contracts/auth';

export const useAuthMeQuery = (options?: { enabled?: boolean }) =>
  useQuery<MeResponse>({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const response = await getMe('/auth/me');

      return response.data;
    },
    enabled: options?.enabled ?? false,
  });
