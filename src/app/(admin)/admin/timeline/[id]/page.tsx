import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getTimeline } from "@/lib/data/queries";
import { TimelineEditorClient } from "@/components/admin/timeline-editor-client";

export const dynamic = "force-dynamic";

const TEMPLATE = {
  occurred_at: new Date().toISOString().slice(0, 10),
  era: "oggi",
  title_it: "Nuovo evento",
  title_en: "New event",
  description_it: "",
  description_en: "",
  icon: null,
  importance: 3,
  related_event_id: null,
  related_story_id: null,
};

export default async function AdminTimelineEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const isNew = id === "new";
  const entries = await getTimeline();
  const initial = isNew
    ? TEMPLATE
    : (entries.find((e) => e.id === id) as Record<string, unknown> | undefined);
  if (!isNew && !initial) notFound();

  return (
    <div>
      <div className="mb-6">
        <div className="mono-caption mb-2 text-[var(--color-aura-3)]">
          // {isNew ? "NEW TIMELINE ENTRY" : "EDIT TIMELINE ENTRY"}
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          {isNew ? "Nuovo evento" : (initial?.title_it as string)}
        </h1>
      </div>
      <TimelineEditorClient initial={initial!} id={isNew ? undefined : id} />
    </div>
  );
}
