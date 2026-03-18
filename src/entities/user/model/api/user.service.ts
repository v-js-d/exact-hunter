import { MeResponse } from '../types/user.types';

import { query } from '@/shared/api/api';

export const getMe = query<null, MeResponse>();
