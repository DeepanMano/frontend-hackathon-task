import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Task } from '@/types';
import { MOCK_USERS } from '@/mocks/users';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import clsx from 'clsx';
import {
  getTaskFormDefaults,
  normalizeTaskFormValues,
  taskFormResolver,
  type TaskFormValues,
} from '@/utils/validation';

export type { TaskFormValues };

interface TaskFormProps {
  initial?: Task;
  submitting?: boolean;
  onSubmit: (values: ReturnType<typeof normalizeTaskFormValues>) => void;
  onCancel: () => void;
}

const selectClassName = (hasError: boolean) =>
  clsx(
    'w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-slate-100 cursor-pointer',
    hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
      : 'border-slate-200 focus:border-brand-500 focus:ring-brand-500/20 dark:border-slate-700',
  );

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">{message}</p>;
}

export function TaskForm({ initial, submitting, onSubmit, onCancel }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<TaskFormValues>({
    resolver: taskFormResolver,
    defaultValues: getTaskFormDefaults(initial),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    reset(getTaskFormDefaults(initial));
  }, [initial, reset]);

  const isEditMode = Boolean(initial);
  const submitDisabled = submitting || (isEditMode && !isDirty) ;

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(normalizeTaskFormValues(values)))}
      className="space-y-4"
      noValidate
    >
      <Input
        label="Title"
        error={errors.title?.message}
        {...register('title')}
      />

      <div>
        <label
          htmlFor="task-description"
          className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Description
        </label>
        <textarea
          id="task-description"
          rows={3}
          className={selectClassName(Boolean(errors.description))}
          {...register('description')}
        />
        <FieldError message={errors.description?.message} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="task-status"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Status
          </label>
          <select id="task-status" className={selectClassName(Boolean(errors.status))} {...register('status')}>
            <option value="">Select status...</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="review">In Review</option>
            <option value="done">Done</option>
            <option value="blocked">Blocked</option>
          </select>
          <FieldError message={errors.status?.message} />
        </div>
        <div>
          <label
            htmlFor="task-priority"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Priority
          </label>
          <select
            id="task-priority"
            className={selectClassName(Boolean(errors.priority))}
            {...register('priority')}
          >
            <option value="">Select priority...</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <FieldError message={errors.priority?.message} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="task-assignee"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Assignee
          </label>
          <select
            id="task-assignee"
            className={selectClassName(Boolean(errors.assigneeId))}
            {...register('assigneeId')}
          >
            <option value="">Select assignee...</option>
            {MOCK_USERS.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <FieldError message={errors.assigneeId?.message} />
        </div>
        <Input
          label="Due date"
          type="date"
          error={errors.dueDate?.message}
          {...register('dueDate')}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={submitting} disabled={submitDisabled}>
          {initial ? 'Save changes' : 'Create task'}
        </Button>
      </div>
    </form>
  );
}
