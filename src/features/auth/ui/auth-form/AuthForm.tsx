'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  authSchema,
  AuthShema,
  EmailShema,
  PhoneShema,
} from '../../model/schema/AuthForm.shema';

import { FormEmail } from './components/form-email/FormEmail';
import { FormPhone } from './components/form-phone/FormPhone';
import { AuthFormProps } from './AuthForm.types';

import { Button } from '@/shared/ui/button';

const phoneDefaultValues: PhoneShema = {
  countryCode: '+7',
  phone: '',
  role: 'CANDIDATE',
};

const emailDefaultValues: EmailShema = {
  email: '',
  role: 'CANDIDATE',
};

const AUTH_METHODS = {
  PHONE: 'phone',
  EMAIL: 'email',
} as const;

export const AuthForm = ({ method, role }: AuthFormProps) => {
  const methods = useForm<AuthShema>({
    resolver: zodResolver(authSchema),
    defaultValues:
      method === AUTH_METHODS.PHONE ? phoneDefaultValues : emailDefaultValues,
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
        {method === AUTH_METHODS.PHONE ? <FormPhone /> : <FormEmail />}
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
};
