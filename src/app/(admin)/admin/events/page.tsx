import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getEvents } from "@/lib/data/queries";
import { DataTable, type Column } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { ClassifiedTag } from "@/components/shared/classified-tag";
import { formatDate } from "@/lib/utils/format-date";
import type { EventRow } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

const STATUS_VARIANT: Record<EventRow["status"], "success" | "aura" | "default" | "danger"> = {
  live: "success",
  planned: "aura",
  archived: "default",
  classified: "danger",
};

export default async function AdminEventsPage() {
  await requireAdmin();
  const rows = await getEvents();

  const columns: Column<EventRow>[] = [
    {
      key: "title",
      header: "Operation",
      render: (r) => (
        <div>
          <div className="font-display text-base font-bold">{r.title_it}</div>
          <div className="mono-caption">{r.codename}</div>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (r) => formatDate(r.starts_at),
    },
    {
      key: "location",
      header: "Location",
      render: (r) => <span className="text-[var(--color-fg-1)]">{r.location ?? "—"}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <ClassifiedTag label={r.status.toUpperCase()} variant={STATUS_VARIANT[r.status]} />
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="mono-caption mb-2 text-[var(--color-aura-3)]">// OPERATIONS</div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Operazioni
          </h1>
        </div>
        <Button asChild variant="aura">
          <Link href="/admin/events/new" data-cursor="link">
            <Plus className="h-4 w-4" /> Nuova
          </Link>
        </Button>
      </div>

      <DataTable
        rows={rows}
        columns={columns}
        searchKey={(r) => `${r.codename} ${r.title_it} ${r.location ?? ""}`}
        actions={(r) => (
          <Button asChild variant="ghost" size="sm">
            <Link href={`/admin/events/${r.id}`} data-cursor="link">
              <Pencil className="h-3.5 w-3.5" />
            </Link>
          </Button>
        )}
      />
    </div>
  );
}
