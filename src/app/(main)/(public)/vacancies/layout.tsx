import type { ReactNode } from 'react';

import { Container } from '@/shared/ui/container';

type VacanciesLayoutProps = {
  children: ReactNode;
};

const VacanciesLayout = ({ children }: VacanciesLayoutProps) => (
  <section className='w-full py-2 md:py-4'>
    <Container>
      <div className='mx-auto w-full max-w-6xl'>{children}</div>
    </Container>
  </section>
);

export default VacanciesLayout;
