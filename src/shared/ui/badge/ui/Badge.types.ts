import { VariantProps } from 'class-variance-authority';

import { badgeVariants } from './Badge';

export interface BadgeProps
  extends React.ComponentProps<'span'>, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}
