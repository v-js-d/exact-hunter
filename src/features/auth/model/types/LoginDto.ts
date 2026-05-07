import { AuthMethod } from './auth-method.types';
import { UserAuthDto } from './UserAuthDto';

import { type UserRole } from '@/entities/user';

export type LoginRequest = {
  identifier: string;
  type: AuthMethod;
  password: string;
  role: UserRole;
};

export interface LoginResponse {
  result: {
    user: UserAuthDto;
  };
}
