'use client';

import Link from 'next/link';
import { BriefcaseBusiness } from 'lucide-react';

import { VacancyMainContent } from './components/VacancyMainContent';
import { VacancySummaryCard } from './components/VacancySummaryCard';
import { VacancyDetailProps } from './VacancyDetail.types';

import { useVacancy } from '@/entities/vacancy';

import { AppRouter } from '@/shared/config/AppRouter';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { ErrorField } from '@/shared/ui/error-field';
import { Spinner } from '@/shared/ui/spinner';

const TEXT_FALL_BACK = 'Не указано';

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
      <ErrorField className='flex flex-col text-center'>
        <span className='text-3xl'>Oops O_O...</span>
        <span className='text-2xl'>{error.message}</span>
      </ErrorField>
    );
  }

  if (!data) {
    return <p className='text-muted-foreground'>{TEXT_FALL_BACK}</p>;
  }

  return (
    <section className='w-full rounded-md bg-zinc-50 py-8 md:py-12 dark:bg-zinc-950'>
      <Container className='px-4 md:px-6'>
        <div className='mx-auto flex w-full max-w-6xl flex-col gap-6'>
          <div className='flex items-center justify-between gap-3'>
            <div className='flex min-w-0 items-center gap-2 text-sm text-zinc-500'>
              <BriefcaseBusiness className='size-4 shrink-0' />
              <span className='truncate'>Вакансия #{vacancyId}</span>
            </div>
            <Button asChild size='lg' variant='outline'>
              <Link href={AppRouter.vacancies}>К списку вакансий</Link>
            </Button>
          </div>

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]'>
            <VacancyMainContent vacancy={data} />
            <VacancySummaryCard vacancy={data} />
          </div>
        </div>
      </Container>
    </section>
  );
};
