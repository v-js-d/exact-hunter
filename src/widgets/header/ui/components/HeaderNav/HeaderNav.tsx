'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { headerNavLinks } from '../../../model/config/headerNavLinks';

const HeaderNav = () => {
  const pathname = usePathname();
  return (
    <nav className='flex items-center gap-2 text-sm'>
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
