'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuthServerErrors } from '../../model/hooks/useAuthServerErrors';
import { useLoginMutation } from '../../model/hooks/useLoginMutation';
import { useRegisterMutation } from '../../model/hooks/useRegisterMutation';
import {
  AuthSchema,
  authSchema,
  EmailShema,
  PhoneShema,
} from '../../model/schema/AuthForm.shema';

import { FormEmail } from './components/form-email/FormEmail';
import { FormPhone } from './components/form-phone/FormPhone';
import { AuthFormProps } from './AuthForm.types';

import { Button } from '@/shared/ui/button';
import { ErrorField } from '@/shared/ui/error-field';

const phoneDefaultValues: PhoneShema = {
  countryCode: '+7',
  phone: '',
  password: '',
  role: 'CANDIDATE',
};

const emailDefaultValues: EmailShema = {
  email: '',
  password: '',
  role: 'CANDIDATE',
};

const AUTH_METHODS = {
  PHONE: 'phone',
  EMAIL: 'email',
} as const;

export const AuthForm = ({ method, role, mode }: AuthFormProps) => {
  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues:
      method === AUTH_METHODS.PHONE ? phoneDefaultValues : emailDefaultValues,
  });

  const { rootServerError, showErrors } = useAuthServerErrors();

  const { mutate: registerMutate, isPending: registerLoading } =
    useRegisterMutation();

  const { mutate: loginMutate, isPending: loginLoading } = useLoginMutation();

  const onSubmit: SubmitHandler<AuthSchema> = (data) => {
    const newUser = {
      ...data,
      role,
    };

    const mutation = mode === 'register' ? registerMutate : loginMutate;

    mutation(newUser, {
      onError: (error) => {
        const {
          status,
          data: { type },
        } = error;

        showErrors(status, type);
      },
    });
  };

  const isError = Object.keys(form.formState.errors).length > 0;
  const isPending = registerLoading || loginLoading;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='col-span-2 grid items-center gap-6.25'
      >
        <fieldset disabled={isPending} className='grid gap-y-2'>
          {method === AUTH_METHODS.PHONE ? (
            <FormPhone isPending={isPending} />
          ) : (
            <FormEmail isPending={isPending} />
          )}
          <ErrorField>{rootServerError}</ErrorField>
        </fieldset>
        <Button
          type='submit'
          className='text-2xl font-semibold'
          disabled={isError || isPending}
        >
          Дальше
        </Button>
      </form>
    </FormProvider>
  );
};
