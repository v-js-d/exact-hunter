import { Select as SelectPrimitive } from 'radix-ui';

export type SelectRootProps = React.ComponentProps<typeof SelectPrimitive.Root>;
export type SelectGroupProps = React.ComponentProps<
  typeof SelectPrimitive.Group
>;
export type SelectValueProps = React.ComponentProps<
  typeof SelectPrimitive.Value
>;
export type SelectTriggerProps = React.ComponentProps<
  typeof SelectPrimitive.Trigger
> & {
  size?: 'sm' | 'default';
};
export type SelectContentProps = React.ComponentProps<
  typeof SelectPrimitive.Content
>;
export type SelectLabelProps = React.ComponentProps<
  typeof SelectPrimitive.Label
>;
export type SelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item>;

export type SelectSeparatorProps = React.ComponentProps<
  typeof SelectPrimitive.Separator
>;
export type SelectScrollUpButtonProps = React.ComponentProps<
  typeof SelectPrimitive.ScrollUpButton
>;
export type SelectScrollDownButtonProps = React.ComponentProps<
  typeof SelectPrimitive.ScrollDownButton
>;
