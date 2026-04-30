import { ReactNode } from 'react';

import { Vacancy } from '../../model/types/vacancy.types';

export interface VacancyCardProps {
  vacancy: Vacancy;
  action?: ReactNode;
}
