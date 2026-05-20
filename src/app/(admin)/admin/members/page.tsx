import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getMembers } from "@/lib/data/queries";
import { DataTable, type Column } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { ClassifiedTag } from "@/components/shared/classified-tag";
import { MemberAvatar } from "@/components/shared/member-avatar";
import type { MemberWithStats } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AdminMembersPage() {
  await requireAdmin();
  const rows = await getMembers();

  const columns: Column<MemberWithStats>[] = [
    {
      key: "avatar",
      header: "",
      width: "w-14",
      render: (r) => (
        <MemberAvatar
          nickname={r.nickname}
          src={r.avatar_url}
          rounded="full"
          className="h-10 w-10"
          showMonogram={false}
        />
      ),
    },
    {
      key: "nickname",
      header: "Nickname",
      render: (r) => (
        <div>
          <div className="font-display text-base font-bold">{r.nickname}</div>
          <div className="text-xs text-[var(--color-fg-2)]">{r.full_name}</div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (r) => <span className="text-[var(--color-fg-1)]">{r.role_title ?? "—"}</span>,
    },
    {
      key: "school",
      header: "School",
      render: (r) => <span className="text-[var(--color-fg-1)]">{r.school ?? "—"}</span>,
    },
    {
      key: "class",
      header: "Class.",
      render: (r) =>
        r.classification ? (
          <ClassifiedTag
            label={r.classification}
            variant={
              r.classification === "LEGEND"
                ? "aura"
                : r.classification === "UNSTABLE"
                  ? "danger"
                  : r.classification === "CLASSIFIED"
                    ? "warn"
                    : "default"
            }
          />
        ) : (
          <span className="text-[var(--color-fg-3)]">—</span>
        ),
    },
    {
      key: "aura",
      header: "Aura",
      render: (r) => (
        <span className="font-mono">{r.stats?.aura ?? "—"}</span>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="mono-caption mb-2 text-[var(--color-aura-3)]">// SUBJECTS</div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Soggetti
          </h1>
        </div>
        <Button asChild variant="aura">
          <Link href="/admin/members/new" data-cursor="link">
            <Plus className="h-4 w-4" /> Nuovo
          </Link>
        </Button>
      </div>

      <DataTable
        rows={rows}
        columns={columns}
        searchKey={(r) => `${r.nickname} ${r.full_name} ${r.role_title ?? ""}`}
        actions={(r) => (
          <Button asChild variant="ghost" size="sm">
            <Link href={`/admin/members/${r.id}`} data-cursor="link">
              <Pencil className="h-3.5 w-3.5" />
            </Link>
          </Button>
        )}
        emptyLabel="Nessun soggetto. Aggiungine uno."
      />
    </div>
  );
}
