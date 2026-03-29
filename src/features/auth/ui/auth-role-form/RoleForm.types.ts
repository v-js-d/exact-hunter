import { RefObject } from 'react';

import { UserRole } from '@/entities/user';

export interface RoleFormProps {
  role: UserRole;
  ref: RefObject<HTMLFormElement | null>;
}
