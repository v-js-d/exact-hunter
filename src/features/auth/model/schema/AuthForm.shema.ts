import z from 'zod';

import { userRoles } from '@/entities/user';

const passwordRules = z
  .string()
  .min(8, { message: 'Пароль должен быть не менее 8 символов' })
  .regex(/[A-Z]/, {
    message: 'Пароль должен содержать хотя бы одну заглавную букву',
  })
  .regex(/[a-z]/, {
    message: 'Пароль должен содержать хотя бы одну строчную букву',
  })
  .regex(/[0-9]/, { message: 'Пароль должен содержать хотя бы одну цифру' })
  .regex(/[^A-Za-z0-9]/, {
    message: 'Пароль должен содержать хотя бы один спецсимвол',
  });

export const emailSchema = z.object({
  email: z.email('Неверный email'),
  password: passwordRules,
  role: z.enum(userRoles),
});

export const phoneSchema = z.object({
  countryCode: z.string(),
  phone: z.string().regex(/^\d{6,14}$/, { message: 'Неверный номер телефона' }),
  password: passwordRules,
  role: z.enum(userRoles),
});

export const authSchema = z.union([phoneSchema, emailSchema]);

export type PhoneShema = z.infer<typeof phoneSchema>;
export type EmailShema = z.infer<typeof emailSchema>;

export type AuthSchema = z.infer<typeof authSchema>;
