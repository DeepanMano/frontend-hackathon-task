import { useNavigate } from 'react-router-dom';
import type { Task } from '@/types';
import { StatusBadge } from '@/components/ui/Badge';
import { formatDate } from '@/utils/formatDate';
import { getAssigneeInitials } from '@/utils/taskHelpers';

interface TaskListLegacyProps {
  tasks: Task[];
}

export function TaskListLegacy({ tasks }: TaskListLegacyProps) {
  const navigate = useNavigate();

  const openTask = (taskId: string) => {
    navigate(`/tasks/${taskId}`, {
      state: { from: '/dashboard' },
    });
  };

  return (
    <ul className="divide-y divide-slate-100 dark:divide-slate-800">
      {tasks.map((task) => {
        const title = task.title?.trim() || 'Untitled task';
        const project = task.projectName?.trim() || '';
        const assignee = task.assigneeName?.trim() || 'Unassigned';

        return (
          <li
            key={task.id}
            role="button"
            tabIndex={0}
            onClick={() => openTask(task.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openTask(task.id);
              }
            }}
            className="group cursor-pointer transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
          >
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 px-5 py-3.5 items-center">
              <div className="sm:col-span-2">
                <div
                  className="line-clamp-2 font-medium text-slate-900 dark:text-slate-100"
                  title={title}
                >
                  {title}
                </div>
                {project ? (
                  <div className="mt-1 text-xs text-slate-500">{project}</div>
                ) : null}
              </div>

              <div className="hidden sm:flex items-center">
                <StatusBadge status={task.status} />
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-brand-100 to-brand-200 text-xs font-bold text-brand-800 dark:from-brand-900 dark:to-brand-800 dark:text-brand-200">
                  {getAssigneeInitials(assignee)}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400">{assignee}</span>
              </div>

              <div className="text-xs tabular-nums text-slate-500 text-right sm:text-left">
                {formatDate(task.dueDate)}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

