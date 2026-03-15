import { MeResponse } from '../user.types';

import { query } from '@/shared/api/api';

export const getMe = query<null, MeResponse>();
