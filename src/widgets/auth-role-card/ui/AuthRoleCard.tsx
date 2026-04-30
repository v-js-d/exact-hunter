'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChartSpline } from 'lucide-react';

import { NavigateButtons } from './components/navigate-buttons/NavigateButtons';
import { AuthRoleCardProps } from './AuthRoleCard.types';

import { RoleForm } from '@/features/auth';

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
          <div className='bg-blue-35 w-fit rounded-[1.875rem] p-3.5'>
            <ChartSpline aria-label='Logo icon' color='white' size={72} />
          </div>
          <h1 className='text-center text-3xl font-bold'>ExactHunter</h1>
        </div>
      </div>
      <RoleForm role={role} ref={selectRoleFormRef} />

      <NavigateButtons selectRoleFormRef={selectRoleFormRef} />
    </div>
  );
};
