'use client';

import clsx from 'clsx';

import type { FormFieldProps } from './FormField.types';

import { ErrorField, Label } from '@/shared/ui';

export const FormField = ({
  label,
  htmlFor,
  error,
  children,
  labelHidden,
  ...props
}: FormFieldProps) => (
  <div className='relative grid grid-cols-[auto_1fr] gap-2.5' {...props}>
    <Label htmlFor={htmlFor} className={clsx('', labelHidden && 'sr-only')}>
      {label}
    </Label>
    {children}
    {error && <ErrorField className='col-span-2'>{error}</ErrorField>}
  </div>
);
