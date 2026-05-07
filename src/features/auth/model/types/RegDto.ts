import { AuthMethod } from './auth-method.types';
import { UserAuthDto } from './UserAuthDto';

import { UserRole } from '@/entities/user';

export type RegisterRequest = {
  identifier: string;
  type: AuthMethod;
  password: string;
  role: UserRole;
};
export interface RegisterResponse {
  result: {
    user: UserAuthDto;
  };
}
