import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { IconPlus } from '@/components/ui/icons';
import { useAppDispatch } from '@/store/hooks';
import { openTaskModal } from '@/store/slices/uiSlice';

export function QuickActions() {
  const dispatch = useAppDispatch();

  return (
    <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">Quick actions</p>
        <p className="mt-0.5 text-base font-semibold text-slate-900 dark:text-white">
          What would you like to do?
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => dispatch(openTaskModal(null))}>
          <IconPlus size={16} />
          New task
        </Button>
      </div>
    </Card>
  );
}
