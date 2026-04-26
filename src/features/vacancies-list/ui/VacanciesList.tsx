'use client';

import { useVacancies, VacancyCard } from '@/entities/vacancy';

import { ErrorField } from '@/shared/ui/error-field';

export const VacanciesList = () => {
  const { data, error, isLoading, isFetching } = useVacancies();

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <ErrorField>{error.message}</ErrorField>;

  const vacancies = data?.result?.items || [];

  if (vacancies.length === 0) {
    return <h1>No vacancies found</h1>;
  }

  return (
    <div className='relative'>
      {isFetching && <div className='opacity-50'>Updating...</div>}

      <ul className='flex flex-col gap-y-2.5'>
        {vacancies.map((vacancy) => (
          <li key={vacancy.id}>
            <VacancyCard vacancy={vacancy} />
          </li>
        ))}
      </ul>
    </div>
  );
};
