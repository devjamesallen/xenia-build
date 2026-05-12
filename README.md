# Xenia Home Build · xeniabuild.com

Personal tracker for our Diyanni Harbor Spring custom build in Xenia Township, Ohio.

🌐 **Live:** [xeniabuild.com](https://xeniabuild.com)
🗄 **Backend:** Supabase (Postgres + Auth)

## Pages

**Public (anyone can view):**
- **Overview** (`/`) — Hero, key stats, project dashboard
- **Gallery** (`/gallery`) — Photos of the Harbor Spring (filterable by room)
- **Floor Plan** (`/floor-plan`) — 1st & 2nd floor plans + 3 elevations
- **Features** (`/features`) — Gold Package standard features + full brochure
- **Budget** (`/budget`) — Live budget with sliders + mortgage calc
- **Evolution** (`/evolution`) — Planned vs actual + budget changes over time
- **Timeline** (`/timeline`) — Project schedule from survey through move-in
- **Decisions** (`/decisions`) — Decision tracker

**Admin (requires sign-in):**
- **Admin** (`/admin`) — Edit budget, timeline, decisions, journal entries

## Stack

- Static HTML/CSS/JS hosted on **Vercel** — no build step
- **Supabase** (Postgres) for data persistence + auth
- **Chart.js** for evolution charts
- Mobile-first responsive design
- Falls back to hardcoded data when Supabase isn't configured

## Setting Up Supabase

See **[supabase/SETUP.md](supabase/SETUP.md)** for step-by-step instructions:
1. Create free Supabase project
2. Run `supabase/schema.sql` (creates tables, triggers, RLS policies)
3. Run `supabase/seed.sql` (initial data)
4. Add your Project URL + anon key to `js/config.js`
5. Create your admin user in Supabase dashboard
6. Disable public signups (only you can write)

## Deploy to xeniabuild.com (Vercel)

Repository: [github.com/devjamesallen/xenia-build](https://github.com/devjamesallen/xenia-build)

### One-time setup

1. **Push to GitHub:**
   ```bash
   cd website
   git init
   git add .
   git commit -m "Initial Xenia Home tracker"
   git branch -M main
   git remote add origin https://github.com/devjamesallen/xenia-build.git
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import" next to your `xenia-build` repo
   - Framework Preset: **Other** (it's a static site)
   - Root Directory: `./`
   - Click **Deploy**

3. **Add custom domain (xeniabuild.com):**
   - In Vercel project → Settings → Domains
   - Add `xeniabuild.com` AND `www.xeniabuild.com`
   - Vercel will show you DNS records to add
   - Go to your domain registrar (Namecheap, GoDaddy, etc.)
   - Add the DNS records Vercel gave you:
     - **A record** for `@` pointing to `76.76.21.21`
     - **CNAME** for `www` pointing to `cname.vercel-dns.com`
   - Wait 5-30 minutes for DNS to propagate
   - Vercel will auto-issue an SSL certificate

### Automatic deploys

Every `git push` to `main` triggers a new Vercel deploy. No manual work needed.

```bash
# Make a change, then:
git add .
git commit -m "Update budget numbers"
git push
# Live on xeniabuild.com in 30-60 seconds
```

## Customizing

All build data is in **`js/data.js`** — edit prices, decisions, timeline, gallery URLs there. The site re-renders automatically.

Things to update as you go:
- **Land cost** — once survey is final
- **Well/septic costs** — after quotes come in
- **Gallery URLs** — replace with photos of YOUR build progress
- **Timeline status** — change `status: ""` to `status: "done"` as milestones complete

## Folder structure

```
website/
├── index.html              # Home / Overview
├── gallery.html            # Photo gallery
├── floor-plan.html         # Floor plans + elevations
├── features.html           # Gold Package features
├── budget.html             # Budget tracker + calc
├── timeline.html           # Schedule
├── decisions.html          # Decision tracker
├── favicon.svg             # Site icon
├── css/styles.css          # All styles
├── js/
│   ├── app.js              # Shared functions (nav, calcs)
│   ├── data.js             # Build data — EDIT THIS
│   └── meta.js             # SEO/OG meta tag injector
├── images/
│   └── gold-features/      # Gold Package PDF pages (extracted)
├── vercel.json             # Vercel deploy config (clean URLs, caching)
├── .gitignore
└── README.md
```

## Privacy

Decision tracker stores data in `localStorage` — stays in your browser, never sent to a server. Different devices/browsers won't sync (each keeps its own state).

## Local Development

To run locally:
```bash
cd website
python3 -m http.server 8000
# Open http://localhost:8000
```

No npm install, no build step — just a folder of files.
