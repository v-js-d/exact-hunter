import { UserRole } from './user-role.types';

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export interface MeResponse {
  user: User;
}
