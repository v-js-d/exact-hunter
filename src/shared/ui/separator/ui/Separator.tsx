'use client';

import { Separator as SeparatorPrimitive } from 'radix-ui';

import { cn } from '../../../lib/utils/cn/cn';

import type { SeparatorProps } from './Separator.types';

const Separator = ({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: SeparatorProps) => (
  <SeparatorPrimitive.Root
    data-slot='separator'
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
      className,
    )}
    {...props}
  />
);

export { Separator };
