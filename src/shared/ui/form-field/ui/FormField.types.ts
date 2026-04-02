import type { HTMLAttributes } from 'react';

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  error?: string;
  htmlFor: string;
  label: string;
  labelHidden?: boolean;
}
