import z from 'zod';

import { AuthMethod } from '../types/auth-method.types';

import { userRoles } from '@/entities/user';

import { passwordSchema } from '@/shared/lib/schemas/password.schema';
import {
  phoneCodeSchema,
  phoneNumberSchema,
  phoneSchema,
} from '@/shared/lib/schemas/phone.schema';

const authRolesEnum = z.enum(userRoles);

export const authSchema = z.discriminatedUnion('type', [
  z
    .object({
      type: z.literal(AuthMethod['PHONE']),
      phoneCode: phoneCodeSchema,
      phoneNumber: phoneNumberSchema,
      password: passwordSchema,
      identifier: z.string(),
      role: authRolesEnum,
    })
    .superRefine((data, ctx) => {
      const fullNumber = data.phoneCode + data.phoneNumber;
      const phoneValidate = phoneSchema.safeParse(fullNumber);

      if (!phoneValidate.success) {
        phoneValidate.error.issues.forEach((err) => {
          ctx.addIssue({
            ...err,
            path: ['identifier'],
          });
        });
      }
    })
    .transform((data) => ({
      ...data,
      identifier: data.phoneCode + data.phoneNumber,
    })),

  z.object({
    type: z.literal(AuthMethod['EMAIL']),
    identifier: z.email('Неверный формат почты'),
    password: passwordSchema,
    role: authRolesEnum,
  }),
]);

export type AuthFormInputTypes = z.input<typeof authSchema>;
export type AuthFormOutputTypes = z.output<typeof authSchema>;
