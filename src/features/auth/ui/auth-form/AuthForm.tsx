'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  authSchema,
  type AuthShema,
  EmailShema,
  PhoneShema,
} from '../../model/schema/AuthForm.shema';
import { AuthMethod } from '../../model/types/auth.types';

import { FormEmail } from './components/form-email';
import { FormTel } from './components/form-tel';

import { UserRole } from '@/entities/user';

import { Button } from '@/shared/ui/button';

const phoneDeafultValues: PhoneShema = {
  countryCode: '+7',
  phone: '',
  role: 'CANDIDATE',
};

const emailDefaultvalues: EmailShema = {
  email: '',
  role: 'CANDIDATE',
};

export function AuthForm({
  method,
  role,
}: {
  method: AuthMethod;
  role: UserRole;
}) {
  const methods = useForm<AuthShema>({
    resolver: zodResolver(authSchema),
    defaultValues: method === 'phone' ? phoneDeafultValues : emailDefaultvalues,
  });

  const onSubmit: SubmitHandler<AuthShema> = (data) => {
    const newUser = {
      ...data,
      role,
    };

    console.log(newUser);
  };

  const isError = Object.keys(methods.formState.errors).length > 0;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className='col-span-2 grid items-center gap-6.25'
      >
        {method === 'phone' ? <FormTel /> : <FormEmail />}
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
