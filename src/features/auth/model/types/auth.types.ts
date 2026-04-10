export type AuthMethod = 'phone' | 'email';

export type AuthMode = 'login' | 'register';

export interface AuthErrorResponse {
  data: { message: string; type: AuthMethod };
  name: string;
  status: number;
  message: string;
  stack: string;
}
