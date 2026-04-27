'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { VacanciesResponse } from '../types/vacancy-dto.types';

const VACANCIES_PAGE_SIZE = 10;

export const useVacancies = () =>
  useInfiniteQuery<VacanciesResponse>({
    queryKey: ['vacancies'],

    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get(`api/mock/vacancies`, {
        params: {
          page: pageParam,
          limit: VACANCIES_PAGE_SIZE,
        },
      });
      return response.data;
    },

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      const totalPages = lastPage.result.totalPages;

      if (nextPage > totalPages) return undefined;
      return nextPage;
    },

    initialPageParam: 1,
  });
