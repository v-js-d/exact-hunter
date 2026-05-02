'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { AuthPolicy } from './components/AuthPolicy/AuthPolicy';
import { AuthSwitcher } from './components/AuthSwitcher/AuthSwitcher';
import type { AuthCardProps } from './AuthCardProps';

import {
  AuthMode,
  useLoginMutation,
  useRegisterMutation,
} from '@/features/auth';

import { type UserRole } from '@/entities/user';

import { EHLogo } from '@/shared/assets/icons';
import { AppRouter } from '@/shared/config/AppRouter';
import { BackButton } from '@/shared/ui/back-button';

const commonEmployerTitle =
  'Здравствуйте, Кабан Кабаныч, нужны новые крестьяне?';

const titles = {
  register: {
    CANDIDATE: 'Регистрируйся и ищи свою галлеру',
    EMPLOYER: commonEmployerTitle,
  },
  login: {
    CANDIDATE: 'Входи и ищи свою галлеру',
    EMPLOYER: commonEmployerTitle,
  },
} as const satisfies Record<AuthMode, Record<UserRole, string>>;

export const AuthCard = ({ role, mode }: AuthCardProps) => {
  const router = useRouter();
  const { isPending: registrationPending } = useRegisterMutation();
  const { isPending: loginPending } = useLoginMutation();
  const isPending = registrationPending || loginPending;

  const title = titles[mode][role];

  return (
    <div className='sm:border-gray-6b relative mx-auto grid w-full max-w-125 gap-y-6.25 overflow-hidden rounded-[1.875rem] px-12.5 py-5 sm:border'>
      <div className='relative flex justify-center'>
        <BackButton
          className={'absolute top-0 left-0'}
          onBack={() => {
            router.back();
          }}
        />
        <Link
          href={AppRouter.main}
          className='flex shrink-0'
          aria-label='На главную ExactHunter'
        >
          <EHLogo className='size-14 sm:size-16' />
        </Link>
      </div>
      <h1 className='text-center text-2xl font-semibold'>{title}</h1>
      <AuthSwitcher isPending={isPending} mode={mode} role={role} />
      <AuthPolicy isPending={isPending} />
    </div>
  );
};
