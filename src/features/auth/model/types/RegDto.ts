import { AuthUser } from '@/entities/session';

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  accessToken: string;
  user: AuthUser;
}
