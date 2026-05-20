import clsx from 'clsx';
import type { TaskPriority, TaskStatus } from '@/types';
import { getStatusLabel } from '@/utils/taskHelpers';

const statusStyles: Record<TaskStatus, string> = {
  todo: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200/60 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700',
  in_progress: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200/60 dark:bg-blue-950/50 dark:text-blue-200 dark:ring-blue-900',
  review: 'bg-amber-50 text-amber-800 ring-1 ring-amber-200/60 dark:bg-amber-950/40 dark:text-amber-200 dark:ring-amber-900',
  done: 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-900',
  blocked: 'bg-red-50 text-red-700 ring-1 ring-red-200/60 dark:bg-red-950/40 dark:text-red-300 dark:ring-red-900',
};

const priorityStyles: Record<TaskPriority, string> = {
  low: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  medium: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300',
  high: 'bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300',
  critical: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300',
};

export function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span
      className={clsx(
        'inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold',
        statusStyles[status],
      )}
    >
      {getStatusLabel(status)}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <span
      className={clsx(
        'inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
        priorityStyles[priority],
      )}
    >
      {priority}
    </span>
  );
}
