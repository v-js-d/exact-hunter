import type { ButtonProps } from '../../button';

export type BackButtonSize = Extract<
  NonNullable<ButtonProps['size']>,
  'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg'
>;

export type BackButtonProps = Omit<
  ButtonProps,
  'onClick' | 'children' | 'asChild' | 'size' | 'variant'
> & {
  onBack: () => void;
  title?: string;
  size?: BackButtonSize;
};
