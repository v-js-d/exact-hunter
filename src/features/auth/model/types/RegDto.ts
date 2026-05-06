import type { AuthRequest } from './auth.types';

import { type User } from '@/entities/user';

export type RegisterRequest = AuthRequest;

export interface RegisterResponse {
  result: {
    user: User;
  };
}
