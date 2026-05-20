import type { Notification } from '@/types';

function hoursAgo(h: number): string {
  const d = new Date();
  d.setHours(d.getHours() - h);
  return d.toISOString();
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Task assigned to you',
    message: 'Refactor authentication middleware was assigned by Alex.',
    read: false,
    createdAt: hoursAgo(1),
    type: 'info',
    relatedTaskId: 'task-001',
  },
  {
    id: 'n2',
    title: 'Due date approaching',
    message: '3 tasks are due within 48 hours.',
    read: false,
    createdAt: hoursAgo(4),
    type: 'warning',
  },
  {
    id: 'n3',
    title: 'Build passed',
    message: 'CI pipeline for Platform Revamp completed successfully.',
    read: true,
    createdAt: hoursAgo(12),
    type: 'success',
  },
  {
    id: 'n4',
    title: 'Comment on task',
    message: 'Jordan left feedback on API rate limits documentation.',
    read: false,
    createdAt: hoursAgo(20),
    type: 'info',
    relatedTaskId: 'task-010',
  },
  {
    id: 'n5',
    title: 'Deployment failed',
    message: 'Staging deploy for Mobile App needs attention.',
    read: false,
    createdAt: hoursAgo(26),
    type: 'error',
  },
  {
    id: 'n6',
    title: 'Weekly digest',
    message: 'Your team closed 12 tasks this week.',
    read: true,
    createdAt: hoursAgo(48),
    type: 'info',
  },
  {
    id: 'n7',
    title: 'New team member',
    message: 'Casey Brooks joined the Analytics project.',
    read: true,
    createdAt: hoursAgo(72),
    type: 'success',
  },
  {
    id: 'n8',
    title: 'Permission updated',
    message: 'Your role now includes project admin access.',
    read: false,
    createdAt: hoursAgo(5),
    type: 'info',
  },
  {
    id: 'n9',
    title: 'Sprint started',
    message: 'Sprint 24 kicked off with 18 committed tasks.',
    read: false,
    createdAt: hoursAgo(8),
    type: 'info',
  },
  {
    id: 'n10',
    title: 'Blocked task',
    message: 'Investigate memory leak in dashboard is blocked.',
    read: false,
    createdAt: hoursAgo(3),
    type: 'warning',
    relatedTaskId: 'task-016',
  },
  {
    id: 'n11',
    title: 'Review requested',
    message: 'Sam requested your review on Design System tokens.',
    read: true,
    createdAt: hoursAgo(30),
    type: 'info',
  },
  {
    id: 'n12',
    title: 'Export ready',
    message: 'Your CSV export is available for download.',
    read: true,
    createdAt: hoursAgo(55),
    type: 'success',
  },
];
