# MIMA · Digital Archive of the Collective

Ultra-modern, dark, cinematic full-stack website for a friend group from
Mantova — treated ironically and overproduced like a "cultural heritage
project". Built with Next.js 15, Tailwind 4, Framer Motion, Supabase.

> Brand: **MIMA** · tagline: `(scopiamo)`
>
> Bilingual: IT / EN (in-app switcher). Dark only. Aura-purple-blue accent.

---

## Stack

- **Next.js 15** (App Router, RSC, Server Actions)
- **TypeScript** strict
- **TailwindCSS 4** + CSS custom properties for tokens
- **Framer Motion** + **Lenis** smooth scroll
- **Zustand** for client state (locale, audio, cursor, ui)
- **shadcn/ui** primitives (built locally — no CLI required)
- **Supabase** — Postgres + Storage + RLS
- **iron-session** — single shared admin password, cookie-signed session

---

## Quick start

```bash
# 1. Install (pnpm is recommended on Windows — much faster than npm)
pnpm install
# or: npm install --legacy-peer-deps (slower)

# 2. Copy the env template and fill values
cp .env.example .env.local

# 3. Generate SVG placeholders (already committed, regenerate any time)
node scripts/generate-placeholders.mjs

# 4. Dev server
npm run dev

# 5. Open
# http://localhost:3000
```

The site runs immediately with mock seed data even before Supabase is
configured — the data layer falls back automatically to in-repo seeds.

---

## Environment variables

`.env.local` (gitignored — never commit):

| Variable | Required | Where to find it |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase Dashboard → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Same page |
| `SUPABASE_SERVICE_ROLE_KEY` | for admin writes | Same page (secret — server-only) |
| `SUPABASE_DB_PASSWORD` | for CLI migrations | Set when you created the project |
| `ADMIN_PASSWORD` | ✅ | A password you choose — used to log in to `/admin` |
| `ADMIN_SESSION_SECRET` | ✅ | 32+ char random string (used to sign session cookies) |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Public site URL (or `http://localhost:3000` in dev) |

Generate `ADMIN_SESSION_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Supabase setup

The repo already references a Supabase project (`ndhhfvddcikswvvdrofr`).
To wire it up end-to-end:

1. **Apply migrations** — using the Supabase Dashboard SQL Editor:
   - Paste `supabase/migrations/0001_init.sql` and run
   - Paste `supabase/migrations/0002_rls.sql` and run
   - Paste `supabase/migrations/0003_storage.sql` and run

   *Or* use the Supabase CLI:
   ```bash
   npx supabase login
   npx supabase link --project-ref ndhhfvddcikswvvdrofr
   npx supabase db push
   ```

2. **Seed data** — paste `supabase/seed.sql` into the SQL Editor and run.
   Idempotent (uses `on conflict do update`) so it's safe to re-run.

3. **Storage buckets** — `0003_storage.sql` creates them. Verify in
   Dashboard → Storage that the 5 buckets exist:
   `members`, `events`, `stories`, `media`, `audio` (all public-read).

4. **Service role key** — copy it from Dashboard → Project Settings → API →
   `service_role` (NOT `anon`) into `.env.local`. This unlocks the admin
   write path (`/api/upload` and Server Actions in `src/lib/admin/actions.ts`).

When the DB is empty or unreachable, the site uses the in-repo seeds from
`src/lib/content/*-seed.ts` — useful for first run and offline dev.

---

## Pages

| Route | What it is |
|---|---|
| `/` | Cinematic landing — hero, manifesto, members preview, fake analytics, recent ops, CTA |
| `/members` | Subject archive — grid of 7 dossier cards |
| `/members/[slug]` | Subject dossier — radar stats, glazing bio, achievements |
| `/tour` | World-tour timeline + SVG map of Europe |
| `/stories` | Masonry story archive with classification-blur effect |
| `/media` | Photo/video/audio gallery with keyboard-nav lightbox |
| `/timeline` | Cinematic vertical timeline of the collective's "history" |
| `/admin` | Protected dashboard |
| `/admin/login` | Single-password login |
| `/admin/{entity}` | CRUD for members, events, stories, media, timeline |

---

## Admin

Single shared password — no user accounts. Set `ADMIN_PASSWORD` in
`.env.local`, then visit `/admin`. The middleware redirects to
`/admin/login` if you don't have a session cookie.

Once `SUPABASE_SERVICE_ROLE_KEY` is set, writes go straight to Postgres
(bypassing RLS). The dashboard surfaces a warning if it's missing.

Most editors use a JSON textarea for the row payload — this is a
deliberate shortcut since the admin is private. The Members editor has
proper form fields plus a stats sliders panel.

File uploads (admin) → `/api/upload` → Supabase Storage → returns the
public URL → pasted into the row's `*_url` field.

---

## Customization tips

- **Branding**: change `dict.meta.siteName` in `src/lib/i18n/it.ts` and
  `src/lib/i18n/en.ts`. Also update `<h1>` strings in
  `src/components/landing/hero.tsx`.
- **Color tokens**: edit `@theme { ... }` in `src/app/globals.css`.
- **Accent**: tweak `--color-aura-1/2/3` in the same file.
- **Glazing bios**: edit `src/lib/content/members-seed.ts` (used as
  fallback) OR via `/admin/members/[id]` once DB is seeded.
- **Easter eggs**: search for `Mantova` / `Sordello` / `D'Este` to find
  the existing references; add more in seed files.
- **Cursor**: disabled below 1024px and on `prefers-reduced-motion`. See
  `src/components/effects/cursor.tsx`.

---

## Folder layout (high level)

```
src/
├── app/                 # App Router pages (public + admin + api)
├── components/
│   ├── effects/         # cursor, grain, lenis, audio, ambient lights
│   ├── layout/          # nav, footer, page-header
│   ├── shared/          # reveal, tilt, magnetic, glass-card, etc.
│   ├── landing/         # landing-specific sections
│   ├── members/         # member detail + grid + radar
│   ├── tour/            # tour timeline + map
│   ├── stories/         # masonry + modal
│   ├── media/           # gallery + lightbox
│   ├── timeline/        # vertical reveal
│   ├── admin/           # admin shell + forms
│   └── ui/              # shadcn primitives (button, dialog, tabs, …)
├── lib/
│   ├── supabase/        # browser, server, admin (service role) clients
│   ├── auth/            # iron-session
│   ├── i18n/            # IT/EN dicts + Zustand store
│   ├── store/           # cursor / audio / ui Zustand stores
│   ├── content/         # in-repo seed fallback data
│   ├── data/            # server queries with seed fallback
│   ├── utils/           # cn, slugify, format-date, classified
│   ├── admin/           # Server Actions for admin CRUD
│   └── validators.ts    # Zod schemas
├── hooks/
├── middleware.ts        # protects /admin/*
└── styles/
public/
├── favicon.svg
└── placeholders/        # SVG / mp3 / mp4 stubs (replace with real media)
supabase/
├── migrations/          # 0001_init / 0002_rls / 0003_storage
└── seed.sql
scripts/
└── generate-placeholders.mjs
```

---

## Deploy

Tested target: **Vercel**.

1. Push repo to GitHub.
2. Import project on Vercel.
3. Paste all `.env.local` variables into Vercel env settings (mark
   `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_PASSWORD` and
   `ADMIN_SESSION_SECRET` and `SUPABASE_DB_PASSWORD` as secret).
4. Deploy.

Build command: `npm run build`. Output dir: default. No special config.

---

## Notes / future work

- Member relationships are modeled in the DB but not wired into the UI.
- Real-time updates via Supabase Realtime would be a nice addition.
- Replace the SVG map with Mapbox if you want real geography (not
  required for the current scope).
- Add Playwright / Vitest tests when the content stabilizes.

🟣 Built with excessive seriousness.
