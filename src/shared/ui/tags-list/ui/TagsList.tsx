import { clsx } from 'clsx';

import { Tag } from '../../Tag';

import { TagsListProps } from './TagsList.types';

export const TagsList = ({
  tags,
  variant = 'default',
  size = 'sm',
  removable = false,
  onRemove,
  onTagClick,
  className,
  tagClassName,
}: TagsListProps) => {
  if (!Array.isArray(tags) || tags.length === 0) {
    return null;
  }

  return (
    <ul className={clsx('flex flex-wrap gap-2.5', className)}>
      {tags.map((tag, index) => (
        <li key={index}>
          <Tag
            variant={variant}
            size={size}
            removable={removable}
            onRemove={onRemove ? () => onRemove(tag, index) : undefined}
            onClick={onTagClick ? () => onTagClick(tag) : undefined}
            className={tagClassName}
          >
            {tag}
          </Tag>
        </li>
      ))}
    </ul>
  );
};
