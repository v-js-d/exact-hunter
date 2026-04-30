import { useMemo } from 'react';
import Link from 'next/link';
import { Briefcase, Eye, MapPin, Star } from 'lucide-react';

import { VacancyCardProps } from './VacancyCard.types';

import { TextFallBack } from '@/shared/config/TextFallBack';
import { getCurrencyRange } from '@/shared/lib/';
import { replacePathId } from '@/shared/lib/helpers/replacePathId';
import { BadgeList } from '@/shared/ui/badge-list';
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
  } = props.vacancy;

  // const authStatus = useAuthStore(selectStatus);

  // const VACANCIES_NAVIGATE = {
  //   authenticated: replacePathId('vacancy', id),
  //   anonymous: AppRouter.auth,
  //   loading: '',
  // } satisfies Record<AuthStatus, string>;

  const tags = useMemo(
    () => [position, employmentType, workType],
    [employmentType, position, workType],
  );

  const salary = getCurrencyRange({
    min: salaryMin,
    max: salaryMax,
    currency,
  });

  return (
    <Card className='border-muted-foreground/10 group-hover:border-primary/20 relative flex h-full flex-col gap-y-3 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
      <Link
        href={replacePathId('vacancy', id)}
        className='absolute inset-0 z-10'
      />
      <CardHeader className='flex flex-col gap-y-3 pb-2'>
        <div className='space-y-1'>
          <CardTitle className='text-foreground group-hover:text-primary text-2xl font-bold tracking-tight transition-colors'>
            {title || TextFallBack.vacancy.title}
          </CardTitle>
          <p className='text-xl leading-tight font-semibold tracking-tight'>
            {salary}
          </p>
          <p className='text-muted-foreground flex items-center gap-x-1.5 text-base font-medium'>
            <Briefcase size={16} />
            {company.name || TextFallBack.company.name}
          </p>
        </div>
        <BadgeList variant={'default'} size={'md'} data={tags} />
      </CardHeader>

      <CardContent className='flex flex-col gap-y-3'>
        <div className='text-muted-foreground flex items-center gap-x-3 text-sm'>
          <p className='flex items-center gap-x-1 rounded-md bg-yellow-400/10 px-2 py-0.5 font-bold text-yellow-600'>
            <Star size={14} fill='currentColor' aria-label='Rating' />
            <span>{company.rating ?? TextFallBack.company.rating}</span>
          </p>
          <p className='flex items-center gap-x-1'>
            <MapPin size={16} />
            <span>{location || TextFallBack.vacancy.location}</span>
          </p>
        </div>
      </CardContent>

      <CardFooter className='bg-muted/30 mt-auto flex items-center justify-between gap-2 border-t pt-4'>
        <div className='relative z-10'>
          <Button
            size='lg'
            className='z-20 w-fit leading-[120%] font-semibold transition-transform'
            type='button'
            onClick={() => {}}
          >
            Откликнуться
          </Button>
        </div>

        <div className='text-muted-foreground flex flex-col items-end gap-y-1 text-xs'>
          <span className='flex items-center gap-x-1'>
            <Eye size={14} />
            {Number(viewsCount) || 0} просмотров
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
