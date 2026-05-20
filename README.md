# TaskFlow — React Coding Challenge

Welcome! You are working on **TaskFlow**, a production-style task management dashboard built with React and TypeScript. Your job is to reproduce issues, implement fixes, and be ready to explain your approach in a follow-up discussion.

## Stack

| Layer | Technology |
|-------|------------|
| UI | React 19, TypeScript |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| State | Redux Toolkit, TanStack React Query |
| Forms | React Hook Form |
| API | In-memory mock layer (`src/services/`, `src/mocks/`) |

## Getting started

### Prerequisites

[Node.js](https://nodejs.org/) **v18+** and npm.

### Clone, branch, and run

Use a branch **named after you** (e.g. `alex-kumar` or `jane-doe`) for all challenge work. Reviewers will evaluate **your branch**, not `main`.

```bash
git clone <your-participant-repo-url>
cd <repo-folder>

# Create and switch to your branch (use the name your interviewer gave you, or firstname-lastname)
git checkout -b <your-name>

npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Submit your work (push your branch)

When you are done (or at the agreed checkpoint), commit on **your branch** and push so reviewers can see your code:

```bash
git add .
git commit -m "Complete interview tasks — <your name>"
git push -u origin <your-name>
```

Tell your interviewer the **branch name** you pushed. They will review that branch during the debrief — do not rely on uncommitted local changes only.

### Demo login

| Field | Value |
|-------|--------|
| Email | `alex@taskflow.io` |
| Password | `demo1234` |

Other mock users in `src/mocks/users.ts` can sign in with **any password of 6+ characters** (after trimming whitespace).

## App overview

| Route | Description |
|-------|-------------|
| `/login` | Authentication |
| `/dashboard` | Stats cards and recent tasks |
| `/tasks` | Search, filters, pagination, CRUD |
| `/tasks/:id` | Task detail |
| `/interview-tasks` | **Coding challenge checklist** (requirements and acceptance criteria) |

After login, use the header **Task** link to open the checklist. The sidebar provides **Dashboard** and **Tasks**.

Mock data includes **58 seeded tasks**, multiple users, and notifications — all in-memory (no backend required).

## Coding challenge workflow

1. Work on **your named branch** only (see [Clone, branch, and run](#clone-branch-and-run)).
2. Open **Task** in the header → `/interview-tasks`.
3. Click a card to read full requirements and pass criteria in the modal.
4. Implement fixes in the app (bugs, enhancements, and one integration task).
5. When an item is complete, set its `done` field from `false` to `true` in `src/pages/InterviewTasksPage.tsx` (`DEFAULT_TASKS`).
6. Commit and **push your branch** before the review (see [Submit your work](#submit-your-work-push-your-branch)).
7. Note any **extra bugs** you find outside the checklist for the review discussion.

**Bonus:** Fixing additional issues beyond the checklist is encouraged.

Your interviewer will confirm which checklist items are in scope for your session (typically **tasks 1–12**). For **task 12**, they will provide a separate **bilingual editor** file package to copy into the project.

### Submission conventions

- **Sign your work:** Add a comment with **your name** on each file you change, placed **near the code you fixed** (for example: `// Fixed by Alex — dashboard recent tasks click`). This helps reviewers trace your changes and helps you recollect what you did in the debrief.
- **Debug logging is fine:** You may leave `console.log` (or similar) statements you added while debugging. You do **not** need to remove them before submission unless you prefer a cleaner diff.

### Checklist items (summary)

Full acceptance criteria are in the checklist UI and in `DEFAULT_TASKS` inside `src/pages/InterviewTasksPage.tsx`. Open each card for details and any reference images.

| # | Category | Title |
|---|----------|-------|
| 1 | Bug | Dashboard clickable recent tasks |
| 2 | Enhancement | Cursor pointer styles on buttons |
| 3 | Bug | Dark / light mode toggle |
| 4 | Bug | Remove unwanted sidebar button |
| 5 | Bug + Enhancement | New task form defaults, validation and required labels |
| 6 | Bug | Dashboard stats show correct live values |
| 7 | Enhancement | Update brand color palette |
| 8 | Bug | Fix delete button in tasks table |
| 9 | Bug | Fix recent tasks table UI (reference image in modal) |
| 10 | Bug | Sidebar full page height (reference image in modal) |
| 11 | Bug | Fix uncaught error on Done tab |
| 12 | New Task | Integrate bilingual content editor (files from your interviewer) |

## Suggested time and deliverables

Spend roughly **2–3 hours** (or as directed by your interviewer) on some or all of:

1. Reproducible bug reports with steps.
2. Fixes for checklist items you can complete.
3. Brief notes on performance, accessibility, or TypeScript improvements you would make next.
4. A short explanation of how you debugged each issue you fixed.

## What we evaluate

| Area | What to demonstrate |
|------|---------------------|
| React fundamentals | State, effects, immutability, component boundaries |
| State management | Redux as single source of truth; no direct mutation |
| Debugging | Clear repro steps; console/network; isolating components |
| Performance | Leaks, redundant fetches, expensive renders, memoization |
| TypeScript | Safe optional access; tighter types; fewer unsafe casts |
| Code quality | Focused changes; clear naming; minimal unrelated refactors |
| Architecture | API vs UI state; query invalidation; routing and URL sync |
| Attention to detail | Mobile layout, a11y, edge cases, async behavior |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |

## Project structure

```
src/
  components/     UI, layout, tasks, modals, notifications
  pages/          Login, Dashboard, Tasks, Task detail, Interview checklist
  hooks/          Shared hooks (debounce, filters, window size, etc.)
  context/        Auth and theme
  store/          Redux slices and hooks
  services/       Mock API (auth, tasks, notifications)
  mocks/          Seed data and in-memory stores
  utils/          Helpers and validation
  types/          Shared TypeScript types
  routes/         Router and protected routes
public/
  images/         Reference assets (e.g. recent-tasks-expected.png)
```

Path alias `@/` maps to `src/` (see `vite.config.ts` / `tsconfig`).

## Questions during the session

Ask your interviewer for **scope** (which tasks are required), **timebox**, and the **bilingual editor package** for task 12. Do not expect solution guides in this repository — requirements live in the app checklist and this README.

## License

Provided for interview and assessment use by your hiring team.
