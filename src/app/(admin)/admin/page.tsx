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
import { getDbStatus } from "@/lib/admin/actions";
import { BootstrapButton } from "@/components/admin/bootstrap-button";
import {
  Users,
  CalendarRange,
  ScrollText,
  Image as ImageIcon,
  GitGraph,
  AlertTriangle,
  Database,
} from "lucide-react";

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
  const dbStatus = adminConfigured ? await getDbStatus() : null;
  const dbTotalRows = dbStatus?.tables
    ? Object.values(dbStatus.tables).reduce((a, b) => a + b, 0)
    : 0;
  const dbEmpty = dbStatus?.ok === true && dbTotalRows === 0;
  const dbHasRows = dbStatus?.ok === true && dbTotalRows > 0;

  const cards = [
    { label: "Subjects", value: members.length, Icon: Users },
    { label: "Ops", value: events.length, Icon: CalendarRange },
    { label: "Stories", value: stories.length, Icon: ScrollText },
    { label: "Media", value: media.length, Icon: ImageIcon },
    { label: "Timeline", value: timeline.length, Icon: GitGraph },
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

      {/* Service role missing */}
      {!adminConfigured ? (
        <div className="mt-8 rounded-2xl border border-[var(--color-warning)]/40 bg-[var(--color-warning)]/[0.06] p-5 text-sm text-[var(--color-warning)]">
          <div className="flex items-center gap-2 font-display text-base font-bold">
            <AlertTriangle className="h-4 w-4" />
            Service role key non configurata
          </div>
          <p className="mt-1 text-[var(--color-fg-1)]">
            Il pannello è accessibile ma le scritture su Supabase sono disabilitate.
            Imposta{" "}
            <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-xs">
              SUPABASE_SERVICE_ROLE_KEY
            </code>{" "}
            su Vercel (Project Settings → Environment Variables). La trovi su Supabase
            Dashboard → Project Settings → API → service_role secret.
          </p>
        </div>
      ) : null}

      {/* DB connectivity error (tables missing, etc.) */}
      {adminConfigured && dbStatus?.ok === false ? (
        <div className="mt-8 rounded-2xl border border-[var(--color-danger)]/40 bg-[var(--color-danger)]/[0.06] p-5 text-sm">
          <div className="flex items-center gap-2 font-display text-base font-bold text-[var(--color-danger)]">
            <AlertTriangle className="h-4 w-4" />
            Tabelle Supabase non raggiungibili
          </div>
          <p className="mt-1 text-[var(--color-fg-1)]">
            Errore: <code className="font-mono text-xs">{dbStatus.error}</code>
          </p>
          <p className="mt-2 text-[var(--color-fg-1)]">
            Le migrations potrebbero non essere state applicate. Vai su Supabase
            Dashboard → SQL editor ed esegui in ordine{" "}
            <code className="font-mono text-xs">0001_init.sql</code>,{" "}
            <code className="font-mono text-xs">0002_rls.sql</code>,{" "}
            <code className="font-mono text-xs">0003_storage.sql</code>.
          </p>
        </div>
      ) : null}

      {/* Bootstrap CTA */}
      {dbEmpty ? (
        <GlassCard variant="strong" className="mt-8 p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 font-display text-base font-bold">
                <Database className="h-4 w-4 text-[var(--color-aura-3)]" />
                DB vuoto — i contenuti visibili sono ancora i seed locali
              </div>
              <p className="mt-1 text-sm text-[var(--color-fg-1)]">
                Clicca per importare i 7 soggetti, 6 operazioni, 4 storie, 8 timeline
                e 8 media nel database. Dopo, potrai modificarli/eliminarli da qui.
              </p>
            </div>
            <BootstrapButton />
          </div>
        </GlassCard>
      ) : null}

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
        {cards.map((c) => {
          const Icon = c.Icon;
          return (
            <GlassCard key={c.label} className="p-4 md:p-5">
              <div className="flex items-start justify-between">
                <div className="mono-caption">{c.label}</div>
                <Icon className="h-4 w-4 text-[var(--color-fg-2)]" />
              </div>
              <div className="mt-3 font-display text-3xl font-extrabold tracking-tight md:mt-4 md:text-4xl">
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
              <span className="text-[var(--color-fg-2)] group-hover:text-[var(--color-aura-3)]">
                →
              </span>
            </a>
          ))}
        </div>
      </div>

      {dbHasRows ? (
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--color-line)] bg-white/[0.02] p-4">
          <div className="text-xs text-[var(--color-fg-2)]">
            DB sincronizzato — {dbTotalRows} righe totali. Risincronizzare ripristina i
            valori dei seed locali (utile dopo aver modificato i file{" "}
            <code className="font-mono">*-seed.ts</code>).
          </div>
          <BootstrapButton alreadyBootstrapped />
        </div>
      ) : null}
    </div>
  );
}
