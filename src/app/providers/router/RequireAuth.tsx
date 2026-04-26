'use client';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { selectStatus, useAuthStore } from '@/entities/session';

import { AppRouter } from '@/shared/config/AppRouter';

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const status = useAuthStore(selectStatus);

  useEffect(() => {
    if (status === 'anonymous') {
      router.replace(AppRouter.auth);
    }
  }, [router, status]);

  if (status === 'loading') return null;
  if (status === 'anonymous') {
    return null;
  }

  return <>{children}</>;
};

export default RequireAuth;
