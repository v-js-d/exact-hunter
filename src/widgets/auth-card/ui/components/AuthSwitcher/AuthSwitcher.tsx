'use client';

import { useState } from 'react';

import { AuthSwitcherProps } from './AuthSwitcherProps';

import { AuthForm, AuthMethod } from '@/features/auth';

import { Button } from '@/shared/ui/button';

const AUTH_METHODS = {
  PHONE: 'phone',
  EMAIL: 'email',
} as const;

export const AuthSwitcher = ({ role }: AuthSwitcherProps) => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>(AUTH_METHODS.PHONE);

  const activeMethod = (method: AuthMethod) =>
    authMethod === method ? 'default' : 'outline';

  return (
    <div className='grid grid-cols-2 gap-2.5'>
      <Button
        size={'lg'}
        variant={activeMethod(AUTH_METHODS.PHONE)}
        onClick={() => setAuthMethod(AUTH_METHODS.PHONE)}
        aria-pressed={authMethod === AUTH_METHODS.PHONE}
        className='text-lg font-medium'
      >
        Телефон
      </Button>
      <Button
        size={'lg'}
        variant={activeMethod(AUTH_METHODS.EMAIL)}
        onClick={() => setAuthMethod(AUTH_METHODS.EMAIL)}
        aria-pressed={authMethod === AUTH_METHODS.EMAIL}
        className='text-lg font-medium'
      >
        Почта
      </Button>
      <AuthForm key={authMethod} role={role} method={authMethod} />
    </div>
  );
};
