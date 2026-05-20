import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getStories } from "@/lib/data/queries";
import { StoryEditorClient } from "@/components/admin/story-editor-client";

export const dynamic = "force-dynamic";

const TEMPLATE = {
  slug: "new-story",
  title_it: "Nuova storia",
  title_en: "New story",
  body_it: "",
  body_en: "",
  occurred_at: new Date().toISOString().slice(0, 10),
  cover_url: null,
  media: [],
  participants: [],
  tags: [],
  classification: "public",
  is_published: true,
};

export default async function AdminStoryEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const isNew = id === "new";
  const stories = await getStories();
  const initial = isNew
    ? TEMPLATE
    : (stories.find((s) => s.id === id) as Record<string, unknown> | undefined);
  if (!isNew && !initial) notFound();

  return (
    <div>
      <div className="mb-6">
        <div className="mono-caption mb-2 text-[var(--color-aura-3)]">
          // {isNew ? "NEW STORY" : "EDIT STORY"}
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          {isNew ? "Nuova storia" : (initial?.title_it as string)}
        </h1>
      </div>
      <StoryEditorClient initial={initial!} id={isNew ? undefined : id} />
    </div>
  );
}
