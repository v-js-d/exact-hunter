import { useQuery } from '@tanstack/react-query';

import { getMe } from '../api/session.service';
import { MeResponse } from '../types/MeResp';

export const useAuthMeQuery = (options?: { enabled?: boolean }) =>
  useQuery<MeResponse>({
    queryKey: ['auth', 'me'],
    queryFn: async () => getMe('/auth/me').then((resp) => resp.data),
    enabled: !!options?.enabled,
    retry: 0,
  });
