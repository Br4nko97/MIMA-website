import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getEvents } from "@/lib/data/queries";
import { EventEditorClient } from "@/components/admin/event-editor-client";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

const TEMPLATE = {
  slug: "operation-new",
  codename: "OPERATION NEW",
  title_it: "Nuova operazione",
  title_en: "New operation",
  description_it: "",
  description_en: "",
  location: "",
  lat: null,
  lng: null,
  starts_at: new Date().toISOString(),
  ends_at: null,
  status: "planned",
  cover_url: null,
  gallery: [],
  participants: [],
  tags: [],
};

export default async function AdminEventEditPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;
  const isNew = id === "new";
  const events = await getEvents();
  const initial = isNew
    ? TEMPLATE
    : (events.find((e) => e.id === id) as Record<string, unknown> | undefined);
  if (!isNew && !initial) notFound();

  return (
    <div>
      <div className="mb-6">
        <div className="mono-caption mb-2 text-[var(--color-aura-3)]">
          // {isNew ? "NEW OPERATION" : "EDIT OPERATION"}
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          {isNew ? "Nuova operazione" : (initial?.codename as string)}
        </h1>
      </div>
      <EventEditorClient initial={initial!} id={isNew ? undefined : id} />
    </div>
  );
}
