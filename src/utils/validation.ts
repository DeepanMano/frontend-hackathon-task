import type { Resolver } from 'react-hook-form';
import type { Task, TaskPriority, TaskStatus } from '@/types';
import { MOCK_USERS } from '@/mocks/users';

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isLoginFormValid(email: string, password: string): boolean {
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();
  if (!isValidEmail(trimmedEmail)) return false;
  if (trimmedPassword.length < 6) return false;
  return true;
}

export function validateTaskTitle(title: string): string | null {
  const trimmed = title.trim();
  if (!trimmed) return 'Title is required';
  if (trimmed.length < 3) return 'Title must be at least 3 characters';
  if (trimmed.length > 120) return 'Title is too long';
  return null;
}

export function validateDueDate(dateStr: string): string | null {
  if (!dateStr) return 'Due date is required';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return 'Invalid date';
  return null;
}

const TASK_STATUSES: TaskStatus[] = ['todo', 'in_progress', 'review', 'done', 'blocked'];
const TASK_PRIORITIES: TaskPriority[] = ['low', 'medium', 'high', 'critical'];

export interface TaskFormValues {
  title: string;
  description: string;
  status: TaskStatus | '';
  priority: TaskPriority | '';
  assigneeId: string;
  dueDate: string;
}

export function validateTaskStatus(status: string): string | null {
  if (!status) return 'Status is required';
  if (!TASK_STATUSES.includes(status as TaskStatus)) return 'Invalid status';
  return null;
}

export function validateTaskPriority(priority: string): string | null {
  if (!priority) return 'Priority is required';
  if (!TASK_PRIORITIES.includes(priority as TaskPriority)) return 'Invalid priority';
  return null;
}

export function validateTaskAssignee(assigneeId: string): string | null {
  if (!assigneeId) return 'Assignee is required';
  if (!MOCK_USERS.some((u) => u.id === assigneeId)) return 'Invalid assignee';
  return null;
}

export function validateTaskDescription(description: string): string | null {
  if (description.length > 2000) return 'Description is too long (max 2000 characters)';
  return null;
}

function getLocalTodayDateString() {
  const d = new Date();
  // Local timezone YYYY-MM-DD
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


export function getTaskFormDefaults(initial?: Task): TaskFormValues {
  if (initial) {
    return {
      title: initial.title,
      description: initial.description,
      status: initial.status,
      priority: initial.priority,
      assigneeId: initial.assigneeId,
      dueDate: initial.dueDate.slice(0, 10),
    };
  }

  return {
    title: '',
    description: '',
    status: 'todo',
    priority: '',
    assigneeId: '',
    dueDate: getLocalTodayDateString(),

  };
}

export function normalizeTaskFormValues(values: TaskFormValues): {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId: string;
  dueDate: string;
} {
  return {
    title: values.title.trim(),
    description: values.description,
    status: values.status as TaskStatus,
    priority: values.priority as TaskPriority,
    assigneeId: values.assigneeId,
    dueDate: values.dueDate,
  };
}

export const taskFormResolver: Resolver<TaskFormValues> = (values) => {
  const errors: Record<string, { type: string; message: string }> = {};

  const titleError = validateTaskTitle(values.title);
  if (titleError) errors.title = { type: 'validate', message: titleError };

  const descriptionError = validateTaskDescription(values.description);
  if (descriptionError) errors.description = { type: 'validate', message: descriptionError };

  const statusError = validateTaskStatus(values.status);
  if (statusError) errors.status = { type: 'validate', message: statusError };

  const priorityError = validateTaskPriority(values.priority);
  if (priorityError) errors.priority = { type: 'validate', message: priorityError };

  const assigneeError = validateTaskAssignee(values.assigneeId);
  if (assigneeError) errors.assigneeId = { type: 'validate', message: assigneeError };

  const dueDateError = validateDueDate(values.dueDate);
  if (dueDateError) errors.dueDate = { type: 'validate', message: dueDateError };

  if (Object.keys(errors).length > 0) {
    return { values: {}, errors };
  }

  return { values, errors: {} };
};
