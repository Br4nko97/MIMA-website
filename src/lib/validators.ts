import { z } from "zod";

export const memberSchema = z.object({
  slug: z.string().min(1),
  full_name: z.string().min(1),
  nickname: z.string().min(1),
  role_title: z.string().nullable().optional(),
  school: z.enum(["Fermi", "D'Este", "Altro"]).nullable().optional(),
  bio_it: z.string().nullable().optional(),
  bio_en: z.string().nullable().optional(),
  classification: z.string().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
  cover_url: z.string().nullable().optional(),
  favorite_phrases: z.array(z.string()).nullable().optional(),
  achievements: z.array(z.string()).nullable().optional(),
  badges: z.array(z.string()).nullable().optional(),
  display_order: z.coerce.number().int().default(0),
  is_active: z.boolean().default(true),
});
export type MemberInput = z.infer<typeof memberSchema>;

export const memberStatsSchema = z.object({
  member_id: z.string().uuid(),
  aura: z.coerce.number().int().min(0).max(100),
  danger: z.coerce.number().int().min(0).max(100),
  alcohol_resistance: z.coerce.number().int().min(0).max(100),
  disappearing_probability: z.coerce.number().int().min(0).max(100),
  chaos_generation: z.coerce.number().int().min(0).max(100),
  gym_addiction: z.coerce.number().int().min(0).max(100),
  emotional_stability: z.coerce.number().int().min(0).max(100),
  survivability: z.coerce.number().int().min(0).max(100),
  negotiation: z.coerce.number().int().min(0).max(100),
  spontaneous_disappearance_rate: z.coerce.number().int().min(0).max(100),
});
export type MemberStatsInput = z.infer<typeof memberStatsSchema>;

export const eventSchema = z.object({
  slug: z.string().min(1),
  codename: z.string().min(1),
  title_it: z.string().min(1),
  title_en: z.string().min(1),
  description_it: z.string().nullable().optional(),
  description_en: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  lat: z.coerce.number().nullable().optional(),
  lng: z.coerce.number().nullable().optional(),
  starts_at: z.string(),
  ends_at: z.string().nullable().optional(),
  status: z.enum(["planned", "live", "archived", "classified"]),
  cover_url: z.string().nullable().optional(),
  gallery: z.array(z.string()).nullable().optional(),
  participants: z.array(z.string().uuid()).nullable().optional(),
  tags: z.array(z.string()).nullable().optional(),
});
export type EventInput = z.infer<typeof eventSchema>;

export const storySchema = z.object({
  slug: z.string().min(1),
  title_it: z.string().min(1),
  title_en: z.string().min(1),
  body_it: z.string().nullable().optional(),
  body_en: z.string().nullable().optional(),
  occurred_at: z.string().nullable().optional(),
  cover_url: z.string().nullable().optional(),
  media: z
    .array(
      z.object({
        type: z.enum(["image", "video", "audio"]),
        url: z.string(),
        caption: z.string().optional(),
      }),
    )
    .nullable()
    .optional(),
  participants: z.array(z.string().uuid()).nullable().optional(),
  tags: z.array(z.string()).nullable().optional(),
  classification: z.enum(["public", "restricted", "classified"]).default("public"),
  is_published: z.boolean().default(true),
});
export type StoryInput = z.infer<typeof storySchema>;

export const timelineSchema = z.object({
  occurred_at: z.string(),
  era: z.string().min(1),
  title_it: z.string().min(1),
  title_en: z.string().min(1),
  description_it: z.string().nullable().optional(),
  description_en: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  importance: z.coerce.number().int().min(1).max(5),
  related_event_id: z.string().uuid().nullable().optional(),
  related_story_id: z.string().uuid().nullable().optional(),
});
export type TimelineInput = z.infer<typeof timelineSchema>;

export const loginSchema = z.object({
  password: z.string().min(1, "Password required"),
});
