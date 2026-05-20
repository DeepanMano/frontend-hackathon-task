import type { Notification } from '@/types';
import { MOCK_NOTIFICATIONS } from '@/mocks/notifications';
import { mockDelay } from '@/mocks/taskStore';

let notifications = [...MOCK_NOTIFICATIONS];

export async function fetchNotifications(
  filter: 'all' | 'unread' = 'all',
): Promise<Notification[]> {
  await mockDelay(200, 500);

  if (filter === 'unread') {
    return notifications.filter((n) => !n.read);
  }
  return [...notifications];
}

export async function markAsRead(id: string): Promise<void> {
  await mockDelay(80, 200);
  notifications = notifications.map((n) =>
    n.id === id ? { ...n, read: true } : n,
  );
}

export async function markAllRead(): Promise<void> {
  await mockDelay(100, 250);
  notifications = notifications.map((n) => ({ ...n, read: true }));
}

export function getUnreadCount(): number {
  return notifications.filter((n) => !n.read).length;
}
