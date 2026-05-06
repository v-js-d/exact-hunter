import { UserRole } from './user-role.types';

import type { EnumIdentifierType } from '@/shared/types/identifier-enum.types';

export interface User {
  id: string;
  email?: string;
  phone?: string;
  identifierType?: EnumIdentifierType;
  isActivated?: boolean;
  role: UserRole;
  companyId: string;
}

export interface MeResponse {
  user: User;
}

export interface MeEnvelope {
  result: MeResponse;
}
