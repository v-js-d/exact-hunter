'use client';

import { useFormContext } from 'react-hook-form';

import { PhoneTypes } from '../../../../model/schema/AuthForm.shema';
import { PasswordField } from '../password-field/PasswordField';

import { getFieldError } from '@/shared/lib';
import { FormField } from '@/shared/ui/form-field';
import { Input } from '@/shared/ui/input';
import { Select } from '@/shared/ui/select';

const countryNumbers = [
  { country: 'Россия', code: '+7' },
  { country: 'Беларусь', code: '+375' },
  { country: 'Узбекистан', code: '+998' },
];

export const FormPhone = ({ isPending }: { isPending: boolean }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PhoneTypes>();

  return (
    <>
      <FormField
        label='Номер телефона'
        htmlFor='register-tel-input'
        error={getFieldError(errors, 'phone')}
        labelHidden
      >
        <Select
          disabled={isPending}
          id='register-select-code'
          className='w-fit'
        >
          {countryNumbers.map(({ code }) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </Select>
        <Input
          disabled={isPending}
          type='tel'
          id='register-tel-input'
          placeholder='Номер телефона'
          inputMode='numeric'
          autoComplete='tel'
          className='border-gray-6b rounded-4xl px-5 py-2.5'
          {...register('phone')}
        />
      </FormField>
      <PasswordField errors={getFieldError(errors, 'password')} />
    </>
  );
};
