# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Website for **CyberSis**, "Coded with care": a cyber sisterhood for care-experienced young women aged 16–25, in Dundee, Scotland, launching May 2027. The GitHub repo is named `cybersisi`, but the product name is **CyberSis**.

`docs/LOG.md` is the running project log: what was done at each stage, why, and the open decisions. Read it before starting work.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000 (Turbopack)
npm run build      # production build; also runs the TypeScript check
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

There is no lint script or test suite yet. `next build` is the verification step. Next 16 removed `next lint`, so add ESLint directly if it's needed.

On Windows PowerShell, `npm` can fail with "running scripts is disabled". Use `npm.cmd run dev`, or `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

## Architecture

**Next.js 16 App Router, React 19, TypeScript, plain CSS.** There's no Tailwind and no CSS modules. Every route under `src/app/` is a static server component. Only three components are client components: `SiteHeader` (mobile menu state), `RevealObserver` and `DecodeText`.

- **Styling:** all styles live in `src/app/globals.css`, with design tokens in `:root` (`--ink`, `--magenta`, `--violet`, `--cyan`, `--gold`, `--cream`, `--muted`). Fonts come from `next/font/google` in `layout.tsx` and are exposed as `--font-display`, `--font-body` and `--font-mono`. They're self-hosted so visitors' browsers never call Google; keep it that way.
- **Scroll reveal:** an inline script in `layout.tsx` adds `html.js`. CSS hides `.js .reveal` elements, and the single `RevealObserver` in the layout adds `.in` as they enter the viewport, re-running on each route change. To animate an element, add `className="reveal"`. Don't add per-component observers. Without JS, content stays visible.
- **`DecodeText` is `aria-hidden`.** Wherever it's used, the parent must also contain the real text in an `.sr-only` span. See the hero `<h1>` in `src/app/page.tsx`.
- **Site constants:** `src/lib/site.ts` holds the name, URL, email, `mainNav` (drives both the desktop and mobile nav) and the `mailto()` helper.
- **Page metadata:** each route exports `metadata`. The layout's title template appends ` · CyberSis`.
- **Primary buttons use dark text** (`--ink`) on the gradient. White fails WCAG AA there.
- **Next 16:** route protection goes in `proxy.ts`, not `middleware.ts`. `next.config.ts` uses `output: "standalone"` for the container deploy.

## Planned stack (README)

Postgres (Neon) + Prisma, Auth.js v5, Resend, Stripe, Claude Haiku for profile vetting, OpenTelemetry → Jaeger, k3s on Oracle Cloud, GitHub Actions → GHCR. None of these are installed yet. The README table is **guidance, not a fixed spec**: choose better options when justified, explain why, and update the README and the log.

## Workflow

- Work in stages, one at a time, on a feature branch (currently `feature-1`).
- At the end of every stage, append an entry to `docs/LOG.md` (what was done, why, and what was verified), then commit and push.

## Content and safeguarding constraints

- **`TODO(forms stage)`:** join and contact buttons are still `mailto:` links, to be replaced by registration forms.
- **The `/safeguarding` and `/privacy` pages are labelled drafts.** Don't write policy text that commits the organisation to anything. The real policies need the organisation's sign-off and a named Designated Safeguarding Lead.
- **Vetting:** in Scotland, adults working with members need **PVG** checks (not DBS), references and a human decision. AI vetting may only triage.
- **Under-18 members:** the ICO Children's Code applies, so collect minimal data. Never put personal data (form bodies, names, emails) into traces or logs.
- **The founder's story** (`/story`) is the founder's own copy. Don't edit it: whether to reduce its personal detail is an open decision (see `docs/LOG.md`). FAQ answers should only restate what the site already commits to.
