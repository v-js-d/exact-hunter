import { useFormContext } from 'react-hook-form';

import { TEmailShema } from '../../index';

import { getFieldError } from '@/shared/lib/helpers/getFieldError';
import { ErrorField } from '@/shared/ui/error-field';
import { Input } from '@/shared/ui/input';

export function FormEmail() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TEmailShema>();
  return (
    <>
      <label htmlFor='register-email-input' className='visually-hidden'>
        Ваша почта
      </label>
      <Input
        type='email'
        id='register-email-input'
        placeholder='Ваша почта'
        className='border-gray-6b col-span-2 rounded-4xl px-5 py-2.5'
        {...register('email')}
      />
      <ErrorField>{getFieldError(errors, 'email')}</ErrorField>
    </>
  );
}
