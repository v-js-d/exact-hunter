'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLoginMutation } from '../../model/hooks/useLoginMutation';
import { useRegisterMutation } from '../../model/hooks/useRegisterMutation';
import { AuthFormTypes, authSchema } from '../../model/schema/AuthForm.shema';
import { AuthMethod } from '../../model/types/auth-method.types';

import { FormEmail } from './components/form-email/FormEmail';
import { FormPhone } from './components/form-phone/FormPhone';
import { AuthFormProps } from './AuthForm.types';

import { countryInfo } from '@/shared/model/data/country-codes';
import { Button } from '@/shared/ui/button';
import { ErrorField } from '@/shared/ui/error-field';

const phoneDefaultValues = {
  type: 'PHONE',
  identifier: countryInfo[0].code,
  password: '',
  role: 'CANDIDATE',
} satisfies AuthFormTypes;

const emailDefaultValues = {
  type: 'EMAIL',
  identifier: '',
  password: '',
  role: 'CANDIDATE',
} satisfies AuthFormTypes;

const authDefaultValues = {
  EMAIL: emailDefaultValues,
  PHONE: phoneDefaultValues,
} satisfies Record<AuthMethod, AuthFormTypes>;

export const AuthForm = ({ method, role, mode }: AuthFormProps) => {
  const form = useForm<AuthFormTypes>({
    resolver: zodResolver(authSchema),
    defaultValues: authDefaultValues[method],
  });

  const { mutate: registerMutate, isPending: registerLoading } =
    useRegisterMutation();

  const { mutate: loginMutate, isPending: loginLoading } = useLoginMutation();

  const onSubmit: SubmitHandler<AuthFormTypes> = (data) => {
    form.clearErrors('root');
    const newUser = {
      ...data,
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
          disabled={isError || isPending}
        >
          Дальше
        </Button>
      </form>
    </FormProvider>
  );
};
