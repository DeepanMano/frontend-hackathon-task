import type { Task } from '@/types';
import { StatusBadge, PriorityBadge } from '@/components/ui/Badge';
import { formatDate, isOverdue } from '@/utils/formatDate';
import { getAssigneeInitials } from '@/utils/taskHelpers';
import clsx from 'clsx';

interface TaskRowProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onSelect: (task: Task) => void;
}

export function TaskRow({ task, onEdit, onDelete, onSelect }: TaskRowProps) {
  const overdue = isOverdue(task.dueDate) && task.status !== 'done';

  return (
    <tr
      className="task-row-enter cursor-pointer transition-colors hover:bg-brand-50/40 dark:hover:bg-slate-800/40"
      onClick={() => onSelect(task)}
    >
      <td className="w-[400px] min-w-[400px] max-w-[400px] px-5 py-4">
        <div
          className="line-clamp-2 break-words font-medium text-slate-900 dark:text-slate-100"
          title={task.title}
        >
          {task.title?.trim() || ''}
        </div>
        <div className="mt-0.5 text-xs text-slate-500">{task.projectName?.trim() || ''}</div>
      </td>
      <td className="px-5 py-4">
        <StatusBadge status={task.status} />
      </td>
      <td className="px-5 py-4">
        <PriorityBadge priority={task.priority} />
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-brand-200 text-xs font-bold text-brand-800 dark:from-brand-900 dark:to-brand-800 dark:text-brand-200">
            {getAssigneeInitials(task.assigneeName)}
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-400">{task.assigneeName}</span>
        </div>
      </td>
      <td className="px-5 py-4">
        <span
          className={clsx(
            'text-sm tabular-nums',
            overdue ? 'font-semibold text-red-600 dark:text-red-400' : 'text-slate-600 dark:text-slate-400',
          )}
        >
          {formatDate(task.dueDate)}
        </span>
      </td>
      <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
        <div className="inline-flex gap-1">
          <button
            type="button"
            aria-label={`Edit ${task.title}`}
            onClick={() => onEdit(task)}
            className="cursor-pointer rounded-lg px-2.5 py-1.5 text-xs font-medium text-brand-600 transition-colors hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-slate-800"
          >
            Edit
          </button>
          <button
            type="button"
            aria-label={`Delete ${task.title}`}
            onClick={() => onDelete(task)}
            className="cursor-pointer rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-slate-800"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
