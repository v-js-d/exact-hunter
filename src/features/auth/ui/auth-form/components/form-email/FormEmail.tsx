'use client';

import { useFormContext } from 'react-hook-form';

import { AuthFormInputTypes } from '../../../../model/schema/AuthForm.shema';
import { PasswordField } from '../password-field/PasswordField';

import { getFieldError } from '@/shared/lib';
import { FormField } from '@/shared/ui/form-field';
import { Input } from '@/shared/ui/input';

export const FormEmail = ({ isPending }: { isPending: boolean }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<AuthFormInputTypes>();

  return (
    <>
      <FormField
        htmlFor='register-email-input'
        label='Ваша почта'
        error={getFieldError(errors, 'identifier')}
        labelHidden
      >
        <Input
          type='email'
          id='register-email-input'
          size={'circle'}
          disabled={isPending}
          placeholder='Ваша почта'
          className='col-span-2'
          {...register('identifier')}
        />
      </FormField>
      <PasswordField errors={getFieldError(errors, 'password')} />
    </>
  );
};
