import { ApiError } from '../../../api/api-error';

import { isApiError } from './isApiError';

export function isUnauthorized(err: unknown): err is ApiError {
  return isApiError(err) && err.status === 401;
}
