import { PageHeader } from '@/components/ui/Card';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { TaskListLegacy } from '@/components/tasks/TaskListLegacy';
import { Card } from '@/components/ui/Card';
import { getTasksSnapshot } from '@/mocks/taskStore';

export function DashboardPage() {
  const recent = getTasksSnapshot().slice(0, 8);

  return (
    <div className="space-y-8 p-4 pb-8 lg:p-8">
      <PageHeader
        title="Dashboard"
        description="Overview of your team's workload and recent activity."
      />
      <QuickActions />
      <StatsCards />
      <section>
        <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
          Recent tasks
        </h3>
        <Card padding="none">
          <TaskListLegacy tasks={recent} />
        </Card>
      </section>
    </div>
  );
}

