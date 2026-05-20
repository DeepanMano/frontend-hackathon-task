import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ToastMessage } from '@/types';

interface UiState {
  sidebarOpen: boolean;
  taskModalOpen: boolean;
  editingTaskId: string | null;
  toasts: ToastMessage[];
}

const initialState: UiState = {
  sidebarOpen: true,
  taskModalOpen: false,
  editingTaskId: null,
  toasts: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    openTaskModal(state, action: PayloadAction<string | null>) {
      state.taskModalOpen = true;
      state.editingTaskId = action.payload;
    },
    closeTaskModal(state) {
      state.taskModalOpen = false;
      state.editingTaskId = null;
    },
    pushToast(state, action: PayloadAction<Omit<ToastMessage, 'id'>>) {
      state.toasts.push({
        ...action.payload,
        id: `toast-${Date.now()}-${Math.random()}`,
      });
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  openTaskModal,
  closeTaskModal,
  pushToast,
  removeToast,
} = uiSlice.actions;

export default uiSlice.reducer;
