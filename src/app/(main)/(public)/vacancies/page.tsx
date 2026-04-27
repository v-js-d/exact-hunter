import { VacanciesList } from '@/features/vacancies-list';
import { VacancySearch } from '@/features/vacancy-search';

const VacanciesPage = () => (
  <section className='flex w-full flex-col gap-y-5'>
    <VacancySearch />
    <VacanciesList />
  </section>
);

export default VacanciesPage;
