import { useEffect, useRef, useState } from 'react';
import { NotificationList } from './NotificationList';
import { getUnreadCount } from '@/services/notificationService';
import { IconBell } from '@/components/ui/icons';

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(getUnreadCount());
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => {
    setOpen((wasOpen) => {
      if (!wasOpen) setCount(getUnreadCount());
      return !wasOpen;
    });
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-label={`Notifications${count > 0 ? `, ${count} unread` : ''}`}
        onClick={toggleOpen}
        className="relative cursor-pointer rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
      >
        <IconBell size={18} />
        {count > 0 ? (
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
            {count}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-[95] mt-2 w-80 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
          <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/50">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h3>
          </div>
          <NotificationList filter="all" onRead={() => setCount(getUnreadCount())} />
        </div>
      ) : null}
    </div>
  );
}
