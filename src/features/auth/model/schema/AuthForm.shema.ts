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

export type PhoneTypes = z.infer<typeof phoneSchema>;
export type EmailTypes = z.infer<typeof emailSchema>;

export type AuthTypes = z.infer<typeof authSchema>;
