'use client';

import Image, { StaticImageData } from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import clsx from 'clsx';

import { UserRole } from '@/shared/api/contracts';
import grayArrow from '@/shared/assets/icons/gray-arrow.svg';
import { Input } from '@/shared/ui/input';

interface Props {
  role: UserRole;
  icon: StaticImageData;
  color?: 'blue' | 'orange';
  title: string;
  description: string;
}

const roleParam = 'role';

export function SelectionRoleCard(props: Props) {
  const { description, icon, role, title, color = 'blue' } = props;
  const formatRole = role.toLowerCase();
  const searchParams = useSearchParams();
  const selectedRole = searchParams.get(roleParam) ?? 'CANDIDATE';
  const router = useRouter();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(roleParam, value);
    router.push(`?${params.toString()}`);
  };

  return (
    <label
      htmlFor={`${formatRole}-card`}
      className={clsx(
        'grid cursor-pointer grid-cols-[auto_auto_1fr] items-center gap-x-2.5 rounded-4xl border-[3px] border-transparent p-5 shadow-[4px_4px_7px_7px_rgba(0,0,0,0.1)] duration-200',
        color === 'blue' && 'has-[input:checked]:border-blue-35',
        color === 'orange' && 'has-[input:checked]:border-orange-f5',
      )}
    >
      <div
        className={clsx(
          'w-fit rounded-[0.625rem] p-1.25',
          color === 'blue' && 'bg-blue-35',
          color === 'orange' && 'border-orange-f5 border',
        )}
      >
        <Image src={icon} alt={`${formatRole} icon`} width={36} height={36} />
      </div>
      <div className='space-y-0.75'>
        <h2 className='text-[1.125rem] font-medium'>{title}</h2>
        <p className='text-sm'>{description}</p>
      </div>
      <div className='justify-self-end'>
        <Image src={grayArrow} alt='arrow' width={36} height={36} />
      </div>
      <Input
        type='radio'
        id={`${formatRole}-card`}
        name='role'
        checked={selectedRole === role}
        onChange={(event) => handleChange(event.currentTarget.value)}
        className='visually-hidden'
        value={role}
      />
    </label>
  );
}
