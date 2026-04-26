import Link from 'next/link';
import { Bell } from 'lucide-react';

import { HeaderNav } from './components/HeaderNav/HeaderNav';

import { Button } from '@/shared/ui/button';

const Header = () => (
  <header className='bg-card text-card-foreground border-border left-0 flex h-15 items-center justify-between gap-10 border-b px-10 py-5 shadow-sm'>
    <div className='flex items-center gap-15'>
      <h3 className='typo-h3'>ExactHunter</h3>
      <HeaderNav />
    </div>

    <div className='flex items-center gap-10'>
      <Button size='icon' variant={'ghost'}>
        <Bell />
      </Button>
      <div className='flex items-center gap-2 text-sm'>
        <Link href='#' className='text-gray-500'>
          Sign in
        </Link>
        <Link href='#' className='text-gray-500'>
          Sign up
        </Link>
      </div>
    </div>
  </header>
);

export { Header };
