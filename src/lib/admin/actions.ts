"use server";

import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth/require-admin";
import { createSupabaseAdminClient, isAdminAvailable } from "@/lib/supabase/admin";
import {
  memberSchema,
  memberStatsSchema,
  eventSchema,
  storySchema,
  timelineSchema,
} from "@/lib/validators";
import { MEMBERS_SEED } from "@/lib/content/members-seed";
import { EVENTS_SEED } from "@/lib/content/events-seed";
import { STORIES_SEED } from "@/lib/content/stories-seed";
import { TIMELINE_SEED } from "@/lib/content/timeline-seed";
import { MEDIA_SEED } from "@/lib/content/media-seed";

async function guard() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return { ok: false as const, error: "Unauthorized" };
  }
  if (!isAdminAvailable()) {
    return {
      ok: false as const,
      error:
        "SUPABASE_SERVICE_ROLE_KEY missing — admin writes disabled. Configure in Vercel env vars.",
    };
  }
  return { ok: true as const };
}

function paths(refresh: string[]) {
  for (const p of refresh) revalidatePath(p);
}

// Native upsert that preserves id so seed records get materialized on first edit
// instead of failing silently (UPDATE on a non-existent row = 0 rows changed = no error).
// Returns the resulting row's id (useful for new inserts where the client needs it
// to write related records like member_stats).
async function upsertRow<T extends Record<string, unknown>>(
  table: string,
  data: T,
  id: string | undefined,
  conflictKey = "id",
): Promise<{ error: { message: string } | null; id?: string }> {
  const supabase = createSupabaseAdminClient();
  const payload = id ? { ...data, id } : data;
  const { data: rows, error } = await supabase
    .from(table)
    .upsert(payload, { onConflict: conflictKey })
    .select("id")
    .limit(1);
  if (error) return { error };
  const returned = Array.isArray(rows) && rows[0] ? (rows[0] as { id?: string }).id : undefined;
  return { error: null, id: returned ?? id };
}

// ------------------------- MEMBERS -------------------------
export async function upsertMember(input: unknown, id?: string) {
  const g = await guard();
  if (!g.ok) return g;
  const parsed = memberSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.message };

  const { error, id: returnedId } = await upsertRow("members", parsed.data, id);
  if (error) return { ok: false as const, error: error.message };

  paths(["/", "/members", `/members/${parsed.data.slug}`]);
  return { ok: true as const, id: returnedId };
}

export async function deleteMember(id: string) {
  const g = await guard();
  if (!g.ok) return g;
  const supabase = createSupabaseAdminClient();
  // Cascading: member_stats and relationships drop via FK ON DELETE CASCADE
  const { error } = await supabase.from("members").delete().eq("id", id);
  if (error) return { ok: false as const, error: error.message };
  paths(["/", "/members"]);
  return { ok: true as const };
}

export async function upsertMemberStats(input: unknown) {
  const g = await guard();
  if (!g.ok) return g;
  const parsed = memberStatsSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.message };
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("member_stats")
    .upsert(parsed.data, { onConflict: "member_id" });
  if (error) return { ok: false as const, error: error.message };
  paths(["/", "/members", `/members/${parsed.data.member_id}`]);
  return { ok: true as const };
}

// ------------------------- EVENTS -------------------------
export async function upsertEvent(input: unknown, id?: string) {
  const g = await guard();
  if (!g.ok) return g;
  const parsed = eventSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.message };

  const { error, id: returnedId } = await upsertRow("events", parsed.data, id);
  if (error) return { ok: false as const, error: error.message };

  paths(["/", "/tour"]);
  return { ok: true as const, id: returnedId };
}

export async function deleteEvent(id: string) {
  const g = await guard();
  if (!g.ok) return g;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) return { ok: false as const, error: error.message };
  paths(["/", "/tour"]);
  return { ok: true as const };
}

// ------------------------- STORIES -------------------------
export async function upsertStory(input: unknown, id?: string) {
  const g = await guard();
  if (!g.ok) return g;
  const parsed = storySchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.message };

  const { error, id: returnedId } = await upsertRow("stories", parsed.data, id);
  if (error) return { ok: false as const, error: error.message };

  paths(["/stories", `/stories/${parsed.data.slug}`]);
  return { ok: true as const, id: returnedId };
}

export async function deleteStory(id: string) {
  const g = await guard();
  if (!g.ok) return g;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("stories").delete().eq("id", id);
  if (error) return { ok: false as const, error: error.message };
  paths(["/stories"]);
  return { ok: true as const };
}

// ------------------------- TIMELINE -------------------------
export async function upsertTimelineEntry(input: unknown, id?: string) {
  const g = await guard();
  if (!g.ok) return g;
  const parsed = timelineSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.message };

  const { error, id: returnedId } = await upsertRow("timeline_entries", parsed.data, id);
  if (error) return { ok: false as const, error: error.message };

  paths(["/timeline"]);
  return { ok: true as const, id: returnedId };
}

export async function deleteTimelineEntry(id: string) {
  const g = await guard();
  if (!g.ok) return g;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("timeline_entries").delete().eq("id", id);
  if (error) return { ok: false as const, error: error.message };
  paths(["/timeline"]);
  return { ok: true as const };
}

// ------------------------- MEDIA -------------------------
export async function deleteMedia(id: string) {
  const g = await guard();
  if (!g.ok) return g;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) return { ok: false as const, error: error.message };
  paths(["/media"]);
  return { ok: true as const };
}

export async function insertMedia(input: {
  type: "image" | "video" | "audio";
  url: string;
  thumb_url?: string | null;
  caption_it?: string | null;
  caption_en?: string | null;
  category?: string | null;
  tags?: string[];
  taken_at?: string | null;
}) {
  const g = await guard();
  if (!g.ok) return g;
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("media").insert({
    type: input.type,
    url: input.url,
    thumb_url: input.thumb_url ?? input.url,
    caption_it: input.caption_it ?? null,
    caption_en: input.caption_en ?? null,
    category: input.category ?? null,
    tags: input.tags ?? [],
    taken_at: input.taken_at ?? new Date().toISOString().slice(0, 10),
  });
  if (error) return { ok: false as const, error: error.message };
  paths(["/media"]);
  return { ok: true as const };
}

// ------------------------- BOOTSTRAP -------------------------
/**
 * Materializes all seed content (members, member_stats, events, stories, timeline, media)
 * into Supabase. Uses upsert so it's idempotent — running it twice just keeps the DB
 * in sync with the latest seed. After bootstrap, every seed row becomes editable/deletable
 * from the admin panel.
 */
export async function bootstrapSeed() {
  const g = await guard();
  if (!g.ok) return g;

  const supabase = createSupabaseAdminClient();
  const summary: Record<string, number> = {};

  // Members (strip embedded stats field — it's a join only in our type)
  const memberRows = MEMBERS_SEED.map((m) => {
    const { stats: _stats, ...rest } = m;
    void _stats;
    return rest;
  });
  const { error: e1 } = await supabase
    .from("members")
    .upsert(memberRows, { onConflict: "id" });
  if (e1) return { ok: false as const, error: `members: ${e1.message}` };
  summary.members = memberRows.length;

  // Member stats
  const statsRows = MEMBERS_SEED.filter((m) => m.stats).map((m) => m.stats!);
  const { error: e2 } = await supabase
    .from("member_stats")
    .upsert(statsRows, { onConflict: "member_id" });
  if (e2) return { ok: false as const, error: `member_stats: ${e2.message}` };
  summary.member_stats = statsRows.length;

  // Events
  const { error: e3 } = await supabase
    .from("events")
    .upsert(EVENTS_SEED, { onConflict: "id" });
  if (e3) return { ok: false as const, error: `events: ${e3.message}` };
  summary.events = EVENTS_SEED.length;

  // Stories
  const { error: e4 } = await supabase
    .from("stories")
    .upsert(STORIES_SEED, { onConflict: "id" });
  if (e4) return { ok: false as const, error: `stories: ${e4.message}` };
  summary.stories = STORIES_SEED.length;

  // Timeline entries
  const { error: e5 } = await supabase
    .from("timeline_entries")
    .upsert(TIMELINE_SEED, { onConflict: "id" });
  if (e5) return { ok: false as const, error: `timeline_entries: ${e5.message}` };
  summary.timeline_entries = TIMELINE_SEED.length;

  // Media
  const { error: e6 } = await supabase
    .from("media")
    .upsert(MEDIA_SEED, { onConflict: "id" });
  if (e6) return { ok: false as const, error: `media: ${e6.message}` };
  summary.media = MEDIA_SEED.length;

  paths(["/", "/members", "/tour", "/stories", "/media", "/timeline", "/admin"]);

  return {
    ok: true as const,
    summary,
    message: `Bootstrap completato — ${Object.entries(summary)
      .map(([k, v]) => `${v} ${k}`)
      .join(", ")}.`,
  };
}

/**
 * Reports current DB row counts vs seed counts so the dashboard can decide
 * whether to show the bootstrap button.
 */
export async function getDbStatus(): Promise<{
  ok: boolean;
  configured: boolean;
  tables?: Record<string, number>;
  error?: string;
}> {
  if (!isAdminAvailable()) {
    return { ok: false, configured: false };
  }
  try {
    const supabase = createSupabaseAdminClient();
    const tables = ["members", "events", "stories", "media", "timeline_entries"];
    const counts: Record<string, number> = {};
    for (const t of tables) {
      const { count, error } = await supabase
        .from(t)
        .select("*", { count: "exact", head: true });
      if (error) {
        return { ok: false, configured: true, error: `${t}: ${error.message}` };
      }
      counts[t] = count ?? 0;
    }
    return { ok: true, configured: true, tables: counts };
  } catch (e) {
    return {
      ok: false,
      configured: true,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}
