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
import type { AuthRequest } from '../../model/types/auth.types';

import { FormEmail } from './components/form-email/FormEmail';
import { FormPhone } from './components/form-phone/FormPhone';
import { AuthFormProps } from './AuthForm.types';

import { UserRole } from '@/entities/user';

import { EnumIdentifierType } from '@/shared/types/identifier-enum.types';
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

  const createAuthPayload = (
    data: AuthFormTypes,
    role: UserRole,
  ): AuthRequest => {
    if ('countryCode' in data) {
      return {
        identifier: `${data.countryCode}${data.phone}`,
        type: EnumIdentifierType.PHONE,
        password: data.password,
        role,
      };
    }

    return {
      identifier: data.email,
      type: EnumIdentifierType.EMAIL,
      password: data.password,
      role,
    };
  };

  const onSubmit: SubmitHandler<AuthFormTypes> = (data) => {
    form.clearErrors('root');

    const payload = createAuthPayload(data, role);
    const mutation = mode === 'register' ? registerMutate : loginMutate;

    mutation(payload, {
      onError: (error) => {
        form.setError('root', {
          message: error?.data?.message || '',
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
          disabled={isPending}
        >
          Дальше
        </Button>
      </form>
    </FormProvider>
  );
};
