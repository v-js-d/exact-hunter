'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  vacancySearchSchema,
  VacancySearchTypes,
} from '../model/schema/VacancySearch.schema';

import { Button } from '@/shared/ui/button';
import { SearchInput } from '@/shared/ui/input/ui/Input';

const searchFormDefaultValues = {
  title: '',
};

export const VacancySearch = () => {
  const { register, handleSubmit } = useForm<VacancySearchTypes>({
    resolver: zodResolver(vacancySearchSchema),
    defaultValues: searchFormDefaultValues,
  });

  const onSubmit: SubmitHandler<VacancySearchTypes> = (data) => {
    console.log(data);
  };

  return (
    <form
      className='flex items-center justify-between gap-x-5'
      onSubmit={handleSubmit(onSubmit)}
    >
      <SearchInput
        id='vacancy-search'
        type='search'
        {...register('title')}
        placeholder='Найти вакансии...'
      />
      <Button size={'lg'} type='submit'>
        Найти
      </Button>
    </form>
  );
};
