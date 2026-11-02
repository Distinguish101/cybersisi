# cybersisi

Website for **CyberSis** — *Coded with care*: a cyber sisterhood for young women. Dundee, Scotland · launching May 2027.

## Getting started

Requires Node 20.9+ and Docker Desktop (for the local database).

```bash
npm install
cp .env.example .env    # local database URLs
npm run db:up           # start Postgres 17 in Docker
npm run db:migrate      # apply migrations
npm run dev             # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run build` | Production build (includes type check) |
| `npm run db:up` | Start the local Postgres container |
| `npm run db:migrate` | Create/apply migrations locally (`prisma migrate dev`) |
| `npm run db:deploy` | Apply committed migrations only (`prisma migrate deploy`) — CI/production |
| `npm run db:studio` | Browse the database in Prisma Studio |

On Windows PowerShell, use `npm.cmd` if `npm` is blocked by the execution policy.

Project history and decisions: [docs/LOG.md](docs/LOG.md).

## Tech stack

| Layer     | Choice                                                                              |
| --------- | ----------------------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router) · React 19 · TypeScript                                     |
| Database  | PostgreSQL (Neon) · Prisma ORM                                                      |
| Auth      | Auth.js v5 (credentials; Google OAuth scaffolded, not fully wired — see `src/lib/auth.ts`) |
| Payments  | Stripe Connect (Express, Accounts v2)                                               |
| Email     | Resend                                                                              |
| AI        | Anthropic API (Claude Haiku) for automated teacher-profile vetting                  |
| Tracing   | OpenTelemetry → self-hosted Jaeger                                                  |
| Hosting   | k3s (Kubernetes) on Oracle Cloud · Traefik · cert-manager                           |
| CI/CD     | GitHub Actions → GHCR → `kubectl apply`                                             |
