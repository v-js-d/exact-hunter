import { UserRole } from '@/shared/api/contracts';

export interface User {
  email: string;
  id: string;
  role: UserRole;
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
