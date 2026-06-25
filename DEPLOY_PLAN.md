# Deployment Plan — BMS Location (Misar Demo)

**Target:** Vercel  
**Stack:** React 19 + Vite + React Router DOM — localStorage only, no backend

---

## Phase 1 — Repository Setup

### 1.1 Initialize Git
```bash
cd "BMS Cars Rent/frontend"
git init
git add .
git commit -m "chore: initial commit — BMS Location Misar demo"
```

### 1.2 Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Name: `bms-location`
3. Visibility: **Public** or **Private** (both work with Vercel)
4. Do NOT initialize with README — we already have one
5. Copy the remote URL shown after creation

### 1.3 Push to GitHub
```bash
git remote add origin https://github.com/<your-username>/bms-location.git
git branch -M main
git push -u origin main
```

---

## Phase 2 — Deploy on Vercel

### 2.1 Import the project
1. Go to [vercel.com](https://vercel.com) and sign in (use your GitHub account)
2. Click **Add New Project**
3. Find and import the `bms-location` repository

### 2.2 Configure the project
Vercel will show a configuration screen — set these:

| Setting | Value |
|---------|-------|
| **Root Directory** | `frontend` |
| **Framework Preset** | Vite (auto-detected) |
| **Build Command** | `npm run build` (auto-filled) |
| **Output Directory** | `dist` (auto-filled) |

### 2.3 Deploy
Click **Deploy** — Vercel builds and publishes in ~1 minute.

Live URL: `https://bms-location.vercel.app`

---

## Phase 3 — Verify

Open the live URL and test all routes:

- `/` — Homepage loads correctly
- `/voitures` — Cars list, available cars show "Demander" button
- `/admin` — Admin panel, form to create rental, QR code generation, pending requests list
- `/rental/<any-uuid>` — Refresh the page (Vercel handles SPA routing natively — no 404)

---

## Phase 4 — Continuous Deployment (Automatic)

Every `git push` to `main` triggers a new Vercel deployment automatically. No extra setup needed.

```bash
# Make a change, then:
git add .
git commit -m "fix: something"
git push
# Vercel picks it up and redeploys within ~1 minute
```

---

## Notes

- **No code changes required** — Vercel handles SPA routing, base paths, HTTPS, and CDN out of the box. The `vite.config.js` stays untouched.
- **localStorage-based** — data does not persist across browsers or devices. Each visitor starts with an empty state. Expected for a demo.
- **No authentication** on `/admin` by design (demo mode).
- **Custom domain** (optional): Vercel dashboard → Project → Settings → Domains → add your domain.
