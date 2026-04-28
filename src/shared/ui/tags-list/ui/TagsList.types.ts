import type { TagVariant } from '../../Tag';

export interface TagsListProps {
  tags: string[] | null | undefined;
  variant?: TagVariant;
  size?: 'sm' | 'md';
  removable?: boolean;
  onRemove?: (tag: string, index: number) => void;
  onTagClick?: (tag: string) => void;
  className?: string;
  tagClassName?: string;
}
