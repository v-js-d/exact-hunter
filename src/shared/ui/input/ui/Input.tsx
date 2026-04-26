import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '../../../lib/utils/cn';

import { ExtendedInputProps } from './Input.types';

export const inputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex w-full min-w-0 border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      variant: {
        default: 'border-gray-6b focus-visible:border-ring',
        destructive:
          'border-destructive focus-visible:border-destructive placeholder:text-destructive focus-visible:ring-destructive/20',
        secondary:
          'bg-muted/50 focus-visible:border-ring border-transparent focus-visible:bg-transparent',
      },
      size: {
        default: 'h-10 rounded-xl px-3 py-2.5',
        circle: 'h-10 rounded-3xl px-3 py-2.5',
        sm: 'h-8 rounded-lg px-2.5 py-1 text-xs file:h-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Input = React.forwardRef<HTMLInputElement, ExtendedInputProps>(
  ({ className, variant, size, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      data-slot='input'
      className={cn(inputVariants({ variant, size }), className)}
      {...props}
    />
  ),
);

Input.displayName = 'Input';

export { Input };
