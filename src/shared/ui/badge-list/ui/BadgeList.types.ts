import type { BadgeProps } from '../../badge/ui/Badge.types';

export interface BadgeListProps {
  data: string[] | null | undefined;
  variant?: NonNullable<BadgeProps['variant']>;
  size?: 'sm' | 'md';
  removable?: boolean;
  onRemove?: (tag: string, index: number) => void;
  onTagClick?: (tag: string) => void;
  className?: string;
  tagClassName?: string;
}
