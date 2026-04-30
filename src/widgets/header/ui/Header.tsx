'use client';

import Link from 'next/link';

import { HeaderActions } from './components/HeaderActions/HeaderActions';
import { HeaderNav } from './components/HeaderNav/HeaderNav';

import { AppRouter } from '@/shared/config/AppRouter';
import { cn } from '@/shared/lib';

const Header = () => {
  const headerClassName = cn(
    'bg-card text-card-foreground border-border',
    'relative z-10 flex h-15 shrink-0 items-center justify-between gap-10',
    'border-b px-10 py-5 shadow-sm',
  );

  return (
    <header className={headerClassName}>
      <div className='flex items-center gap-15'>
        <Link href={AppRouter.main} className='typo-h3'>
          ExactHunter
        </Link>
        <HeaderNav />
      </div>

      <HeaderActions />
    </header>
  );
};

export { Header };
