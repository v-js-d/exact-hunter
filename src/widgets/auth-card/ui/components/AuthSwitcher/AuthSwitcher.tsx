'use client';

import { useState } from 'react';

import { AuthSwitcherProps } from './AuthSwitcherProps';

import { AuthForm, AuthMethod } from '@/features/auth';

import { Button } from '@/shared/ui/button';

export const AuthSwitcher = ({ role, mode, isPending }: AuthSwitcherProps) => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('EMAIL');

  const activeMethod = (method: AuthMethod) =>
    authMethod === method ? 'default' : 'outline';

  return (
    <div className='grid grid-cols-2 gap-2.5'>
      <Button
        size={'lg'}
        variant={activeMethod('PHONE')}
        onClick={() => setAuthMethod('PHONE')}
        aria-pressed={authMethod === 'PHONE'}
        className='text-lg font-medium'
      >
        Телефон
      </Button>
      <Button
        size={'lg'}
        variant={activeMethod('EMAIL')}
        onClick={() => setAuthMethod('EMAIL')}
        aria-pressed={authMethod === 'EMAIL'}
        className='text-lg font-medium'
        disabled={isPending}
      >
        Почта
      </Button>
      <AuthForm key={authMethod} role={role} mode={mode} method={authMethod} />
    </div>
  );
};
