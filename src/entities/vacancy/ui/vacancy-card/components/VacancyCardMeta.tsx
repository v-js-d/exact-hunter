import { MapPin, Star } from 'lucide-react';

import { CardContent } from '@/shared/ui/card';

interface VacancyCardMetaProps {
  companyRating: number | string;
  location: string;
}

export const VacancyCardMeta = ({
  companyRating,
  location,
}: VacancyCardMetaProps) => (
  <CardContent className='flex flex-col gap-y-3'>
    <div className='text-muted-foreground flex items-center gap-x-3 text-sm'>
      <p className='flex items-center gap-x-1 rounded-md bg-yellow-400/10 px-2 py-0.5 font-bold text-yellow-600'>
        <Star size={14} fill='currentColor' aria-label='Rating' />
        <span>{companyRating}</span>
      </p>
      <p className='flex items-center gap-x-1'>
        <MapPin size={16} />
        <span>{location}</span>
      </p>
    </div>
  </CardContent>
);
