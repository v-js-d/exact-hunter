import z from 'zod';

import { AuthMethod } from '../types/auth-method.types';

import { userRoles } from '@/entities/user';

import { passwordSchema } from '@/shared/lib/schemas/password.schema';
import { phoneSchema } from '@/shared/lib/schemas/phone.schema';

const authRolesEnum = z.enum(userRoles);

export const authSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(AuthMethod['PHONE']),
    identifier: phoneSchema,
    password: passwordSchema,
    role: authRolesEnum,
  }),

  z.object({
    type: z.literal(AuthMethod['EMAIL']),
    identifier: z.email('Неверный формат почты'),
    password: passwordSchema,
    role: authRolesEnum,
  }),
]);

export type AuthFormTypes = z.infer<typeof authSchema>;
