import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '@/components/ui/Spinner';
import { StatusBadge, PriorityBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { fetchTaskById } from '@/services/taskService';
import type { Task } from '@/types';
import { formatDate } from '@/utils/formatDate';

export function TaskDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(
    (location.state as { task?: Task })?.task ?? null,
  );
  const [loading, setLoading] = useState(!task);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    const stateTask = (location.state as { task?: Task })?.task;
    
    Promise.resolve().then(() => {
      if (cancelled) return;
      if (stateTask?.id === id) {
        setTask(stateTask);
        setLoading(false);
      } else {
        setTask(null);
        setLoading(true);
      }
    });

    fetchTaskById(id).then((t) => {
      if (cancelled) return;
      if (t) setTask(t);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [id, location.state]);

  const handleBack = () => {
    const from = (location.state as { from?: string })?.from;
    if (from) {
      navigate(from);
    } else {
      navigate('/tasks');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-8">
        <Spinner label="Loading task..." />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
        <p className="text-lg font-medium text-slate-900 dark:text-white">Task not found</p>
        <Button className="mt-4" onClick={() => navigate('/tasks')}>
          Back to tasks
        </Button>
      </div>
    );
  }

  const notes = (location.state as { notes?: string })?.notes;

  return (
    <div className="space-y-6 p-4 pb-8 lg:p-8">
      <Button variant="ghost" onClick={handleBack} className="-ml-2">
        ← Back to tasks
      </Button>

      <Card className="space-y-6">
        <div className="min-w-0">
          <h2
            className="line-clamp-2 break-words text-2xl font-bold tracking-tight text-slate-900 dark:text-white"
            title={task.title}
          >
            {task.title}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
          </div>
        </div>

        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
          {task.description || 'No description provided.'}
        </p>

        <dl className="grid gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-3 dark:bg-slate-800/50">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">Assignee</dt>
            <dd className="mt-1 font-semibold text-slate-900 dark:text-white">{task.assigneeName}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">Due date</dt>
            <dd className="mt-1 font-semibold text-slate-900 dark:text-white">
              {formatDate(task.dueDate, 'long')}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">Project</dt>
            <dd className="mt-1 font-semibold text-slate-900 dark:text-white">{task.projectName}</dd>
          </div>
        </dl>

        {notes ? (
          <p className="rounded-lg border border-dashed border-slate-200 px-3 py-2 text-xs text-slate-500 dark:border-slate-700">
            Notes: {notes}
          </p>
        ) : null}
      </Card>
    </div>
  );
}
