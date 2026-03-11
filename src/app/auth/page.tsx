'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { AuthRoleSelections } from '@/features/auth-role-form';
import { LoginForm } from '@/features/login-form';
import { RegistrationForm } from '@/features/registration-form';

import { AuthMode, UserRole } from '@/shared/api/contracts';

const roleParam = 'role';

const defaultRole: UserRole = 'CANDIDATE';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  let content;

  const role = searchParams.get(roleParam);
  const mode = searchParams.get('mode') as AuthMode | null;

  useEffect(() => {
    if (role) return;

    const params = new URLSearchParams(searchParams);
    params.set(roleParam, defaultRole);

    router.replace(`?${params.toString()}`);
  }, [role]);

  if (!mode) content = <AuthRoleSelections />;

  if (mode === 'login') content = <LoginForm />;

  if (mode === 'register') content = <RegistrationForm />;

  return (
    <>
      {mode ? (
        <div className='border-gray-6b rounded-[1.875rem] border px-12.5 py-5'>
          {content}
        </div>
      ) : (
        content
      )}
    </>
  );
}
