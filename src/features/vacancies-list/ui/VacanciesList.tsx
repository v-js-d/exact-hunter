'use client';

import { useInfinityScrollVacancies } from '../model/hooks/useInfinityScrollVacancies';

import { VacancyCard } from '@/entities/vacancy';

import { ErrorField } from '@/shared/ui/error-field';
import { Spinner } from '@/shared/ui/spinner';

export const VacanciesList = () => {
  const { allVacancies, isFetchingNextPage, isLoading, error } =
    useInfinityScrollVacancies();

  if (isLoading) return <h2>Loading...</h2>;

  if (error)
    return (
      <ErrorField className='flex flex-col text-center'>
        <span className='text-3xl'>Oops O_O...</span>
        <span className='text-2xl'>{error.message}</span>
      </ErrorField>
    );

  if (allVacancies.length === 0) {
    return <h1>Vacancies not found</h1>;
  }

  return (
    <>
      <ul className='flex flex-col gap-y-2.5 pb-5'>
        {allVacancies.map((vacancy) => (
          <li key={vacancy.id}>
            <VacancyCard vacancy={vacancy} />
          </li>
        ))}
        {isFetchingNextPage && (
          <Spinner
            size={30}
            className='fixed bottom-5 left-1/2 -translate-1/2'
          />
        )}
      </ul>
    </>
  );
};
