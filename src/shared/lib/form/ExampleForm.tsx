'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { getFieldError } from '../helpers/getFieldError';

import { type ExampleFormTypes, exampleSchema } from './ExampleForm.shema';

export function ExampleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExampleFormTypes>({
    resolver: zodResolver(exampleSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: ExampleFormTypes) => {
    console.log(
      `user data: email - ${data.useremail}, password -  ${data.password}`,
    );
    reset({ password: '', useremail: '' });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mx-auto grid max-w-3/10 gap-y-3 py-5'
    >
      <Label htmlFor='user-email'>Email:</Label>
      <Input
        {...register('useremail', {
          required: true,
        })}
        id='user-email'
        placeholder='Email...'
      />
      {getFieldError(errors, 'useremail') && (
        <span>{getFieldError(errors, 'useremail')}</span>
      )}
      <Label htmlFor='user-password'>Password:</Label>
      <Input
        {...register('password', {
          required: true,
        })}
        id='user-password'
        placeholder='Password...'
      />
      {getFieldError(errors, 'password') && (
        <span>{getFieldError(errors, 'password')}</span>
      )}
      <Button type='submit' className='w-2/10 justify-self-center'>
        Send
      </Button>
    </form>
  );
}
