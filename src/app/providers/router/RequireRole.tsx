'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { selectStatus, useAuthStore } from '@/entities/session';
import { type UserRole, useUser } from '@/entities/user';

import { AppRouter } from '@/shared/config/AppRouter';

interface RequireRoleProps {
  children: ReactNode;
  roles: UserRole[];
  fallbackPath?: string;
}

const RequireRole = ({
  children,
  roles,
  fallbackPath = AppRouter.main,
}: RequireRoleProps) => {
  const router = useRouter();
  const status = useAuthStore(selectStatus);
  const { user, isError, isLoading } = useUser({
    enabled: status === 'authenticated',
  });

  const hasRequiredRole = !!user && roles.includes(user.role);

  useEffect(() => {
    if (status === 'anonymous') {
      router.replace(AppRouter.auth);
      return;
    }

    if (status === 'authenticated' && isError) {
      router.replace(AppRouter.auth);
      return;
    }

    // TODO: потом сделать какую-нибудь forbidden page, пока просто перекидываем на главную
    if (user && !hasRequiredRole) {
      router.replace(fallbackPath);
    }
  }, [fallbackPath, hasRequiredRole, isError, router, status, user]);

  if (status === 'loading' || isLoading || !hasRequiredRole) {
    return null;
  }

  return <>{children}</>;
};

export default RequireRole;
