'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Vacancy } from '../types/vacancy.types';
import { VacancyResponse } from '../types/vacancy-dto.types';

export const useVacancy = (id: string) =>
  useQuery<VacancyResponse, Error, Vacancy>({
    queryKey: ['vacancy', id],
    queryFn: async () => {
      const response = await axios.get<VacancyResponse>(
        `/api/mock/vacancies/${id}`,
      );

      return response.data;
    },
    select: (response) => response.result,
    enabled: Boolean(id),
  });
