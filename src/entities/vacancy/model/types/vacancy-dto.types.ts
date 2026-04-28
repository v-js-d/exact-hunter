import { Vacancy } from './vacancy.types';

export interface VacanciesResponse {
  result: {
    page: number;
    totalPages: number;
    totalItems: number;
    items: Vacancy[];
  };
}

export interface VacancyResponse {
  result: Vacancy;
}
