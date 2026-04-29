import { Suspense } from 'react';

import { Spinner } from '@/shared/ui/spinner';

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <main className='flex h-full flex-col items-center justify-center'>
    <Suspense
      fallback={
        <div className='flex items-center justify-center'>
          <Spinner className='size-6' />
        </div>
      }
    >
      {children}
    </Suspense>
  </main>
);

export default AuthLayout;
