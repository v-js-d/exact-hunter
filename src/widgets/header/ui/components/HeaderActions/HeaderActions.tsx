'use client';

import Link from 'next/link';
import { Bell, CircleUserRound } from 'lucide-react';

import {
  selectStatus,
  useAuthStore,
  useLogoutMutation,
} from '@/entities/session';
import { useAuthMeQuery } from '@/entities/user';

import { AppRouter } from '@/shared/config/AppRouter';
import { Button } from '@/shared/ui/button';

export const HeaderActions = () => {
  const status = useAuthStore(selectStatus);
  const isAuthenticated = status === 'authenticated';
  const { mutate: logout, isPending: isLoggingOut } = useLogoutMutation();
  const { data: me } = useAuthMeQuery({ enabled: isAuthenticated });

  return (
    <div className='flex items-center gap-5'>
      <Button size='icon' variant='ghost'>
        <Bell />
      </Button>
      {isAuthenticated ? (
        <div className='flex items-center gap-3 text-sm'>
          <div className='text-muted-foreground flex items-center gap-2'>
            <CircleUserRound className='size-5' aria-hidden />
            <span>{me?.user?.email || me?.user?.phone || ''}</span>
          </div>
          <Button
            className='link-nav'
            size='sm'
            variant='ghost'
            onClick={() => logout()}
            disabled={isLoggingOut}
          >
            Выйти
          </Button>
        </div>
      ) : (
        <div className='flex items-center gap-2 text-sm'>
          <Link href={AppRouter.auth} className='link-nav'>
            Войти
          </Link>
        </div>
      )}
    </div>
  );
};
