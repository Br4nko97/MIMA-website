import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getTimeline } from "@/lib/data/queries";
import { DataTable, type Column } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { ClassifiedTag } from "@/components/shared/classified-tag";
import { formatDate } from "@/lib/utils/format-date";
import type { TimelineEntryRow } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AdminTimelinePage() {
  await requireAdmin();
  const rows = await getTimeline();

  const columns: Column<TimelineEntryRow>[] = [
    {
      key: "title",
      header: "Entry",
      render: (r) => (
        <div>
          <div className="font-display text-base font-bold">{r.title_it}</div>
          <div className="mono-caption">era · {r.era}</div>
        </div>
      ),
    },
    { key: "date", header: "Date", render: (r) => formatDate(r.occurred_at) },
    {
      key: "importance",
      header: "Importance",
      render: (r) => (
        <ClassifiedTag
          label={`№ ${String(r.importance).padStart(2, "0")}`}
          variant={r.importance >= 5 ? "aura" : "default"}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="mono-caption mb-2 text-[var(--color-aura-3)]">// TIMELINE</div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Cronologia
          </h1>
        </div>
        <Button asChild variant="aura">
          <Link href="/admin/timeline/new" data-cursor="link">
            <Plus className="h-4 w-4" /> Nuovo
          </Link>
        </Button>
      </div>

      <DataTable
        rows={rows}
        columns={columns}
        searchKey={(r) => `${r.title_it} ${r.title_en} ${r.era}`}
        actions={(r) => (
          <Button asChild variant="ghost" size="sm">
            <Link href={`/admin/timeline/${r.id}`} data-cursor="link">
              <Pencil className="h-3.5 w-3.5" />
            </Link>
          </Button>
        )}
      />
    </div>
  );
}
