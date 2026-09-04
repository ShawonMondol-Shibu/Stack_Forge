# Stack Forge

> A developer-focused portfolio, productivity, and networking platform.

Stack Forge is a full-stack platform designed to give developers one place to build their professional identity, showcase projects, manage personal work, connect GitHub activity, and interact with other developers.

## ✨ Overview

Stack Forge combines a public developer profile and portfolio with a private productivity workspace.

The current frontend includes dedicated experiences for:

- Developer profiles and public profile discovery
- Portfolio management
- Project management
- GitHub activity
- Tasks and productivity
- Notes
- Calendar events
- Social feed
- Direct messages
- Notifications
- Account settings
- Dashboard overview

The frontend is built with Next.js and communicates with a dedicated backend API.

## 🚀 Features

### Dashboard

The dashboard acts as the user's personal developer workspace.

It currently brings together:

- Personalized greeting
- Quick actions
- Project overview
- Task overview
- GitHub activity
- Recent notes
- Recent projects
- Continue-working section
- Social feed preview
- Portfolio summary
- Weekly productivity
- Upcoming items
- Messages preview

### Developer Profiles

- Public developer directory
- Individual public developer profiles
- Profile cards
- Developer information and professional identity

### Portfolio

- Portfolio management
- Public portfolio experience
- Project showcase
- Profile-based professional presentation

### Projects

- Project listing
- Project creation and management
- Project details
- Technology stack
- Project links
- Featured projects

### GitHub

- GitHub activity visualization
- Repository-oriented dashboard experience
- GitHub contribution calendar

### Productivity

- Task management
- Task status and priority
- Notes
- Calendar/events
- Productivity overview

### Social

- Developer feed
- Posts
- Developer discovery
- Social interactions

### Messaging

- Conversation interface
- Direct developer communication
- Message previews and unread states

### Notifications

- Notification center
- Activity notifications
- Unread state

## 🧱 Frontend Architecture

The project uses the Next.js App Router with route groups for different application areas.

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   │
│   ├── (website)/
│   │   ├── devs/
│   │   │   └── [profile]/
│   │   └── page.tsx
│   │
│   ├── dashboard/
│   │   ├── calender/
│   │   ├── github/
│   │   ├── messages/
│   │   ├── notes/
│   │   ├── notifications/
│   │   ├── portfolio/
│   │   ├── profile/
│   │   ├── projects/
│   │   ├── settings/
│   │   └── tasks/
│   │
│   ├── layout.tsx
│   └── TanStackProvider.tsx
│
├── components/
│   ├── Shared/
│   ├── ui/
│   ├── ToggleTheme.tsx
│   └── theme-provider.tsx
│
├── hooks/
│   └── queries/
│
├── lib/
│   ├── api-routes/
│   └── types/
│
├── services/
└── store/
```

The repository currently separates UI components, query hooks, API services, shared utilities/types, and client-side stores. This is a solid foundation for further modularization.

## 🛠️ Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- TanStack Query
- Zustand
- React Hook Form
- Zod
- Recharts
- Motion
- Lucide React
- next-themes
- react-github-calendar

### Backend

The frontend is designed to communicate with a separate backend built around:

- NestJS
- PostgreSQL
- Supabase
- Drizzle ORM
- Better Auth

## 🔌 Data Fetching

TanStack Query is used for server-state management.

The project already follows a query-options/service pattern, for example:

```ts
export const getAllProjects = () =>
  queryOptions({
    queryKey: queryKeys.projects.all,
    queryFn: () => projectsService.getAll(),
    select: (data) => data.data,
    staleTime: 1000 * 60 * 5,
  });
```

This keeps API access separate from UI components and provides a clean path for caching, invalidation, mutations, and loading/error states.

## 🌐 API Layer

The frontend uses a centralized `apiService` abstraction for HTTP communication.

```text
React Component
      ↓
TanStack Query
      ↓
Query / Mutation Hook
      ↓
Service Layer
      ↓
apiService
      ↓
NestJS API
      ↓
PostgreSQL / Supabase
```

Requests use `credentials: "include"` so cookie-based authentication can be supported across the frontend/backend boundary.

## 🔐 Authentication

Better Auth is included in the frontend dependencies and the application is structured around a dedicated authentication route group.

Authentication should remain responsible for identity/session concerns, while application-specific profile, portfolio, project, productivity, and social data should remain in the application's own backend/domain models.

## 🎨 UI & Design

The project uses a modern developer-focused SaaS design direction:

- Minimal interface
- Responsive layouts
- Reusable UI components
- Light/dark theme support
- Consistent cards and spacing
- Dashboard-oriented information hierarchy
- Developer-centric visual language

The application currently uses multiple font families through `next/font`, including Geist, Geist Mono, Roboto, and Lato. As the design system matures, consolidating this into one primary UI font plus an optional monospace font is recommended.

## ⚙️ Getting Started

### Prerequisites

- Node.js 20+
- Bun, npm, pnpm, or yarn
- Running Stack Forge backend API

### Clone

```bash
git clone https://github.com/ShawonMondol-Shibu/Stack_Forge.git
cd Stack_Forge
```

### Install

Using Bun:

```bash
bun install
```

Using npm:

```bash
npm install
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000
```

> Keep environment files out of version control and never commit secrets.

### Start Development

```bash
bun dev
```

or:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 📦 Scripts

```bash
bun dev
```

Start the development server.

```bash
bun run build
```

Create a production build.

```bash
bun start
```

Start the production server.

```bash
bun run lint
```

Run ESLint.

Equivalent npm commands are also available through the scripts defined in `package.json`.

## 🧭 Current MVP Scope

### Included

- Authentication UI
- Developer profiles
- Public developer discovery
- Dashboard
- Portfolio
- Projects
- GitHub
- Tasks
- Notes
- Calendar
- Social feed
- Messaging
- Notifications
- Settings

### Intentionally excluded for the current MVP

- Recruiter system
- Job marketplace
- Job applications
- Advanced analytics
- AI assistant
- Community system
- Dedicated admin dashboard

These can be introduced later without changing the core product direction.

## 🔍 Code Review Notes

The current repository has a good starting architecture, but there are several areas worth fixing before calling the frontend production-ready.

### 1. Environment variable naming

The current API helper reads:

```ts
process.env.NEXT_PUBLIC_BACKEND_API_KEY
```

while the error message refers to:

```text
NEXT_PUBLIC_BACKEND_API_URL
```

These should use one canonical variable name. For a backend base URL, `NEXT_PUBLIC_BACKEND_API_URL` is the clearer choice.

### 2. Dashboard data flow

The dashboard currently fetches projects, tasks, technologies, and skills and then copies those server results into Zustand stores inside `useEffect`.

For server state, prefer TanStack Query as the source of truth. Zustand should be reserved for genuine client state such as UI preferences, temporary editor state, filters, or local interaction state.

Avoid creating two sources of truth for the same server data.

### 3. Dashboard payload size

The dashboard currently requests all projects and all tasks for its overview. As the dataset grows, change these endpoints to return dashboard-specific summaries or paginated data.

For example:

```text
GET /dashboard/overview
GET /projects?limit=5
GET /tasks?due=today&limit=5
```

rather than loading an entire collection just to display a small preview.

### 4. List keys

The public developer directory currently uses the array index as the React key.

Prefer a stable domain identifier:

```tsx
key={profile.id}
```

This avoids reconciliation problems when the list changes.

### 5. Route naming

The calendar route is currently named:

```text
/dashboard/calender
```

The conventional spelling is:

```text
/dashboard/calendar
```

Rename it before the project becomes heavily linked or deployed.

### 6. Typography

The root layout currently loads Geist, Geist Mono, Roboto, and Lato.

For a consistent product design system, use:

- Geist for application UI
- Geist Mono only for code/repository content

Remove unused font families unless they serve a deliberate visual role.

### 7. API error handling

The centralized API service already provides a useful foundation by normalizing non-OK responses and handling `204` responses.

The next improvement should be typed API errors and consistent handling of:

- `400`
- `401`
- `403`
- `404`
- `409`
- `422`
- `429`
- `500`

UI components should expose predictable loading, empty, and error states rather than silently rendering nothing.

### 8. Query key discipline

Continue centralizing query keys.

A consistent structure such as:

```text
projects.all
projects.detail(id)
projects.user(userId)
tasks.all
tasks.today
tasks.detail(id)
profile.detail(id)
```

will make invalidation and cache management much easier as the application grows.

## 📈 Recommended Next Engineering Priorities

1. Fix the API environment variable naming.
2. Remove duplicated server state between TanStack Query and Zustand.
3. Create dashboard-specific API summaries.
4. Standardize query keys.
5. Add loading/error/empty states across every data-driven page.
6. Rename `calender` to `calendar`.
7. Replace index-based React keys with stable IDs.
8. Consolidate typography.
9. Add form validation and mutation error handling consistently.
10. Add automated lint/build checks in CI.
11. Add unit/component tests for critical flows.
12. Add end-to-end tests for authentication and major CRUD workflows.

## 🗺️ Roadmap

### Phase 1 — Foundation
- [x] Next.js application structure
- [x] Dashboard shell
- [x] Authentication pages
- [x] Shared UI system
- [x] TanStack Query integration
- [x] API service abstraction

### Phase 2 — Core Product
- [ ] Complete portfolio CRUD
- [ ] Complete project CRUD
- [ ] Complete task workflows
- [ ] Complete notes workflow
- [ ] Complete calendar workflow
- [ ] Complete profile management

### Phase 3 — Developer Features
- [ ] GitHub account connection
- [ ] Repository synchronization
- [ ] Contribution data
- [ ] Developer discovery improvements

### Phase 4 — Social
- [ ] Posts
- [ ] Follows
- [ ] Likes/comments
- [ ] Messaging
- [ ] Notifications
- [ ] Real-time communication

## 📁 Related Repository

Backend:

https://github.com/ShawonMondol-Shibu/Stack_Forge-Backend

Frontend:

https://github.com/ShawonMondol-Shibu/Stack_Forge

## 👨‍💻 Author

**Shawon Mondol Shibu**

GitHub:

https://github.com/ShawonMondol-Shibu

## 📄 License

This project currently does not specify a license in the repository. Add an explicit license before presenting the project as open source.

---

Built as a developer-focused platform for showcasing work, managing productivity, and connecting with other developers.
