'use client';
import { useRef } from 'react';
import Image from 'next/image';

import { RoleSelections } from './auth-role-selections';
import { NavigateButtons } from './NavigateButtons';

import { UserRole } from '@/shared/api/contracts';
import logoIcon from '@/shared/assets/icons/logo.svg';

export function AuthRoleSelections({ role }: { role: UserRole }) {
  const selectRoleFormRef = useRef<HTMLFormElement | null>(null);

  return (
    <>
      <div className='space-y-2.5'>
        <div className='bg-blue-35 w-fit justify-self-center rounded-[1.875rem] p-3.5'>
          <Image src={logoIcon} alt='Logo icon' width={72} height={72} />
        </div>
        <h1 className='text-center text-3xl font-bold'>ExactHunter</h1>
      </div>
      <RoleSelections role={role} ref={selectRoleFormRef} />
      <NavigateButtons selectRoleFormRef={selectRoleFormRef} />
    </>
  );
}
