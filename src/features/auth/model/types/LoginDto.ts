import { type User, type UserRole } from '@/entities/user';

export interface LoginEmailRequest {
  email: string;
  password: string;
  role: UserRole;
}
export interface LoginPhoneRequest {
  countryCode: string;
  phone: string;
  password: string;
  role: UserRole;
}
export type LoginRequest = LoginEmailRequest | LoginPhoneRequest;

export interface LoginResponse {
  user: User;
}
