'use client';

import { JSX } from 'react';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';

import { AuthRoleSelections } from '@/features/auth-role-form';
import { LoginCard } from '@/features/login-card';
import { RegistrationCard } from '@/features/registration-card';

import { AuthMode, UserRole } from '@/shared/api/contracts';

const roleParamString = 'role';
const defaultRole: UserRole = 'CANDIDATE';

export default function AuthPage() {
  const searchParams = useSearchParams();

  let content: JSX.Element;

  const role = (searchParams.get(roleParamString) as UserRole) ?? defaultRole;
  const mode = searchParams.get('mode') as AuthMode | null;

  switch (mode) {
    case 'login':
      content = <LoginCard />;
      break;
    case 'register':
      content = <RegistrationCard role={role} />;
      break;

    default:
      content = <AuthRoleSelections role={role} />;
  }

  return (
    <div
      className={clsx(
        'grid w-full gap-y-6.25',
        mode && `border-gray-6b rounded-[1.875rem] border px-12.5 py-5`,
      )}
    >
      {content}
    </div>
  );
}
