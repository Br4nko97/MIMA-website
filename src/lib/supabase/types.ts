/**
 * Hand-written types matching supabase/migrations/0001_init.sql.
 * Replace with generated types via `npx supabase gen types typescript`
 * once the project is linked.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type EventStatus = "planned" | "live" | "archived" | "classified";
export type StoryClassification = "public" | "restricted" | "classified";
export type MediaType = "image" | "video" | "audio";

export interface MemberRow {
  id: string;
  slug: string;
  full_name: string;
  nickname: string;
  role_title: string | null;
  school: string | null;
  bio_it: string | null;
  bio_en: string | null;
  classification: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  favorite_phrases: string[] | null;
  achievements: string[] | null;
  badges: string[] | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MemberStatsRow {
  member_id: string;
  aura: number;
  danger: number;
  alcohol_resistance: number;
  disappearing_probability: number;
  chaos_generation: number;
  gym_addiction: number;
  emotional_stability: number;
  survivability: number;
  negotiation: number;
  spontaneous_disappearance_rate: number;
}

export interface MemberWithStats extends MemberRow {
  stats: MemberStatsRow | null;
}

export interface EventRow {
  id: string;
  slug: string;
  codename: string;
  title_it: string;
  title_en: string;
  description_it: string | null;
  description_en: string | null;
  location: string | null;
  lat: number | null;
  lng: number | null;
  starts_at: string;
  ends_at: string | null;
  status: EventStatus;
  cover_url: string | null;
  gallery: string[] | null;
  participants: string[] | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface StoryRow {
  id: string;
  slug: string;
  title_it: string;
  title_en: string;
  body_it: string | null;
  body_en: string | null;
  occurred_at: string | null;
  cover_url: string | null;
  media: Array<{ type: MediaType; url: string; caption?: string }> | null;
  participants: string[] | null;
  tags: string[] | null;
  classification: StoryClassification;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface MediaRow {
  id: string;
  type: MediaType;
  url: string;
  thumb_url: string | null;
  width: number | null;
  height: number | null;
  duration: number | null;
  caption_it: string | null;
  caption_en: string | null;
  taken_at: string | null;
  participants: string[] | null;
  tags: string[] | null;
  category: string | null;
  created_at: string;
}

export interface TimelineEntryRow {
  id: string;
  occurred_at: string;
  era: string;
  title_it: string;
  title_en: string;
  description_it: string | null;
  description_en: string | null;
  icon: string | null;
  importance: number;
  related_event_id: string | null;
  related_story_id: string | null;
  created_at: string;
}
