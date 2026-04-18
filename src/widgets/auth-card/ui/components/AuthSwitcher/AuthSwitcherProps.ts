import { AuthMode } from '@/features/auth';

import { UserRole } from '@/entities/user';

export interface AuthSwitcherProps {
  role: UserRole;
  mode: AuthMode;
  isPending: boolean;
}
