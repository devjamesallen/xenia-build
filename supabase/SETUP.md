# Supabase Setup for xeniabuild.com

This site uses Supabase as its database/backend. Follow these steps once to set everything up.

## Step 1: Create a Supabase Project (Free)

1. Go to **[supabase.com](https://supabase.com)** and sign up (use GitHub OAuth for fastest signup)
2. Click **"New Project"**
3. Settings:
   - **Project name:** `xenia-build`
   - **Database Password:** Generate a strong one and save it (you won't need it for the site, but Supabase needs it)
   - **Region:** Choose closest to Ohio — `US East (N. Virginia)` is fine
   - **Pricing plan:** Free
4. Click **Create new project**. Takes ~2 minutes to provision.

## Step 2: Run the Schema

1. In your Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **"+ New query"**
3. Open `supabase/schema.sql` from this repo, copy the entire contents, paste into the editor
4. Click **Run** (or Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned"

## Step 3: Seed Initial Data

1. Back in SQL Editor, click **"+ New query"** again
2. Open `supabase/seed.sql`, copy + paste contents
3. Click **Run**
4. Verify by going to **Table Editor** → you should see populated `budget_items`, `timeline_events`, `decisions`

## Step 4: Get Your API Keys

1. In Supabase dashboard, click **Settings** (gear icon) → **API**
2. Copy these two values:
   - **Project URL** (something like `https://abcdefghij.supabase.co`)
   - **anon / public key** (long string starting with `eyJ...`)

## Step 5: Configure the Site

1. Open `js/config.js` in your repo
2. Replace the placeholders:
   ```js
   window.SUPABASE_CONFIG = {
     url: 'https://YOUR-PROJECT.supabase.co',
     anonKey: 'eyJhbGc...your-anon-key-here...'
   };
   ```
3. Commit and push:
   ```bash
   git add js/config.js
   git commit -m "Connect Supabase"
   git push
   ```
4. Vercel auto-deploys in ~30 seconds.

## Step 6: Create Your Admin Account

1. In Supabase dashboard → **Authentication** → **Users**
2. Click **"Add user"** → **Create new user**
3. Enter your email and a password
4. Check **Auto Confirm User** (so you don't need to verify email)
5. Click **Create user**

## Step 7: Sign In

1. Go to **xeniabuild.com/admin** (or your-vercel-url.vercel.app/admin)
2. Sign in with the email/password you just created
3. You should see the admin panel with editable budget, timeline, decisions

## Step 8: Disable Public Signups (Important!)

By default, anyone can create an account. Lock it down:

1. Supabase dashboard → **Authentication** → **Providers** → **Email**
2. Toggle **"Enable email signups"** to **OFF**
3. Save

Now only you (the user you manually created) can sign in.

---

## How It Works

**Reads (public):**
- Anyone visiting xeniabuild.com sees your budget/timeline/decisions — no auth needed
- Pages fetch from Supabase using the `anon` key (safe to expose)
- Row-Level Security policies allow public SELECT on all tables

**Writes (admin only):**
- Go to `/admin`, sign in
- Changes immediately save to Supabase
- RLS policies require `auth.role() = 'authenticated'`

**Budget History:**
- Every time you change a `planned_amount` or `actual_amount`, a row is automatically logged to `budget_history` (via Postgres trigger)
- View on `/evolution` page

**Budget Snapshots:**
- Click "Take Budget Snapshot" in admin panel to save a point-in-time total
- `/evolution` chart plots these over time

---

## Backing Up Your Data

Supabase auto-backs up the database, but to export your own:

1. Dashboard → **Database** → **Backups**
2. Download a full backup any time

Or export specific tables to CSV from **Table Editor** → table → "..." → Export.

---

## Troubleshooting

**"Failed to fetch" errors in browser console**
- Check `js/config.js` has correct URL/key (no trailing spaces)
- Confirm you ran both `schema.sql` and `seed.sql`

**Can't sign in to /admin**
- Check user was created in Authentication → Users tab
- Verify "Auto Confirm User" was checked when you created them

**Public site shows nothing**
- Check RLS policies are enabled (the schema.sql script does this)
- Verify in Table Editor that data exists

**Can't edit (changes don't save)**
- Make sure you're signed in via the /admin login form
- Check the RLS write policies are present: SQL Editor → run `SELECT policyname FROM pg_policies WHERE schemaname = 'public';`
