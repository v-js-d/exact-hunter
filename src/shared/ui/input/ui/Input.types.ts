import { InputHTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';

import { inputVariants } from './Input';

export interface ExtendedInputProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}
