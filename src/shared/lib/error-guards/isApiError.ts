import { ApiError } from '../../api/api-error';

export function isApiError(err: unknown): err is ApiError {
  return err instanceof ApiError;
}
