import type { AuthMethod } from '@auth/model';

import { UserRole } from '@/entities/user';

export interface AuthFormProps {
  method: AuthMethod;
  role: UserRole;
}
