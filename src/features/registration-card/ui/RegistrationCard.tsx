'use client';

import { RegistrationPolicy } from './RegistrationPolicy';
import { RegistrationSwitcher } from './RegistrationSwitcher';

import { UserRole } from '@/shared/api/contracts';
import { Button } from '@/shared/ui/button';

export function RegistrationCard({ role }: { role: UserRole }) {
  return (
    <>
      <span className='bg-blue-35 w-fit justify-self-center rounded-xl px-2.5 py-2 text-2xl font-semibold text-white'>
        EH
      </span>
      <h1 className='text-center text-2xl font-semibold'>
        {role === 'CANDIDATE'
          ? 'Регистрируйся и ищи свою галлеру'
          : 'Здравствуйте, Кабан Кабаныч, нужны новые крестьяне?'}
      </h1>
      <RegistrationSwitcher role={role} />
      <Button
        type='submit'
        form='registration-form'
        className='text-2xl font-semibold'
      >
        Дальше
      </Button>
      <RegistrationPolicy />
    </>
  );
}
