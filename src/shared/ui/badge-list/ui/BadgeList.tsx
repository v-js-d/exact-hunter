import { clsx } from 'clsx';

import { Badge } from '../../badge';

import { BadgeListProps } from './BadgeList.types';

const sizeClasses: Record<NonNullable<BadgeListProps['size']>, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

export const BadgeList = ({
  tags,
  variant = 'default',
  size = 'sm',
  removable = false,
  onRemove,
  onTagClick,
  className,
  tagClassName,
}: BadgeListProps) => {
  if (!Array.isArray(tags) || tags.length === 0) {
    return null;
  }

  return (
    <ul className={clsx('flex flex-wrap gap-2.5', className)}>
      {tags.map((tag, index) => (
        <li key={index}>
          <Badge
            variant={variant}
            onClick={onTagClick ? () => onTagClick(tag) : undefined}
            className={clsx(
              sizeClasses[size],
              onTagClick && 'cursor-pointer',
              removable && 'pr-1',
              tagClassName,
            )}
          >
            <span>{tag}</span>
            {removable && (
              <button
                type='button'
                aria-label={`Remove ${tag}`}
                className='cursor-pointer rounded-full p-0.5 hover:bg-black/10'
                onClick={(event) => {
                  event.stopPropagation();
                  onRemove?.(tag, index);
                }}
              >
                x
              </button>
            )}
          </Badge>
        </li>
      ))}
    </ul>
  );
};
