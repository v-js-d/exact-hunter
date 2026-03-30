'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Input, Label } from '../../../ui';
import {
  type ExampleFormTypes,
  exampleSchema,
} from '../model/ExampleForm.shema';

import { getFieldError } from '@/shared/lib';

const resetForm = {
  password: '',
  userEmail: '',
};

export const ExampleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExampleFormTypes>({
    resolver: zodResolver(exampleSchema),
    mode: 'onBlur',
    defaultValues: resetForm,
  });

  const onSubmit = (data: ExampleFormTypes) => {
    console.log(
      `user data: email - ${data.userEmail}, password -  ${data.password}`,
    );
    reset(resetForm);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mx-auto grid max-w-3/10 gap-y-3 py-5'
    >
      <Label htmlFor='user-email'>Email:</Label>
      <Input
        {...register('userEmail', {
          required: true,
        })}
        id='user-email'
        placeholder='Email...'
      />
      {getFieldError(errors, 'userEmail') && (
        <span>{getFieldError(errors, 'userEmail')}</span>
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
};
