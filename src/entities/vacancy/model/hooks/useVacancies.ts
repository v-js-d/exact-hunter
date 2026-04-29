'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { VacanciesResponse } from '../types/vacancy-dto.types';

import { query } from '@/shared/api/api';

const VACANCIES_PAGE_SIZE = 20;

export const useVacancies = () =>
  useInfiniteQuery<VacanciesResponse>({
    queryKey: ['vacancies'],

    queryFn: async ({ pageParam = 1 }) => {
      const queryActions = query<unknown, VacanciesResponse>(null, {
        params: { page: pageParam, limit: VACANCIES_PAGE_SIZE },
      });

      const response = await queryActions('/mock/vacancies');
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
