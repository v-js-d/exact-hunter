'use client';

import { useSearchParams } from 'next/navigation';

import { AuthCard } from '@/widgets/auth-card';
import { AuthRoleCard } from '@/widgets/auth-role-card';

import { isAuthMode, isUserRole } from '@/features/auth';

import { UserRole } from '@/entities/user';

const PARAMS = {
  ROLE: 'role',
  MODE: 'mode',
} as const;

const DEFAULT_ROLE: UserRole = 'CANDIDATE';

const AuthPage = () => {
  const searchParams = useSearchParams();

  const roleParam = searchParams.get(PARAMS.ROLE);
  const modeParam = searchParams.get(PARAMS.MODE);

  const role = isUserRole(roleParam) ? roleParam : DEFAULT_ROLE;
  const mode = isAuthMode(modeParam) ? modeParam : null;

  return mode ? (
    <AuthCard role={role} mode={mode} />
  ) : (
    <AuthRoleCard role={role} />
  );
};

export default AuthPage;
