'use client';

import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { AuthFormTypes } from '../../../../model/schema/AuthForm.shema';
import { PasswordField } from '../password-field/PasswordField';

import { FormPhoneProps, PhoneVirtualFields } from './FormPhone.types';

import { getFieldError } from '@/shared/lib';
import { phoneSchema } from '@/shared/lib/schemas/phone.schema';
import { countryInfo } from '@/shared/model/data/country-codes';
import { FormField } from '@/shared/ui/form-field';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

export const FormPhone = ({ isPending }: FormPhoneProps) => {
  const {
    control,
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
        <Controller
          name='phoneCode'
          control={control}
          render={({ field }) => (
            <Select
              disabled={isPending}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                className='flex w-20 justify-center rounded-2xl py-2 focus-visible:ring-3'
                size='default'
              >
                <SelectValue placeholder={countryInfo[0].code} />
              </SelectTrigger>
              <SelectContent position='popper' className='max-h-62.5'>
                {countryInfo.map(({ code, country }) => (
                  <SelectItem key={country} value={`${code}-${country}`}>
                    <SelectItemText>
                      <span className='font-medium'>{code}</span>
                    </SelectItemText>
                    <span className='text-muted-foreground text-xs'>
                      {country}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
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
