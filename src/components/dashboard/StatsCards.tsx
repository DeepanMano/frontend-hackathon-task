import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTaskStats } from '@/services/taskService';
import { Card } from '@/components/ui/Card';
import { IconAlert, IconCheckCircle, IconLayers, IconList, IconProgress } from '@/components/ui/icons';
import clsx from 'clsx';

interface StatCard {
  label: string;
  value: number;
  trend?: string;
  icon: typeof IconLayers;
  accent: string;
}

export function StatsCards() {
  const { data } = useQuery({
    queryKey: ['task-stats'],
    queryFn: async () => getTaskStats(),
  });

  const stats = useMemo<StatCard[]>(() => {
    if (!data) return [];
    return [
      {
        label: 'Total tasks',
        value: data.total,
        icon: IconLayers,
        accent: 'from-brand-500 to-brand-600',
      },
      {
        label: 'To do',
        value: data.total - data.inProgress - data.done - data.blocked,
        icon: IconList,
        accent: 'from-violet-500 to-violet-600',
      },
      {
        label: 'In progress',
        value: data.inProgress,
        icon: IconProgress,
        accent: 'from-blue-500 to-blue-600',
      },
      {
        label: 'Completed',
        value: data.done,
        icon: IconCheckCircle,
        accent: 'from-emerald-500 to-emerald-600',
      },
      {
        label: 'Blocked',
        value: data.blocked,
        icon: IconAlert,
        accent: 'from-amber-500 to-orange-600',
      },
    ];
  }, [data]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {stats.map((card) => (
        <Card key={card.label} interactive className="relative overflow-hidden">
          <div
            className={clsx(
              'absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br opacity-10',
              card.accent,
            )}
          />
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{card.label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {card.value}
              </p>
              {card.trend ? (
                <p className="mt-1.5 text-xs text-slate-400">{card.trend}</p>
              ) : null}
            </div>
            <span
              className={clsx(
                'flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm',
                card.accent,
              )}
            >
              <card.icon size={18} />
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}