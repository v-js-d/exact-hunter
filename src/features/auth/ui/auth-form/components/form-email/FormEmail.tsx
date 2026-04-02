'use client';

import { useFormContext } from 'react-hook-form';

import { EmailShema } from '../../../../model/schema/AuthForm.shema';

import { getFieldError } from '@/shared/lib';
import { FormField } from '@/shared/ui/form-field';
import { Input } from '@/shared/ui/input';

export const FormEmail = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<EmailShema>();

  return (
    <FormField
      htmlFor='register-email-input'
      label='Ваша почта'
      error={getFieldError(errors, 'email')}
      labelHidden
    >
      <Input
        type='email'
        id='register-email-input'
        placeholder='Ваша почта'
        className='border-gray-6b col-span-2 rounded-4xl px-5 py-2.5'
        {...register('email')}
      />
    </FormField>
  );
};
