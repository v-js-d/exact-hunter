export const ID_TEMPLATE = ':id';

export const AppRouter = {
  auth: '/auth',
  democracy: '/democracy',
  rules: '/rules',
  main: '/',
  vacancies: '/vacancies',
  vacancy: `/vacancies/${ID_TEMPLATE}`,
  applicantResponses: '/applicant/responses',
  applicantResumes: '/applicant/resumes',
} as const;
