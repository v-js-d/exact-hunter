'use client';

import { cn } from '../../../lib/utils/cn';

import { ContainerProps } from './Container.types';

export const Container = ({ className, children }: ContainerProps) => (
  <div className={cn('mx-auto max-w-7xl', className)}>{children}</div>
);
