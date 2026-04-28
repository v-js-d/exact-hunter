'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Eye,
  MapPin,
  Star,
  Users,
} from 'lucide-react';

import { VacancyDetailProps } from './VacancyDetail.types';

import { useVacancy } from '@/entities/vacancy';

import { AppRouter } from '@/shared/config/AppRouter';
import { getCurrencyRange, useDateTime } from '@/shared/lib/';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Container } from '@/shared/ui/container';
import { ErrorField } from '@/shared/ui/error-field';
import { Separator } from '@/shared/ui/separator';
import { Spinner } from '@/shared/ui/spinner';

const TEXT_FALL_BACK = 'Не указано';

export const VacancyDetail = ({ vacancyId }: VacancyDetailProps) => {
  const { data, isLoading, error } = useVacancy(vacancyId);
  const dateTime = useDateTime();

  const tags = useMemo(
    () => [data?.position, data?.employmentType, data?.workType],
    [data?.employmentType, data?.position, data?.workType],
  );

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
            <Button asChild size='sm' variant='outline'>
              <Link href={AppRouter.vacancies}>К списку вакансий</Link>
            </Button>
          </div>

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]'>
            <Card className='py-0'>
              <CardHeader className='gap-4 border-b py-6'>
                <div className='flex flex-wrap items-center gap-2'>
                  {Array.isArray(tags) &&
                    tags.length > 0 &&
                    tags.map((tag, index) => (
                      <span
                        key={index}
                        className='text-gray-6b bg-light-ed rounded-[0.625rem] px-2.5 py-1.25 text-sm leading-[120%] font-medium capitalize'
                      >
                        {tag}
                      </span>
                    ))}
                </div>

                <div className='space-y-2'>
                  <CardTitle className='text-2xl leading-tight font-semibold md:text-3xl'>
                    {data.title || TEXT_FALL_BACK}
                  </CardTitle>
                  <CardDescription className='text-base text-zinc-600 dark:text-zinc-300'>
                    {data.company?.name || TEXT_FALL_BACK} &bull;{' '}
                    {data.location || TEXT_FALL_BACK}
                  </CardDescription>
                </div>

                <div className='flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-600 dark:text-zinc-300'>
                  <div className='flex min-w-55 flex-1 items-start gap-2'>
                    <MapPin className='mt-0.5 size-4 shrink-0 text-zinc-500' />
                    <span className='leading-snug wrap-break-word'>
                      {data.company?.city || TEXT_FALL_BACK},{' '}
                      {data.company?.location || TEXT_FALL_BACK}
                    </span>
                  </div>
                  <div className='flex min-w-55 flex-1 items-start gap-2'>
                    <CalendarDays className='mt-0.5 size-4 shrink-0 text-zinc-500' />
                    <span className='leading-snug wrap-break-word'>
                      Опубликовано{' '}
                      {dateTime.getFormatRuDate(data.createdAt) ||
                        TEXT_FALL_BACK}
                    </span>
                  </div>
                  <div className='flex min-w-55 flex-1 items-start gap-2'>
                    <Building2 className='mt-0.5 size-4 shrink-0 text-zinc-500' />
                    <span className='flex items-center gap-x-1 leading-snug wrap-break-word'>
                      Рейтинг компании:
                      <p className='flex items-center gap-x-1 rounded-md bg-yellow-400/10 px-2 py-0.5 font-bold text-yellow-600'>
                        <Star
                          size={14}
                          fill='currentColor'
                          aria-label='Rating'
                        />
                        <span>{data.company?.rating ?? 0}</span>
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
                      min: data.salaryMin,
                      max: data.salaryMax,
                      currency: data.currency,
                    })}
                  </p>
                </section>

                <Separator />

                <section className='space-y-3'>
                  <h2 className='text-lg font-semibold'>Описание</h2>
                  <p className='leading-relaxed text-zinc-700 dark:text-zinc-300'>
                    {data.description || TEXT_FALL_BACK}
                  </p>
                </section>

                <Separator />

                <section className='space-y-4'>
                  <h2 className='text-lg font-semibold'>О компании</h2>
                  <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                    <div className='rounded-lg border bg-zinc-50 p-4 dark:bg-zinc-900/40'>
                      <p className='text-sm text-zinc-500'>Компания</p>
                      <p className='mt-1 font-medium'>
                        {data.company?.name || TEXT_FALL_BACK}
                      </p>
                    </div>
                    <div className='rounded-lg border bg-zinc-50 p-4 dark:bg-zinc-900/40'>
                      <p className='text-sm text-zinc-500'>Локация</p>
                      <p className='mt-1 font-medium'>
                        {data.company?.city || TEXT_FALL_BACK},{' '}
                        {data.company?.location || TEXT_FALL_BACK}
                      </p>
                    </div>
                  </div>
                </section>
              </CardContent>
            </Card>

            <aside>
              <Card className='py-0 lg:sticky lg:top-6'>
                <CardHeader className='border-b py-6'>
                  <CardTitle>Сводка вакансии</CardTitle>
                  <CardDescription>
                    Ключевые параметры по позиции
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4 py-6'>
                  <div className='space-y-1'>
                    <p className='text-sm text-zinc-500'>Дедлайн отклика</p>
                    <p className='font-medium'>
                      {dateTime.getFormatRuDate(data.createdAt) ||
                        TEXT_FALL_BACK}
                    </p>
                  </div>
                  <Separator />
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='rounded-lg border p-3'>
                      <div className='mb-1 flex items-center gap-1 text-zinc-500'>
                        <Eye className='size-4' />
                        <span className='text-xs'>Просмотры</span>
                      </div>
                      <p className='text-lg font-semibold'>
                        {data.viewsCount ?? 0}
                      </p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <div className='mb-1 flex items-center gap-1 text-zinc-500'>
                        <Users className='size-4' />
                        <span className='text-xs'>Отклики</span>
                      </div>
                      <p className='text-lg font-semibold'>
                        {data.repliesCount ?? 0}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <Button size='lg' className='w-full'>
                    Откликнуться
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
};
