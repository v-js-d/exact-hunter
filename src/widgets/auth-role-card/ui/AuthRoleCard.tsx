'use client';
import { useRef } from 'react';
import { ChartSpline } from 'lucide-react';

import { NavigateButtons } from './components/NavigateButtons';

import { RoleForm } from '@/features/auth';

import { UserRole } from '@/entities/user';

export function AuthRoleCard({ role }: { role: UserRole }) {
  const selectRoleFormRef = useRef<HTMLFormElement | null>(null);

  return (
    <div className='mx-auto grid w-full max-w-125 gap-y-6.25 px-5 sm:px-0'>
      <div className='space-y-2.5'>
        <div className='bg-blue-35 w-fit justify-self-center rounded-[1.875rem] p-3.5'>
          <ChartSpline aria-label='Logo icon' color='white' size={72} />
        </div>
        <h1 className='text-center text-3xl font-bold'>ExactHunter</h1>
      </div>
      <RoleForm role={role} ref={selectRoleFormRef} />
      <NavigateButtons selectRoleFormRef={selectRoleFormRef} />
    </div>
  );
}
