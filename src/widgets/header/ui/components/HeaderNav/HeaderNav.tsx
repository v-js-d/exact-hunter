'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { headerNavLinks } from '../../../model/config/headerNavLinks';

const HeaderNav = () => {
  const pathname = usePathname();
  return (
    <nav className='flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2 md:flex-none md:overflow-visible [&::-webkit-scrollbar]:hidden'>
      {headerNavLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={pathname.startsWith(link.href) ? 'page' : undefined}
          className={'link-nav'}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export { HeaderNav };
