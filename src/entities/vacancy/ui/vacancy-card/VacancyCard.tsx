import Link from 'next/link';
import { Briefcase, Eye, MapPin, Star } from 'lucide-react';

import { AuthStatus, useAuthStore } from '../../../session';

import { VacancyTags } from './components/vacancy-tags/VacancyTags';
import { VacancyCardProps } from './VacancyCard.types';

import { AppRouter, ID_TEMPLATE } from '@/shared/config/AppRouter';
import { getCurrencyRange } from '@/shared/lib/';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

export const VacancyCard = (props: VacancyCardProps) => {
  const {
    vacancy: {
      id,
      company,
      position,
      employmentType,
      workType,
      location,
      salaryMin,
      salaryMax,
      currency,
      viewsCount,
      title,
      repliesCount,
    },
  } = props;

  const authStatus = useAuthStore((state) => state.status);

  const vacancyPath = AppRouter.vacancy.replace(ID_TEMPLATE, id);

  const VACANCIES_NAVIGATE = {
    authenticated: vacancyPath,
    anonymous: /* AppRouter.auth */ vacancyPath,
    loading: '',
  } satisfies Record<AuthStatus, string>;

  const tags: string[] = [position, employmentType, workType];

  return (
    <Card className='border-muted-foreground/10 group-hover:border-primary/20 relative flex h-full flex-col gap-y-3 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
      <Link
        href={VACANCIES_NAVIGATE[authStatus]}
        className='absolute inset-0 z-10'
      />
      <CardHeader className='flex flex-col gap-y-3 pb-2'>
        <div className='space-y-1'>
          <CardTitle className='text-foreground group-hover:text-primary text-2xl font-bold tracking-tight transition-colors'>
            {title}
          </CardTitle>
          <p className='text-xl leading-tight font-semibold tracking-tight'>
            {getCurrencyRange({
              min: salaryMin,
              max: salaryMax,
              currency,
            })}
          </p>
          <p className='text-muted-foreground flex items-center gap-x-1.5 text-base font-medium'>
            <Briefcase size={16} />
            {company.name}
          </p>
        </div>
        <VacancyTags vacancyCardId={id} tags={tags} />
      </CardHeader>

      <CardContent className='flex flex-col gap-y-3'>
        <div className='text-muted-foreground flex items-center gap-x-3 text-sm'>
          <p className='flex items-center gap-x-1 rounded-md bg-yellow-400/10 px-2 py-0.5 font-bold text-yellow-600'>
            <Star size={14} fill='currentColor' aria-label='Rating' />
            <span>{company.rating}</span>
          </p>
          <p className='flex items-center gap-x-1'>
            <MapPin size={16} />
            <span>{location}</span>
          </p>
        </div>
      </CardContent>

      <CardFooter className='bg-muted/30 mt-auto flex items-center justify-between gap-2 border-t pt-4'>
        <div className='relative z-10'>
          <Button
            size='lg'
            className='z-20 w-fit leading-[120%] font-semibold transition-transform'
            type='button'
            onClick={() => console.log('otklik')}
          >
            Откликнуться
          </Button>
        </div>

        <div className='text-muted-foreground flex flex-col items-end gap-y-1 text-xs'>
          <span className='flex items-center gap-x-1'>
            <Eye size={14} />
            {viewsCount} просмотров
          </span>
          {repliesCount > 0 && (
            <span className='text-primary font-medium'>
              {repliesCount} откликов
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
