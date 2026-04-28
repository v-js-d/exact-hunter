import clsx from 'clsx';

import { VacancyTagsProps } from './VacancyTags.types';

import { Badge } from '@/shared/ui/badge';

export const VacancyTags = (props: VacancyTagsProps) => {
  const { tags, vacancyCardId, className = '' } = props;

  return (
    <ul className={clsx('flex max-w-190 flex-wrap gap-2.5', className)}>
      {tags.map((tag, index) => (
        <Badge
          key={`${tag.toLowerCase()}-${vacancyCardId}-${index}`}
          className='text-sm font-medium capitalize'
        >
          {tag.toLowerCase()}
        </Badge>
      ))}
    </ul>
  );
};
