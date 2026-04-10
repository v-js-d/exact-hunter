import { type User, type UserRole } from '@/entities/user';

export interface RegisterRequestEmail {
  email: string;
  password: string;
  role: UserRole;
}
export interface RegisterRequestPhone {
  countryCode: string;
  phone: string;
  password: string;
  role: UserRole;
}

export type RegisterRequest = RegisterRequestEmail | RegisterRequestPhone;

export interface RegisterResponse {
  accessToken: string;
  user: User;
}
