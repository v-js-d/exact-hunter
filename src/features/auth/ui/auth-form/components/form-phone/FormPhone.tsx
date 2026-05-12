'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { AuthFormInputTypes } from '../../../../model/schema/AuthForm.shema';
import { PasswordField } from '../password-field/PasswordField';

import { FormPhoneProps } from './FormPhone.types';

import { getFieldError } from '@/shared/lib';
import { countryInfo } from '@/shared/model/data/country-codes';
import { FormField } from '@/shared/ui/form-field';
import { Input } from '@/shared/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/shared/ui/select';

export const FormPhone = ({ isPending }: FormPhoneProps) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<AuthFormInputTypes>();

  return (
    <>
      <FormField
        label='Номер телефона'
        htmlFor='register-tel-input'
        error={getFieldError(errors, 'identifier')}
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
                <span className='font-medium'>{field.value || '+7'}</span>
              </SelectTrigger>
              <SelectContent position='popper' className='max-h-62.5'>
                {countryInfo.map(({ code, country }) => (
                  <SelectItem key={country} value={code} textValue={code}>
                    <span className='font-medium'>{code}</span>
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
      <PasswordField errors={getFieldError(errors, 'password')} />
    </>
  );
};
