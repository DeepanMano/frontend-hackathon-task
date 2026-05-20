import type { TaskStatus } from '@/types';
import clsx from 'clsx';

const STATUS_OPTIONS: { value: TaskStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'review', label: 'In Review' },
  { value: 'done', label: 'Done' },
  { value: 'blocked', label: 'Blocked' },
];

interface TaskFiltersProps {
  status: TaskStatus | 'all';
  onStatusChange: (status: TaskStatus | 'all') => void;
}

export function TaskFilters({ status, onStatusChange }: TaskFiltersProps) {
  return (
    <div className="flex flex-wrap gap-1.5 rounded-xl border border-slate-200/80 bg-slate-50/80 p-1.5 dark:border-slate-800/80 dark:bg-slate-900/50">
      {STATUS_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onStatusChange(opt.value)}
          className={clsx(
            'cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-all',
            status === opt.value
              ? 'bg-white text-brand-700 shadow-sm dark:bg-slate-800 dark:text-brand-300'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200',
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
