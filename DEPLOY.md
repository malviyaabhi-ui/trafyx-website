# Trafyx marketing site — deployment guide

Static HTML/CSS/JS. No build step. No backend. Deploy anywhere that serves static files.

## What's inside

- 30+ HTML pages (home, features, about, contact, legal, docs, changelog)
- 1 CSS file (`styles.css`)
- 2 JS files (`app.js`, `footer.js`)
- Contact form wired to Formspree (needs one setup step, see below)
- No images required — everything is inline SVG

---

## Step 1 — Set up the contact form (5 min, do this first)

The contact form on `/contact.html` POSTs to Formspree. You need to:

1. Go to **https://formspree.io** and sign up with **sales@trafyx.ai**
2. Free tier is 50 submissions/month — plenty to start
3. Click **New form** — Formspree gives you a form ID that looks like `xzbqogld`
4. In `contact.html`, find the line:
   ```
   action="https://formspree.io/f/YOUR_FORMSPREE_ID"
   ```
   Replace `YOUR_FORMSPREE_ID` with your actual ID.
5. The first time someone submits the form, Formspree emails sales@trafyx.ai asking you to confirm the endpoint. Click the link once — after that, all future submissions arrive directly.

Every submission arrives with subject `New Trafyx.ai contact form submission` and a body containing name, company, email, topic, and message.

---

## Step 2 — Deploy to Vercel (15 min)

### 2a. Push to GitHub

```bash
# In a new folder
cd trafyx-mockup
git init
git add .
git commit -m "Initial commit — Trafyx marketing site"

# Create a new repo on GitHub called "trafyx-website"
# Then:
git remote add origin https://github.com/malviyaabhi-ui/trafyx-website.git
git branch -M main
git push -u origin main
```

### 2b. Import to Vercel

1. Go to **https://vercel.com** and sign in (you already have an account from Provix)
2. Click **New Project → Import Git Repository**
3. Select `trafyx-website`
4. Framework preset: **Other**
5. Root directory: `./` (default)
6. Build command: leave empty
7. Output directory: leave empty (or set to `./`)
8. Click **Deploy**

You'll get a URL like `trafyx-website.vercel.app` in about 30 seconds. Verify the site loads.

---

## Step 3 — Point trafyx.ai at Vercel (30 min, once you own the domain)

### 3a. Buy trafyx.ai first

Any registrar works — Namecheap, Porkbun, or your existing Cloudflare account. About $80/year.

### 3b. Add DNS to Cloudflare

1. In Cloudflare, add trafyx.ai as a new site
2. Cloudflare will give you nameservers — set those at the registrar

### 3c. Attach to Vercel

1. In Vercel → your project → **Settings → Domains**
2. Add `trafyx.ai` and `www.trafyx.ai`
3. Vercel shows DNS records you need to add
4. Back in Cloudflare, add those records:
   - `A` record for `@` (root) pointing at the Vercel IP shown
   - `CNAME` for `www` pointing at `cname.vercel-dns.com`
5. Set both records to **DNS-only (grey cloud, not orange)** in Cloudflare — Vercel handles SSL directly
6. Wait 2–5 min for DNS propagation
7. Vercel automatically issues an SSL cert once DNS resolves

### 3d. Redirect trafyx.net → trafyx.ai

1. In Cloudflare, go to trafyx.net → **Rules → Redirect Rules**
2. Create rule:
   - When: `Hostname` `equals` `trafyx.net` OR `www.trafyx.net`
   - Then: 301 permanent redirect to `https://trafyx.ai/$1` (preserving path)
3. Save. Test by visiting trafyx.net — it should bounce to trafyx.ai.

---

## Step 4 — Optional pre-launch polish

None of these are required to go live, but nice to have:

- **Favicon** — add `favicon.ico`, `apple-touch-icon.png`, and `manifest.json` to project root. Use https://realfavicongenerator.net to generate the whole set from a single 512x512 PNG of your Tx logo.
- **Analytics** — Vercel Analytics is one click in the Vercel dashboard. Free. No cookie banner needed.
- **OG images** — social preview cards when links get shared. Add `<meta property="og:image">` tags pointing at a 1200x630 PNG. Can skip for now.
- **Sitemap** — for Google indexing. Vercel can generate one automatically, or you can add `sitemap.xml` manually.
- **robots.txt** — tell search engines to index. One line: `User-agent: *\nAllow: /`

---

## Auto-deploys going forward

Every `git push` to `main` auto-deploys to trafyx.ai. Deploy previews are created automatically for other branches, so you can preview changes at a temporary URL before promoting them.

To update the site:
```bash
# Edit files locally
git add .
git commit -m "Update pricing tier copy"
git push
# Vercel deploys in ~30 seconds
```

---

## Rollback

Every deploy is preserved. In Vercel → Deployments → click any past deploy → **Promote to Production**. Instant rollback.

---

## Questions

If you get stuck at any step, the failure points are usually:
- **DNS not resolving** — wait 15 min, check with `dig trafyx.ai` in a terminal
- **SSL cert error** — usually resolves within an hour of DNS propagating
- **Formspree emails not arriving** — check spam folder, confirm the verification link, check the endpoint in contact.html matches the Formspree dashboard

Everything else should be smooth. Ship it.
