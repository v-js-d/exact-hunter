import { type User, type UserRole } from '@/entities/user';

export interface LoginRequest {
  email: string;
  password: string;
  role?: UserRole;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}
