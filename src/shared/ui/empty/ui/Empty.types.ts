import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type EmptyVariant = 'default' | 'error';

export interface EmptyProps extends ComponentPropsWithoutRef<'section'> {
  title: string;
  description?: string;
  variant?: EmptyVariant;
  icon?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  actions?: ReactNode;
}
