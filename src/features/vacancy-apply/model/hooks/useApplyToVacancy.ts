'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { selectStatus, useAuthStore } from '@/entities/session';
import { UserRole, useUser } from '@/entities/user';

import { AppRouter } from '@/shared/config/AppRouter';
import { replacePathId } from '@/shared/lib/helpers/replacePathId';

interface UseApplyToVacancyParams {
  vacancyId: string;
}

export const useApplyToVacancy = ({ vacancyId }: UseApplyToVacancyParams) => {
  const router = useRouter();
  const authStatus = useAuthStore(selectStatus);
  const {
    user,
    isLoading: isUserLoading,
    isError,
  } = useUser({
    enabled: authStatus === 'authenticated',
  });

  const handleApply = useCallback(() => {
    if (authStatus === 'loading') {
      return;
    }

    if (authStatus === 'anonymous') {
      router.push(AppRouter.auth);
      return;
    }

    if (isUserLoading) {
      return;
    }

    if (isError || !user) {
      router.push(AppRouter.auth);
      return;
    }

    if (user.role === UserRole.CANDIDATE) {
      router.push(AppRouter.applicantResponses);
      return;
    }

    router.push(replacePathId('vacancy', vacancyId));
  }, [authStatus, isError, isUserLoading, router, user, vacancyId]);

  const isPending = authStatus === 'loading' || isUserLoading;

  return {
    handleApply,
    isPending,
  };
};
