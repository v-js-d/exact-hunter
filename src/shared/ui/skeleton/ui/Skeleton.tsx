import { cn } from '../../../lib/utils/cn';

import type { SkeletonProps } from './Skeleton.types';

const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div
    data-slot='skeleton'
    className={cn('bg-accent animate-pulse rounded-md', className)}
    {...props}
  />
);

export { Skeleton };
