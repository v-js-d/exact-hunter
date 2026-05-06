import type { AuthRequest } from './auth.types';

import { type User } from '@/entities/user';

export type LoginRequest = AuthRequest;

export interface LoginResponse {
  result: {
    user: User;
  };
}
