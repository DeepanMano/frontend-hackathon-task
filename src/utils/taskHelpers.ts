import type { Task, TaskStatus } from '@/types';

export function getStatusLabel(status: TaskStatus): string {
  const labels: Record<TaskStatus, string> = {
    todo: 'To Do',
    in_progress: 'In Progress',
    review: 'In Review',
    done: 'Done',
    blocked: 'Blocked',
  };
  return labels[status];
}

export function computeCompletionRate(tasks: Task[]): number {
  if (tasks.length === 0) return 0;
  const done = tasks.filter((t) => t.status === 'done').length;
  return Math.round((done / tasks.length) * 100);
}

export function getAssigneeInitials(name: string): string {
  const parts = name.split(' ');
  if (parts.length === 0) return '?';
  return parts
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

