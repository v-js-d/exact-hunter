'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLoginMutation } from '../../model/hooks/useLoginMutation';
import { useRegisterMutation } from '../../model/hooks/useRegisterMutation';
import {
  AuthFormTypes,
  authSchema,
  EmailFormTypes,
  PhoneFormTypes,
} from '../../model/schema/AuthForm.shema';

import { FormEmail } from './components/form-email/FormEmail';
import { FormPhone } from './components/form-phone/FormPhone';
import { AuthFormProps } from './AuthForm.types';

import { Button } from '@/shared/ui/button';
import { ErrorField } from '@/shared/ui/error-field';

const phoneDefaultValues: PhoneFormTypes = {
  countryCode: '+7',
  phone: '',
  password: '',
  role: 'CANDIDATE',
};

const emailDefaultValues: EmailFormTypes = {
  email: '',
  password: '',
  role: 'CANDIDATE',
};

const AUTH_METHODS = {
  PHONE: 'phone',
  EMAIL: 'email',
} as const;

export const AuthForm = ({ method, role, mode }: AuthFormProps) => {
  const form = useForm<AuthFormTypes>({
    resolver: zodResolver(authSchema),
    defaultValues:
      method === AUTH_METHODS.PHONE ? phoneDefaultValues : emailDefaultValues,
  });

  const { mutate: registerMutate, isPending: registerLoading } =
    useRegisterMutation();

  const { mutate: loginMutate, isPending: loginLoading } = useLoginMutation();

  const onSubmit: SubmitHandler<AuthFormTypes> = (data) => {
    form.clearErrors('root');
    const newUser = {
      ...data,
      role,
    };

    const mutation = mode === 'register' ? registerMutate : loginMutate;

    mutation(newUser, {
      onError: (error) => {
        form.setError('root', {
          message: error.data.message || '',
        });
      },
    });
  };

  const isError =
    Object.keys(form.formState.errors).length > 0 &&
    !form.formState.errors.root;
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
          {form.formState.errors.root && (
            <ErrorField>{form.formState.errors.root.message}</ErrorField>
          )}
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
