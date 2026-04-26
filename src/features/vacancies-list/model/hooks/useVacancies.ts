'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { Vacancy } from '@/entities/vacancy';

interface VacanciesResponse {
  result: {
    page: number;
    totalPages: number;
    totalItems: number;
    items: Vacancy[];
  };
}

export const useVacancies = () =>
  useQuery<VacanciesResponse>({
    queryKey: ['vacancies'],
    queryFn: async () => {
      const resonse = await axios.get(`api/mock/vacancies`);

      return resonse.data;
    },
  });
