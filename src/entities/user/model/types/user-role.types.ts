export const UserRole = {
  CANDIDATE: 'CANDIDATE',
  EMPLOYER: 'EMPLOYER',
} as const;

export const userRoles = Object.values(UserRole);

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
