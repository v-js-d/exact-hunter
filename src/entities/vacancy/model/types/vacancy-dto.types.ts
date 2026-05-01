import { Vacancy } from './vacancy.types';

import { RespWithPagination } from '@/shared/types/pagination.types';

export type VacanciesResponse = RespWithPagination<Vacancy>;

export interface VacancyResponse {
  result: Vacancy;
}
