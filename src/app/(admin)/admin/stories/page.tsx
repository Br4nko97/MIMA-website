import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getStories } from "@/lib/data/queries";
import { DataTable, type Column } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { ClassifiedTag } from "@/components/shared/classified-tag";
import { formatDate } from "@/lib/utils/format-date";
import type { StoryRow } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AdminStoriesPage() {
  await requireAdmin();
  const rows = await getStories();

  const columns: Column<StoryRow>[] = [
    {
      key: "title",
      header: "Title",
      render: (r) => (
        <div>
          <div className="font-display text-base font-bold">{r.title_it}</div>
          <div className="mono-caption">{r.slug}</div>
        </div>
      ),
    },
    { key: "date", header: "Date", render: (r) => formatDate(r.occurred_at) },
    {
      key: "class",
      header: "Class.",
      render: (r) => (
        <ClassifiedTag
          label={r.classification.toUpperCase()}
          variant={
            r.classification === "classified"
              ? "danger"
              : r.classification === "restricted"
                ? "warn"
                : "default"
          }
        />
      ),
    },
    {
      key: "pub",
      header: "Published",
      render: (r) => (r.is_published ? "✓" : "—"),
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="mono-caption mb-2 text-[var(--color-aura-3)]">// STORIES</div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Storie
          </h1>
        </div>
        <Button asChild variant="aura">
          <Link href="/admin/stories/new" data-cursor="link">
            <Plus className="h-4 w-4" /> Nuova
          </Link>
        </Button>
      </div>

      <DataTable
        rows={rows}
        columns={columns}
        searchKey={(r) => `${r.title_it} ${r.title_en} ${r.slug}`}
        actions={(r) => (
          <Button asChild variant="ghost" size="sm">
            <Link href={`/admin/stories/${r.id}`} data-cursor="link">
              <Pencil className="h-3.5 w-3.5" />
            </Link>
          </Button>
        )}
      />
    </div>
  );
}
