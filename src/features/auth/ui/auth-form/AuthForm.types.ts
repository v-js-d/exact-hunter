import { AuthMode } from '../../model/types/auth.types';
import { AuthMethod } from '../../model/types/auth-method.types';

import { UserRole } from '@/entities/user';

export interface AuthFormProps {
  method: AuthMethod;
  role: UserRole;
  mode: AuthMode;
}
