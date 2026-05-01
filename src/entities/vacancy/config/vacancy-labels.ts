import {
  VacancyEmploymentType,
  VacancyPosition,
  VacancyWorkType,
} from '../model/types/vacancy-enum.types';

export const vacancyWorkTypeLabels: Record<VacancyWorkType, string> = {
  [VacancyWorkType.FULL_TIME]: 'Полный день',
  [VacancyWorkType.REMOTE]: 'Удаленно',
  [VacancyWorkType.HYBRID]: 'Гибридный формат',
  [VacancyWorkType.INTERNSHIP]: 'Стажировка',
};

export const vacancyEmploymentTypeLabels: Record<
  VacancyEmploymentType,
  string
> = {
  [VacancyEmploymentType.PERMANENT]: 'Постоянная занятость',
  [VacancyEmploymentType.CONTRACT]: 'Контракт',
  [VacancyEmploymentType.TEMPORARY]: 'Временная занятость',
  [VacancyEmploymentType.INTERNSHIP]: 'Стажировка',
};

export const vacancyPositionLabels: Record<VacancyPosition, string> = {
  [VacancyPosition.INTERN]: 'Стажер',
  [VacancyPosition.JUNIOR]: 'Джуниор',
  [VacancyPosition.MIDDLE]: 'Мидл',
  [VacancyPosition.SENIOR]: 'Сеньор',
};
