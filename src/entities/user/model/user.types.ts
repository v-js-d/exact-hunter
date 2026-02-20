export interface User {
  email: string;
  id: string;
  role: string;
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
