# CyberSis — Project log

A running record of everything done on this project, in order, and why.
Newest stage at the bottom. Updated with every commit.

---

## Stage 0 — Repository setup (2026-11-01)

### What we did
1. **Created the GitHub repo** `Distinguish101/cybersisi` and ran `git init` locally with `origin` pointing at it.
2. **Fixed "no main branch".** GitHub showed no `main` because nothing had been committed. A branch is just a pointer to a commit, so it doesn't exist until the first commit is pushed.
3. **Wrote `README.md`** with the agreed tech stack (Next.js 15, Postgres/Neon + Prisma, Auth.js v5, Stripe Connect, Resend, Claude Haiku vetting, OpenTelemetry → Jaeger, k3s on Oracle Cloud, GitHub Actions → GHCR).
4. **Set git identity** (`user.name`, `user.email`). Commits fail without it.
5. **Removed stale lock files** (`.git/index.lock`, `.git/next-index-*.lock`) left by an interrupted git command. No git process was running, so deleting them was safe.
6. **First commit pushed to `main`**, then created the `feature-1` branch for work.

### Why / lessons
- The repo lives in **OneDrive**, which syncs and locks files inside `.git` and is the likely cause of the stale locks. Consider moving the project to e.g. `C:\dev\cybersisi`.

---

## Stage 0.5 — Planning: checklist and design review (2026-11-01)

### What we did
- Reviewed the **website checklist** ("Cybercel") against the stack.
- Cross-referenced both with the **HTML design mock-up** (`cybersis.html`).

### Key findings
- **The checklist and the stack describe different products.** The checklist is a charity information site. The stack (accounts, Stripe Connect payouts, teacher vetting) is a two-sided platform. Agreed approach: build the information site first, platform features later.
- **Safeguarding:** AI vetting can only be triage. Adults working with members need **PVG checks (Scotland)**, references and a human decision.
- **Data protection:** members can be 16–17, so the ICO Children's Code applies. Keep personal data out of traces. Disclose Anthropic as a processor if AI vetting is used.
- **Stripe Connect isn't needed by the design.** Mentors are volunteers and funders donate, so Stripe Checkout is enough unless instructors will be paid.
- **Design bugs found:** no mobile menu, white-on-gradient buttons fail contrast, the animated heading reads as noise to screen readers, content stays invisible if JS fails, Google Fonts sends visitor IPs to Google, the copyright year is wrong, and there are no safeguarding or privacy pages.

### Open decisions (not yet made)
- [x] Final name: **CyberSis**. Decided in Stage 1.1. The repo is still called `cybersisi`.
- [ ] How much of the founder's personal story stays public, especially details about her brother, who hasn't necessarily consented.
- [ ] Permission to use "Abertay University" on the site (corrected from "University of Dundee" in Stage 3).
- [ ] Whether Stripe Connect is needed at all.
- [ ] Wording review with young people ("Her future is encrypted", "clever girl").

---

## Stage 1 — Site pages (2026-11-01) · branch `feature-1`

### What we did
Scaffolded **Next.js 15 (App Router) + React 19 + TypeScript** and split the single-page mock-up into separate routes:

| Route | Content | Source |
|---|---|---|
| `/` | Hero, proverb, three pillars, join cards, CTA | Mock-up |
| `/story` | Founder story, timeline, founder quote | Mock-up (copy unchanged) |
| `/programmes` | Six programmes, plus a short "Why cyber" section | Mock-up + checklist |
| `/village` | Who CyberSis is for (four audiences) | Mock-up |
| `/get-involved` | Member / mentor / partner cards (`#members`, `#mentors`, `#partners`) | Mock-up |
| `/contact` | Email, FAQs | **New**: checklist asked for Contact + FAQs |
| `/safeguarding` | Support lines, how to raise a concern, outline of the policy | **New**: checklist "Safety and trust" |
| `/privacy` | Current data practice, outline of the privacy notice | **New**: checklist "Safety and trust" |
| 404 | Not-found page | New |

Shared pieces live in `src/components/` (header, footer, brand, page hero, CTA band, pillars, join cards, support lines). Site constants are in `src/lib/site.ts`.

### Fixes applied while porting (and why)
- **Real mobile menu.** The mock-up's ☰ only scrolled to "Join". It now opens and closes a nav, with `aria-expanded` and Escape to close.
- **Button contrast.** Primary buttons now use dark text on the gradient. White was about 3.3:1, which fails WCAG AA; dark text is over 5:1.
- **Accessible animated heading.** The decode effect is `aria-hidden`, and the real text sits in a screen-reader-only span.
- **Content visible without JS.** The `.reveal` hide-then-fade only applies once JS has loaded (`html.js`).
- **Self-hosted fonts** via `next/font`, so no requests go to Google (GDPR). Verified: 0 Google Fonts references in the built HTML.
- **Skip link**, `aria-current` on the active nav item, and a proper heading per page.
- **Lighter blur effects on mobile**, for performance on low-end phones.
- **Copyright year** is now generated instead of hard-coded "2027".
- **Per-page titles and descriptions** for SEO, plus Open Graph tags.
- **`output: "standalone"`** in `next.config.ts`, ready for the container image and k3s deploy later.

### Deliberately not done yet
- **Forms.** Join buttons are still `mailto:` links, marked `TODO(forms stage)`. Next stage.
- **Policy text.** The safeguarding and privacy pages are clearly labelled **Draft** with an outline only. Real policies must be written and approved by the organisation, with a named Designated Safeguarding Lead, before launch.
- **Content not in the source** was kept minimal. FAQ answers only restate what the site already commits to (`TODO(content)` for founder review).

### Notes
- **README restored.** The initial commit on `main` turned out to contain an empty `README.md`, so the stack table had been lost, probably around the time of the lock-file problem. It's back, with run instructions added.
- **TypeScript pinned to 5.x.** npm installed TS 7 by default, which Next 15 doesn't target.
- **`npm audit`:** 2 findings in the PostCSS bundled inside Next 15. They only matter when processing untrusted CSS at build time, which we don't do. The only fix is Next 16, which is outside the agreed stack. Revisit when upgrading.
- **Verified:** `next build` passes (11 static pages). Every route returns 200, and unknown routes return 404.

### How to run
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

---

## Stage 1.1 — Name decided, upgrade to Next.js 16 (2026-11-01) · branch `feature-1`

### What we did
- **Name confirmed: CyberSis.** It was already used throughout the site, `package.json` and `site.ts`, so no copy changes were needed.
- **Upgraded Next.js 15.5 → 16.4** (React 19.3, TypeScript 5.9). README stack table updated.

### Why
- The stack table is a guide, not a fixed spec. Stage 1 had stayed on Next 15 only because the table said so.
- Next 16 fixes the 2 `npm audit` findings from Stage 1 (vulnerable PostCSS bundled in Next 15). **`npm audit` now reports 0 vulnerabilities.**
- Starting on the current major avoids a migration later, once forms, auth and the database are in.

### What changed in the code
- Nothing in `src/`. The app already followed Next 16's rules: no `middleware`, no sync `params`, no `next lint` script.
- Next 16 rewrote `tsconfig.json` on first build (`jsx: "react-jsx"`, plus `.next/dev/types`). That's expected and kept.

### Notes for later stages
- In Next 16, **`middleware.ts` is renamed `proxy.ts`**. Use that name if we add auth or route protection.
- **Turbopack** is now the default for `dev` and `build`.

### Verified
- `next build` passes. Every route returns 200, unknown routes return 404, and there are 0 Google Fonts requests.

---

## Stage 1.2 — CLAUDE.md (2026-11-01) · branch `feature-1`

### What we did
- Added **`CLAUDE.md`**, a guide for AI coding assistants working in this repo. It covers the commands, the architecture (styling and tokens, the scroll-reveal pattern, the accessible decode heading, site constants), the stage → log → commit → push workflow, and the safeguarding and content rules.

### Why
- It means a future session doesn't have to rediscover non-obvious patterns from several files, for example that `.reveal` relies on one observer plus the `html.js` class, or that `DecodeText` needs an `.sr-only` twin. It also keeps the safeguarding constraints in front of whoever edits the code.
- It also records the Windows PowerShell `npm` execution-policy workaround, which we hit when running `npm run dev`.

---

## Stage 1.3 — CLAUDE.md made local-only (2026-11-01) · branch `feature-1`

### What we did
- Stopped tracking `CLAUDE.md` in git (`git rm --cached`). The file stays on the developer's machine.
- Excluded it through `.git/info/exclude` rather than `.gitignore`, so the exclusion is also local and nothing about it appears in the repo.

### Why
- The owner wants the AI-assistant guide kept as a private local file, not published in the repository.

### Note
- The file still exists in the history of commit `e06ae64` (Stage 1.2), which has already been pushed. Removing it from history would mean rewriting and force-pushing `feature-1`. That hasn't been done.

---

## Stage 2 — Local Postgres + Prisma (2026-11-01) · branch `feature-1`

### Decision: local Postgres for development, Neon for production
- Development and tests run against **Postgres 17 in Docker** (`docker-compose.yml`). It works offline, has no cold starts, and costs nothing.
- Neon is plain Postgres, so **no extra code is needed to deploy there**. Only the environment changes. Neon gives a pooled `DATABASE_URL` for the app and a direct `DIRECT_URL` for migrations, both with `sslmode=require`. Local uses the same URL for both.
- **Same major version (17) as Neon**, to avoid version differences.

### What we did
- `docker-compose.yml`: a `cybersis-db` container with a named volume and a health check.
- **Prisma 7.10** with the `pg` driver adapter (`@prisma/adapter-pg`). It's the standard Node driver, which suits a long-running server on k3s. Neon's serverless driver is only needed for edge or serverless hosting.
- `prisma.config.ts`: the CLI (migrate, studio) uses `DIRECT_URL`, because Neon's PgBouncer pooler can't hold migration locks.
- `src/lib/db.ts`: a single shared `PrismaClient` (reused across dev hot-reloads), marked `server-only` so it can never be bundled into browser code.
- **Generated client** goes to `src/generated/prisma`. It's git-ignored and recreated by `postinstall: prisma generate`.
- **First migration** `20261101212819_init`: a `Submission` table plus `SubmissionType` and `SubmissionStatus` enums, indexed for the admin list and for retention clean-up. The SQL was reviewed before committing.
- **npm scripts:** `db:up`, `db:migrate`, `db:deploy`, `db:studio`.
- `.env.example` is committed. `.env` is git-ignored.

### The schema is a proposal
The `Submission` fields (first name, email, optional age range, organisation, message, and a consent timestamp) are deliberately minimal for data protection. **They still need the owner's sign-off** in the forms stage, along with the under-18 consent approach, the retention period and who the admins are. Changing them before launch is cheap: just a new migration.

### Migration plan
- **Local:** `npm run db:migrate` (`prisma migrate dev`) creates and applies migration SQL. Migration files are committed and never edited afterwards.
- **Production (Neon):** `prisma migrate deploy` runs once as a **GitHub Actions** step before `kubectl apply`, not when each pod starts, so pods can't race each other. If it fails, the deploy stops and the old version keeps running. `migrate dev` must never be run against Neon.
- **Before launch:** run `migrate deploy` against a Neon branch first.

### Issues hit along the way
- **Prisma CLI resolved to `8.0.0-rc`** (a pre-release) and didn't match the 7.10 client. Pinned the CLI to `prisma@7`.
- **npm 11 blocks package install scripts by default.** Approved only `prisma` and `@prisma/engines` (they download the migration engine), recorded under `allowScripts` in `package.json`. The approval is tied to the exact version, so re-approve after upgrading Prisma.
- The npm install was very slow, probably OneDrive syncing `node_modules`. That's another reason to move the project out of OneDrive.

### Verified
- The container is healthy and running Postgres 17.11.
- The migration applied, and a round-trip test (insert → count → delete) through the generated client passed.
- `tsc --noEmit` and `next build` pass, and `npm audit` reports 0 vulnerabilities.

---

## Stage 3 — Audience wording: open to all young women (2026-11-02) · branch `feature-1`

### What we did
Removed the "care-experienced" framing across the site. CyberSis is **for all young women aged 16–25**, whatever their background.

| Where | Before → after |
|---|---|
| Home hero | "for care-experienced young women — and everyone raised by the village" → "for young women" |
| Home stats | "Care-experienced first" → "Open to all young women" |
| Footer, README, site description (SEO) | "care-experienced young women" → "young women" |
| Join card (members) | "Care-experienced or raised by the village, aged 16–25?" → "A young woman aged 16–25?" |
| FAQ "Who can join?" | Long care/migrant list → "Any young woman aged 16–25, whatever her background — including if you're new to the UK." |
| Programmes "Why cyber" | "skills many care-experienced young women already have" → "skills many young women already have" |
| Village page | First card is now "Young women, 16–25" (open to all). "Raised by the village" and "New to the UK" now refer to young women. New lede and description. |
| Story | "care-experienced young women, and the young people the village has carried" → "young women". The timeline line "Care-experienced, but never without community" → "Never without community". |

### Why
- The owner's direction: the network is inclusive of all women, so it should say "women", not target care experience.
- It also replaced "young people" with "young women" wherever "young people" implied a mixed-gender audience.

### Kept deliberately
- **"The village" concept** and the founder's own memorial lines ("Carried by the village", "the way Excelsis was carried"). They're about her story, not an eligibility rule.
- **Ages 16–25** are unchanged, so the under-18 and Children's Code points still apply.

### Verified
- No remaining "care-experienced", "looked-after", "foster", "kinship" or "young people" wording in `src/` or the README.
- `next build` passes.

### Note
- The founder story (`/story`) was edited at the owner's explicit request. Otherwise it stays as her own copy.

### Addendum: founder's full name in the footer
- The footer credit now reads "Founded by **Excelsis Ikem**" (was "Excelsis"), at the owner's request. The founder quote on `/story` now also shows "Excelsis Ikem".

### Addendum: university corrected to Abertay
- The founder studies at **Abertay University** (Dundee), not the University of Dundee. Corrected in four places: the home stats ("Student-led · Abertay University"), the story paragraph, the 2025 timeline entry and the founder sign-off ("BSc Cyber Security, Abertay University").
- The open decision still applies: get Abertay's OK before launch, because naming the university can suggest it endorses CyberSis.

---

## Decisions for the forms stage (2026-11-02)

The owner answered the four open questions from Stage 2:

| Question | Decision | Notes |
|---|---|---|
| **Form fields** | **Minimal set + optional phone** | **Member:** first name, email, age range (16–17 / 18–25), how you heard (optional), message (optional), phone (optional). **Mentor:** name, email, job/role, LinkedIn (optional), message, phone (optional). **Partner:** name, email, organisation, interest (sponsor / host / fund / other), message, phone (optional). |
| **Consent for ages 16–17** | **Her own consent** | In Scotland, 16-year-olds have legal capacity to agree to this themselves. The privacy wording must be plain-language (Children's Code). No adult sign-off step. |
| **Retention** | **12 months after last contact** | Then deleted automatically, unless the person becomes a member or mentor. |
| **Admins** | **Owner only** at launch | One admin account. More can be added later. |

These change the proposed `Submission` schema from Stage 2. The forms stage will add a new migration (phone, role, LinkedIn, interest, how-heard, `lastContactedAt` for retention), plus a staff user table.
- **Notification inbox and admin login:** the owner's personal email, kept in the local `.env` as `NOTIFY_EMAIL` and `ADMIN_EMAIL`, deliberately not in the repo. `.env.example` has placeholders.

---

## Stage 3.1 — Sharing previews through Cloudflare tunnel (2026-11-02)

### Problem
The `trycloudflare.com` link showed a different (broken-looking) site from localhost. The owner was running `next dev`, and Next 16's dev server blocks its own scripts for origins it doesn't recognise. The HTML loaded, but without JS the `.reveal` sections stayed hidden, the heading animation didn't play, the mobile menu didn't work and live reload was blocked.

### Fix
- Added `allowedDevOrigins: ["*.trycloudflare.com"]` to `next.config.ts`. This only affects `next dev`.
- For sharing, the preferred route is still the production build (`npm run build` then `npm run start`). Remember to rebuild after every change.
