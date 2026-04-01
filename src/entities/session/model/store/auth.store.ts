import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { AuthState, AuthStore } from '../types/AuthStore';

export const useAuthStore = create<AuthStore>()(
  immer((set) => ({
    accessToken: undefined,
    status: 'anonymous',

    actions: {
      logout: () => {
        set((state) => {
          state.status = 'anonymous';
          state.accessToken = undefined;
        });
      },

      setAccessToken: (accessToken: AuthState['accessToken']) => {
        set((state) => {
          state.accessToken = accessToken;
        });
      },

      setStatus: (status: AuthState['status']) =>
        set((state) => {
          state.status = status;
        }),
    },
  })),
);
