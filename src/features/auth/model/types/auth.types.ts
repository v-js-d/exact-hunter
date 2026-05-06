import { UserRole } from '@/entities/user';

import { EnumIdentifierType } from '@/shared/types/identifier-enum.types';

export type AuthMethod = 'phone' | 'email';

export type AuthMode = 'login' | 'register';

export interface AuthRequest {
  identifier: string;
  type: EnumIdentifierType;
  password: string;
  role: UserRole;
}

export interface AuthErrorResponse {
  data: { message: string; type?: AuthMethod; code?: string };
  name: string;
  status: number;
  message: string;
  stack: string;
}
