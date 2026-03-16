'use client';

import { useFormContext } from 'react-hook-form';

import { PhoneShema } from '../../../model';

import { getFieldError } from '@/shared/lib/helpers/getFieldError';
import { ErrorField } from '@/shared/ui/error-field';
import { Input } from '@/shared/ui/input';
import { Select } from '@/shared/ui/select';

const countryNumbers = [
  { country: 'Россия', code: '+7' },
  { country: 'Беларусь', code: '+375' },
  { country: 'Узбекистан', code: '+998' },
];

export function FormTel() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PhoneShema>();

  return (
    <>
      <label htmlFor='register-select-code' className='sr-only'>
        Код страны
      </label>
      <Select id='register-select-code'>
        {countryNumbers.map(({ code }) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </Select>
      <label htmlFor='register-tel-input' className='sr-only'>
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
