import { TextFallBack } from '@/shared/config/TextFallBack';

export const VacancyWorkType = {
  FULL_TIME: 'FULL_TIME',
  REMOTE: 'REMOTE',
  HYBRID: 'HYBRID',
  INTERNSHIP: 'INTERNSHIP',
} as const;

export const VacancyEmploymentType = {
  PERMANENT: 'PERMANENT',
  CONTRACT: 'CONTRACT',
  TEMPORARY: 'TEMPORARY',
  INTERNSHIP: 'INTERNSHIP',
} as const;

export const VacancyPosition = {
  INTERN: 'Intern',
  JUNIOR: 'Junior',
  MIDDLE: 'Middle',
  SENIOR: 'Senior',
} as const;

export type VacancyWorkType =
  (typeof VacancyWorkType)[keyof typeof VacancyWorkType];
export type VacancyEmploymentType =
  (typeof VacancyEmploymentType)[keyof typeof VacancyEmploymentType];
export type VacancyPosition =
  (typeof VacancyPosition)[keyof typeof VacancyPosition];

export const vacancyWorkTypeLabels = {
  [VacancyWorkType.FULL_TIME]: 'Полный день',
  [VacancyWorkType.REMOTE]: 'Удаленно',
  [VacancyWorkType.HYBRID]: 'Гибридный формат',
  [VacancyWorkType.INTERNSHIP]: 'Стажировка',
} as const satisfies Record<VacancyWorkType, string>;

export const vacancyEmploymentTypeLabels = {
  [VacancyEmploymentType.PERMANENT]: 'Постоянная занятость',
  [VacancyEmploymentType.CONTRACT]: 'Контракт',
  [VacancyEmploymentType.TEMPORARY]: 'Временная занятость',
  [VacancyEmploymentType.INTERNSHIP]: 'Стажировка',
} as const satisfies Record<VacancyEmploymentType, string>;

export const vacancyPositionLabels = {
  [VacancyPosition.INTERN]: 'Стажер',
  [VacancyPosition.JUNIOR]: 'Джуниор',
  [VacancyPosition.MIDDLE]: 'Мидл',
  [VacancyPosition.SENIOR]: 'Сеньор',
} as const satisfies Record<VacancyPosition, string>;

const getEnumLabel = (
  value: string,
  labels: Partial<Record<string, string>>,
): string => labels[value] ?? value ?? TextFallBack.common.notSpecified;

export const getVacancyWorkTypeLabel = (workType: string): string =>
  getEnumLabel(workType, vacancyWorkTypeLabels);

export const getVacancyEmploymentTypeLabel = (employmentType: string): string =>
  getEnumLabel(employmentType, vacancyEmploymentTypeLabels);

export const getVacancyPositionLabel = (position: string): string =>
  getEnumLabel(position, vacancyPositionLabels);
