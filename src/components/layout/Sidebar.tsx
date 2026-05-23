import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSidebarOpen } from '@/store/slices/uiSlice';
import { useWindowSize } from '@/hooks/useWindowSize';
import { IconLayoutDashboard, IconList, IconLayers } from '@/components/ui/icons';

const NAV = [
  { to: '/dashboard', label: 'Dashboard', Icon: IconLayoutDashboard },
  { to: '/editor', label: 'Editor', Icon: IconLayers },
  { to: '/tasks', label: 'Tasks', Icon: IconList },
] as const;

export function Sidebar() {
  const open = useAppSelector((s) => s.ui.sidebarOpen);
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();

  const isDesktop = width >= 1024;
  const isOverlay = !isDesktop;

  const closeOverlay = () => {
    if (isOverlay) dispatch(setSidebarOpen(false));
  };

  return (
    <>
      {isOverlay && open ? (
        <div
          className="fixed inset-0 top-16 z-45 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={closeOverlay}
          aria-hidden
        />
      ) : null}

      <aside
        className={clsx(
          'flex w-64 shrink-0 flex-col border-r border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900 h-full',
          isOverlay && [
            'fixed left-0 top-16 z-55 h-[calc(100%-4rem)] transition-transform duration-200 ease-out',
            open ? 'translate-x-0 shadow-2xl' : '-translate-x-full',
          ],
        )}
      >

        <div className="flex h-14 items-center gap-2 border-b border-slate-200/80 px-4 lg:hidden dark:border-slate-800/80">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white">
            TF
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">TaskFlow</p>
            <p className="text-xs text-slate-500">Team workspace</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Menu
          </p>
          {NAV.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeOverlay}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all cursor-pointer',
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/80',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {Icon ? <Icon
                    size={18}
                    className={clsx('shrink-0', isActive ? 'text-white' : 'opacity-70')}
                  /> : null}
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200/80 p-4 dark:border-slate-800/80">
          <p className="text-xs text-slate-400">v1.4.2 · staging</p>
        </div>
      </aside>
    </>
  );
}
