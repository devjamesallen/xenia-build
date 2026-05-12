# Supabase Quickstart — 5 minutes to dynamic

## 1. Create Supabase project (2 min)

1. Go to **[supabase.com](https://supabase.com)** → **Sign in with GitHub**
2. Click **New Project**
3. Fill in:
   - **Name**: `xenia-build`
   - **Database Password**: click "Generate password", save it somewhere
   - **Region**: `East US (N. Virginia)`
   - **Plan**: Free
4. Click **Create new project** → wait ~90 seconds

## 2. Run the SQL (1 min)

1. Once project loads, click **SQL Editor** in left sidebar
2. Click **New query**
3. Open `supabase/setup.sql` from your repo
4. Copy the **entire file** → paste into SQL Editor
5. Click **Run** (or `Cmd/Ctrl + Enter`)
6. Should see "Success. No rows returned"

Verify: go to **Table Editor** → you should see `budget_items`, `timeline_events`, `decisions`, etc. all populated.

## 3. Get your API keys (30 sec)

1. Settings (gear icon, bottom-left) → **API**
2. Copy two things:
   - **Project URL** — looks like `https://xxxxx.supabase.co`
   - **anon / public** key — long string starting with `eyJ...`

## 4. Paste into config.js (30 sec)

Open `js/config.js` in your code editor and replace:

```js
window.SUPABASE_CONFIG = {
  url: 'https://YOUR-PROJECT.supabase.co',       // paste Project URL here
  anonKey: 'eyJhbGciOiJI...your-anon-key-here'   // paste anon key here
};
```

## 5. Create your admin user (1 min)

1. In Supabase: **Authentication** → **Users** → **Add user** → **Create new user**
2. Email: your email
3. Password: pick a strong one
4. ✅ Check **Auto Confirm User**
5. Click **Create user**

## 6. Lock down public signups (30 sec)

1. **Authentication** → **Providers** → click **Email**
2. Toggle **Enable email signups** → **OFF**
3. Save

## 7. Push and you're live

```bash
git add js/config.js
git commit -m "Connect Supabase"
git push
```

Vercel auto-deploys in 30 seconds.

---

## Try it

- Visit **xeniabuild.com/evolution** → KPI cards + charts should now show real data
- Visit **xeniabuild.com/admin** → sign in with the user you created
- Edit a budget item, change `planned_amount` from 12000 to 15000
- Refresh `/evolution` → see "Recent Changes" log the diff
- Click **"Take Budget Snapshot"** in admin to start the evolution line chart

That's it. You now have:
- ✅ Public site reads from Postgres
- ✅ Admin panel for editing
- ✅ Full audit log of every budget change
- ✅ Budget evolution chart over time
- ✅ Auth-gated writes (only you can edit)
