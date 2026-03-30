//FIXME: need to fix fsd/forbidden-imports entity from entity
import { UserState } from './types/user.types';

export const selectUser = (state: UserState): UserState['user'] => state.user;
