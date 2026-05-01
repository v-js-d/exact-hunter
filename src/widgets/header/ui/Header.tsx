'use client';

import Link from 'next/link';

import { HeaderActions } from './components/HeaderActions/HeaderActions';
import { HeaderNav } from './components/HeaderNav/HeaderNav';

import { AppRouter } from '@/shared/config/AppRouter';
import { cn } from '@/shared/lib';

const Header = () => {
  const headerClassName = cn(
    'bg-card text-card-foreground border-border',
    'relative z-10 flex min-h-15 shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-3',
    'border-b px-4 py-4 shadow-sm sm:px-6 md:px-10 md:py-5',
  );

  return (
    <header className={headerClassName}>
      <div className='flex min-w-0 flex-1 items-center gap-3 sm:gap-6 md:gap-15'>
        <Link href={AppRouter.main} className='typo-h3 shrink-0'>
          ExactHunter
        </Link>
        <HeaderNav />
      </div>

      <HeaderActions />
    </header>
  );
};

export { Header };
