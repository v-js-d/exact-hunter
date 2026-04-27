import { Suspense } from 'react';

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <main className='flex h-full flex-col items-center justify-center'>
    <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>
  </main>
);

export default AuthLayout;
