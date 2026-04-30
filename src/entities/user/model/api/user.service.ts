import { MeEnvelope } from '../types/user.types';

import { query } from '@/shared/api/api';

export const getMe = query<null, MeEnvelope>();
