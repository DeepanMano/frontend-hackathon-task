import type { Task, TaskFilters } from '@/types';
import { generateMockTasks } from './generateTasks';

let tasksDB: Task[] = generateMockTasks(58);

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function mockDelay(min = 200, max = 600) {
  const ms = min + Math.floor(Math.random() * (max - min));
  await delay(ms);
}

export function getTasksSnapshot(): Task[] {
  return tasksDB;
}

export function setTasksSnapshot(tasks: Task[]) {
  tasksDB = tasks;
}

export function filterTasksLocal(
  tasks: Task[],
  filters: TaskFilters,
  page: number,
  pageSize: number,
) {
  let result = [...tasks];

  if (filters.status && filters.status !== 'all') {
    result = result.filter((t) => t.status === filters.status);
  }

  if (filters.search?.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.assigneeName.toLowerCase().includes(q),
    );
  }

  if (filters.assigneeId) {
    result = result.filter((t) => t.assigneeId === filters.assigneeId);
  }

  if (filters.priority) {
    result = result.filter((t) => t.priority === filters.priority);
  }

  const total = result.length;
  const start = page * pageSize;
  const data = result.slice(start, start + pageSize);

  return {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize) || 1,
  };
}
