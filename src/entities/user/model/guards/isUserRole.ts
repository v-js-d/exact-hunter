import {
  UserRole,
  type UserRole as UserRoleType,
} from '../types/user-role.types';

const ALLOWED = {
  [UserRole.CANDIDATE]: true,
  [UserRole.EMPLOYER]: true,
  [UserRole.ADMIN]: true,
} as const satisfies Record<UserRoleType, true>;

export function isUserRole(value: unknown): value is UserRoleType {
  return typeof value === 'string' && value in ALLOWED;
}
