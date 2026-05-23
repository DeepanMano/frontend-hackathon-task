import type { Task } from '@/types';
import { StatusBadge } from '@/components/ui/Badge';
import { formatDate } from '@/utils/formatDate';
import { useNavigate } from 'react-router-dom';

interface TaskListLegacyProps {
  tasks: Task[];
}

export function TaskListLegacy({ tasks }: TaskListLegacyProps) {
  // Fixed by Deepan — added useNavigate to make recent task rows clickable
  const navigate = useNavigate();

  return (
    <ul className="divide-y divide-slate-100 dark:divide-slate-800">
      {tasks.map((task) => (
        <li
          key={task.id}
          onClick={() => navigate(`/tasks/${task.id}`)}
          className="flex cursor-pointer flex-col gap-2 px-5 py-3.5 text-sm transition-colors hover:bg-slate-50/80 sm:items-center dark:hover:bg-slate-800/40"
        >
          <span
            className="line-clamp-2 w-[400px] min-w-[400px] max-w-[400px] break-words font-medium text-slate-900 dark:text-slate-100"
            title={task.title}
          >
            {task.title}
          </span>
          <div className="flex items-center gap-3">
            <StatusBadge status={task.status} />
            <span className="text-xs tabular-nums text-slate-500">{formatDate(task.dueDate)}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

