import { useState } from 'react';
import { PageHeader } from '@/components/ui/Card';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/modals/Modal';
import clsx from 'clsx';

interface InterviewTask {
  id: string;
  category: 'Bug' | 'Enhancement' | 'Bug + Enhancement' | 'New Feature';
  title: string;
  description: string;
  done: boolean;
}

const BRAND_PALETTE = [
  { token: 'brand-50', hex: '#ecfdf5' },
  { token: 'brand-100', hex: '#d1fae5' },
  { token: 'brand-200', hex: '#a7f3d0' },
  { token: 'brand-500', hex: '#10b981' },
  { token: 'brand-600', hex: '#059669' },
  { token: 'brand-700', hex: '#047857' },
] as const;

const DEFAULT_TASKS: InterviewTask[] = [
  {
    id: 'task-1',
    category: 'Bug',
    title: 'Dashboard Clickable Recent Tasks',
    description: `
      <p><strong>Goal:</strong> Recent tasks on the Dashboard must be fully interactive list rows.</p>
      <ul>
        <li>Click any row under <strong>Recent tasks</strong> to open its detail page</li>
        <li>Row shows pointer cursor and hover background styling</li>
        <li>Detail page shows the same title, status, and due date as the clicked row</li>
        <li>Back / browser back returns to the Dashboard</li>
      </ul>
      <p><strong>Pass:</strong> Every recent task row is clickable and opens the correct detail page.</p>
    `,
    done: true,
  },
  {
    id: 'task-2',
    category: 'Enhancement',
    title: 'Cursor Pointer Styles on Buttons',
    description: `
      <p><strong>Goal:</strong> All interactive controls should show a pointer (hand) cursor on hover.</p>
      <ul>
        <li>Header buttons (menu, theme toggle, notifications, Task link)</li>
        <li>Tasks page filters, pagination, and table row actions</li>
        <li>Modal buttons (Save, Cancel, close)</li>
        <li>Login submit button</li>
      </ul>
      <p><strong>Also verify:</strong> Disabled or loading buttons do <em>not</em> show the pointer cursor.</p>
    `,
    done: true,
  },
  {
    id: 'task-3',
    category: 'Bug',
    title: 'Dark / Light Mode Toggle Not Working',
    description: `
      <p><strong>Goal:</strong> The moon/sun theme button in the header must switch themes correctly.</p>
      <ul>
        <li>Click the button — UI switches between light and dark mode immediately</li>
        <li>Icon updates to match the active theme (moon in light, sun in dark)</li>
        <li>Preference persists after page refresh</li>
        <li>All major surfaces (header, sidebar, cards, forms) reflect the selected theme</li>
      </ul>
    `,
    done: true,
  },
  {
    id: 'task-4',
    category: 'Bug',
    title: 'Remove Unwanted Sidebar Button',
    description: `
      <p><strong>Goal:</strong> Sidebar navigation should only contain intended menu items.</p>
      <ul>
        <li>Sidebar shows only <strong>Dashboard</strong> and <strong>Tasks</strong></li>
        <li>No duplicate, unused, or broken extra buttons remain</li>
        <li>Layout stays clean on desktop and mobile drawer</li>
        <li>Remaining nav links still work without console errors</li>
      </ul>
    `,
    done: true,
  },
  {
    id: 'task-5',
    category: 'Bug + Enhancement',
    title: 'New Task Form Defaults, Validation & Required Labels',
    description: `
      <p><strong>Goal:</strong> Improve the <strong>new task form</strong> defaults, validation, and required-field UX.</p>
      <ul>
        <li><strong>Status</strong> defaults to <em>To Do</em> when creating a new task</li>
        <li><strong>Due date</strong> defaults to today&apos;s date</li>
        <li>Each required label shows a red asterisk (<strong style="color:#FF0000">*</strong>) using hex color <code>#FF0000</code></li>
        <li>
          Validation on submit:
          <ul>
            <li>Submitting with missing or invalid required data does not create a task</li>
            <li>On submit, <strong>Title</strong>, <strong>Status</strong>, <strong>Priority</strong>, <strong>Assignee</strong>, and <strong>Due date</strong> are all validated together</li>
            <li>Each of those fields is shown as required with a red asterisk (<strong style="color:#FF0000">*</strong>) on its label</li>
            <li>When any of them is missing or invalid, show a specific error message directly below that control (e.g. <em>Title is required</em>, <em>Status is required</em>) — the same field-level pattern as other validations in the form</li>
          </ul>
        </li>
      </ul>
    `,
    done: true,
  },
  {
    id: 'task-6',
    category: 'Bug',
    title: 'Dashboard Stats Show Correct Live Values',
    description: `
      <p><strong>Goal:</strong> Dashboard stat cards must reflect live task data — not empty or static values.</p>
      <ul>
        <li><strong>Total tasks</strong> — matches total task count</li>
        <li><strong>To do</strong> — matches tasks with status <code>todo</code></li>
        <li><strong>In progress</strong> — matches tasks with status <code>in_progress</code></li>
        <li><strong>Completed</strong> — matches tasks with status <code>done</code></li>
        <li><strong>Blocked</strong> — matches tasks with status <code>blocked</code></li>
      </ul>
      <p><strong>Also verify:</strong> Counts update after creating, editing, or deleting tasks.</p>
    `,
    done: true,
  },
  {
    id: 'task-7',
    category: 'Enhancement',
    title: 'Update Brand Color Palette',
    description: `
      <p><strong>Verify:</strong> Buttons, links, sidebar active state, and focus rings use the new palette in light and dark mode.</p>
    `,
    done: true,
  },
  {
    id: 'task-8',
    category: 'Bug',
    title: 'Fix Delete Button in Tasks Table',
    description: `
      <p><strong>Goal:</strong> The delete button in the tasks table must work reliably.</p>
      <ul>
        <li>Clicking <strong>Delete</strong> on a task row opens the confirmation dialog</li>
        <li>Confirming removes the correct task from the list</li>
        <li>Canceling closes the dialog without deleting anything</li>
        <li>There should not be any uncaught errors in the console</li>
      </ul>
    `,
    done: true,
  },
  {
    id: 'task-9',
    category: 'Bug',
    title: 'Fix Recent Tasks Table UI',
    description: `
      <p><strong>Goal:</strong> The Dashboard <strong>Recent tasks</strong> section must match the expected table/list design below.</p>
      <p><strong>Expected UI:</strong></p>
      <a href="/images/recent-tasks-expected.png" target="_blank" rel="noopener noreferrer">
        <img src="/images/recent-tasks-expected.png" alt="Expected UI" />
      </a>
      <p><strong>Pass:</strong> Recent tasks visually match the reference screenshot in both light and dark mode.</p>
    `,
    done: true,
  },
  {
    id: 'task-10',
    category: 'Bug',
    title: 'Sidebar Full Page Height',
    description: `
      <p><strong>Goal:</strong> The sidebar should fill the full page height from the header to the bottom of the viewport.</p>
      <p><strong>Expected UI:</strong></p>
      <a href="/images/sidebar-expected-design.png" target="_blank" rel="noopener noreferrer">
        <img src="/images/sidebar-expected-design.png" alt="Expected sidebar design" />
      </a>
      <p><strong>Pass:</strong> Sidebar layout matches the reference screenshot (full viewport height, correct alignment).</p>
    `,
    done: true,
  },
  {
    id: 'task-11',
    category: 'Bug',
    title: 'Fix Uncaught Error on Done Tab',
    description: `
      <p><strong>Goal:</strong> Fix the uncaught error on the Tasks page when switching to the <strong>Done</strong> tab.</p>
    `,
    done: true,
  },
  {
    id: 'task-12',
    category: 'New Feature',
    title: 'Integrate Bilingual Content Editor',
    description: `
      <p><strong>First task:</strong> Copy the provided bilingual editor files into this project and integrate them into TaskFlow.</p>
      <ul>
        <li>Add an <strong>Editor</strong> item in the sidebar <em>between</em> Dashboard and Tasks</li>
        <li>Register an <code>/editor</code> route and render the copied editor when Editor is clicked</li>
      </ul>
    `,
    done: true,
  },
];

function BrandColorPalette() {
  return (
    <ul className="space-y-2.5">
      {BRAND_PALETTE.map(({ token, hex }) => (
        <li
          key={token}
          className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/80 px-2.5 py-2 dark:border-slate-700 dark:bg-slate-800/50"
        >
          <input
            type="color"
            value={hex}
            onChange={() => {}}
            aria-label={`${token} color`}
            className="h-9 w-9 shrink-0 cursor-pointer rounded-lg border border-slate-200 bg-transparent p-0.5 dark:border-slate-600"
          />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
            {token}
          </span>
        </li>
      ))}
    </ul>
  );
}

function categoryClass(category: InterviewTask['category']) {
  if (category === 'Bug') {
    return 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300';
  }
  if (category === 'Bug + Enhancement') {
    return 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300';
  }
  if (category === 'New Feature') {
    return 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300';
  }
  return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300';
}

export function InterviewTasksPage() {
  const [tasks, setTasks] = useState<InterviewTask[]>(DEFAULT_TASKS);
  const [detailTask, setDetailTask] = useState<InterviewTask | null>(null);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div className="space-y-8 p-4 pb-8 lg:p-8">
      <PageHeader
        title="Coding Challenge Checklist"
        description={
          <>
            Your task list for this interview session. Each card is a{' '}
            <strong className="font-semibold text-slate-700 dark:text-slate-300">
              bug fix, enhancement, or new feature
            </strong>{' '}
            in the TaskFlow app —{' '}
            <strong className="font-semibold text-slate-700 dark:text-slate-300">click it</strong>{' '}
            to read the{' '}
            <strong className="font-semibold text-slate-700 dark:text-slate-300">
              requirements and acceptance criteria
            </strong>
            . Once completed, manually change that task&apos;s{' '}
            <strong className="font-semibold text-slate-700 dark:text-slate-300">done</strong> value
            from{' '}
            <strong className="font-semibold text-slate-700 dark:text-slate-300">false</strong> to{' '}
            <strong className="font-semibold text-slate-700 dark:text-slate-300">true</strong>{' '}
            <strong className="font-semibold text-slate-700 dark:text-slate-300">in code</strong>.
            <span className="mt-2 block">
              <strong className="font-semibold text-slate-700 dark:text-slate-300">
                Bonus: Discovering and fixing additional bugs on your own — beyond this checklist — is
                encouraged.
              </strong>
            </span>
            <span className="mt-2 block text-slate-600 dark:text-slate-400">
              Add a comment with <strong className="font-semibold text-slate-700 dark:text-slate-300">your name</strong>{' '}
              near each fix (e.g. <code className="text-xs">// Fixed by Alex</code>) — it helps reviewers and{' '}
              <strong className="font-semibold text-slate-700 dark:text-slate-300">you recollect</strong> your work
              during the review. You may leave <code className="text-xs">console.log</code> calls you added for
              debugging — removing them is optional.
            </span>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tasks.map((task) => (
          <Card
                key={task.id}
            interactive
                role="button"
                tabIndex={0}
                onClick={() => setDetailTask(task)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setDetailTask(task);
                  }
                }}
            className={`cursor-pointer relative flex flex-col justify-between overflow-hidden border transition-all ${
                    task.done
                ? 'border-emerald-200/80! bg-emerald-50/80! dark:border-emerald-800/60! dark:bg-emerald-950/30! hover:border-emerald-300! dark:hover:border-emerald-700!'
                : 'border-slate-200/60 dark:border-slate-800 hover:border-brand-200 dark:hover:border-brand-900/50'
            }`}
                >
            <div className="space-y-3.5">
              <div className="flex items-start justify-between gap-3">
                  <span
                    className={clsx(
                      'inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                      categoryClass(task.category),
                    )}
                  >
                    {task.category}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTask(task.id);
                    }}
                  className={`cursor-pointer flex h-5 w-5 items-center justify-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
                    task.done
                      ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                      : 'border border-slate-300 dark:border-slate-600 hover:border-brand-400'
                  }`}
                    aria-label={task.done ? 'Mark as not done' : 'Mark as done'}
                  >
                  {task.done && <span className="text-[10px] font-bold">✓</span>}
                  </button>
                </div>

              <div>
                <h4
                  className={`text-[12px] font-semibold transition-all ${
                    task.done
                      ? 'text-emerald-800/70 line-through decoration-emerald-400/60 dark:text-emerald-300/80'
                      : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {task.title}
                </h4>
              </div>
            </div>
        </Card>
        ))}
      </div>

      <section>
        <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">Review</h3>
        <Card>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            <strong className="font-semibold text-slate-800 dark:text-slate-200">Note:</strong>{' '}
            Any bugs you find and fix on your own — outside this checklist — should be noted by you and
            discussed during the review session.
          </p>
        </Card>
      </section>

      <Modal
        open={detailTask !== null}
        onClose={() => setDetailTask(null)}
        title={detailTask?.title ?? 'Task details'}
        size={detailTask?.id === 'task-9' || detailTask?.id === 'task-10' ? 'xl' : 'sm'}
      >
        {detailTask ? (
          <div className="space-y-4">
            <span
              className={clsx(
                'inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                categoryClass(detailTask.category),
              )}
            >
              {detailTask.category}
            </span>
            {detailTask.id === 'task-7' ? <BrandColorPalette /> : null}
            <div
              className="interview-task-html"
              dangerouslySetInnerHTML={{ __html: detailTask.description.trim() }}
            />
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
