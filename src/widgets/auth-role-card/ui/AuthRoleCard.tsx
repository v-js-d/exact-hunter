'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { NavigateButtons } from './components/navigate-buttons/NavigateButtons';
import { AuthRoleCardProps } from './AuthRoleCard.types';

import { RoleForm } from '@/features/auth';

import { EHLogo } from '@/shared/assets/icons';
import { AppRouter } from '@/shared/config/AppRouter';
import { BackButton } from '@/shared/ui/back-button';

export const AuthRoleCard = ({ role }: AuthRoleCardProps) => {
  const router = useRouter();
  const selectRoleFormRef = useRef<HTMLFormElement | null>(null);

  return (
    <div className='mx-auto grid w-full max-w-125 gap-y-6.25 px-5 sm:px-0'>
      <div className='relative flex justify-center'>
        <BackButton
          size='icon-lg'
          className='absolute top-0 left-0'
          onBack={() => {
            router.back();
          }}
        />
        <div className='flex flex-col items-center justify-center space-y-2.5'>
          <Link
            href={AppRouter.main}
            className='flex shrink-0'
            aria-label='На главную ExactHunter'
          >
            <EHLogo className='size-[4.5rem] sm:size-20' />
          </Link>
          <h1 className='text-center text-3xl font-bold'>ExactHunter</h1>
        </div>
      </div>
      <RoleForm role={role} ref={selectRoleFormRef} />

      <NavigateButtons selectRoleFormRef={selectRoleFormRef} />
    </div>
  );
};
