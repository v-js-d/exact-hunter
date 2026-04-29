import { UserRole } from './user-role.types';

export interface User {
  id: string;
  email?: string;
  phone?: string;
  role: UserRole;
  companyId: string;
  // TODO: как появятся роли - добавить Enum
  hrRole: string;
}

export interface MeResponse {
  user: User;
}
