import { z } from 'zod/v3';

export const exampleSchema = z.object({
  useremail: z
    .string()
    .nonempty('Поле обязательно')
    .email('Введите корректный email'),
  password: z
    .string()
    .nonempty('Поле обязательно')
    .min(8, 'Пароль должен быть не меньше 8 символов')
    .regex(/[A-Z]/, 'Добавьте хотя бы одну заглавную букву')
    .regex(/[a-z]/, 'Добавьте хотя бы одну строчную букву')
    .regex(/[0-9]/, 'Добавьте хотя бы одну цифру')
    .regex(/[^A-Za-z0-9]/, 'Добавьте хотя бы один спецсимвол'),
});

export type ExampleFormTypes = z.infer<typeof exampleSchema>;
