'use client';

import { useCallback, useMemo, useRef } from 'react';

import { useVacancies, VacancyCard } from '@/entities/vacancy';

import { useObserverInfiniteScroll } from '@/shared/hooks';
import { ErrorField } from '@/shared/ui/error-field';
import { Spinner } from '@/shared/ui/spinner';

export const VacanciesList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useVacancies();

  const allVacancies = useMemo(
    () => data?.pages.flatMap((page) => page.result.items) ?? [],
    [data],
  );

  const triggerRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasNextPage || isFetchingNextPage) {
      return;
    }

    await fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading]);

  useObserverInfiniteScroll({
    callBack: loadMore,
    triggerRef,
  });

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
      <div ref={triggerRef} className='h-px w-full shrink-0' aria-hidden />
    </>
  );
};
