import { RefObject } from 'react';

import { SelectionRoleCard } from './SelectionRoleCard';

import { UserRole } from '@/shared/api/contracts';
import candidateIcon from '@/shared/assets/icons/candidate.svg';
import recruiterIcon from '@/shared/assets/icons/recruiter.svg';

export function RoleSelections({
  role,
  ref,
}: {
  role: UserRole;
  ref: RefObject<HTMLFormElement | null>;
}) {
  return (
    <form ref={ref} className='space-y-5'>
      <SelectionRoleCard
        role='CANDIDATE'
        description='Ищу работу'
        icon={candidateIcon}
        title='Я соискатель'
        selectedRole={role}
        color='blue'
      />
      <SelectionRoleCard
        role='RECRUITER'
        description='Ищу сотрудников'
        icon={recruiterIcon}
        title='Я работодатель'
        selectedRole={role}
        color='orange'
      />
    </form>
  );
}
