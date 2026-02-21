export type AuthStatus = 'anonymous' | 'authenticated' | 'loading';

export interface AuthState {
  accessToken: string | undefined;
  status: AuthStatus;
}

export interface AuthActions {
  logout: () => void;
  setAccessToken: (token: string | undefined) => void;
  setStatus: (status: AuthStatus) => void;
}

export interface AuthStore extends AuthState {
  actions: AuthActions;
}
