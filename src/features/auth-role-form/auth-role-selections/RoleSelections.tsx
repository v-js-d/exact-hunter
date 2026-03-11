import { SelectionRoleCard } from './SelectionRoleCard';

import candidateIcon from '@/shared/assets/icons/candidate.svg';
import recruiterIcon from '@/shared/assets/icons/recruiter.svg';

export function RoleSelections() {
  return (
    <fieldset className='space-y-5'>
      <SelectionRoleCard
        role='CANDIDATE'
        description='Ищу работу'
        icon={candidateIcon}
        title='Я соискатель'
        color='blue'
      />
      <SelectionRoleCard
        role='RECRUITER'
        description='Ищу сотрудников'
        icon={recruiterIcon}
        title='Я работодатель'
        color='orange'
      />
    </fieldset>
  );
}
