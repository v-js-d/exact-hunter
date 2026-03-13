'use client';

import { useSearchParams } from 'next/navigation';

import { AuthCard } from '@/features/auth-card';
import { AuthRoleCard } from '@/features/auth-role-card';

import { AuthMode, UserRole } from '@/shared/api/contracts';

const ROLE_PARAM = 'role';
const DEFAULT_ROLE: UserRole = 'CANDIDATE';

export default function AuthPage() {
  const searchParams = useSearchParams();

  const role = (searchParams.get(ROLE_PARAM) as UserRole) ?? DEFAULT_ROLE;
  const mode = searchParams.get('mode') as AuthMode | null;

  const validateMode = mode === 'login' || mode === 'register';

  const content = validateMode ? (
    <AuthCard role={role} mode={mode} />
  ) : (
    <AuthRoleCard role={role} />
  );

  return content;
}
