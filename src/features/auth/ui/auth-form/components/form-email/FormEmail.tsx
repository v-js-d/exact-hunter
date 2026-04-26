'use client';

import { useFormContext } from 'react-hook-form';

import { EmailFormTypes } from '../../../../model/schema/AuthForm.shema';
import { PasswordField } from '../password-field/PasswordField';

import { getFieldError } from '@/shared/lib';
import { FormField } from '@/shared/ui/form-field';
import { Input } from '@/shared/ui/input';

export const FormEmail = ({ isPending }: { isPending: boolean }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<EmailFormTypes>();

  return (
    <>
      <FormField
        htmlFor='register-email-input'
        label='Ваша почта'
        error={getFieldError(errors, 'email')}
        labelHidden
      >
        <Input
          type='email'
          id='register-email-input'
          size={'circle'}
          disabled={isPending}
          placeholder='Ваша почта'
          className='col-span-2'
          {...register('email')}
        />
      </FormField>
      <PasswordField errors={getFieldError(errors, 'password')} />
    </>
  );
};
