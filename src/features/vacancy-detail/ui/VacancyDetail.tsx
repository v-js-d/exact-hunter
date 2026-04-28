'use client';

import Link from 'next/link';
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Eye,
  MapPin,
  Users,
} from 'lucide-react';

import { VacancyDetailProps } from './VacancyDetail.types';

import { useVacancy } from '@/entities/vacancy';

import { AppRouter } from '@/shared/config/AppRouter';
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

const textFallback = 'Не указано';

const workTypeLabelMap: Record<string, string> = {
  FULL_TIME: 'Полный день',
  PART_TIME: 'Частичная занятость',
  REMOTE: 'Удаленная работа',
  HYBRID: 'Гибрид',
  ONSITE: 'Офис',
};

const employmentTypeLabelMap: Record<string, string> = {
  PERMANENT: 'Постоянная',
  CONTRACT: 'Контракт',
  PART_TIME: 'Частичная',
  INTERNSHIP: 'Стажировка',
};

const formatDate = (dateString?: string) => {
  if (!dateString) {
    return textFallback;
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return textFallback;
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

const formatSalary = (
  min?: number | null,
  max?: number | null,
  currency?: string,
) => {
  if (min == null && max == null) {
    return 'по договоренности';
  }

  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: currency || 'RUB',
    maximumFractionDigits: 0,
  });

  if (min != null && max != null) {
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  }

  if (min != null) {
    return `от ${formatter.format(min)}`;
  }

  return `до ${formatter.format(max as number)}`;
};

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
    return <p className='text-muted-foreground'>{textFallback}</p>;
  }

  const workTypeLabel = workTypeLabelMap[data.workType] || textFallback;
  const employmentTypeLabel =
    employmentTypeLabelMap[data.employmentType] || textFallback;
  const position = data.position || textFallback;
  const title = data.title || textFallback;
  const companyName = data.company?.name || textFallback;
  const location = data.location || textFallback;
  const companyCity = data.company?.city || textFallback;
  const companyLocation = data.company?.location || textFallback;
  const companyRating = data.company?.rating ?? 0;
  const description = data.description || textFallback;
  const viewsCount = data.viewsCount ?? 0;
  const repliesCount = data.repliesCount ?? 0;

  return (
    <section className='w-full rounded-sm bg-zinc-50 py-8 md:py-12 dark:bg-zinc-950'>
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
                  <span className='rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300'>
                    {workTypeLabel}
                  </span>
                  <span className='rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300'>
                    {employmentTypeLabel}
                  </span>
                  <span className='rounded-full bg-zinc-500/10 px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300'>
                    {position}
                  </span>
                </div>

                <div className='space-y-2'>
                  <CardTitle className='text-2xl leading-tight font-semibold md:text-3xl'>
                    {title}
                  </CardTitle>
                  <CardDescription className='text-base text-zinc-600 dark:text-zinc-300'>
                    {companyName} · {location}
                  </CardDescription>
                </div>

                <div className='flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-600 dark:text-zinc-300'>
                  <div className='flex min-w-55 flex-1 items-start gap-2'>
                    <MapPin className='mt-0.5 size-4 shrink-0 text-zinc-500' />
                    <span className='leading-snug wrap-break-word'>
                      {companyCity}, {companyLocation}
                    </span>
                  </div>
                  <div className='flex min-w-55 flex-1 items-start gap-2'>
                    <CalendarDays className='mt-0.5 size-4 shrink-0 text-zinc-500' />
                    <span className='leading-snug wrap-break-word'>
                      Опубликовано {formatDate(data.createdAt)}
                    </span>
                  </div>
                  <div className='flex min-w-55 flex-1 items-start gap-2'>
                    <Building2 className='mt-0.5 size-4 shrink-0 text-zinc-500' />
                    <span className='leading-snug wrap-break-word'>
                      Рейтинг компании: {companyRating}/5
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className='space-y-8 py-6'>
                <section className='space-y-3'>
                  <h2 className='text-lg font-semibold'>Зарплата</h2>
                  <p className='text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100'>
                    {formatSalary(
                      data.salaryMin,
                      data.salaryMax,
                      data.currency,
                    )}
                  </p>
                </section>

                <Separator />

                <section className='space-y-3'>
                  <h2 className='text-lg font-semibold'>Описание</h2>
                  <p className='leading-relaxed text-zinc-700 dark:text-zinc-300'>
                    {description}
                  </p>
                </section>

                <Separator />

                <section className='space-y-4'>
                  <h2 className='text-lg font-semibold'>О компании</h2>
                  <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                    <div className='rounded-lg border bg-zinc-50 p-4 dark:bg-zinc-900/40'>
                      <p className='text-sm text-zinc-500'>Компания</p>
                      <p className='mt-1 font-medium'>{companyName}</p>
                    </div>
                    <div className='rounded-lg border bg-zinc-50 p-4 dark:bg-zinc-900/40'>
                      <p className='text-sm text-zinc-500'>Локация</p>
                      <p className='mt-1 font-medium'>
                        {companyCity}, {companyLocation}
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
                    <p className='font-medium'>{formatDate(data.expiresAt)}</p>
                  </div>
                  <Separator />
                  <div className='grid grid-cols-2 gap-3'>
                    <div className='rounded-lg border p-3'>
                      <div className='mb-1 flex items-center gap-1 text-zinc-500'>
                        <Eye className='size-4' />
                        <span className='text-xs'>Просмотры</span>
                      </div>
                      <p className='text-lg font-semibold'>{viewsCount}</p>
                    </div>
                    <div className='rounded-lg border p-3'>
                      <div className='mb-1 flex items-center gap-1 text-zinc-500'>
                        <Users className='size-4' />
                        <span className='text-xs'>Отклики</span>
                      </div>
                      <p className='text-lg font-semibold'>{repliesCount}</p>
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
