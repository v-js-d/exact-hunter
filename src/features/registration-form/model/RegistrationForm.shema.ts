import z from 'zod';

export const registrationFormShema = z.object({
  email: z.email('Введите корректный email'),

  password: z
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .regex(/[A-Z]/, 'Должна быть хотя бы одна заглавная буква')
    .regex(/[a-z]/, 'Должна быть хотя бы одна строчная буква')
    .regex(/[0-9]/, 'Должна быть хотя бы одна цифра')
    .regex(/[_\W]/, 'Должен быть хотя бы один спецсимвол'),

  role: z.enum(['CANDIDATE', 'RECRUITER']),
});

export type TRegistrationFormShema = z.infer<typeof registrationFormShema>;
