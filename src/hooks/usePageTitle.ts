import { useLocation } from 'react-router-dom';
import type { Task } from '@/types';

const TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/tasks': 'Tasks',
  '/interview-tasks': 'Task Checklist',
};

export function usePageTitle(): string {
  const location = useLocation();
  const { pathname } = location;

  if (pathname.startsWith('/tasks/') && pathname !== '/tasks') {
    const task = (location.state as { task?: Task } | null)?.task;
    return task?.title ?? 'Task detail';
  }

  return TITLES[pathname] ?? 'TaskFlow';
}
