import z from 'zod';

import { userRoleEnum } from '@/entities/user';

export const emailSchema = z.object({
  email: z.email('Неверный email'),
  role: userRoleEnum,
});

export const phoneSchema = z.object({
  countryCode: z.string(),
  phone: z.string().regex(/^\d{6,14}$/, { message: 'Неверный номер телефона' }),
  role: userRoleEnum,
});

export const authSchema = z.union([phoneSchema, emailSchema]);

export type PhoneShema = z.infer<typeof phoneSchema>;
export type EmailShema = z.infer<typeof emailSchema>;

export type AuthShema = z.infer<typeof authSchema>;
