import type { Task } from '@/types';
import { TaskRow } from './TaskRow';
import { Spinner } from '@/components/ui/Spinner';
import { IconList } from '@/components/ui/icons';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onSelect: (task: Task) => void;
}

export function TaskList({
  tasks,
  loading,
  onEdit,
  onDelete,
  onSelect,
}: TaskListProps) {
  if (loading) {
    return (
      <div className="card flex min-h-[280px] items-center justify-center">
        <Spinner label="Loading tasks..." />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="card flex flex-col items-center justify-center px-6 py-16 text-center">
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
          <IconList size={28} />
        </span>
        <p className="font-medium text-slate-900 dark:text-white">No tasks found</p>
        <p className="mt-1 max-w-sm text-sm text-slate-500">
          Try adjusting your filters or create a new task to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden p-0">
      <div className="overflow-x-auto overflow-y-hidden">
        <table className="min-w-full table-fixed text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/50">
              <th className="w-[400px] min-w-[400px] max-w-[400px] px-5 py-3.5">Task</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Priority</th>
              <th className="px-5 py-3.5">Assignee</th>
              <th className="px-5 py-3.5">Due</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          {/* Fixed by Chandu - Passed onDelete prop to TaskRow */}
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onSelect={onSelect}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
