'use client';
import Image from 'next/image';

import { RoleSelections } from './auth-role-selections/RoleSelections';
import { NavigateButtons } from './navigate-buttons/NavigateButtons';

import logoIcon from '@/shared/assets/icons/logo.svg';

export function AuthRoleSelections() {
  return (
    <div className='grid w-full gap-y-6.25'>
      <div className='space-y-2.5'>
        <div className='bg-blue-35 w-fit justify-self-center rounded-[1.875rem] p-3.5'>
          <Image src={logoIcon} alt='Logo icon' width={72} height={72} />
        </div>
        <h1 className='text-center text-3xl font-bold'>ExactHunter</h1>
      </div>
      <RoleSelections />
      <NavigateButtons />
    </div>
  );
}
