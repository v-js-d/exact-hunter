//FIXME: need to fix fsd/forbidden-imports entity from entity
import { MeResponse } from '../types/user.types';

import { query } from '@/shared/api/api';

export const getMe = query<null, MeResponse>();
