import clsx from 'clsx';
import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className, id, ...props },
  ref,
) {
  const inputId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s/g, '-') : undefined);
  return (
    <div className="space-y-1.5">
      {label ? (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      ) : null}
      <input
        ref={ref}
        id={inputId}
        className={clsx(
          'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm shadow-sm transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500',
          error && 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
          className,
        )}
        {...props}
      />
      {error ? <p className="text-xs font-medium text-red-600 dark:text-red-400">{error}</p> : null}
    </div>
  );
});
