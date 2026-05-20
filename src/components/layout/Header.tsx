import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '@/context/ThemeContext';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { useAppDispatch } from '@/store/hooks';
import { toggleSidebar } from '@/store/slices/uiSlice';
import { IconMenu, IconMoon, IconSun, IconCheckCircle } from '@/components/ui/icons';

export function Header({ title }: { title: string }) {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  return (
    <header className="z-[50] flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80 lg:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation menu"
          className="cursor-pointer rounded-xl p-2 text-slate-600 transition-colors hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          onClick={() => dispatch(toggleSidebar())}
        >
          <IconMenu size={20} />
        </button>
        <div className="hidden items-center gap-3 lg:flex">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-700 text-sm font-bold text-white shadow-sm">
            TF
          </span>
          <div className="hidden h-6 w-px bg-slate-200 dark:bg-slate-700 xl:block" />
        </div>
        <h1
          className="min-w-0 flex-1 truncate break-all text-base font-semibold tracking-tight text-slate-900 dark:text-white lg:text-lg"
          title={title}
        >
          {title}
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <NavLink
          to="/interview-tasks"
          aria-label="View Task Checklist"
          className={({ isActive }) =>
            clsx(
              'cursor-pointer flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold transition-all',
              isActive
                ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-300 ring-1 ring-brand-200/50 dark:ring-brand-900/50'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
            )
          }
        >
          {({ isActive }) => (
            <>
              <IconCheckCircle
                size={18}
                className={clsx('transition-colors', isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500')}
              />
              <span>Task</span>
            </>
          )}
        </NavLink>

        <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

        <button
          type="button"
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          onClick={toggleTheme()}
          className="cursor-pointer rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          {theme === 'light' ? <IconMoon size={18} /> : <IconSun size={18} />}
        </button>
        <NotificationBell />
      </div>
    </header>
  );
}
