import { AuthMode } from '@/features/auth';

import { type UserRole } from '@/entities/user';

export interface AuthCardProps {
  role: UserRole;
  mode: AuthMode;
}
