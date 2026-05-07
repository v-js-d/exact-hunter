import { AuthMethod } from './auth-method.types';

import { UserRole } from '@/entities/user';

export type UserAuthDto = {
  id: string;
  role: UserRole;
  isActivated: boolean;
} & (
  | {
      identifierType: typeof AuthMethod.EMAIL;
      email: string;
    }
  | {
      identifierType: typeof AuthMethod.PHONE;
      phone: string;
    }
);
