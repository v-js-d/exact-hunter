import { useRouter } from 'next/navigation';

import { AuthPolicy } from './components/AuthPolicy/AuthPolicy';
import { AuthSwitcher } from './components/AuthSwitcher/AuthSwitcher';
import type { AuthCardProps } from './AuthCardProps';

import { AuthMode } from '@/features/auth';

import { type UserRole } from '@/entities/user';

import { BackButton } from '@/shared/ui/back-button';

const commonRecruiterTitle =
  'Здравствуйте, Кабан Кабаныч, нужны новые крестьяне?';

const titles = {
  register: {
    CANDIDATE: 'Регистрируйся и ищи свою галлеру',
    RECRUITER: commonRecruiterTitle,
  },
  login: {
    CANDIDATE: 'Входи и ищи свою галлеру',
    RECRUITER: commonRecruiterTitle,
  },
} as const satisfies Record<AuthMode, Record<UserRole, string>>;

export const AuthCard = ({ role, mode }: AuthCardProps) => {
  const router = useRouter();

  const title = titles[mode][role];

  return (
    <div className='sm:border-gray-6b mx-auto grid w-full max-w-125 gap-y-6.25 rounded-[1.875rem] px-12.5 py-5 sm:border'>
      <div className='relative flex justify-center'>
        <BackButton
          className={'absolute top-0 left-0'}
          onBack={() => {
            router.back();
          }}
        />
        <span className='bg-blue-35 w-fit rounded-xl px-2.5 py-2 text-2xl font-semibold text-white'>
          EH
        </span>
      </div>
      <h1 className='text-center text-2xl font-semibold'>{title}</h1>
      <AuthSwitcher role={role} />
      <AuthPolicy />
    </div>
  );
};
