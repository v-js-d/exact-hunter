import { Building2, CalendarDays, MapPin, Star } from 'lucide-react';

import { BadgeList } from '@/shared/ui/badge-list';
import { CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';

interface VacancyMainHeaderProps {
  tags: string[];
  title: string;
  companyName: string;
  vacancyLocation: string;
  companyLocation: string;
  publishedAt: string;
  companyRating: number;
}

const VacancyTitleBlock = ({
  title,
  companyName,
  vacancyLocation,
}: Pick<
  VacancyMainHeaderProps,
  'title' | 'companyName' | 'vacancyLocation'
>) => (
  <div className='space-y-2'>
    <CardTitle className='text-2xl leading-tight font-semibold md:text-3xl'>
      {title}
    </CardTitle>
    <CardDescription className='text-base text-zinc-600 dark:text-zinc-300'>
      {companyName} &bull; {vacancyLocation}
    </CardDescription>
  </div>
);

const VacancyRatingBadge = ({ companyRating }: { companyRating: number }) => (
  <p className='flex items-center gap-x-1 rounded-md bg-yellow-400/10 px-2 py-0.5 font-bold text-yellow-600'>
    <Star size={14} fill='currentColor' aria-label='Rating' />
    <span>{companyRating}</span>
  </p>
);

const VacancyMetaItems = ({
  companyLocation,
  publishedAt,
  companyRating,
}: Pick<
  VacancyMainHeaderProps,
  'companyLocation' | 'publishedAt' | 'companyRating'
>) => (
  <div className='flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-600 dark:text-zinc-300'>
    <div className='flex min-w-0 flex-1 basis-full items-start gap-2 sm:min-w-[13.75rem] sm:basis-auto'>
      <MapPin className='mt-0.5 size-4 shrink-0 text-zinc-500' />
      <span className='leading-snug wrap-break-word'>{companyLocation}</span>
    </div>
    <div className='flex min-w-0 flex-1 basis-full items-start gap-2 sm:min-w-[13.75rem] sm:basis-auto'>
      <CalendarDays className='mt-0.5 size-4 shrink-0 text-zinc-500' />
      <span className='leading-snug wrap-break-word'>
        Опубликовано {publishedAt}
      </span>
    </div>
    <div className='flex min-w-0 flex-1 basis-full items-start gap-2 sm:min-w-[13.75rem] sm:basis-auto'>
      <Building2 className='mt-0.5 size-4 shrink-0 text-zinc-500' />
      <span className='flex items-center gap-x-1 leading-snug wrap-break-word'>
        Рейтинг компании:
        <VacancyRatingBadge companyRating={companyRating} />
      </span>
    </div>
  </div>
);

export const VacancyMainHeader = ({
  tags,
  title,
  companyName,
  vacancyLocation,
  companyLocation,
  publishedAt,
  companyRating,
}: VacancyMainHeaderProps) => (
  <CardHeader className='gap-4 border-b py-6'>
    <div className='flex flex-wrap items-center gap-2'>
      <BadgeList variant='default' size='md' data={tags} />
    </div>
    <VacancyTitleBlock
      title={title}
      companyName={companyName}
      vacancyLocation={vacancyLocation}
    />
    <VacancyMetaItems
      companyLocation={companyLocation}
      publishedAt={publishedAt}
      companyRating={companyRating}
    />
  </CardHeader>
);
