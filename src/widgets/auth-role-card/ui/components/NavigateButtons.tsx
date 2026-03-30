'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { NavigateButtonsProps } from './NavigateButtons.types';

import { AuthMode } from '@/features/auth';

import { Button } from '@/shared/ui';

const PARAMS = {
  MODE: 'mode',
  ROLE: 'role',
} as const;

export const NavigateButtons = ({
  selectRoleFormRef,
}: NavigateButtonsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (modeValue: AuthMode) => {
    const params = new URLSearchParams(searchParams);

    if (selectRoleFormRef.current) {
      const formData = new FormData(selectRoleFormRef.current);
      const role = formData.get(PARAMS.ROLE);

      if (role) {
        params.set(PARAMS.ROLE, String(role));
      }
    }

    params.set(PARAMS.MODE, modeValue);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className='flex flex-col space-y-2.5'>
      <Button
        type='button'
        onClick={() => handleClick('login')}
        className='text-2xl font-semibold'
      >
        Войти
      </Button>
      <Button
        variant={'outline'}
        type='button'
        className='text-2xl font-semibold'
        onClick={() => handleClick('register')}
      >
        Регистрация
      </Button>
    </div>
  );
};
