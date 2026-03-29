'use client';

import { RefObject } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { AuthMode } from '@/features/auth';

import { Button } from '@/shared/ui';

const MODE_PARAM = 'mode';
const ROLE_RAPAM = 'role';

export function NavigateButtons({
  selectRoleFormRef,
}: {
  selectRoleFormRef: RefObject<HTMLFormElement | null>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (modeValue: AuthMode) => {
    const params = new URLSearchParams(searchParams);
    if (selectRoleFormRef.current) {
      const formData = new FormData(selectRoleFormRef.current);
      const role = formData.get(ROLE_RAPAM);

      if (role) params.set(ROLE_RAPAM, String(role));
    }
    params.set(MODE_PARAM, modeValue);
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
}
