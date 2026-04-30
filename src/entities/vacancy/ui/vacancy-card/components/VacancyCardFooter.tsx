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
  <CardFooter className='bg-muted/30 mt-auto flex items-center justify-between gap-2 border-t pt-4'>
    <div className='relative z-10'>{action}</div>

    <div className='text-muted-foreground flex flex-col items-end gap-y-1 text-xs'>
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
