import { BriefcaseBusiness, User } from 'lucide-react';

import { SelectionRoleButton } from './components/selection-button/SelectionRoleButton';
import { RoleFormProps } from './RoleForm.types';

export const RoleForm = ({ role, ref }: RoleFormProps) => (
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
