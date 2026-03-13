'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { type AuthMethod, authSchema, type TAuthShema } from '../../index';

import { FormEmail } from './FormEmail';
import { FormTel } from './FormTel';

import { UserRole } from '@/shared/api/contracts';
import { Button } from '@/shared/ui/button';

export function AuthForm({
  method,
  role,
}: {
  method: AuthMethod;
  role: UserRole;
}) {
  const methods = useForm<TAuthShema>({
    resolver: zodResolver(authSchema),
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

  const onSubmit: SubmitHandler<TAuthShema> = (data) => console.log(data);

  const isError = Object.keys(methods.formState.errors).length > 0;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className='col-span-2 grid items-center gap-6.25'
      >
        <div className='relative grid grid-cols-[auto_1fr] gap-2.5'>
          {method === 'phone' ? <FormTel /> : <FormEmail />}
        </div>
        <Button
          type='submit'
          className='text-2xl font-semibold'
          disabled={isError}
        >
          Дальше
        </Button>
      </form>
    </FormProvider>
  );
}
