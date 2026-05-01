import { ReactNode } from 'react';
import { Eye } from 'lucide-react';

import { CardFooter } from '@/shared/ui/card';

interface VacancyCardFooterProps {
  viewsCount: number;
  repliesCount: number;
  action?: ReactNode;
}

export const VacancyCardFooter = ({
  viewsCount,
  repliesCount,
  action,
}: VacancyCardFooterProps) => (
  <CardFooter className='bg-muted/30 mt-auto flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-2'>
    <div className='relative z-10 w-full sm:w-auto'>{action}</div>

    <div className='text-muted-foreground flex flex-col gap-y-1 text-xs sm:items-end'>
      <span className='flex items-center gap-x-1'>
        <Eye size={14} />
        {viewsCount} просмотров
      </span>
      {repliesCount > 0 && (
        <span className='text-primary font-medium'>
          {repliesCount} откликов
        </span>
      )}
    </div>
  </CardFooter>
);
