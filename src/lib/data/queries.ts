import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { MEMBERS_SEED } from "@/lib/content/members-seed";
import { EVENTS_SEED } from "@/lib/content/events-seed";
import { STORIES_SEED } from "@/lib/content/stories-seed";
import { TIMELINE_SEED } from "@/lib/content/timeline-seed";
import { MEDIA_SEED } from "@/lib/content/media-seed";
import type {
  EventRow,
  MediaRow,
  MemberWithStats,
  StoryRow,
  TimelineEntryRow,
} from "@/lib/supabase/types";

/**
 * Read helpers. Each function attempts Supabase first and falls back to
 * the in-repo seed data when the DB is unavailable or returns no rows.
 * This means the site fully works pre-Supabase-setup, and as soon as
 * migrations are applied + seed.sql runs, it switches over automatically.
 */

function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export async function getMembers(): Promise<MemberWithStats[]> {
  if (!isSupabaseConfigured()) return MEMBERS_SEED;
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("members")
      .select("*, stats:member_stats(*)")
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    if (error || !data || data.length === 0) return MEMBERS_SEED;
    return data.map((row) => ({
      ...(row as unknown as MemberWithStats),
      stats: Array.isArray((row as { stats?: unknown }).stats)
        ? ((row as { stats: MemberWithStats["stats"][] }).stats[0] ?? null)
        : ((row as { stats: MemberWithStats["stats"] | null }).stats ?? null),
    })) as MemberWithStats[];
  } catch {
    return MEMBERS_SEED;
  }
}

export async function getMemberBySlug(slug: string): Promise<MemberWithStats | null> {
  const all = await getMembers();
  return all.find((m) => m.slug === slug) ?? null;
}

export async function getEvents(): Promise<EventRow[]> {
  if (!isSupabaseConfigured()) return EVENTS_SEED;
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("starts_at", { ascending: false });
    if (error || !data || data.length === 0) return EVENTS_SEED;
    return data as unknown as EventRow[];
  } catch {
    return EVENTS_SEED;
  }
}

export async function getUpcomingEvents(limit = 3): Promise<EventRow[]> {
  const all = await getEvents();
  const now = Date.now();
  return all
    .filter((e) => new Date(e.starts_at).getTime() >= now || e.status === "live")
    .sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime())
    .slice(0, limit);
}

export async function getRecentEvents(limit = 3): Promise<EventRow[]> {
  const all = await getEvents();
  return all
    .sort((a, b) => new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime())
    .slice(0, limit);
}

export async function getStories(): Promise<StoryRow[]> {
  if (!isSupabaseConfigured()) return STORIES_SEED;
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("stories")
      .select("*")
      .eq("is_published", true)
      .order("occurred_at", { ascending: false });
    if (error || !data || data.length === 0) return STORIES_SEED;
    return data as unknown as StoryRow[];
  } catch {
    return STORIES_SEED;
  }
}

export async function getStoryBySlug(slug: string): Promise<StoryRow | null> {
  const all = await getStories();
  return all.find((s) => s.slug === slug) ?? null;
}

export async function getMedia(): Promise<MediaRow[]> {
  if (!isSupabaseConfigured()) return MEDIA_SEED;
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("media")
      .select("*")
      .order("taken_at", { ascending: false });
    if (error || !data || data.length === 0) return MEDIA_SEED;
    return data as unknown as MediaRow[];
  } catch {
    return MEDIA_SEED;
  }
}

export async function getTimeline(): Promise<TimelineEntryRow[]> {
  if (!isSupabaseConfigured()) return TIMELINE_SEED;
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("timeline_entries")
      .select("*")
      .order("occurred_at", { ascending: true });
    if (error || !data || data.length === 0) return TIMELINE_SEED;
    return data as unknown as TimelineEntryRow[];
  } catch {
    return TIMELINE_SEED;
  }
}
