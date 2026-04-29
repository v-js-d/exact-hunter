import Link from 'next/link';
import { Bell } from 'lucide-react';

import { HeaderNav } from './components/HeaderNav/HeaderNav';

import { AppRouter } from '@/shared/config/AppRouter';
import { Button } from '@/shared/ui/button';

const Header = () => (
  <header className='bg-card text-card-foreground border-border relative z-10 flex h-15 shrink-0 items-center justify-between gap-10 border-b px-10 py-5 shadow-sm'>
    <div className='flex items-center gap-15'>
      <Link href={AppRouter.main} className='typo-h3'>
        ExactHunter
      </Link>
      <HeaderNav />
    </div>

    <div className='flex items-center gap-5'>
      <Button size='icon' variant={'ghost'}>
        <Bell />
      </Button>
      <div className='flex items-center gap-2 text-sm'>
        <Link href={AppRouter.auth} className='link-nav'>
          Войти
        </Link>
      </div>
    </div>
  </header>
);

export { Header };
