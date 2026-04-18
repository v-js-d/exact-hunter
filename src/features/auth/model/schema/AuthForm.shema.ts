import z from 'zod';

import { userRoles } from '@/entities/user';

import { passwordSchema } from '@/shared/lib/schemas/password.schema';

export const emailSchema = z.object({
  email: z.email('Неверный email'),
  password: passwordSchema,
  role: z.enum(userRoles),
});

export const phoneSchema = z.object({
  countryCode: z.string(),
  phone: z.string().regex(/^\d{6,14}$/, { message: 'Неверный номер телефона' }),
  password: passwordSchema,
  role: z.enum(userRoles),
});

export const authSchema = z.union([phoneSchema, emailSchema]);

export type PhoneFormTypes = z.infer<typeof phoneSchema>;
export type EmailFormTypes = z.infer<typeof emailSchema>;

export type AuthFormTypes = z.infer<typeof authSchema>;
