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
