'use client';

import { useFormContext } from 'react-hook-form';

import { TPhoneShema } from '../../index';

import { getFieldError } from '@/shared/lib/helpers/getFieldError';
import { ErrorField } from '@/shared/ui/error-field';
import { Input } from '@/shared/ui/input';

const countryNumbers = [
  { country: 'Россия', code: '+7' },
  { country: 'Беларусь', code: '+375' },
  { country: 'Узбекистан', code: '+998' },
];

export function FormTel() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TPhoneShema>();

  return (
    <>
      <label htmlFor='register-select-code' className='visually-hidden'>
        Код страны
      </label>
      <select
        id='register-select-code'
        className='border-orange-f5 appearance-none rounded-4xl border-2 px-2.5 py-1 text-center text-lg font-medium'
        {...register('countryCode')}
      >
        {countryNumbers.map(({ code }) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
      <label htmlFor='register-tel-input' className='visually-hidden'>
        Номер телефона
      </label>
      <Input
        type='tel'
        id='register-tel-input'
        placeholder='Номер телефона'
        inputMode='numeric'
        autoComplete='tel'
        className='border-gray-6b rounded-4xl px-5 py-2.5'
        {...register('phone')}
      />
      <ErrorField className='col-span-2'>
        {getFieldError(errors, 'phone')}
      </ErrorField>
    </>
  );
}
