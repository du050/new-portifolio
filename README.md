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
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=           # optional — enables live GitHub stats
```

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

## Personalization

Edit portfolio content in:

```
packages/shared/src/content/portfolio-seed.ts
```

Update profile name, bio, projects, experience, and social links. Re-run seed after changes:

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
