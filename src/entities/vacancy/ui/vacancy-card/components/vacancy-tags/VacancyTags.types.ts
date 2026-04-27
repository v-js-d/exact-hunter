import { HTMLAttributes } from 'react';

export interface VacancyTagsProps extends HTMLAttributes<HTMLUListElement> {
  vacancyCardId: string;
  tags: string[];
}
