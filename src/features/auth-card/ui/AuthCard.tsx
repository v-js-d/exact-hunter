import { AuthPolicy } from './auth-components/AuthPolicy';
import { AuthSwitcher } from './auth-components/AuthSwitcher';
import { ButtonBack } from './auth-components/ButtonBack';

import { AuthMode, UserRole } from '@/shared/api/contracts';

const titles = {
  register: {
    CANDIDATE: 'Регистрируйся и ищи свою галлеру',
    RECRUITER: 'Здравствуйте, Кабан Кабаныч, нужны новые крестьяне?',
  },
  login: 'Входи и ищи свою галлеру',
};

export function AuthCard({ role, mode }: { role: UserRole; mode: AuthMode }) {
  return (
    <div className='sm:border-gray-6b mx-auto grid w-full max-w-125 gap-y-6.25 rounded-[1.875rem] px-12.5 py-5 sm:border'>
      <div className='relative flex justify-center'>
        <ButtonBack />
        <span className='bg-blue-35 w-fit rounded-xl px-2.5 py-2 text-2xl font-semibold text-white'>
          EH
        </span>
      </div>
      <h1 className='text-center text-2xl font-semibold'>
        {mode === 'register'
          ? role === 'CANDIDATE'
            ? titles.register.CANDIDATE
            : titles.register.RECRUITER
          : titles.login}
      </h1>
      <AuthSwitcher role={role} />
      <AuthPolicy />
    </div>
  );
}
