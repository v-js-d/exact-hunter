import type { FieldErrors } from 'react-hook-form';

export const getFieldError = <T extends Record<string, unknown>>(
  errors: FieldErrors<T>,
  field: keyof T,
) => errors[field]?.message;
