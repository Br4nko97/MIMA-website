# Placeholder assets

This folder contains placeholder SVGs and stubs used by the MIMA site
when no real media has been uploaded yet. **Replace them with real
photos/videos/audio when you have them.**

## Structure

- `members/{slug}.svg` — square avatar placeholder
- `members/{slug}-cover.svg` — wide cover placeholder
- `events/event{N}.svg` — operation cover placeholders
- `stories/story{N}.svg` — story cover placeholders
- `media/m{N}.svg` — gallery placeholders
- `hero-poster.svg` — poster image for the hero loop
- `hero-loop.mp4` — *(optional)* background looping video for the landing hero
- `ambient.mp3` — *(optional)* ambient audio loop toggled from the nav

## How to replace

1. **Manually** — drop a file with the same name (any extension you like)
   and update the `avatar_url` / `cover_url` / `url` field of the matching
   row through `/admin/...`.
2. **Via admin upload** — use the upload component in `/admin/media`,
   `/admin/members`, etc. The new file is stored in Supabase Storage and
   the database row's URL is updated automatically.

If `hero-loop.mp4` is missing, the hero section still works — the radial
gradient + grain overlay take over.

If `ambient.mp3` is missing, the nav audio toggle simply has nothing to
play and falls back to silent.
