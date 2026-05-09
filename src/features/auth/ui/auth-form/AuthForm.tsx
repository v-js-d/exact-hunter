'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLoginMutation } from '../../model/hooks/useLoginMutation';
import { useRegisterMutation } from '../../model/hooks/useRegisterMutation';
import {
  AuthFormInputTypes,
  AuthFormOutputTypes,
  authSchema,
} from '../../model/schema/AuthForm.shema';
import { AuthMethod } from '../../model/types/auth-method.types';

import { FormEmail } from './components/form-email/FormEmail';
import { FormPhone } from './components/form-phone/FormPhone';
import { AuthFormProps } from './AuthForm.types';

import { countryInfo } from '@/shared/model/data/country-codes';
import { Button } from '@/shared/ui/button';
import { ErrorField } from '@/shared/ui/error-field';

const phoneDefaultValues = {
  type: 'PHONE',
  phoneCode: countryInfo[0].code,
  phoneNumber: '',
  password: '',
  identifier: '',
  role: 'CANDIDATE',
} satisfies AuthFormInputTypes;

const emailDefaultValues = {
  type: 'EMAIL',
  identifier: '',
  password: '',
  role: 'CANDIDATE',
} satisfies AuthFormInputTypes;

const authDefaultValues = {
  EMAIL: emailDefaultValues,
  PHONE: phoneDefaultValues,
} satisfies Record<AuthMethod, AuthFormInputTypes>;

export const AuthForm = ({ method, role, mode }: AuthFormProps) => {
  const form = useForm<AuthFormInputTypes>({
    resolver: zodResolver(authSchema),
    defaultValues: authDefaultValues[method],
  });

  const { mutate: registerMutate, isPending: registerLoading } =
    useRegisterMutation();

  const { mutate: loginMutate, isPending: loginLoading } = useLoginMutation();

  console.log(form.formState.errors);

  const onSubmit: SubmitHandler<AuthFormOutputTypes> = (data) => {
    form.clearErrors('root');

    const { identifier, password } = data;
    const newUser = {
      identifier,
      password,
      type: method,
      role,
    };

    const mutation = mode === 'register' ? registerMutate : loginMutate;

    mutation(newUser, {
      onError: (error) => {
        form.setError('root', {
          message: error.message || '',
        });
      },
    });
  };

  const isPending = registerLoading || loginLoading;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='col-span-2 grid items-center gap-6.25'
      >
        <fieldset disabled={isPending} className='grid gap-y-2'>
          {method === AuthMethod['PHONE'] ? (
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
          disabled={isPending}
        >
          Дальше
        </Button>
      </form>
    </FormProvider>
  );
};
