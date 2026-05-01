'use client';

import { MouseEvent } from 'react';

import { useApplyToVacancy } from '../model/hooks/useApplyToVacancy';

import { Button, type ButtonProps } from '@/shared/ui/button';

interface ApplyToVacancyButtonProps extends Omit<
  ButtonProps,
  'onClick' | 'disabled' | 'type'
> {
  vacancyId: string;
}

export const ApplyToVacancyButton = ({
  vacancyId,
  children = 'Откликнуться',
  ...buttonProps
}: ApplyToVacancyButtonProps) => {
  const { handleApply, isPending } = useApplyToVacancy({ vacancyId });

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleApply();
  };

  return (
    <Button
      type='button'
      onClick={onClick}
      disabled={isPending}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};
