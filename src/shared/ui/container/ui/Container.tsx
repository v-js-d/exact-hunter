'use client';

import { cn } from '../../../lib/utils/cn/cn';

import { ContainerProps } from './Container.types';

export const Container = ({ className, children }: ContainerProps) => (
  <div className={cn('mx-auto w-full max-w-7xl min-w-0', className)}>
    {children}
  </div>
);
