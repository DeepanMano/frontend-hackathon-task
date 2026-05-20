import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task, TaskFilters } from '@/types';

interface TasksState {
  items: Task[];
  filters: TaskFilters;
  page: number;
  pageSize: number;
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  filters: { status: 'all', search: '' },
  page: 0,
  pageSize: 10,
  total: 0,
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setTasks(
      state,
      action: PayloadAction<{ items: Task[]; total: number; page: number }>,
    ) {
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.page = action.payload.page;
    },
    setFilters(state, action: PayloadAction<Partial<TaskFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    upsertTask(state, action: PayloadAction<Task>) {
      const idx = state.items.findIndex((t) => t.id === action.payload.id);
      if (idx >= 0) {
        state.items[idx] = action.payload;
      } else {
        state.items.unshift(action.payload);
      }
    },
    removeTaskLocal(state, action: PayloadAction<string>) {
      const idx = state.items.findIndex((t) => t.id === action.payload);
      if (idx >= 0) {
        state.items.splice(idx, 1);
        state.total -= 1;
      }
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setTasks,
  setFilters,
  setPage,
  upsertTask,
  removeTaskLocal,
  setError,
} = tasksSlice.actions;

export default tasksSlice.reducer;
