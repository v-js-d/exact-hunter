import { RefreshResponse } from '@session/model/types/RefreshResp';

import { mutation } from '@/shared/api/api';

export const logoutFn = mutation<null, { message?: string }>();

export const refreshAuthTokenFn = mutation<null, RefreshResponse>();
