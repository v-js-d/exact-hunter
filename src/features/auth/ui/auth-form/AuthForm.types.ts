import { AuthMethod, AuthMode } from '../../model/types/auth.types';

import { UserRole } from '@/entities/user';

export interface AuthFormProps {
  method: AuthMethod;
  role: UserRole;
  mode: AuthMode;
}
