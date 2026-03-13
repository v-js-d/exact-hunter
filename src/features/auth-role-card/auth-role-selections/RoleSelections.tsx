import { RefObject } from 'react';
import { BriefcaseBusiness, User } from 'lucide-react';

import { SelectionRoleButton } from './SelectionRoleButton';

import { UserRole } from '@/shared/api/contracts';

export function RoleSelections({
  role,
  ref,
}: {
  role: UserRole;
  ref: RefObject<HTMLFormElement | null>;
}) {
  return (
    <form ref={ref} className='space-y-5'>
      <SelectionRoleButton
        role='CANDIDATE'
        description='Ищу работу'
        Icon={User}
        title='Я соискатель'
        selectedRole={role}
        color='blue'
      />
      <SelectionRoleButton
        role='RECRUITER'
        description='Ищу сотрудников'
        Icon={BriefcaseBusiness}
        title='Я работодатель'
        selectedRole={role}
        color='orange'
      />
    </form>
  );
}
