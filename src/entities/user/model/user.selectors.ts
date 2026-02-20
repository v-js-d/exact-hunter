import { UserState } from './user.types';

export const selectUser = (state: UserState): UserState['user'] => state.user;
