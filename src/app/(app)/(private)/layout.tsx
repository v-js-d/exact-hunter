import { ReactNode } from 'react';

import RequireAuth from '../../providers/router/RequireAuth';

const PrivateLayout = ({ children }: { children: ReactNode }) => (
  <RequireAuth>{children}</RequireAuth>
);

export default PrivateLayout;
