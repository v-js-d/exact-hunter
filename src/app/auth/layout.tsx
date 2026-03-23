import { Suspense } from 'react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex h-full flex-col items-center justify-center'>
      <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>
    </main>
  );
}
