'use client';

import clsx from 'clsx';
import { ChevronRight, LucideIcon } from 'lucide-react';

import { UserRole } from '@/entities/user';

import { Input } from '@/shared/ui';

interface Props {
  role: UserRole;
  Icon: LucideIcon;
  color?: 'blue' | 'orange';
  title: string;
  description: string;
  selectedRole: UserRole;
}

export function SelectionRoleButton(props: Props) {
  const {
    description,
    Icon,
    role,
    title,
    color = 'blue',
    selectedRole,
  } = props;
  const formatRole = role.toLowerCase();

  return (
    <label
      htmlFor={`${formatRole}-card`}
      className={clsx(
        'relative grid cursor-pointer grid-cols-[auto_auto_1fr] items-center gap-x-2.5 rounded-4xl border-[3px] border-transparent p-5 shadow-[4px_4px_7px_7px_rgba(0,0,0,0.1)] duration-200',
        color === 'blue' && 'has-[input:checked]:border-blue-35',
        color === 'orange' && 'has-[input:checked]:border-orange-f5',
      )}
    >
      <div
        className={clsx(
          'w-fit rounded-[0.625rem] p-1.25',
          color === 'blue' && 'bg-blue-35 text-white',
          color === 'orange' && 'border-orange-f5 text-orange-f5 border',
        )}
      >
        <Icon size={36} />
      </div>
      <div className='space-y-0.75'>
        <h2 className='text-[1.125rem] font-medium'>{title}</h2>
        <p className='text-sm'>{description}</p>
      </div>
      <ChevronRight
        className='text-gray-6b justify-self-end'
        aria-hidden={true}
        size={26}
      />
      <Input
        type='radio'
        id={`${formatRole}-card`}
        name='role'
        defaultChecked={selectedRole === role}
        className='sr-only'
        value={role}
      />
    </label>
  );
}
