import { useEffect, useRef, useState } from 'react';
import { IconSearch } from '@/components/ui/icons';

interface TaskSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function TaskSearch({ value, onChange }: TaskSearchProps) {
  const [local, setLocal] = useState(value);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (local !== value) {
        onChangeRef.current(local);
      }
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [local, value]);

  return (
    <div className="relative flex-1">
      <IconSearch
        size={18}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        type="search"
        placeholder="Search tasks, assignees, projects..."
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      />
    </div>
  );
}
