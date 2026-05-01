'use client';

import Link from 'next/link';
import { BriefcaseBusiness } from 'lucide-react';

import { VacancyMainContent, VacancySummaryCard } from './components';
import type { VacancyDetailProps } from './VacancyDetail.types';

import { useVacancy } from '@/entities/vacancy';

import { AppRouter } from '@/shared/config/AppRouter';
import { Button } from '@/shared/ui/button';
import { Empty } from '@/shared/ui/empty';
import { Spinner } from '@/shared/ui/spinner';

export const VacancyDetail = ({ vacancyId }: VacancyDetailProps) => {
  const { data, isLoading, error } = useVacancy(vacancyId);

  if (isLoading) {
    return (
      <div className='flex min-h-[40vh] items-center justify-center'>
        <Spinner size={40} />
      </div>
    );
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

  if (!data) {
    return null;
  }

  return (
    <div className='flex w-full flex-col gap-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex min-w-0 items-center gap-2 text-sm text-zinc-500'>
          <BriefcaseBusiness className='size-4 shrink-0' />
          <span className='truncate'>Вакансия #{vacancyId}</span>
        </div>
        <Button
          asChild
          className='w-full shrink-0 sm:w-auto'
          size='lg'
          variant='outline'
        >
          <Link href={AppRouter.vacancies}>К списку вакансий</Link>
        </Button>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]'>
        <VacancyMainContent vacancy={data} />
        <VacancySummaryCard vacancy={data} />
      </div>
    </div>
  );
};
