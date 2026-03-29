import { type VariantProps } from 'class-variance-authority';

import { buttonVariants } from './Button';

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };
