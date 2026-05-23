import type { PaginatedResponse, Task, TaskFilters, TaskStatus } from '@/types';
import { MOCK_USERS } from '@/mocks/users';
import {
  filterTasksLocal,
  getTasksSnapshot,
  mockDelay,
  setTasksSnapshot,
} from '@/mocks/taskStore';

export interface CreateTaskPayload {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Task['priority'];
  assigneeId: string;
  dueDate: string;
}

export async function fetchTasks(
  filters: TaskFilters,
  page: number,
  pageSize = 10,
): Promise<PaginatedResponse<Task>> {
  await mockDelay();
  return filterTasksLocal(getTasksSnapshot(), filters, page, pageSize);
}

export async function fetchTaskById(id: string): Promise<Task | undefined> {
  await mockDelay(150, 400);
  return getTasksSnapshot().find((t) => t.id === id);
}

export async function createTask(payload: CreateTaskPayload): Promise<Task> {
  await mockDelay(300, 700);

  const assignee = MOCK_USERS.find((u) => u.id === payload.assigneeId);

  const task: Task = {
    id: `task-${Date.now()}`,
    title: payload.title,
    description: payload.description || '',
    status: payload.status,
    priority: payload.priority,
    assigneeId: payload.assigneeId,
    assigneeName: assignee?.name || 'Unassigned',
    projectId: 'p1',
    projectName: 'Platform Revamp',
    dueDate: payload.dueDate,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: [],
  };

  const all = getTasksSnapshot();
  setTasksSnapshot([task, ...all]);
  return task;
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<Task> {
  await mockDelay(250, 500);
  const all = getTasksSnapshot();
  const idx = all.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error('Task not found');

  const updated = { ...all[idx], ...updates, updatedAt: new Date().toISOString() };
  const next = [...all];
  next[idx] = updated;
  setTasksSnapshot(next);
  return updated;
}

export async function deleteTask(id: string): Promise<void> {
  await mockDelay(200, 450);
  const all = getTasksSnapshot().filter((t) => t.id !== id);
  setTasksSnapshot(all);
}

export function getTaskStats() {
  const tasks = getTasksSnapshot();
  const todo = tasks.filter((t) => t.status === 'todo').length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const review = tasks.filter((t) => t.status === 'review').length;
  const done = tasks.filter((t) => t.status === 'done').length;
  const blocked = tasks.filter((t) => t.status === 'blocked').length;
  
  // Fixed by Chandu - Changed total to be calculated as sum of all status counts including review
  return {
    total: todo + inProgress + review + done + blocked,
    todo,
    inProgress,
    review,
    done,
    blocked,
  };
}
