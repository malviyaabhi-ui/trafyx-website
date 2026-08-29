# Trafyx Marketing Site Mockup

A modern, graphics-heavy multi-page mockup for Trafyx — the multi-tenant ISP B/OSS platform.

## How to view

Open `index.html` in any browser. All pages are static HTML with a shared CSS file. No build step, no server required.

The dark/light theme toggle lives in the top-right of every page. State persists in localStorage.

## Pages

- `index.html` — Landing page with animated multi-tenant packet flow
- `features/mira.html` — Mira AI (flagship feature — most detailed)
- `features/waas.html` — Multi-tenant WaaS with SSID routing
- `features/subscribers.html` — Subscriber management
- `features/billing.html` — 3-step invoice generate flow
- `features/radius.html` — RADIUS/AAA with live sessions
- `features/portal.html` — Subscriber portal with phone mockup
- `features/vouchers.html` — Hotspot vouchers
- `features/prepaid.html` — Prepaid + wallet
- `features/helpdesk.html` — Ticketing with Mira handoff
- `features/pricebooks.html` — Per-reseller pricing
- `features/noc.html` — NOC + intelligence chat
- `features/resellers.html` — Reseller hierarchy

## Design tokens (in styles.css)

- **Base:** `#0A0E1A` deep navy
- **Brand:** `#00C2FF` cyan (your existing brand color)
- **Accent:** `#7C5CFF` violet
- **Success:** `#22D3B4` teal
- **Warning:** `#FFB547` amber
- **Danger:** `#FF5470` coral

- **Display font:** Space Grotesk
- **Body font:** Inter
- **Mono font:** JetBrains Mono

## Design rules followed (from your standards)

- ✅ Inline SVG only — no Lucide, no emoji, no image icons, no font icons
- ✅ Both dark AND light mode with toggle
- ✅ Multi-tenancy reflected in copy, architecture, and visuals
- ✅ Brand color `#00C2FF` used throughout
- ✅ Trafyx naming (Tx logo)

## What to change first

1. **Copy the whole `trafyx-mockup/` folder** to wherever you want to host — a static site, Vercel, Netlify, or drop it into `/public/marketing/` in your Next.js app.
2. **Update the "Book demo" CTAs** to point at your actual demo booking form.
3. **Swap the terminal / mockup content** for your real screenshots when ready — the current versions are illustrative placeholders that visualize each feature working.
4. **Optional:** wire up an actual contact form; the CTA blocks currently link to `#cta` anchors.

## Signature choices worth calling out

- **Living telemetry as the hero.** Instead of static product screenshots, every page has an animated or data-rich visual that shows the thing operating (packet flows, session tables, RADIUS logs, terminal output). This is the ambient aesthetic of the whole site.
- **Deep navy, not near-black.** Sets it apart from the generic SaaS dark-mode look.
- **Space Grotesk display.** Geometric and modern, has personality without leaning on the trendy warm-cream/serif look most AI-generated designs default to.
- **Numbered step blocks appear only where the content is a real sequence** (Mira's 3-step architecture, WaaS onboarding). Everywhere else uses grid cards, so the numbering carries meaning.
