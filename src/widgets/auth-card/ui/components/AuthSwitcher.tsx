'use client';

import { useState } from 'react';

import { AuthForm, AuthMethod } from '@/features/auth';

import { UserRole } from '@/entities/user';

import { Button } from '@/shared/ui/button';

export function AuthSwitcher({ role }: { role: UserRole }) {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('phone');

  const activeMethod = (method: AuthMethod) =>
    authMethod === method ? 'default' : 'outline';

  return (
    <div className='grid grid-cols-2 gap-2.5'>
      <Button
        size={'lg'}
        variant={activeMethod('phone')}
        onClick={() => setAuthMethod('phone')}
        aria-pressed={authMethod === 'phone'}
        className='text-lg font-medium'
      >
        Телефон
      </Button>
      <Button
        size={'lg'}
        variant={activeMethod('email')}
        onClick={() => setAuthMethod('email')}
        aria-pressed={authMethod === 'email'}
        className='text-lg font-medium'
      >
        Почта
      </Button>
      <AuthForm key={authMethod} role={role} method={authMethod} />
    </div>
  );
}
