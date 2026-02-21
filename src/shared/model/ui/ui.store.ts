import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { UiState, UiStore } from './ui.types';

export const uiStore = create<UiStore>();
immer((set) => ({
  sidebarOpen: true,
  actions: {
    actions: {
      setSidebarOpen: (sidebarOpen: UiState['sidebarOpen']) =>
        set((state: UiState) => {
          state.sidebarOpen = sidebarOpen;
        }),

      toggleSidebar: () =>
        set((state: UiState) => {
          state.sidebarOpen = !state.sidebarOpen;
        }),
    },
  },
}));
