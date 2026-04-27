import { ReactNode } from 'react';

import { Header } from '@/widgets/header';

const PublicLayout = ({ children }: { children: ReactNode }) => (
  <div className='flex h-full w-full flex-col'>
    <Header />
    <main className='mx-auto flex h-full w-full max-w-400 flex-1 px-10 py-10'>
      {children}
    </main>
  </div>
);

export default PublicLayout;
