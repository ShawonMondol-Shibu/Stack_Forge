# Stack Forge Frontend

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Status](https://img.shields.io/badge/Status-In%20Development-FF6B6B?style=for-the-badge)](#)

</div>

Stack Forge is a developer-focused platform that brings together portfolio building, project tracking, GitHub activity, productivity workflows, and developer networking in one place.

This repository contains the frontend for the Stack Forge product — a modern SaaS-style application designed to help developers present themselves professionally, manage work, and grow their network.

## Why Stack Forge?

Developers often split their online presence across multiple platforms:

- GitHub for code and contribution history
- Portfolio sites for showcasing projects
- Task tools for planning and execution
- Notes and docs for ideas and learning
- Social platforms for networking and discovery

Stack Forge combines these experiences into a single developer workspace.

## Core Experience

- Public developer profiles and discovery
- Personal portfolio management
- Project creation and showcase
- GitHub activity integration
- Task, notes, and calendar workflows
- Dashboard-based productivity overview
- Messaging and social interactions
- Notifications and settings
- Responsive UI with theme support

## Key Features

### Developer Profiles

- Public profile pages
- Skills, experience, and education sections
- Professional identity and portfolio linking

### Portfolio

- Project showcases and work highlights
- Profile-driven presentation of technical achievements
- Clean, developer-first design

### Projects

- Create and manage projects
- Add technologies, links, and summaries
- Display featured work in the portfolio

### Productivity Workspace

- Task tracking and status overview
- Notes and writing space
- Calendar and upcoming events
- Dashboard summaries for focus and momentum

### GitHub Integration

- Contribution activity communication
- Repository-oriented insights
- GitHub-focused dashboard views

### Community & Communication

- Social feed and post interactions
- Developer discovery
- Direct messaging
- Notifications and activity updates

## Tech Stack

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

### Backend

This frontend is designed to communicate with a separate backend built with:

- NestJS
- PostgreSQL
- Supabase
- Drizzle ORM
- Better Auth

## Project Structure

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (website)/
│   │   ├── devs/
│   │   └── page.tsx
│   ├── dashboard/
│   │   ├── github/
│   │   ├── messages/
│   │   ├── notes/
│   │   ├── notifications/
│   │   ├── portfolio/
│   │   ├── profile/
│   │   ├── projects/
│   │   ├── settings/
│   │   ├── tasks/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   └── TanStackProvider.tsx
├── components/
│   ├── Shared/
│   ├── ui/
│   ├── ToggleTheme.tsx
│   └── theme-provider.tsx
├── hooks/
├── lib/
├── services/
├── store/
└── types/
```

## Architecture Overview

The frontend is structured around a modular, scalable app architecture with clear separation between:

- Route-based screens and pages
- Shared and reusable UI components
- Query hooks and data fetching logic
- Service layer and API abstraction
- Client-side state management

This organization makes it easier to extend the product as more features are introduced.

## Getting Started

### Prerequisites

- Node.js 20+
- npm, pnpm, bun, or yarn
- A running Stack Forge backend API

### Clone the repository

```bash
git clone https://github.com/ShawonMondol-Shibu/Stack_Forge.git
cd Stack_Forge/frontend
```

### Install dependencies

Using npm:

```bash
npm install
```

Using bun:

```bash
bun install
```

### Configure environment variables

Create a `.env.local` file in the frontend root:

```env
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000
```

> Keep environment files local and do not commit secrets.

### Run the app

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```
Starts the development server.

```bash
npm run build
```
Creates a production build.

```bash
npm run start
```
Starts the production build.

```bash
npm run lint
```
Runs ESLint checks.

## Current Scope

This frontend currently focuses on the core developer platform experience, including:

- Authentication screens
- Developer profiles and discovery
- Portfolio management
- Project tracking
- GitHub insights
- Productivity workflows
- Notes and tasks
- Messaging and notifications
- Dashboard experience

## Roadmap

Planned future enhancements include:

- Recruiter and hiring workflows
- Job marketplace features
- Advanced analytics
- AI-powered productivity help
- Stronger community features
- Admin dashboard and moderation tools

## Contributing

Contributions are welcome. If you are improving the app, fixing a bug, or adding a feature, feel free to open a pull request and keep the project aligned with the Stack Forge vision.

## Related Repositories

- Backend: https://github.com/ShawonMondol-Shibu/Stack_Forge-Backend
- Frontend: https://github.com/ShawonMondol-Shibu/Stack_Forge

## License

This project is currently under active development. Add an explicit license before presenting it as an open-source project.

---

Built to help developers showcase their work, stay productive, and connect with the wider engineering community.
