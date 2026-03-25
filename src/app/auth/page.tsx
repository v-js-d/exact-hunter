'use client';

import { useSearchParams } from 'next/navigation';

import { AuthCard } from '@/widgets/auth-card';
import { AuthRoleCard } from '@/widgets/auth-role-card';

import { isAuthMode, isUserRole } from '@/features/auth';

import { UserRole } from '@/entities/user';

const ROLE_PARAM = 'role';
const MODE_PARAM = 'mode';
const DEFAULT_ROLE: UserRole = 'CANDIDATE';

export default function AuthPage() {
  const searchParams = useSearchParams();

  const roleParam = searchParams.get(ROLE_PARAM);
  const modeParam = searchParams.get(MODE_PARAM);

  const role = isUserRole(roleParam) ? roleParam : DEFAULT_ROLE;
  const mode = isAuthMode(modeParam) ? modeParam : null;

  return mode ? (
    <AuthCard role={role} mode={mode} />
  ) : (
    <AuthRoleCard role={role} />
  );
}
