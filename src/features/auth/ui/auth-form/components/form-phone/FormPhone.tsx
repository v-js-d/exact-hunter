'use client';

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { AuthFormTypes } from '../../../../model/schema/AuthForm.shema';
import { PasswordField } from '../password-field/PasswordField';

import { FormPhoneProps, PhoneVirtualFields } from './FormPhone.types';

import { getFieldError } from '@/shared/lib';
import { phoneSchema } from '@/shared/lib/schemas/phone.schema';
import { countryInfo } from '@/shared/model/data/country-codes';
import { FormField } from '@/shared/ui/form-field';
import { Input } from '@/shared/ui/input';
import { Select } from '@/shared/ui/select';

export const FormPhone = ({ isPending }: FormPhoneProps) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<AuthFormTypes & PhoneVirtualFields>();

  const phoneCode = watch('phoneCode');
  const phoneNumber = watch('phoneNumber');

  useEffect(() => {
    if (phoneCode || phoneNumber) {
      const fullNumber = `${phoneCode}${phoneNumber}`;

      const isValidate = phoneSchema.safeParse(fullNumber);

      setValue('identifier', fullNumber, {
        shouldValidate: isValidate.success,
      });
    }
  }, [phoneCode, phoneNumber, setValue]);

  return (
    <>
      <FormField
        label='Номер телефона'
        htmlFor='register-tel-input'
        error={getFieldError<AuthFormTypes>(errors, 'identifier')}
        labelHidden
      >
        <Select
          disabled={isPending}
          id='register-select-code'
          className='w-fit'
          {...register('phoneCode')}
        >
          {countryInfo.map(({ code, country }) => (
            <option key={country} value={code} title={country}>
              <span>{code}</span>
            </option>
          ))}
        </Select>
        <Input
          disabled={isPending}
          type='tel'
          size={'circle'}
          id='register-tel-input'
          placeholder='Номер телефона'
          inputMode='numeric'
          autoComplete='tel'
          {...register('phoneNumber')}
        />
      </FormField>
      <PasswordField
        errors={getFieldError<AuthFormTypes>(errors, 'password')}
      />
    </>
  );
};
