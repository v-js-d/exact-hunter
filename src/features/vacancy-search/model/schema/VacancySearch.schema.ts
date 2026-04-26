import z from 'zod';

export const vacancySearchSchema = z.object({
  title: z.string(),
});

export type VacancySearchTypes = z.infer<typeof vacancySearchSchema>;
