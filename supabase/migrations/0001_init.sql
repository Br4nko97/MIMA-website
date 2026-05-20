-- =============================================================
-- MIMA · 0001_init.sql
-- Core schema. Run against the Supabase project before seeding.
-- =============================================================

-- Required extensions
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- Helper trigger for updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- =============================================================
-- members
-- =============================================================
create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  full_name text not null,
  nickname text not null,
  role_title text,
  school text,
  bio_it text,
  bio_en text,
  classification text,
  avatar_url text,
  cover_url text,
  favorite_phrases jsonb,
  achievements jsonb,
  badges text[],
  display_order int not null default 99,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists members_display_order_idx on public.members (display_order);
create index if not exists members_slug_idx on public.members (slug);
drop trigger if exists members_set_updated_at on public.members;
create trigger members_set_updated_at
  before update on public.members
  for each row execute procedure public.set_updated_at();

-- =============================================================
-- member_stats (1:1 with members)
-- =============================================================
create table if not exists public.member_stats (
  member_id uuid primary key references public.members(id) on delete cascade,
  aura int not null default 50 check (aura between 0 and 100),
  danger int not null default 50 check (danger between 0 and 100),
  alcohol_resistance int not null default 50 check (alcohol_resistance between 0 and 100),
  disappearing_probability int not null default 50 check (disappearing_probability between 0 and 100),
  chaos_generation int not null default 50 check (chaos_generation between 0 and 100),
  gym_addiction int not null default 50 check (gym_addiction between 0 and 100),
  emotional_stability int not null default 50 check (emotional_stability between 0 and 100),
  survivability int not null default 50 check (survivability between 0 and 100),
  negotiation int not null default 50 check (negotiation between 0 and 100),
  spontaneous_disappearance_rate int not null default 50 check (spontaneous_disappearance_rate between 0 and 100)
);

-- =============================================================
-- member_relationships (m:n self-referencing)
-- =============================================================
create table if not exists public.member_relationships (
  id uuid primary key default gen_random_uuid(),
  member_a uuid not null references public.members(id) on delete cascade,
  member_b uuid not null references public.members(id) on delete cascade,
  label text,
  intensity int default 50 check (intensity between 0 and 100),
  created_at timestamptz not null default now(),
  unique (member_a, member_b)
);

-- =============================================================
-- events
-- =============================================================
do $$ begin
  create type public.event_status as enum ('planned', 'live', 'archived', 'classified');
exception when duplicate_object then null;
end $$;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  codename text not null,
  title_it text not null,
  title_en text not null,
  description_it text,
  description_en text,
  location text,
  lat numeric,
  lng numeric,
  starts_at timestamptz not null,
  ends_at timestamptz,
  status public.event_status not null default 'planned',
  cover_url text,
  gallery jsonb,
  participants uuid[],
  tags text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists events_starts_at_idx on public.events (starts_at desc);
create index if not exists events_status_idx on public.events (status);
drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at
  before update on public.events
  for each row execute procedure public.set_updated_at();

-- =============================================================
-- stories
-- =============================================================
do $$ begin
  create type public.story_classification as enum ('public', 'restricted', 'classified');
exception when duplicate_object then null;
end $$;

create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_it text not null,
  title_en text not null,
  body_it text,
  body_en text,
  occurred_at date,
  cover_url text,
  media jsonb,
  participants uuid[],
  tags text[],
  classification public.story_classification not null default 'public',
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists stories_occurred_at_idx on public.stories (occurred_at desc);
drop trigger if exists stories_set_updated_at on public.stories;
create trigger stories_set_updated_at
  before update on public.stories
  for each row execute procedure public.set_updated_at();

-- =============================================================
-- media
-- =============================================================
do $$ begin
  create type public.media_type as enum ('image', 'video', 'audio');
exception when duplicate_object then null;
end $$;

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  type public.media_type not null,
  url text not null,
  thumb_url text,
  width int,
  height int,
  duration int,
  caption_it text,
  caption_en text,
  taken_at date,
  participants uuid[],
  tags text[],
  category text,
  created_at timestamptz not null default now()
);
create index if not exists media_taken_at_idx on public.media (taken_at desc);
create index if not exists media_category_idx on public.media (category);

-- =============================================================
-- timeline_entries
-- =============================================================
create table if not exists public.timeline_entries (
  id uuid primary key default gen_random_uuid(),
  occurred_at date not null,
  era text not null,
  title_it text not null,
  title_en text not null,
  description_it text,
  description_en text,
  icon text,
  importance int not null default 3 check (importance between 1 and 5),
  related_event_id uuid references public.events(id) on delete set null,
  related_story_id uuid references public.stories(id) on delete set null,
  created_at timestamptz not null default now()
);
create index if not exists timeline_occurred_at_idx on public.timeline_entries (occurred_at);

-- =============================================================
-- tags (optional centralized taxonomy)
-- =============================================================
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  label_it text not null,
  label_en text not null,
  color text
);

-- =============================================================
-- site_settings — k/v store editable from admin
-- =============================================================
create table if not exists public.site_settings (
  key text primary key,
  value jsonb,
  updated_at timestamptz not null default now()
);
drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute procedure public.set_updated_at();
