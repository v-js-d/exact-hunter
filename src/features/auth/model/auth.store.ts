import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { AuthState, AuthStore } from './auth.types';

import { userStore } from '@/entities/user';

import {
  setAccessToken as setSessionToken,
  setOnSessionExpired,
  setOnTokenRefreshed,
} from '@/shared/api/session';

const authStore = create<AuthStore>()(
  immer((set) => ({
    accessToken: undefined,
    status: 'anonymous',

    actions: {
      logout: () => {
        set((state) => {
          state.status = 'anonymous';
          state.accessToken = undefined;
        });

        setSessionToken(undefined);
        userStore.getState().actions.clearUser();
      },

      setAccessToken: (accessToken: AuthState['accessToken']) => {
        set((state) => {
          state.accessToken = accessToken;
        });

        setSessionToken(accessToken);
      },

      setStatus: (status: AuthState['status']) =>
        set((state) => {
          state.status = status;
        }),
    },
  })),
);

setOnSessionExpired(() => {
  authStore.getState().actions.logout();
});

setOnTokenRefreshed((token) => {
  authStore.getState().actions.setAccessToken(token);
  authStore.getState().actions.setStatus('authenticated');
});

export { authStore as useAuthStore };
