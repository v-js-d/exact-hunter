import { type User, type UserRole } from '@/entities/user';

export interface LoginRequestEmail {
  email: string;
  password: string;
  role: UserRole;
}
export interface LoginRequestPhone {
  countryCode: string;
  phone: string;
  password: string;
  role: UserRole;
}
export type LoginRequest = LoginRequestEmail | LoginRequestPhone;

export interface LoginResponse {
  accessToken: string;
  user: User;
}
