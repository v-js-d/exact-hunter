'use client';

import { useMemo } from 'react';
import { Building2, CalendarDays, MapPin, Star } from 'lucide-react';

import type { Vacancy } from '@/entities/vacancy';

import { getCurrencyRange, useDateTime } from '@/shared/lib/';
import { BadgeList } from '@/shared/ui/badge-list';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';

interface VacancyMainContentProps {
  vacancy: Vacancy;
}

export const VacancyMainContent = ({ vacancy }: VacancyMainContentProps) => {
  const dateTime = useDateTime();

  const tags = useMemo(
    () => [vacancy.position, vacancy.employmentType, vacancy.workType],
    [vacancy.employmentType, vacancy.position, vacancy.workType],
  );

  return (
    <Card className='py-0'>
      <CardHeader className='gap-4 border-b py-6'>
        <div className='flex flex-wrap items-center gap-2'>
          <BadgeList variant={'default'} size={'md'} tags={tags} />
        </div>

        <div className='space-y-2'>
          <CardTitle className='text-2xl leading-tight font-semibold md:text-3xl'>
            {vacancy.title || ''}
          </CardTitle>
          <CardDescription className='text-base text-zinc-600 dark:text-zinc-300'>
            {vacancy.company?.name || ''} &bull; {vacancy.location || ''}
          </CardDescription>
        </div>

        <div className='flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-600 dark:text-zinc-300'>
          <div className='flex min-w-55 flex-1 items-start gap-2'>
            <MapPin className='mt-0.5 size-4 shrink-0 text-zinc-500' />
            <span className='leading-snug wrap-break-word'>
              {vacancy.company?.city || ''}, {vacancy.company?.location || ''}
            </span>
          </div>
          <div className='flex min-w-55 flex-1 items-start gap-2'>
            <CalendarDays className='mt-0.5 size-4 shrink-0 text-zinc-500' />
            <span className='leading-snug wrap-break-word'>
              Опубликовано {dateTime.getFormatRuDate(vacancy.createdAt) || ''}
            </span>
          </div>
          <div className='flex min-w-55 flex-1 items-start gap-2'>
            <Building2 className='mt-0.5 size-4 shrink-0 text-zinc-500' />
            <span className='flex items-center gap-x-1 leading-snug wrap-break-word'>
              Рейтинг компании:
              <p className='flex items-center gap-x-1 rounded-md bg-yellow-400/10 px-2 py-0.5 font-bold text-yellow-600'>
                <Star size={14} fill='currentColor' aria-label='Rating' />
                <span>{vacancy.company?.rating ?? 0}</span>
              </p>
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-8 py-6'>
        <section className='space-y-3'>
          <h2 className='text-lg font-semibold'>Зарплата</h2>
          <p className='text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100'>
            {getCurrencyRange({
              min: vacancy.salaryMin,
              max: vacancy.salaryMax,
              currency: vacancy.currency,
            })}
          </p>
        </section>

        <Separator />

        <section className='space-y-3'>
          <h2 className='text-lg font-semibold'>Описание</h2>
          <p className='leading-relaxed text-zinc-700 dark:text-zinc-300'>
            {vacancy.description || ''}
          </p>
        </section>

        <Separator />

        <section className='space-y-4'>
          <h2 className='text-lg font-semibold'>О компании</h2>
          <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
            <div className='rounded-lg border bg-zinc-50 p-4 dark:bg-zinc-900/40'>
              <p className='text-sm text-zinc-500'>Компания</p>
              <p className='mt-1 font-medium'>{vacancy.company?.name || ''}</p>
            </div>
            <div className='rounded-lg border bg-zinc-50 p-4 dark:bg-zinc-900/40'>
              <p className='text-sm text-zinc-500'>Локация</p>
              <p className='mt-1 font-medium'>
                {vacancy.company?.city || ''}, {vacancy.company?.location || ''}
              </p>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
};
