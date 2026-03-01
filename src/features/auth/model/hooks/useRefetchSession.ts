import { useMutation } from '@tanstack/react-query';

import { useAuthStore } from '../auth.store';

import { useUserStore } from '@/entities/user';

import { $api } from '@/shared/api/api';
import type { MeResponse } from '@/shared/api/contracts/auth';

export function useRefetchSession() {
  const setStatus = useAuthStore((s) => s.actions.setStatus);
  const setUser = useUserStore((s) => s.actions.setUser);

  const mutation = useMutation({
    mutationFn: async (): Promise<MeResponse> => {
      const { data } = await $api.get<MeResponse>('/auth/me');

      return data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      setStatus('authenticated');
    },
  });

  return {
    refetch: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
