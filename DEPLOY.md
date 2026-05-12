# Deploy xeniabuild.com — Quickstart

## 1. Push to GitHub

```bash
cd "/path/to/website"
git init
git add .
git commit -m "Initial site"
git branch -M main

git remote add origin https://github.com/devjamesallen/xenia-build.git
git push -u origin main
```

## 2. Deploy to Vercel

1. Go to **[vercel.com/new](https://vercel.com/new)**
2. Click **Import** next to your `xenia-build` repo
3. Settings:
   - Framework: **Other**
   - Root Directory: leave as `./`
   - Build Command: (leave empty)
   - Output Directory: leave as `./`
4. Click **Deploy**

Vercel gives you a free `*.vercel.app` URL within 60 seconds. ✓

## 3. Connect xeniabuild.com

### In Vercel:
1. Open your project → **Settings → Domains**
2. Add: `xeniabuild.com`
3. Add: `www.xeniabuild.com`
4. Vercel will show DNS instructions

### At your domain registrar:
Add these DNS records:

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

(Exact values may vary — use whatever Vercel shows you)

### Wait
- DNS propagation: 5 minutes to 48 hours (usually under 1 hour)
- SSL certificate: Auto-issued by Vercel within minutes of DNS resolving

## 4. Verify

- Visit https://xeniabuild.com → should load
- Visit https://www.xeniabuild.com → should redirect to root
- Both URLs should have a green padlock (HTTPS)

## 5. Update from now on

Every time you change something:

```bash
git add .
git commit -m "Updated land cost after survey"
git push
```

Vercel auto-deploys to xeniabuild.com in 30-60 seconds.

## Troubleshooting

**Site not loading after DNS change?**
- Wait longer (some registrars take 12-24 hours)
- Check DNS propagation: https://dnschecker.org/#A/xeniabuild.com

**"Domain configuration" warning in Vercel?**
- Wait for DNS to fully propagate
- Vercel auto-resolves once it detects the right records

**Site looks broken on mobile?**
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Vercel deploys are immediate; if you don't see changes, it's browser cache
