import { Company } from './vacancy-company.types';

export interface Vacancy {
  id: string;
  companyId: string;
  company: Company;
  projectId: string | null;
  title: string;
  description: string;
  position: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  location: string;
  workType: string;
  employmentType: string;
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

export interface VacanciesResponse {
  result: {
    page: number;
    totalPages: number;
    totalItems: number;
    items: Vacancy[];
  };
}
