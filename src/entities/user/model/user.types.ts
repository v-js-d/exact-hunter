export const UserRole = {
  CANDIDATE: 'CANDIDATE',
  RECRUITER: 'RECRUITER',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

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
