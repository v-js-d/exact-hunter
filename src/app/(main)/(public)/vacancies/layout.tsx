import type { ReactNode } from 'react';

import { Container } from '@/shared/ui/container';

type VacanciesLayoutProps = {
  children: ReactNode;
};

const VacanciesLayout = ({ children }: VacanciesLayoutProps) => (
  <section className='w-full rounded-2xl border border-zinc-200/60 bg-zinc-50/80 py-8 backdrop-blur-sm md:py-12 dark:border-zinc-800/80 dark:bg-zinc-950/80'>
    <Container>
      <div className='mx-auto w-full max-w-6xl'>{children}</div>
    </Container>
  </section>
);

export default VacanciesLayout;
