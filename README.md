# cybersisi

Website for **CyberSis** — *Coded with care*: a cyber sisterhood for care-experienced young women. Dundee, Scotland · launching May 2027.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

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
