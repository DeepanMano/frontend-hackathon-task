import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Modal } from '@/components/modals/Modal';
import { TaskForm } from './TaskForm';
import type { Task } from '@/types';
import { createTask, updateTask } from '@/services/taskService';
import { useAppDispatch } from '@/store/hooks';
import { closeTaskModal, pushToast } from '@/store/slices/uiSlice';
import { upsertTask } from '@/store/slices/tasksSlice';

interface TaskModalProps {
  open: boolean;
  task?: Task;
}

export function TaskModal({ open, task }: TaskModalProps) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    dispatch(closeTaskModal());
  };

  const invalidateStats = () =>
    queryClient.invalidateQueries({ queryKey: ['task-stats'] });

  const handleSubmit = async (values: Parameters<typeof createTask>[0]) => {
    setSubmitting(true);
    try {
      if (task) {
        const updated = await updateTask(task.id, {
          title: values.title,
          description: values.description,
          status: values.status,
          priority: values.priority,
          assigneeId: values.assigneeId,
          dueDate: new Date(values.dueDate).toISOString(),
        });
        dispatch(upsertTask(updated));
        dispatch(pushToast({ type: 'success', message: 'Task updated' }));
      } else {
        const created = await createTask({
          title: values.title,
          description: values.description,
          status: values.status,
          priority: values.priority,
          assigneeId: values.assigneeId,
          dueDate: new Date(values.dueDate).toISOString(),
        });
        dispatch(upsertTask(created));
        dispatch(pushToast({ type: 'success', message: 'Task created' }));
      }
      await invalidateStats();
      handleClose();
    } catch {
      dispatch(pushToast({ type: 'error', message: 'Failed to save task' }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={task ? 'Edit task' : 'New task'}
      size="lg"
    >
      <TaskForm
        key={task?.id ?? 'new'}
        initial={task}
        submitting={submitting}
        onSubmit={handleSubmit}
        onCancel={handleClose}
      />
    </Modal>
  );
}
