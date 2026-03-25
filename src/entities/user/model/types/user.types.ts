import { UserRole } from './user-role.types';

export interface User {
  id: string;
  email: string;
  role: UserRole;
}

export interface MeResponse {
  user: User;
}
export interface UserState {
  user: User | undefined;
}

export interface UserActions {
  clearUser: () => void;
  setUser: (user: User) => void;
}

export interface UserStore extends UserState {
  actions: UserActions;
}
