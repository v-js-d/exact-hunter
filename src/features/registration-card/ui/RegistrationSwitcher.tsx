'use client';

import { useState } from 'react';

import { RegisterMethod } from '../model/registration-method';

import { RegistrationForm } from './registration-form/RegistrationForm';

import { UserRole } from '@/shared/api/contracts';
import { Button } from '@/shared/ui/button';

export function RegistrationSwitcher({ role }: { role: UserRole }) {
  const [registerMethod, setRegisterMethod] = useState<RegisterMethod>('phone');

  const activeMethod = (method: RegisterMethod) =>
    registerMethod === method ? 'default' : 'outline';

  return (
    <div className='grid grid-cols-2 gap-2.5'>
      <Button
        size={'lg'}
        variant={activeMethod('phone')}
        onClick={() => setRegisterMethod('phone')}
        aria-pressed={registerMethod === 'phone'}
        className='text-lg font-medium'
      >
        Телефон
      </Button>
      <Button
        size={'lg'}
        variant={activeMethod('email')}
        onClick={() => setRegisterMethod('email')}
        aria-pressed={registerMethod === 'email'}
        className='text-lg font-medium'
      >
        Почта
      </Button>
      <RegistrationForm
        key={registerMethod}
        role={role}
        method={registerMethod}
      />
    </div>
  );
}
