import clsx from 'clsx';

import { VacancyTagsProps } from './VacancyTags.types';

export const VacancyTags = (props: VacancyTagsProps) => {
  const { tags, className = '' } = props;

  return (
    <ul className={clsx('flex max-w-190 flex-wrap gap-2.5', className)}>
      {tags.map((tag) => (
        <p
          key={tag.toLowerCase()}
          className='text-gray-6b bg-light-ed rounded-[0.625rem] px-2.5 py-1.25 text-sm leading-[120%] font-medium capitalize'
        >
          {tag.toLowerCase()}
        </p>
      ))}
    </ul>
  );
};
