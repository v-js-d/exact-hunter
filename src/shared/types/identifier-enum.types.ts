export const EnumIdentifierType = {
  PHONE: 'PHONE',
  EMAIL: 'EMAIL',
} as const;

export type EnumIdentifierType =
  (typeof EnumIdentifierType)[keyof typeof EnumIdentifierType];
