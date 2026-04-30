import { VacanciesListWithApply } from '@/widgets/vacancies-list';

import { VacancySearch } from '@/features/vacancy-search';

const VacanciesPage = () => (
  <section className='flex w-full flex-col gap-y-5'>
    <VacancySearch />
    <VacanciesListWithApply />
  </section>
);

export default VacanciesPage;
