'use client';

import { ChevronRight } from 'lucide-react';

import { cn } from '../../../lib/utils/cn';
import { Button } from '../../button';

import type { BackButtonProps } from './BackButton.types';

export const BackButton = ({
  className,
  onBack,
  title,
  size = 'icon-sm',
  ...rest
}: BackButtonProps) => (
  <Button
    type='button'
    aria-label='Back'
    title={title}
    variant='ghost'
    size={size}
    className={cn(
      'rotate-180 cursor-pointer rounded-sm duration-200 hover:bg-gray-200',
      className,
    )}
    onClick={() => {
      onBack();
    }}
    {...rest}
  >
    <ChevronRight className='text-gray-6b size-6' size={24} />
  </Button>
);
