import { UserRole } from '@/entities/user';

const ROLES = {
  CANDIDATE: true,
  RECRUITER: true,
} satisfies Record<UserRole, true>;

export function isUserRole(role: string | null): role is UserRole {
  return role ? role in ROLES : false;
}
