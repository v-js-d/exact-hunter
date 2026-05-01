'use client';

import { VacanciesList } from '@/features/vacancies-list';
import { ApplyToVacancyButton } from '@/features/vacancy-apply';

export const VacanciesListWithApply = () => (
  <VacanciesList
    renderAction={(vacancyId) => (
      <ApplyToVacancyButton
        vacancyId={vacancyId}
        size='lg'
        className='z-20 w-full leading-[120%] font-semibold transition-transform sm:w-fit'
      />
    )}
  />
);
