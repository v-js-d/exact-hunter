'use client';

import { useQuery } from '@tanstack/react-query';

import { Vacancy } from '../types/vacancy.types';
import { VacancyResponse } from '../types/vacancy-dto.types';

import { query } from '@/shared/api/api';

export const useVacancy = (id: string) =>
  useQuery<VacancyResponse, Error, Vacancy>({
    queryKey: ['vacancy', id],
    queryFn: async () => {
      const getVacancy = query<unknown, VacancyResponse>(null);
      const response = await getVacancy(`/mock/vacancies/${id}`);
      return response.data;
    },
    select: (response) => response.result,
    enabled: Boolean(id),
  });
