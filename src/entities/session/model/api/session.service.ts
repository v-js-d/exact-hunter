import { MeResponse } from '../types/MeResp';
import { RefreshResponse } from '../types/RefreshResp';

import { mutation, query } from '@/shared/api/api';

export const getMe = query<null, MeResponse>();

export const logoutFn = mutation<null, { message?: string }>();

export const refreshAuthTokenFn = mutation<null, RefreshResponse>();
