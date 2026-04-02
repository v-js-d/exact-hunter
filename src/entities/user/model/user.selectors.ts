import { UserState } from './types/user.types';

export const selectUser = (state: UserState): UserState['user'] => state.user;
