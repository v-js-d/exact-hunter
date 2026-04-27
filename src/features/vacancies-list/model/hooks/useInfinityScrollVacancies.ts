'use client';

import { useEffect, useMemo, useRef } from 'react';

import { useVacancies } from '@/entities/vacancy';

export const useInfinityScrollVacancies = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, ...queries } =
    useVacancies();

  const isProcessing = useRef(false);

  useEffect(() => {
    const scrollHandler = () => {
      if (isProcessing.current) return;

      isProcessing.current = true;

      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const viewHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;
        const PREFETCH_HEIGHT = 200;

        const isNearEnd = scrolled + viewHeight >= fullHeight - PREFETCH_HEIGHT;

        if (isNearEnd && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }

        isProcessing.current = false;
      });
    };

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allVacancies = useMemo(
    () => data?.pages.flatMap((page) => page.result.items) ?? [],
    [data],
  );

  return {
    allVacancies,
    isFetchingNextPage,
    hasNextPage,
    ...queries,
  };
};
