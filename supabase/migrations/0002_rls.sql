-- =============================================================
-- MIMA · 0002_rls.sql
-- Row-level security: public reads everywhere, writes only via service role.
-- Writes happen from server (Server Actions / Route Handlers) using the
-- SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS — so no INSERT/UPDATE/DELETE
-- policies are needed here.
-- =============================================================

alter table public.members enable row level security;
alter table public.member_stats enable row level security;
alter table public.member_relationships enable row level security;
alter table public.events enable row level security;
alter table public.stories enable row level security;
alter table public.media enable row level security;
alter table public.timeline_entries enable row level security;
alter table public.tags enable row level security;
alter table public.site_settings enable row level security;

-- Drop existing read policies (idempotent re-runs)
drop policy if exists "members readable" on public.members;
drop policy if exists "member_stats readable" on public.member_stats;
drop policy if exists "member_relationships readable" on public.member_relationships;
drop policy if exists "events readable" on public.events;
drop policy if exists "stories readable" on public.stories;
drop policy if exists "media readable" on public.media;
drop policy if exists "timeline readable" on public.timeline_entries;
drop policy if exists "tags readable" on public.tags;

-- Public read policies
create policy "members readable" on public.members for select using (true);
create policy "member_stats readable" on public.member_stats for select using (true);
create policy "member_relationships readable" on public.member_relationships for select using (true);
create policy "events readable" on public.events for select using (true);
create policy "stories readable" on public.stories for select using (is_published);
create policy "media readable" on public.media for select using (true);
create policy "timeline readable" on public.timeline_entries for select using (true);
create policy "tags readable" on public.tags for select using (true);

-- site_settings has no public read by default — values may include private flags.
-- Add specific read policies on demand.
