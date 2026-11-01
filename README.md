# Stack Forge

<div align="center">

**A developer workspace for building a professional identity, showcasing work, and managing the work behind it.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Status](https://img.shields.io/badge/Status-In%20Development-F59E0B?style=for-the-badge)](#)

</div>

## Overview

Stack Forge is a **developer-focused portfolio and productivity platform**.

The core idea is simple: a developer should not need one place for a portfolio, another for project management, another for personal notes, and another for understanding their GitHub activity. Stack Forge brings those workflows into a single workspace centered around the developer's professional profile.

A user's **profile acts as the source of their professional identity**. Projects, skills, experience, education, and technology choices can be managed from the dashboard and used to present a public-facing developer profile and portfolio.

At the same time, the private dashboard provides tools for managing the work behind that public presence: projects, tasks, notes, GitHub activity, productivity information, and account settings.

> **Stack Forge connects the developer's public identity with the workspace used to build it.**

---

## Why Stack Forge?

A developer's professional presence is usually fragmented:

| Need | Typical destination |
| --- | --- |
| Source code & contributions | GitHub |
| Professional portfolio | Personal website |
| Project planning | Task/project tools |
| Notes & ideas | Notes/documentation tools |
| Developer discovery | Social/networking platforms |
| Professional profile | Multiple disconnected pages |

Stack Forge is designed to reduce that fragmentation by combining the most relevant developer workflows into one product.

---

## How It Works

```mermaid
flowchart LR
    A[Developer] --> B[Authentication]
    B --> C[Developer Profile]
    C --> D[Portfolio]
    C --> E[Projects]
    C --> F[Skills & Experience]
    C --> G[Education]

    A --> H[Dashboard]
    H --> E
    H --> I[Tasks]
    H --> J[Notes]
    H --> K[GitHub Activity]
    H --> L[Productivity Overview]

    M[Developer Directory] --> C
    M --> N[Public Developer Profile]
    N --> D

    H --> O[NestJS API]
    O --> P[(PostgreSQL)]
    O --> Q[Better Auth]
    O --> R[AI Response API]
```

### 1. Create an account

Authentication is handled through **Better Auth**. The frontend keeps authenticated requests credentialed so the backend can resolve the user's session.

### 2. Build the developer profile

The profile stores the information that defines the developer's professional identity. The backend currently provides dedicated modules for:

- Profile information
- Skills
- Projects
- Technology stack
- Work experience
- Education

### 3. Build the portfolio

Projects and profile information become the foundation for a professional portfolio experience. The portfolio is not a separate data silo; it is driven by the developer's underlying profile and project data.

### 4. Manage work from the dashboard

The dashboard acts as the developer's private workspace. It brings together:

- Quick actions
- Profile/portfolio overview
- GitHub activity
- Today's tasks
- Recent notes
- Recent projects
- Continue-working context
- Productivity information
- Upcoming items
- Dashboard messaging UI

### 5. Discover other developers

The public `/devs` experience retrieves developer profiles and presents them as discoverable profile cards. Individual developer pages provide a public-facing profile surface.

The backend also contains a follow system for following users and retrieving follower/following relationships.

### 6. Connect with the backend

The Next.js frontend communicates with the separate NestJS API through a small API service layer. Requests use credentials so Better Auth session cookies can be used across the frontend/backend boundary.

---

## Core Features

### 👤 Developer Profiles

- Public developer profiles
- Professional identity and profile information
- Skills
- Work experience
- Education
- Profile-driven portfolio presentation

### 💼 Portfolio

- Portfolio management from the dashboard
- Project-driven work showcase
- Professional presentation of technical work
- Public developer-facing presentation

### 📁 Project Management

- Create and manage projects
- Project descriptions and links
- Technology-stack association
- Project information that can feed the portfolio experience

### 🐙 GitHub Workspace

- GitHub-focused dashboard area
- Contribution activity visualization
- Repository-oriented developer information
- GitHub activity as part of the developer's professional workspace

### ✅ Tasks

- Task management
- Status-based task workflow
- Today's task view
- Dashboard task summaries

### 📝 Notes

- Personal developer notes
- Recent-note dashboard view
- Dedicated notes workspace

### 📊 Productivity Dashboard

The dashboard aggregates several pieces of information into one workspace, including GitHub activity, tasks, notes, projects, portfolio status, productivity information, and upcoming work.

### 🔎 Developer Discovery

- Developer directory
- Public profile cards
- Individual developer profile pages
- Follow relationships through the backend API

### 🔐 Authentication & Sessions

- Better Auth integration
- Credentialed frontend/backend requests
- Protected user-specific operations
- Session-aware dashboard experience

### 🤖 AI Backend Capability

The backend currently exposes an `/ai` endpoint that streams model responses through the Vercel AI SDK and OpenRouter. This is an **available backend capability**, rather than the primary purpose of Stack Forge.

---

## Architecture

Stack Forge is split into two repositories:

```text
                    ┌─────────────────────────┐
                    │       Next.js App       │
                    │       React + TS        │
                    └────────────┬────────────┘
                                 │
                         Credentialed HTTP
                                 │
                    ┌────────────▼────────────┐
                    │       NestJS API        │
                    │      REST Modules       │
                    └────────────┬────────────┘
                                 │
                 ┌──────────────┼──────────────┐
                 │              │              │
          ┌──────▼─────┐ ┌──────▼──────┐ ┌────▼─────┐
          │ Better Auth│ │   Drizzle   │ │   AI     │
          │  Sessions  │ │    ORM      │ │ OpenRouter│
          └────────────┘ └──────┬──────┘ └──────────┘
                                │
                         ┌──────▼──────┐
                         │ PostgreSQL  │
                         └─────────────┘
```

### Frontend

The frontend is a Next.js App Router application. Data fetching and server communication are organized around reusable query hooks and an API service layer.

Key frontend technologies include:

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
- React Icons
- Better Auth client

The application uses route groups for authentication and public website experiences, with a dedicated dashboard area for authenticated workflows.

### Backend

The backend is a modular NestJS application. Domain functionality is separated into modules rather than being implemented as one large controller/service layer.

Current backend modules include:

- Authentication
- Users
- Profiles
- Skills
- Projects
- Tasks
- Technology stack
- Follows
- Notes
- Experiences
- Education
- AI

The backend uses PostgreSQL through Drizzle ORM and exposes Swagger/OpenAPI documentation for the API.

---

## Repository Structure

### Frontend

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (website)/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── devs/
│   │   └── page.tsx
│   └── dashboard/
│       ├── github/
│       ├── messages/
│       ├── notes/
│       ├── portfolio/
│       ├── profile/
│       ├── projects/
│       ├── settings/
│       ├── tasks/
│       └── page.tsx
├── components/
│   ├── Shared/
│   └── ui/
├── hooks/
├── lib/
├── services/
├── store/
└── types/
```

### Backend

```text
src/
├── ai/
├── auth/
├── education/
├── experiences/
├── follows/
├── notes/
├── profile/
├── projects/
├── skills/
├── tasks/
├── tech_stack/
├── users/
├── lib/
├── app.module.ts
└── main.ts
```

---

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript |
| UI | Tailwind CSS 4, shadcn/ui, Lucide, React Icons |
| Data fetching | TanStack Query |
| Client state | Zustand |
| Forms & validation | React Hook Form, Zod |
| Charts | Recharts, React GitHub Calendar |
| Animation | Motion |
| Authentication | Better Auth |
| Backend | NestJS 11, TypeScript |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| API documentation | Swagger / OpenAPI |
| AI | Vercel AI SDK, OpenRouter |
| Runtime | Bun |

---

## Getting Started

Stack Forge requires both the frontend and backend repositories for the complete application experience.

### 1. Clone the repositories

```bash
git clone https://github.com/ShawonMondol-Shibu/Stack_Forge.git
git clone https://github.com/ShawonMondol-Shibu/Stack_Forge-Backend.git
```

### 2. Frontend setup

```bash
cd Stack_Forge
bun install
```

Create `.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

The frontend API layer reads `NEXT_PUBLIC_BACKEND_URL` and sends requests with credentials enabled.

Start the frontend:

```bash
bun run dev
```

The frontend is available at:

```text
http://localhost:3000
```

### 3. Backend setup

```bash
cd Stack_Forge-Backend
bun install
```

Create `.env`:

```env
DATABASE_URL=postgres://user:password@localhost:5432/stackforge
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
PORT=5000
OPENROUTER_API_KEY=your-openrouter-api-key
```

Run database migrations:

```bash
bunx drizzle-kit migrate
```

Start the backend:

```bash
bun run start:dev
```

The backend listens on `http://localhost:5000` by default.

Swagger documentation is available at:

```text
http://localhost:5000/api/docs
```

> `OPENROUTER_API_KEY` is only required when using the AI endpoint.

---

## Development Commands

### Frontend

```bash
bun run dev
bun run build
bun run start
bun run lint
```

### Backend

```bash
bun run start:dev
bun run build
bun run start:prod
bun run lint
bun run test
bun run test:e2e
bun run test:cov
```

### Database

```bash
bunx drizzle-kit generate
bunx drizzle-kit migrate
```

---

## API Surface

The backend exposes domain-oriented API areas including:

| Area | Base path | Responsibility |
| --- | --- | --- |
| Authentication | Better Auth | Sign-up, sign-in, sessions |
| Users | `/users` | User lookup |
| Profiles | `/profile` | Developer profile data |
| Skills | `/skills` | Profile skills |
| Projects | `/projects` | Developer projects |
| Tasks | `/tasks` | Task management |
| Tech Stack | `/tech-stack` | Technologies associated with profiles/projects |
| Follows | `/follows` | Follow relationships |
| Notes | `/notes` | Personal notes |
| Experiences | `/experiences` | Professional experience |
| Education | `/education` | Education records |
| AI | `/ai` | Streaming AI responses |

Most user-specific operations rely on the authenticated Better Auth session.

---

## Current Scope

The current product is focused on the **developer identity + workspace** problem:

- Developer profile
- Public developer discovery
- Portfolio
- Projects
- Skills and professional history
- GitHub activity
- Tasks
- Notes
- Dashboard productivity views
- Authentication and settings
- Backend follow relationships
- Backend AI response capability

Some areas visible in the frontend structure are still being developed and should not be treated as completed product functionality.

---

## Project Status

Stack Forge is an **active development project**. The architecture and core domain model are already split into a dedicated Next.js frontend and NestJS backend, but the product is still evolving.

The goal is not to build another generic social network or another generic task manager. The product is centered around a developer's professional identity and the workflows required to build, maintain, and present that identity.

---

## Related Repository

**Backend:** https://github.com/ShawonMondol-Shibu/Stack_Forge-Backend

**Frontend:** https://github.com/ShawonMondol-Shibu/Stack_Forge

---

## License

This project is currently under active development and is not published under an explicit open-source license.

---

<div align="center">

**Build your profile. Manage your work. Showcase what you build.**

</div>
