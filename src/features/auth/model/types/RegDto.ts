import { User } from '@/entities/user';

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  accessToken: string;
  user: User;
}
