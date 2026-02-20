import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { AuthState, AuthStore } from './auth.types';

import { userStore } from '@/entities/user';

export const authStore = create<AuthStore>()(
  immer((set) => ({
    accessToken: undefined,
    status: 'anonymous',

    actions: {
      logout: () => {
        set((state) => {
          state.status = 'anonymous';
          state.accessToken = undefined;
        });

        userStore.getState().actions.clearUser();
      },

      setAccessToken: (accessToken: AuthState['accessToken']) =>
        set((state) => {
          state.accessToken = accessToken;
        }),

      setStatus: (status: AuthState['status']) =>
        set((state) => {
          state.status = status;
        }),
    },
  })),
);
