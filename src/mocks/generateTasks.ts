import type { Task, TaskPriority, TaskStatus } from '@/types';
import { MOCK_USERS } from './users';

const STATUSES: TaskStatus[] = ['todo', 'in_progress', 'review', 'done', 'blocked'];
const PRIORITIES: TaskPriority[] = ['low', 'medium', 'high', 'critical'];
const PROJECTS = [
  { id: 'p1', name: 'Platform Revamp' },
  { id: 'p2', name: 'Mobile App' },
  { id: 'p3', name: 'API Gateway' },
  { id: 'p4', name: 'Design System' },
  { id: 'p5', name: 'Analytics' },
];

const TITLES = [
  'Refactor authentication middleware',
  'Update dependency audit pipeline',
  'Design notification preferences UI',
  'Fix pagination on task board',
  'Migrate legacy user sessions',
  'Add keyboard shortcuts to modals',
  'Implement dark mode tokens',
  'Write integration tests for billing',
  'Review PR for search debounce',
  'Document API rate limits',
  'Optimize bundle splitting strategy',
  'Create onboarding checklist',
  'Fix sidebar overlap on tablet',
  'Add export to CSV for reports',
  'Sync query params with filters',
  'Investigate memory leak in dashboard',
  'Ship beta invite flow',
  'Update SLA monitoring alerts',
  'Clean up dead code in tasks module',
  'Align typography scale with Figma',
];

const TAG_POOL = ['frontend', 'backend', 'urgent', 'tech-debt', 'qa', 'design', 'infra'];

function pick<T>(arr: T[], index: number): T {
  return arr[index % arr.length];
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function daysAhead(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
}

export function generateMockTasks(count = 58): Task[] {
  const tasks: Task[] = [];

  for (let i = 0; i < count; i++) {
    const user = pick(MOCK_USERS, i);
    const project = pick(PROJECTS, i + 2);
    const status = pick(STATUSES, i + 1);
    const priority = pick(PRIORITIES, i * 3);

    const isDone = status === 'done';

    tasks.push({
      id: `task-${String(i + 1).padStart(3, '0')}`,
      title: `${pick(TITLES, i)} #${i + 1}`,
      description:
        i % 4 === 0
          ? ''
          : `Track progress for ${project.name}. Owner: ${user.name}. Includes acceptance criteria and links to specs.`,
      status,
      priority,
      assigneeId: user.id,
      assigneeName: user.name,
      projectId: project.id,
      projectName: isDone? undefined :project.name,
      dueDate: i % 7 === 0 ? daysAgo(2) : daysAhead((i % 14) + 1),
      createdAt: daysAgo(30 - (i % 25)),
      updatedAt: daysAgo(i % 10),
      tags: [pick(TAG_POOL, i), pick(TAG_POOL, i + 3)].filter(
        (t, idx, arr) => arr.indexOf(t) === idx,
      ),
    });
  }

  return tasks;
}
