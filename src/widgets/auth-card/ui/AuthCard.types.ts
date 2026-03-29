import { AuthMode } from '@/features/auth';

import { UserRole } from '@/entities/user';

export interface AuthCardProps {
  role: UserRole;
  mode: AuthMode;
}
