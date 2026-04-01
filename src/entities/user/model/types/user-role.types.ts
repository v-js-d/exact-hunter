export const UserRole = {
  CANDIDATE: 'CANDIDATE',
  RECRUITER: 'RECRUITER',
} as const;

export const userRoles = Object.values(UserRole);

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
