import {
  getVacancyEmploymentTypeLabel,
  getVacancyPositionLabel,
  getVacancyWorkTypeLabel,
} from '../model/constants/vacancy-labels';

type VacancyTagFields = {
  position: string;
  employmentType: string;
  workType: string;
};

export const getVacancyTagLabels = ({
  position,
  employmentType,
  workType,
}: VacancyTagFields): string[] => [
  getVacancyPositionLabel(position),
  getVacancyEmploymentTypeLabel(employmentType),
  getVacancyWorkTypeLabel(workType),
];
