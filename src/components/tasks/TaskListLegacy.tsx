import type { Task } from '@/types';
import { StatusBadge } from '@/components/ui/Badge';
import { formatDate } from '@/utils/formatDate';

interface TaskListLegacyProps {
  tasks: Task[];
  onSelect?: (task: Task) => void;
}

export function TaskListLegacy({ tasks, onSelect }: TaskListLegacyProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {tasks.length === 0 ? (
          <div className="p-6 text-center text-slate-500 dark:text-slate-400">No tasks found</div>
        ) : (
          tasks.map((task) => (
            <button
              key={task.id}
              type="button"
              onClick={() => onSelect?.(task)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onSelect?.(task);
                }
              }}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40 focus:bg-slate-100 dark:focus:bg-slate-800 outline-none"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-white" title={task.title}>
                  {task.title}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <StatusBadge status={task.status} />
                <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                  {formatDate(task.dueDate)}
                </span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}