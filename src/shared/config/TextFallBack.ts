export const TextFallBack = {
  common: {
    notSpecified: 'Не указано',
    noData: 'Нет данных',
  },
  vacancy: {
    title: 'Вакансия без названия',
    salary: 'Зарплата не указана',
    location: 'Местоположение не указано',
    description: 'Описание не указано',
  },
  company: {
    name: 'Компания не указана',
    location: 'Локация компании не указана',
    rating: '—',
  },
  vacanciesList: {
    errorTitle: 'Не удалось загрузить вакансии',
    errorDescription: 'Произошла ошибка при загрузке данных',
    emptyState: 'Вакансии не найдены',
  },
} as const;
