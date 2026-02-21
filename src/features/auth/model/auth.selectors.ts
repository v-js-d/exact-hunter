import { AuthState } from './auth.types';

export const selectStatus = (state: AuthState): AuthState['status'] =>
  state.status;

export const selectAccessToken = (state: AuthState): AuthState['accessToken'] =>
  state.accessToken;

export const selectIsAuthenticated = (state: AuthState): boolean =>
  state.status === 'authenticated';
