import { useEffect } from 'react';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeToast } from '@/store/slices/uiSlice';

export function ToastContainer() {
  const toasts = useAppSelector((s) => s.ui.toasts);
  const dispatch = useAppDispatch();

  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-[90] flex w-full max-w-sm flex-col gap-2"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => dispatch(removeToast(toast.id))}
        />
      ))}
    </div>
  );
}

function ToastItem({
  id,
  type,
  message,
  onClose,
}: {
  id: string;
  type: string;
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [id, onClose]);

  return (
    <div
      className={clsx(
        'pointer-events-auto rounded-lg border px-4 py-3 text-sm shadow-lg',
        type === 'success' && 'border-emerald-200 bg-emerald-50 text-emerald-900',
        type === 'error' && 'border-red-200 bg-red-50 text-red-900',
        type === 'warning' && 'border-amber-200 bg-amber-50 text-amber-900',
        type === 'info' && 'border-slate-200 bg-white text-slate-800',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span>{message}</span>
        <button type="button" onClick={onClose} className="cursor-pointer text-slate-400 hover:text-slate-600">
          ×
        </button>
      </div>
    </div>
  );
}
