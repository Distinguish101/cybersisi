# CyberSis — Deploy checklist (MVP)

The MVP is the information site plus the three register-interest forms. It runs on the **same Oracle k3s VM as IdistinguishR**, in its own `cybersis` namespace, with **Neon** for Postgres. Tick items as they're done and note the date.

Key: **[code]** in the repo · **[you]** an account, console or decision only the owner can do · **[content]** wording or sign-off.

---

## Before deploy

### Stage 5: deploy plumbing (in the repo)
- [x] [code] `Dockerfile` (deps, builder, runner; Node 24, non-root, standalone). The builder stage doubles as the `migrate` image
- [x] [code] `.dockerignore` (keeps `.env`, `.git`, `docs` and `k8s` out of the image)
- [x] [code] `/api/health` (no database; `?ready=1` checks the database, for people and monitors only, **never a probe**)
- [x] [code] Security headers and `poweredByHeader: false` in `next.config.ts`
- [x] [code] Rate limiter reads the client IP Traefik saw (the rightmost `X-Forwarded-For`), not the spoofable leftmost one
- [x] [code] `k8s/`: namespace, deployment (1 replica), service, ingress with HTTPS redirect, migration Job, secret template
- [x] [code] `.github/workflows/deploy.yml`: typecheck on pull requests; on push to `main`: build arm64 images, then migrate, roll out and smoke test
- [x] [code] `.github/dependabot.yml`
- [x] [code] Docker image built and run locally against the local database, with a form submitted end to end

### Database and migrations
- [x] [you] Create a Neon project (**Postgres 17**, EU region, e.g. Frankfurt or London). Note both URLs: **pooled** (`-pooler` in the host) and **direct**. Done 2026-11-17: project `cybersis`, **AWS London (eu-west-2)**, database `neondb`. Both URLs in Bitwarden (CyberSis folder)
- [x] [you] Create a Neon **branch** and run `migrate deploy` against it first (see "Running migrations by hand" below). Check that both migrations (`init`, `forms_fields`) apply, then delete the branch. Done 2026-11-17 on branch `migrate-test`: "Database schema is up to date!"
- [x] [you] Check the app's **pooled** URL works with the `pg` driver (`/api/health?ready=1` and one form post against the branch), then delete the `migrate-test` branch. Done 2026-11-17: `database: ok`, the row was saved, and the branch was deleted
- [ ] [you] Check Neon's restore window on the free plan (Console → Settings) and write it here: ____
- [ ] [code] Rule from now on: migrations only add things (add first, move the code, remove later). Old and new pods overlap during a rollout

### Domain, email, DNS
- [x] Decided 2026-11-17: **`cybersis.uk`**. `cybersis.org` is already registered (via Wix, October 2024, nothing connected to it). `.scot` was considered, then `.uk` was bought
- [x] [you] Registered `cybersis.uk` through **Cloudflare Registrar** (2026-11-17), so the DNS is already in Cloudflare
- [ ] [you] Check in Cloudflare: **auto-renew ON**, 2FA on the Cloudflare account, and the registrant contact details correct (the organisation's, if it exists as an entity)
- [x] (2026-11-17: resolves to 144.21.58.215; Traefik answers on port 80) [you] Cloudflare DNS: an `A` record from `cybersis.uk` to the VM's public IP, **DNS only (grey cloud)**. `www` comes later
- [x] [you] Check the VM's public IP is **reserved** in Oracle. Checked 2026-11-17: it's **Ephemeral**. It survives reboots and stop/start, and only changes if the VM is terminated, so it doesn't block deploy. Converting it is a planned maintenance job (see "After deploy → First month")
- [x] [you] Resend: add `cybersis.uk`, add its SPF and DKIM records in Cloudflare, wait for "Verified", create an API key. Done 2026-11-18: verified, and the `cybersis-prod` key (sending only) is in Bitwarden
- [ ] [you] `hello@cybersis.uk` is a working inbox (the privacy page tells people to email it for deletion)

### Cluster and GitHub
- [ ] [you] Repo secret `KUBE_CONFIG` on `Distinguish101/cybersisi` (base64 kubeconfig, the same as IdistinguishR's for now)
- [ ] [you] GitHub → repo Settings → Environments → create `production` (optionally "required reviewers" = you)
- [ ] [you] After the first image push: GitHub → Packages → `cybersisi` → make it **public** (the cluster pulls without credentials, as for IdistinguishR). The image holds no secrets
- [ ] [you] Create the k8s Secret (see "Creating the secret" below). Keep the values in a password manager

### Content and legal (launch blockers, not deploy blockers)
- [ ] [content] Privacy notice: controller details, hosting location (Neon EU, Oracle region), UK GDPR rights. Remove "Draft" only after sign-off
- [ ] [content] Safeguarding policy with a named Designated Safeguarding Lead. Remove "Draft" only after sign-off
- [ ] [content] Abertay University's permission to be named
- [ ] [content] Decision on how much of the founder story stays public

> The site can be deployed before launch for previews while the content is still in draft. Just don't share it publicly.

---

## Deploy

1. Merge `feature-1` into `main` (via a PR: the typecheck runs on it).
2. The push to `main` triggers the workflow: **build**, **migrate Job**, **rollout**, **smoke test**.
3. First time only: make the GHCR package public (above), then re-run the workflow if the pull failed.

### Creating the secret
```bash
cp k8s/secret.example.yaml k8s/secret.yaml     # git-ignored
# fill in the values in an editor (never paste them into chat)
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/secret.yaml
rm k8s/secret.yaml
```

### Running migrations by hand (Neon branch test, or emergencies)
```bash
# PowerShell: $env:DIRECT_URL = "<direct url>"; npx prisma migrate deploy
DIRECT_URL="<direct url>" npx prisma migrate deploy
```
Never run `migrate dev` against Neon.

---

## After deploy

### Same day
- [ ] `https://cybersis.uk` loads with a valid certificate. `http://` redirects to `https://`
- [ ] `/api/health` returns `{"status":"ok"}`. `/api/health?ready=1` returns ok (database reachable)
- [ ] Submit one real form for each type (member, mentor, partner). The rows appear in Neon, and the alert email arrives with **first name only**
- [ ] Delete those test rows in the Neon console
- [ ] **Client IP check:** submit 6 times quickly from your phone on mobile data. The 6th is blocked. Then submit from the laptop on Wi-Fi: it is **not** blocked. If the laptop is blocked too, every visitor shares one IP (k3s ServiceLB is SNAT-ing). In that case, set Traefik's service to `externalTrafficPolicy: Local` (this affects IdistinguishR too) or raise the limit
- [ ] Response headers include `Strict-Transport-Security` and no `X-Powered-By` (`curl -sI https://cybersis.uk`)
- [ ] IdistinguishR still works (shared VM and Traefik)

### First week
- [ ] External uptime monitor (UptimeRobot or Better Stack, free) on `https://cybersis.uk/api/health`, every 5 minutes. **Not** `?ready=1`, which keeps Neon awake
- [ ] Neon console: compute usage looks low, and the database sleeps when idle
- [ ] VM disk space (`df -h`). Two apps' images now pile up. Prune old images
- [ ] Save an export of the Cloudflare DNS records (including the Resend ones)
- [ ] Write down the process until the admin page exists: **deletion requests** are handled in the Neon console or Prisma Studio, within one month

### First month: swap the ephemeral IP for a reserved one (planned maintenance, affects both sites)
Oracle can't convert an ephemeral IP in place. You remove it and attach a reserved IP, which is a **new address**. Pick a quiet time:
- [ ] Set the Cloudflare TTL on both `A` records (`idistinguishr.com`, `cybersis.uk`) to 1–2 minutes a day ahead
- [ ] Check whether the kubeconfigs (both laptops, plus the `KUBE_CONFIG` secret in **both** repos) use the public IP as `server:`. If so, add the new IP to k3s's `tls-san` (`/etc/rancher/k3s/config.yaml`) and restart k3s **before** the swap, or kubectl will fail with certificate errors
- [ ] Oracle: VNIC → IPv4 Addresses → Edit → "No public IP", then Edit → "Reserved public IP" → create one (name it `vm-main`)
- [ ] Update both `A` records to the new IP, update the kubeconfigs and both `KUBE_CONFIG` secrets, then check both sites and a `kubectl get pods`
- [ ] Note the new IP in the IdistinguishR Notion page (step 20)

### Before launch (May 2027)
- [ ] **Stage 6: admin page** (owner login, list, mark contacted or accepted, delete)
- [ ] **Stage 7: 12-month deletion job** (a Kubernetes CronJob, nightly, idempotent). It must exist before the first entry turns 12 months old, and well before that in practice
- [ ] Nightly `pg_dump` to storage you control, a **tested restore**, and backups that respect the 12-month deletion
- [ ] Content-Security-Policy (inventory the scripts first)
- [ ] Remove the "Draft" labels once the policies are signed off

### Not in the MVP (later)
Auth.js accounts, Stripe, Claude vetting (triage only), OpenTelemetry and Jaeger (never trace form bodies), autoscaling and more than one replica (needs a shared rate limiter first), central logs, `www` redirect, Cloudflare proxy.
