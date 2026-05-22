# Developer Portfolio — Full-Stack Monorepo

A production-quality developer portfolio with a premium React frontend, NestJS API, PostgreSQL database, and Docker deployment support.

## Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 19, TypeScript, Vite, TailwindCSS v4, Framer Motion, shadcn/ui patterns, React Router, Recharts, Lucide |
| Backend | NestJS 11, Prisma ORM, PostgreSQL, class-validator |
| Shared | TypeScript contracts and seed content |
| DevOps | Docker Compose, multi-stage builds, Nginx |

## Project Structure

```
├── apps/
│   ├── api/          # NestJS REST API
│   └── web/          # React Vite SPA
├── packages/
│   └── shared/       # Shared types & portfolio content
├── docker-compose.yml
└── README.md
```

## Prerequisites

- Node.js 20+
- PostgreSQL 16+ (or Docker)
- npm 10+

## Quick Start (Local)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

Edit `apps/api/.env`:

```env
DATABASE_URL=postgresql://portfolio:portfolio_secret@localhost:5432/portfolio_db
JWT_SECRET=change-this-to-a-long-random-secret
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=           # optional — enables live GitHub stats
```

The `DATABASE_URL` must match your Postgres instance (Docker Compose uses `portfolio` / `portfolio_secret` on port `5432`). Verify connectivity with `GET /api/health` (`database: connected`).

### 3. Start PostgreSQL

Using Docker:

```bash
docker compose up postgres -d
```

### 4. Initialize database

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### 5. Run development servers

```bash
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:3001/api
- Health: http://localhost:3001/api/health

## Docker (Full Stack)

```bash
docker compose up --build
```

- Web: http://localhost
- API: http://localhost:3001/api

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/portfolio` | Full portfolio content |
| GET | `/api/portfolio/profile` | Profile only |
| GET | `/api/portfolio/skills` | Skill categories |
| GET | `/api/portfolio/projects` | All projects |
| GET | `/api/portfolio/projects/:slug` | Single project |
| GET | `/api/portfolio/experience` | Work experience |
| GET | `/api/portfolio/certifications` | Certifications |
| GET | `/api/portfolio/learning` | Learning paths |
| GET | `/api/github/stats` | GitHub statistics (cached) |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/auth/login` | Admin login (JWT) |
| GET | `/api/auth/me` | Current user (Bearer token) |
| GET | `/api/admin/portfolio` | Portfolio content for admin panel (authenticated) |
| PUT | `/api/admin/portfolio` | Update portfolio content (**Super Admin** only) |
| GET | `/api/admin/access` | Role capabilities for the signed-in user |
| GET | `/api/admin/users` | List users (**Super Admin** only) |
| POST | `/api/admin/users` | Create user (**Super Admin** only) |

## RBAC & Admin Panel

Three roles are stored in PostgreSQL (`users` table):

| Role | Admin panel | Edit portfolio data | Manage users |
|------|-------------|---------------------|--------------|
| `STANDARD` | View (read-only) | No | No |
| `ADMIN` | View (read-only) | No | No |
| `SUPER_ADMIN` | Full edit | Yes | Yes |

**Standard** and **Admin** have the same permissions (read-only showcase data). Only **Super Admin** can save changes from the UI.

- Admin UI: http://localhost:5173/admin/login → http://localhost:5173/admin
- After `npm run db:seed`, demo accounts:

| Email | Password (default) | Role |
|-------|-------------------|------|
| `superadmin@portfolio.dev` | `SuperAdmin123!` | Super Admin |
| `admin@portfolio.dev` | `Admin123!` | Admin |
| `viewer@portfolio.dev` | `Viewer123!` | Standard |

Override seed passwords with `SEED_SUPER_ADMIN_PASSWORD`, `SEED_ADMIN_PASSWORD`, and `SEED_VIEWER_PASSWORD` in `apps/api/.env`.

## Personalization

Edit portfolio content in:

```
packages/shared/src/content/portfolio-seed.ts
```

Update profile name, bio, projects, experience, and social links. Re-run seed after changes, **or** sign in as Super Admin and edit via the admin panel (no manual DB edits required).

```bash
npm run db:seed
```

Environment variables:

| Variable | App | Description |
|----------|-----|-------------|
| `DATABASE_URL` | API | PostgreSQL connection string |
| `GITHUB_USERNAME` | API | GitHub username for stats |
| `GITHUB_TOKEN` | API | Personal access token (optional) |
| `CORS_ORIGIN` | API | Allowed frontend origins |
| `JWT_SECRET` | API | Secret for signing admin JWTs |
| `JWT_EXPIRES_IN_SECONDS` | API | Token lifetime (default 7 days) |
| `SEED_SUPER_ADMIN_PASSWORD` | API | Seed password for super admin |
| `VITE_API_URL` | Web | API base URL |

## Production Build

```bash
npm run build
```

Build outputs:

- `apps/api/dist` — NestJS compiled output
- `apps/web/dist` — Static SPA assets

## Deployment Notes

### Frontend (Vercel / Netlify / Cloudflare Pages)

1. Set build command: `npm run build -w @portfolio/web`
2. Set output directory: `apps/web/dist`
3. Set `VITE_API_URL` to your production API URL

### API (Railway / Render / Fly.io)

1. Deploy `apps/api` with Node 20
2. Set `DATABASE_URL` to managed PostgreSQL
3. Run `npx prisma db push && npx ts-node prisma/seed.ts` on deploy

### Database

Use managed PostgreSQL (Neon, Supabase, RDS). Run migrations:

```bash
npm run db:migrate
```

## Fonts & Assets

Recommended fonts (already configured via Google Fonts):

- **Inter** — UI typography
- **JetBrains Mono** — code and metrics

Replace assets in `apps/web/public/`:

- `avatar.svg` — profile avatar
- `favicon.svg` — browser icon

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start API + Web concurrently |
| `npm run build` | Build all packages |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed portfolio & GitHub data |
| `npm run db:migrate` | Run Prisma migrations |

## License

MIT
