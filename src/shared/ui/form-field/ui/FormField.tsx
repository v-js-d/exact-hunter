'use client';

import clsx from 'clsx';

import { ErrorField } from '../../error-field';
import { Label } from '../../label';

import type { FormFieldProps } from './FormField.types';

export const FormField = ({
  label,
  htmlFor,
  error,
  children,
  labelHidden,
  ...props
}: FormFieldProps) => (
  <div
    className='relative grid grid-cols-[auto_1fr] gap-2.5 disabled:pointer-events-none disabled:opacity-50'
    {...props}
  >
    <Label htmlFor={htmlFor} className={clsx('', labelHidden && 'sr-only')}>
      {label}
    </Label>
    {children}
    {error && <ErrorField className='col-span-2'>{error}</ErrorField>}
  </div>
);
