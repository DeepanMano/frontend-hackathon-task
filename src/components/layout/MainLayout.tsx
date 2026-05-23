import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ToastContainer } from '@/components/ui/Toast';
import { TaskModal } from '@/components/tasks/TaskModal';
import { useAppSelector } from '@/store/hooks';
import { fetchTaskById } from '@/services/taskService';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useEffect, useState } from 'react';
import type { Task } from '@/types';

export function MainLayout() {
  const title = usePageTitle();
  const modalOpen = useAppSelector((s) => s.ui.taskModalOpen);
  const editingId = useAppSelector((s) => s.ui.editingTaskId);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  useEffect(() => {
    if (!editingId) {
      Promise.resolve().then(() => {
        setEditingTask(undefined);
      });
      return;
    }
    let cancelled = false;
    fetchTaskById(editingId).then((task) => {
      if (!cancelled) setEditingTask(task);
    });
    return () => {
      cancelled = true;
    };
  }, [editingId]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 dark:bg-slate-950">
      {/* Header is fixed at the top */}
      <Header title={title} />

      <div className="flex min-h-0 flex-1">
        {/* Sidebar is fixed on the left */}
        <Sidebar />
        
        {/* Middle area with Outlet in a scrollable main viewport */}
        <main className="main-scroll surface-dots min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      <ToastContainer />
      <TaskModal open={modalOpen} task={editingTask} />
    </div>
  );
}
