import { LucideIcon } from 'lucide-react';

import { UserRole } from '@/entities/user';

export interface SelectionRoleButtonProps {
  role: UserRole;
  Icon: LucideIcon;
  color?: 'blue' | 'orange';
  title: string;
  description: string;
  selectedRole: UserRole;
}
