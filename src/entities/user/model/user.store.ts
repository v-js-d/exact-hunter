import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { UserStore } from './user.types';

export const userStore = create<UserStore>()(
  immer((set) => ({
    user: undefined,

    actions: {
      clearUser: () =>
        set((state) => {
          state.user = undefined;
        }),

      setUser: (user) =>
        set((state) => {
          state.user = user;
        }),
    },
  })),
);
