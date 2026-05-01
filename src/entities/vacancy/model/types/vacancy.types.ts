import type {
  VacancyEmploymentType,
  VacancyPosition,
  VacancyWorkType,
} from './vacancy-enum.types';

export interface Company {
  id: string;
  name: string;
  location: string;
  city: string;
  rating: number;
}
export interface Vacancy {
  id: string;
  companyId: string;
  company: Company;
  projectId: string | null;
  title: string;
  description: string;
  position: VacancyPosition;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  location: string;
  workType: VacancyWorkType;
  employmentType: VacancyEmploymentType;
  isActive: boolean;
  isPublic: boolean;
  expiresAt: string;
  viewsCount: number;
  repliesCount: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
