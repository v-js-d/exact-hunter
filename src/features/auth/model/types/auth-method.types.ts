export const AuthMethod = {
  PHONE: 'PHONE',
  EMAIL: 'EMAIL',
} as const;

export const authMethods = Object.values(AuthMethod);

export type AuthMethod = (typeof AuthMethod)[keyof typeof AuthMethod];
