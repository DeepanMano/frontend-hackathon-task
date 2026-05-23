import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PageHeader } from '@/components/ui/Card';
import { TaskFilters } from '@/components/tasks/TaskFilters';
import { TaskSearch } from '@/components/tasks/TaskSearch';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskPagination } from '@/components/tasks/TaskPagination';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { IconPlus } from '@/components/ui/icons';
import { Card } from '@/components/ui/Card';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setError,
  setFilters,
  setLoading,
  setPage,
  setTasks,
  removeTaskLocal,
} from '@/store/slices/tasksSlice';
import { openTaskModal, pushToast } from '@/store/slices/uiSlice';
import { deleteTask, fetchTasks, getTaskStats } from '@/services/taskService';
import type { Task, TaskStatus } from '@/types';

const PAGE_SIZE = 10;

function buildSearchParams(
  filters: { status?: string; search?: string },
  page: number,
): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.status && filters.status !== 'all') {
    params.set('status', filters.status);
  }
  if (filters.search?.trim()) {
    params.set('search', filters.search.trim());
  }
  if (page > 0) {
    params.set('page', String(page));
  }
  return params;
}

export function TasksPage() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { items, filters, page, total, loading } = useAppSelector((s) => s.tasks);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);
  const [deleting, setDeleting] = useState(false);
  const initializedFromUrl = useRef(false);

  const { data: stats } = useQuery({
    queryKey: ['task-stats'],
    queryFn: async () => getTaskStats(),
  });

  const syncUrl = useCallback(
    (nextFilters: typeof filters, nextPage: number) => {
      setSearchParams(buildSearchParams(nextFilters, nextPage), { replace: true });
    },
    [setSearchParams],
  );

  useEffect(() => {
    if (initializedFromUrl.current) return;
    initializedFromUrl.current = true;

    const status = searchParams.get('status') as TaskStatus | 'all' | null;
    const search = searchParams.get('search') ?? '';
    const pageParam = Number(searchParams.get('page') ?? 0);

    dispatch(
      setFilters({
        status: status && status !== 'all' ? status : 'all',
        search,
      }),
    );
    if (!Number.isNaN(pageParam) && pageParam >= 0) {
      dispatch(setPage(pageParam));
    }
  }, [dispatch, searchParams]);

  const loadTasks = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const res = await fetchTasks(filters, page, PAGE_SIZE);
      dispatch(
        setTasks({
          items: res.data,
          total: res.total,
          page: res.page,
        }),
      );
    } catch {
      dispatch(setError('Failed to load tasks'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, filters, page]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleStatusChange = (status: TaskStatus | 'all') => {
    const nextFilters = { ...filters, status };
    dispatch(setFilters({ status }));
    dispatch(setPage(0));
    syncUrl(nextFilters, 0);
  };

  const handleSearchChange = (search: string) => {
    if (search === (filters.search ?? '')) return;
    const nextFilters = { ...filters, search };
    dispatch(setFilters({ search }));
    dispatch(setPage(0));
    syncUrl(nextFilters, 0);
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
    syncUrl(filters, newPage);
  };

  const handleEdit = (task: Task) => {
    dispatch(openTaskModal(task.id));
  };

  const handleSelect = (task: Task) => {
    const returnPath = `/tasks?${buildSearchParams(filters, page).toString()}`;
    navigate(`/tasks/${task.id}`, {
      state: { task, from: returnPath },
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteTask(deleteTarget.id);
      dispatch(removeTaskLocal(deleteTarget.id));
      await queryClient.invalidateQueries({ queryKey: ['task-stats'] });
      dispatch(pushToast({ type: 'success', message: 'Task deleted' }));
      setDeleteTarget(null);
      await loadTasks();
    } catch (err) {
      dispatch(
        pushToast({
          type: 'error',
          message: err instanceof Error ? err.message : 'Delete failed',
        }),
      );
    } finally {
      setDeleting(false);
    }
  };

  const totalPages = Math.ceil(total / PAGE_SIZE) || 1;

  return (
    <>
      <div className="space-y-6 p-4 pb-8 lg:p-8">
        <PageHeader
          title="Tasks"
          description={
            stats
              ? `${stats.total} total · ${stats.done} completed · ${stats.inProgress} in progress`
              : 'Manage and track your team tasks.'
          }
          action={
            <Button onClick={() => dispatch(openTaskModal(null))}>
              <IconPlus size={16} />
              New task
            </Button>
          }
        />

        <Card className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <TaskSearch value={filters.search || ''} onChange={handleSearchChange} />
        </Card>

        <TaskFilters
          status={(filters.status as TaskStatus | 'all') || 'all'}
          onStatusChange={handleStatusChange}
        />

        <TaskList
          tasks={items}
          loading={loading}
          onEdit={handleEdit}
          onDelete={setDeleteTarget}
          onSelect={handleSelect}
        />

        <TaskPagination
          page={page}
          totalPages={totalPages}
          total={total}
          onPageChange={handlePageChange}
        />
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete task"
        message={`Delete "${deleteTarget?.title}"? This cannot be undone.`}
        loading={deleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}