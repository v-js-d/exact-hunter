import { type User, type UserRole } from '@/entities/user';

export interface RegisterEmailRequest {
  email: string;
  password: string;
  role: UserRole;
}
export interface RegisterPhoneRequest {
  countryCode: string;
  phone: string;
  password: string;
  role: UserRole;
}

export type RegisterRequest = RegisterEmailRequest | RegisterPhoneRequest;

export interface RegisterResponse {
  result: {
    user: User;
  };
}
