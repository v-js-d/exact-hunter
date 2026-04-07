import { type User, type UserRole } from '@/entities/user';

export interface RegisterRequest {
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterResponse {
  accessToken: string;
  user: User;
}
