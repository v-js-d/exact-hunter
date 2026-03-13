import z from 'zod';

const userRoleEnum = z.enum(['CANDIDATE', 'RECRUITER']);

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

export type TPhoneShema = z.infer<typeof phoneSchema>;
export type TEmailShema = z.infer<typeof emailSchema>;

export type TAuthShema = z.infer<typeof authSchema>;
