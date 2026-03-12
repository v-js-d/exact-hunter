'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  RegisterMethod,
  registrationSchema,
  TRegistrationShema,
} from '../../index';

import { FormEmail } from './FormEmail';
import { FormTel } from './FormTel';

import { UserRole } from '@/shared/api/contracts';

export function RegistrationForm({
  method,
  role,
}: {
  method: RegisterMethod;
  role: UserRole;
}) {
  const methods = useForm<TRegistrationShema>({
    resolver: zodResolver(registrationSchema),
    defaultValues:
      method === 'phone'
        ? {
            countryCode: '+7',
            phone: '',
            role,
          }
        : {
            email: '',
            role,
          },
  });

  const onSubmit: SubmitHandler<TRegistrationShema> = (data) =>
    console.log(data);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        id='registration-form'
        className='col-span-2 grid grid-cols-[auto_1fr] items-center gap-x-2.5'
      >
        {method === 'phone' ? <FormTel /> : <FormEmail />}
      </form>
    </FormProvider>
  );
}
