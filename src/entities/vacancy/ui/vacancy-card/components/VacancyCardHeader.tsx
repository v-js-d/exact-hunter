import { Briefcase } from 'lucide-react';

import { BadgeList } from '@/shared/ui/badge-list';
import { CardHeader, CardTitle } from '@/shared/ui/card';

interface VacancyCardHeaderProps {
  title: string;
  salary: string;
  companyName: string;
  tags: string[];
}

export const VacancyCardHeader = ({
  title,
  salary,
  companyName,
  tags,
}: VacancyCardHeaderProps) => (
  <CardHeader className='flex flex-col gap-y-3 pb-2'>
    <div className='space-y-1'>
      <CardTitle className='text-foreground group-hover:text-primary text-2xl font-bold tracking-tight transition-colors'>
        {title}
      </CardTitle>
      <p className='text-xl leading-tight font-semibold tracking-tight'>
        {salary}
      </p>
      <p className='text-muted-foreground flex items-center gap-x-1.5 text-base font-medium'>
        <Briefcase size={16} />
        {companyName}
      </p>
    </div>
    <BadgeList variant='default' size='md' data={tags} />
  </CardHeader>
);
