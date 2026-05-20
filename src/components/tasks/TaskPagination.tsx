import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface TaskPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function TaskPagination({
  page,
  totalPages,
  total,
  onPageChange,
}: TaskPaginationProps) {
  const displayPage = page + 1;

  return (
    <Card padding="sm" className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p className="text-sm text-slate-500">
        Showing page <span className="font-medium text-slate-700 dark:text-slate-300">{displayPage}</span> of{' '}
        <span className="font-medium text-slate-700 dark:text-slate-300">{totalPages}</span>
        <span className="mx-2 text-slate-300">·</span>
        {total} tasks total
      </p>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={page <= 0}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={page >= totalPages - 1}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </Card>
  );
}
