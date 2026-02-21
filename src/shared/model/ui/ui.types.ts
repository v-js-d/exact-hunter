export interface UiState {
  sidebarOpen: boolean;
}

export interface UiActions {
  toggleSidebar: () => void;
  setSidebarOpen: (value: boolean) => void;
}

export interface UiStore extends UiState {
  actions: UiActions;
}
