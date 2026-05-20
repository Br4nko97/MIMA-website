import { requireAdmin } from "@/lib/auth/require-admin";
import { GlassCard } from "@/components/shared/glass-card";
import {
  getEvents,
  getMembers,
  getStories,
  getMedia,
  getTimeline,
} from "@/lib/data/queries";
import { isAdminAvailable } from "@/lib/supabase/admin";
import { Users, CalendarRange, ScrollText, Image as ImageIcon, GitGraph } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await requireAdmin();

  const [members, events, stories, media, timeline] = await Promise.all([
    getMembers(),
    getEvents(),
    getStories(),
    getMedia(),
    getTimeline(),
  ]);

  const adminConfigured = isAdminAvailable();

  const cards = [
    { label: "Subjects", value: members.length, Icon: Users, color: "aura" as const },
    { label: "Ops", value: events.length, Icon: CalendarRange, color: "default" as const },
    { label: "Stories", value: stories.length, Icon: ScrollText, color: "default" as const },
    { label: "Media", value: media.length, Icon: ImageIcon, color: "default" as const },
    { label: "Timeline entries", value: timeline.length, Icon: GitGraph, color: "default" as const },
  ];

  return (
    <div>
      <div className="mono-caption mb-3 text-[var(--color-aura-3)]">// DASHBOARD</div>
      <h1 className="font-display text-4xl font-extrabold leading-none tracking-[-0.04em] md:text-5xl">
        Console operativa
      </h1>
      <p className="mt-3 text-sm text-[var(--color-fg-1)]">
        Stato corrente dell&apos;archivio. Tutti gli inserimenti sono tracciati.
      </p>

      {!adminConfigured ? (
        <div className="mt-8 rounded-2xl border border-[var(--color-warning)]/40 bg-[var(--color-warning)]/[0.06] p-5 text-sm text-[var(--color-warning)]">
          <div className="font-display text-base font-bold">
            Service role key non configurata
          </div>
          <p className="mt-1 text-[var(--color-fg-1)]">
            Il pannello è accessibile ma le scritture su Supabase sono disabilitate.
            Imposta <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-xs">SUPABASE_SERVICE_ROLE_KEY</code>{" "}
            nel file <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-xs">.env.local</code>{" "}
            (Supabase Dashboard → Project Settings → API → service_role).
          </p>
        </div>
      ) : null}

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
        {cards.map((c) => {
          const Icon = c.Icon;
          return (
            <GlassCard key={c.label} className="p-5">
              <div className="flex items-start justify-between">
                <div className="mono-caption">{c.label}</div>
                <Icon className="h-4 w-4 text-[var(--color-fg-2)]" />
              </div>
              <div className="mt-4 font-display text-4xl font-extrabold tracking-tight">
                {c.value}
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="mt-12">
        <h2 className="mono-caption mb-3">// QUICK ACTIONS</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            { href: "/admin/members", label: "Edit subjects" },
            { href: "/admin/events", label: "Schedule operation" },
            { href: "/admin/stories", label: "Document story" },
            { href: "/admin/media", label: "Upload media" },
            { href: "/admin/timeline", label: "Add timeline entry" },
          ].map((a) => (
            <a
              key={a.href}
              href={a.href}
              data-cursor="link"
              className="group flex items-center justify-between rounded-2xl border border-[var(--color-line-strong)] bg-white/[0.02] px-5 py-4 transition-colors hover:bg-white/[0.05]"
            >
              <span className="text-sm">{a.label}</span>
              <span className="text-[var(--color-fg-2)] group-hover:text-[var(--color-aura-3)]">→</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
