/**
 * Public API сегмента model слайса auth.
 * UI и внешние потребители импортируют только отсюда (не из schema/types/... напрямую).
 */
export { isAuthMode, isUserRole } from './guards';
export { useAttachAuthToken } from './hooks/useAttachAuthToken';
export { useLoginMutation } from './hooks/useLoginMutation';
export { useRegisterMutation } from './hooks/useRegisterMutation';
export {
  authSchema,
  type AuthShema,
  emailSchema,
  type EmailShema,
  phoneSchema,
  type PhoneShema,
} from './schema/AuthForm.shema';
export type {
  AuthErrorResponse,
  AuthMethod,
  AuthMode,
} from './types/auth.types';
