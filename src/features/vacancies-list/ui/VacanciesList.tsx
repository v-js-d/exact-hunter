'use client';

import { useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';

import { useVacancies, VacancyCard } from '@/entities/vacancy';

import { AppRouter } from '@/shared/config/AppRouter';
import { TextFallBack } from '@/shared/config/TextFallBack';
import { useObserverInfiniteScroll } from '@/shared/hooks';
import { Button } from '@/shared/ui/button';
import { Empty } from '@/shared/ui/empty';
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

  if (isLoading) {
    return <Spinner size={30} className='flex w-full justify-center' />;
  }

  if (error) {
    return (
      <Empty
        title='Что-то пошло не так...'
        variant='error'
        className='min-h-[30vh]'
        actions={
          <Button asChild>
            <Link href={AppRouter.main}>На главную</Link>
          </Button>
        }
      />
    );
  }

  if (allVacancies.length === 0) {
    return <h1>{TextFallBack.vacanciesList.emptyState}</h1>;
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
