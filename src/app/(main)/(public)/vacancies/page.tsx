import { VacanciesListWithApply } from '@/widgets/vacancies-list';

import { VacancySearch } from '@/features/vacancy-search';

const VacanciesPage = () => (
  <div className='flex w-full flex-col gap-y-5'>
    <VacancySearch />
    <VacanciesListWithApply />
  </div>
);

export default VacanciesPage;
