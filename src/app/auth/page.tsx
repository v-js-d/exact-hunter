'use client';

import { useSearchParams } from 'next/navigation';

import { AuthCard } from '@/features/auth-card';
import { AuthRoleCard } from '@/features/auth-role-card';

import { UserRole } from '@/shared/api/contracts';
import { isAuthMode, isUserRole } from '@/shared/lib/guards/auth-guards';

const ROLE_PARAM = 'role';
const MODE_PARAM = 'mode';
const DEFAULT_ROLE: UserRole = 'CANDIDATE';

export default function AuthPage() {
  const searchParams = useSearchParams();

  const roleParam = searchParams.get(ROLE_PARAM);
  const modeParam = searchParams.get(MODE_PARAM);

  const role = isUserRole(roleParam) ? roleParam : DEFAULT_ROLE;
  const mode = isAuthMode(modeParam) ? modeParam : null;

  const content = mode ? (
    <AuthCard role={role} mode={mode} />
  ) : (
    <AuthRoleCard role={role} />
  );

  return content;
}
