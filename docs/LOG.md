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
- [ ] Permission to use "University of Dundee" on the site.
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
