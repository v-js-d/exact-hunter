import { ReactNode } from 'react';

import RequireRole from '../../../providers/router/RequireRole';

import { UserRole } from '@/entities/user';

const ApplicantLayout = ({ children }: { children: ReactNode }) => (
  <RequireRole roles={[UserRole.CANDIDATE]}>{children}</RequireRole>
);

export default ApplicantLayout;
