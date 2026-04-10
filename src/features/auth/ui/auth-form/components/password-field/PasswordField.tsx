'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Eye, EyeClosed } from 'lucide-react';

import { AuthSchema } from '../../../../model/schema/AuthForm.shema';

import { PasswordFieldProps, PasswordMode } from './PasswordField.types';

import { FormField } from '@/shared/ui/form-field';
import { Input } from '@/shared/ui/input';

const PASSWORD_TITLES = {
  password: 'Show',
  text: 'Hide',
} satisfies Record<PasswordMode, string>;

const PASSWORD_ICONS = {
  password: EyeClosed,
  text: Eye,
} as const;

export const PasswordField = ({ errors, isPending }: PasswordFieldProps) => {
  const [passwordMode, setPasswordMode] = useState<PasswordMode>('password');
  const { register } = useFormContext<AuthSchema>();

  const Icon = PASSWORD_ICONS[passwordMode];

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
          title={PASSWORD_TITLES[passwordMode]}
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
