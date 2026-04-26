import { HTMLAttributes } from 'react';

export interface VacancyTagsProps extends HTMLAttributes<HTMLUListElement> {
  tags: string[];
}
