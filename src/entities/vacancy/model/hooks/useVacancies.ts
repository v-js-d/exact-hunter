'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { VacanciesResponse } from '../types/vacancy.types';

export const useVacancies = () =>
  useQuery<VacanciesResponse>({
    queryKey: ['vacancies'],
    queryFn: async () => {
      const resonse = await axios.get(`api/mock/vacancies`);
      return resonse.data;
    },
  });
