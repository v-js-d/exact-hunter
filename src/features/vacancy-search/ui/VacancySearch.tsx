'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  vacancySearchSchema,
  VacancySearchTypes,
} from '../model/schema/VacancySearch.schema';

import { Button } from '@/shared/ui/button';
import { FormField } from '@/shared/ui/form-field';
import { Input } from '@/shared/ui/input';

export const VacancySearch = () => {
  const { register, handleSubmit } = useForm<VacancySearchTypes>({
    resolver: zodResolver(vacancySearchSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit: SubmitHandler<VacancySearchTypes> = (data) => {
    console.log(data);
  };

  return (
    <form
      className='flex items-center justify-between gap-x-5'
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormField
        htmlFor='vacancy-search'
        label={'Search vacancies'}
        labelHidden
        className='w-full'
      >
        <Input
          id='vacancy-search'
          type='search'
          {...register('title')}
          placeholder='Search vacancies...'
        />
      </FormField>
      <Button size={'lg'} type='submit'>
        Найти
      </Button>
    </form>
  );
};
