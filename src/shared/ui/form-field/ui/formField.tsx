'use client';

import { HTMLAttributes } from 'react';
import clsx from 'clsx';

import { ErrorField } from '../../error-field';
import { Label } from '../../label';

interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  labelHidden?: boolean;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  htmlFor,
  error,
  children,
  labelHidden,
  ...props
}: FormFieldProps) {
  return (
    <div className='relative grid grid-cols-[auto_1fr] gap-2.5' {...props}>
      <Label htmlFor={htmlFor} className={clsx('', labelHidden && 'sr-only')}>
        {label}
      </Label>
      {children}
      {error && <ErrorField className='col-span-2'>{error}</ErrorField>}
    </div>
  );
}
