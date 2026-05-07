import z from 'zod';

import { countryInfo } from '../../model/data/country-codes';

export const phoneSchema = z.string().superRefine((val, ctx) => {
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
