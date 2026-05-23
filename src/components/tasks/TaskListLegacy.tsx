import type { Task } from '@/types';
import { StatusBadge } from '@/components/ui/Badge';
import { formatDate } from '@/utils/formatDate';
import { useNavigate } from 'react-router-dom';

interface TaskListLegacyProps {
  tasks: Task[];
}

export function TaskListLegacy({ tasks }: TaskListLegacyProps) {
  const navigate = useNavigate();

  // Fixed by Chandu - Added navigation to make recent tasks clickable
  const handleTaskClick = (task: Task) => {
    navigate(`/tasks/${task.id}`, {
      state: { task, from: '/dashboard' },
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900/50">
      <table className="w-full">
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {tasks.map((task) => (
            <tr
              key={task.id}
              onClick={() => handleTaskClick(task)}
              className="cursor-pointer transition-colors hover:bg-brand-50/40 dark:hover:bg-slate-800/40"
            >
              <td className="px-5 py-3.5">
                <span
                  className="line-clamp-2 block max-w-[400px] break-words font-medium text-slate-900 dark:text-slate-100"
                  title={task.title}
                >
                  {task.title}
                </span>
              </td>
              <td className="px-5 py-3.5 text-right">
                <div className="flex items-center justify-end gap-2">
                  <StatusBadge status={task.status} />
                  <span className="text-sm tabular-nums text-slate-600 dark:text-slate-400">
                    {formatDate(task.dueDate)}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

