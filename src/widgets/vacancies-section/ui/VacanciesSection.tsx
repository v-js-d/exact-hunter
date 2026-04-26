import { VacanciesList } from '@/features/vacancies-list';
import { VacancySearch } from '@/features/vacancy-search';

export const VacanciesSection = () => (
  <section className='flex flex-col gap-y-5'>
    <VacancySearch />
    <VacanciesList />
  </section>
);
