'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { AuthMode } from '@/shared/api/contracts';
import { Button } from '@/shared/ui/button';

const mode = 'mode';

export function NavigateButtons() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const handleClick = (modeValue: AuthMode) => {
    const params = new URLSearchParams(searchParams);
    params.set(mode, modeValue);
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
