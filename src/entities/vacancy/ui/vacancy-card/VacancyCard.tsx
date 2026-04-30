import { useMemo } from 'react';
import Link from 'next/link';

import { VacancyCardFooter } from './components/VacancyCardFooter';
import { VacancyCardHeader } from './components/VacancyCardHeader';
import { VacancyCardMeta } from './components/VacancyCardMeta';
import { VacancyCardProps } from './VacancyCard.types';

import { TextFallBack } from '@/shared/config/TextFallBack';
import { getCurrencyRange } from '@/shared/lib/';
import { replacePathId } from '@/shared/lib/helpers/replacePathId';
import { cn } from '@/shared/lib/utils/cn/cn';
import { Card } from '@/shared/ui/card';

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

  const tags = useMemo(
    () => [position, employmentType, workType],
    [employmentType, position, workType],
  );

  const salary = getCurrencyRange({
    min: salaryMin,
    max: salaryMax,
    currency,
  });

  const displayData = {
    title: title || TextFallBack.vacancy.title,
    companyName: company.name || TextFallBack.company.name,
    companyRating: company.rating || TextFallBack.company.rating,
    location: location || TextFallBack.vacancy.location,
    viewsCount: viewsCount || 0,
    repliesCount: repliesCount || 0,
  };

  const vacancyCardClassName = cn(
    'relative flex h-full flex-col gap-y-3 overflow-hidden',
    'border-muted-foreground/10',
    'transition-all duration-300',
    'hover:-translate-y-1 hover:shadow-xl',
    'group-hover:border-primary/20',
  );

  return (
    <Card className={vacancyCardClassName}>
      <Link
        href={replacePathId('vacancy', id)}
        className='absolute inset-0 z-10'
      />
      <VacancyCardHeader
        title={displayData.title}
        salary={salary}
        companyName={displayData.companyName}
        tags={tags}
      />
      <VacancyCardMeta
        companyRating={displayData.companyRating}
        location={displayData.location}
      />
      <VacancyCardFooter
        action={props.action}
        viewsCount={displayData.viewsCount}
        repliesCount={displayData.repliesCount}
      />
    </Card>
  );
};
