import clsx from 'clsx';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading,
  className,
  disabled,
  children,
  ...props
  
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      className={clsx(
      'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',

        isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        variant === 'primary' &&
          'bg-brand-600 text-white shadow-sm shadow-brand-600/30 hover:bg-brand-700 active:scale-[0.98] dark:bg-brand-600 dark:hover:bg-brand-500',
        variant === 'secondary' &&
          'border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700',
        variant === 'ghost' &&
          'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
        variant === 'danger' &&
          'bg-red-600 text-white shadow-sm hover:bg-red-700 active:scale-[0.98]',
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2.5 text-sm',
        size === 'lg' && 'px-5 py-3 text-base',
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
}
