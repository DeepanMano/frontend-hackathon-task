import { useEffect, useState } from 'react';
import type { Notification } from '@/types';
import {
  fetchNotifications,
  markAllRead,
  markAsRead,
} from '@/services/notificationService';
import { Spinner } from '@/components/ui/Spinner';
import { formatDate } from '@/utils/formatDate';
import clsx from 'clsx';

interface NotificationListProps {
  filter?: 'all' | 'unread';
  onRead?: () => void;
}

export function NotificationList({ filter = 'all', onRead }: NotificationListProps) {
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.resolve().then(() => {
      if (mounted) setLoading(true);
    });
    fetchNotifications(filter)
      .then((data) => {
        if (mounted) setItems(data);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [filter]);

  const unreadCount = items.filter((n) => !n.read).length;

  const handleMarkRead = async (id: string) => {
    const target = items.find((n) => n.id === id);
    if (!target || target.read) return;
    await markAsRead(id);
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    onRead?.();
  };

  const handleMarkAll = async () => {
    await markAllRead();
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    onRead?.();
  };

  if (loading) return <Spinner label="Loading notifications..." />;

  return (
    <div className="max-h-80 overflow-y-auto">
      <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2 dark:border-slate-800">
        <span className="text-xs text-slate-500">{unreadCount} unread</span>
        <button
          type="button"
          onClick={handleMarkAll}
          className="text-xs font-medium text-brand-600 hover:underline"
        >
          Mark all read
        </button>
      </div>
      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {items.map((n) => (
          <li
            key={n.id}
            className={clsx(
              'px-3 py-3 text-sm',
              !n.read && 'bg-brand-50/50 dark:bg-slate-800/50',
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-100">{n.title}</p>
                <p className="mt-0.5 text-xs text-slate-500">{n.message}</p>
                <p className="mt-1 text-xs text-slate-400">{formatDate(n.createdAt, 'long')}</p>
              </div>
              {!n.read ? (
                <button
                  type="button"
                  onClick={() => handleMarkRead(n.id)}
                  className="shrink-0 text-xs text-brand-600 hover:underline"
                >
                  Mark read
                </button>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
