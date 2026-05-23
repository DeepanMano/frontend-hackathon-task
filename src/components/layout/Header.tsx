// import { NavLink } from 'react-router-dom';
// import clsx from 'clsx';
import { useTheme } from '@/context/ThemeContext';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { useAppDispatch } from '@/store/hooks';
import { toggleSidebar } from '@/store/slices/uiSlice';
import { IconMenu, IconMoon, IconSun } from '@/components/ui/icons';

export function Header({ title }: { title: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
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

        <button
  type="button"
  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
  onClick={toggleTheme}
  className="cursor-pointer rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
>
  {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
</button>
        <NotificationBell />
      </div>
    </header>
  );
}
