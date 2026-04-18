'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Eye, EyeClosed } from 'lucide-react';

import { AuthFormTypes } from '../../../../model/schema/AuthForm.shema';

import {
  PasswordFieldProps,
  PasswordMode,
  PasswordTitles,
} from './PasswordField.types';

import { FormField } from '@/shared/ui/form-field';
import { Input } from '@/shared/ui/input';

const PASSWORD_FIELD_CONFIG = {
  password: {
    text: 'Show',
    icon: Eye,
  },
  text: {
    text: 'Hide',
    icon: EyeClosed,
  },
} satisfies Record<PasswordMode, PasswordTitles>;

export const PasswordField = ({ errors, isPending }: PasswordFieldProps) => {
  const [passwordMode, setPasswordMode] = useState<PasswordMode>('password');
  const { register } = useFormContext<AuthFormTypes>();

  const Icon = PASSWORD_FIELD_CONFIG[passwordMode].icon;

  return (
    <FormField
      label='Password'
      htmlFor='register-password-input'
      error={errors}
      className='w-full'
      labelHidden
    >
      <div className='relative'>
        <Input
          disabled={isPending}
          type={passwordMode}
          id='register-password-input'
          autoComplete='current-password'
          placeholder='password'
          {...register('password')}
        />
        <button
          type='button'
          disabled={isPending}
          className='absolute top-1/2 right-4 flex -translate-y-1/2'
          title={PASSWORD_FIELD_CONFIG[passwordMode].text}
          onClick={() =>
            setPasswordMode((prevMode) =>
              prevMode === 'password' ? 'text' : 'password',
            )
          }
        >
          <Icon className='text-gray-6b' size={20} />
        </button>
      </div>
    </FormField>
  );
};
