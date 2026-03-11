import z from 'zod';

export const loginFormShema = z.object({
  email: z.email('Введите корректный email'),

  password: z
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .regex(/[A-Z]/, 'Должна быть хотя бы одна заглавная буква')
    .regex(/[a-z]/, 'Должна быть хотя бы одна строчная буква')
    .regex(/[0-9]/, 'Должна быть хотя бы одна цифра')
    .regex(/[_\W]/, 'Должен быть хотя бы один спецсимвол'),
});

export type TLoginFormShema = z.infer<typeof loginFormShema>;
