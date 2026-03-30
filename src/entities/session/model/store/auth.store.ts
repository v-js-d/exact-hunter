import { AuthState, AuthStore } from '@session/model/types/AuthStore';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

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
