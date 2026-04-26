'use client';

import { useVacancies } from '../model/hooks/useVacancies';

import { VacancyCard } from '@/entities/vacancy';

import { ErrorField } from '@/shared/ui/error-field';

export const VacanciesList = () => {
  const { data, error, isLoading } = useVacancies();

  if (error) return <ErrorField>{error.message}</ErrorField>;
  if (isLoading) return <h1>Loading...</h1>;
  if (!data) return <h1>Oops, try it later</h1>;

  const vacancies = data.result.items;

  return (
    <ul className='flex flex-col gap-y-2.5'>
      {vacancies.map((vacancy) => (
        <VacancyCard vacancy={vacancy} key={vacancy.id} />
      ))}
    </ul>
  );
};
