export type AuthMethod = 'phone' | 'email';

export type AuthMode = 'login' | 'register';

export interface AuthErrorResponse {
  message: string;
}
