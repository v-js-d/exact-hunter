import Link from 'next/link';
import clsx from 'clsx';

import { AppRouter } from '@/shared/config/AppRouter';

export const AuthPolicy = ({ isPending }: { isPending: boolean }) => (
  <p
    className={clsx(
      '*:[a]:text-blue-35 text-center text-sm',
      isPending && '*:[a]:pointer-events-none *:[a]:opacity-50',
    )}
  >
    Продолжая, вы клянётесь{' '}
    <Link href={AppRouter.democracy}>защищать демократию</Link> и{' '}
    <Link href={AppRouter.rules}>правила сервиса</Link>
  </p>
);
