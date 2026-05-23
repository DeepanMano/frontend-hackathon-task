import { useNavigate } from 'react-router-dom';
import type { Task } from '@/types';
import { StatusBadge } from '@/components/ui/Badge';
import { formatDate } from '@/utils/formatDate';

interface TaskListLegacyProps {
  tasks: Task[];
}

export function TaskListLegacy({ tasks }: TaskListLegacyProps) {
  const navigate = useNavigate();

  return (
    <ul className="divide-y divide-slate-100 dark:divide-slate-800">
      {tasks.map((task) => (
        <li key={task.id}>
          <button
            type="button"
            onClick={() => navigate(`/tasks/${task.id}`)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:hover:bg-slate-800/40"
          >
            <span
              className="min-w-0 text-sm font-medium text-slate-900 dark:text-slate-100"
              title={task.title}
            >
              {task.title}
            </span>
            <div className="flex shrink-0 items-center gap-3">
              <StatusBadge status={task.status} />
              <span className="text-xs tabular-nums text-slate-500 dark:text-slate-400">
                {formatDate(task.dueDate)}
              </span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

