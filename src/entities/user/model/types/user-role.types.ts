export const UserRole = {
  CANDIDATE: 'CANDIDATE',
  RECRUITER: 'RECRUITER',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
