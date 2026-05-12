import z from 'zod';

import { countryInfo } from '../../model/data/country-codes';

const validCodes = countryInfo.map((c) => c.code);

export const phoneCodeSchema = z.string().refine(
  (val) => {
    if (!val) return true;
    return validCodes.includes(val);
  },
  {
    message: 'Неверный код страны',
  },
);

export const phoneNumberSchema = z.string();

export const phoneSchema = z
  .string()
  .min(1, 'Введите номер телефона')
  .superRefine((val, ctx) => {
    const country = [...countryInfo]
      .sort((a, b) => b.code.length - a.code.length)
      .find((info) => val.startsWith(info.code));

    if (!country) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Неподдерживаемый код страны',
      });
      return;
    }

    const phoneWithoutCode = val.slice(country.code.length);

    const pureDigits = phoneWithoutCode.replace(/\D/g, '');

    if (pureDigits.length !== country.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Для страны ${country.country} номер должен содержать ${country.length} цифр после кода`,
      });
    }
  });
