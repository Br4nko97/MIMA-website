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

async function guard() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return { ok: false as const, error: "Unauthorized" };
  }
  if (!isAdminAvailable()) {
    return {
      ok: false as const,
      error:
        "SUPABASE_SERVICE_ROLE_KEY missing — admin writes disabled. Configure in .env.local.",
    };
  }
  return { ok: true as const };
}

function paths(refresh: string[]) {
  for (const p of refresh) revalidatePath(p);
}

// ------------------------- MEMBERS -------------------------
export async function upsertMember(input: unknown, id?: string) {
  const g = await guard();
  if (!g.ok) return g;
  const parsed = memberSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: parsed.error.message };

  const supabase = createSupabaseAdminClient();
  if (id) {
    const { error } = await supabase.from("members").update(parsed.data).eq("id", id);
    if (error) return { ok: false as const, error: error.message };
  } else {
    const { error } = await supabase.from("members").insert(parsed.data);
    if (error) return { ok: false as const, error: error.message };
  }
  paths(["/", "/members"]);
  return { ok: true as const };
}

export async function deleteMember(id: string) {
  const g = await guard();
  if (!g.ok) return g;
  const supabase = createSupabaseAdminClient();
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
  const supabase = createSupabaseAdminClient();
  if (id) {
    const { error } = await supabase.from("events").update(parsed.data).eq("id", id);
    if (error) return { ok: false as const, error: error.message };
  } else {
    const { error } = await supabase.from("events").insert(parsed.data);
    if (error) return { ok: false as const, error: error.message };
  }
  paths(["/", "/tour"]);
  return { ok: true as const };
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
  const supabase = createSupabaseAdminClient();
  if (id) {
    const { error } = await supabase.from("stories").update(parsed.data).eq("id", id);
    if (error) return { ok: false as const, error: error.message };
  } else {
    const { error } = await supabase.from("stories").insert(parsed.data);
    if (error) return { ok: false as const, error: error.message };
  }
  paths(["/stories"]);
  return { ok: true as const };
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
  const supabase = createSupabaseAdminClient();
  if (id) {
    const { error } = await supabase
      .from("timeline_entries")
      .update(parsed.data)
      .eq("id", id);
    if (error) return { ok: false as const, error: error.message };
  } else {
    const { error } = await supabase.from("timeline_entries").insert(parsed.data);
    if (error) return { ok: false as const, error: error.message };
  }
  paths(["/timeline"]);
  return { ok: true as const };
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
