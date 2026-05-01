import { ReactNode } from 'react';

import { Header } from '@/widgets/header';

const PublicLayout = ({ children }: { children: ReactNode }) => (
  <div className='flex h-full min-h-0 w-full flex-col'>
    <Header />
    <div className='min-h-0 flex-1 overflow-y-auto'>
      <main className='mx-auto w-full max-w-[100rem] min-w-0 px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10'>
        {children}
      </main>
    </div>
  </div>
);

export default PublicLayout;
