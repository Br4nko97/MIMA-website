"use client";

import { type ReactNode, useState, useMemo } from "react";
import { Search } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

export interface Column<T> {
  key: string;
  header: string;
  width?: string;
  render: (row: T) => ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  rows: T[];
  columns: Column<T>[];
  searchKey?: (row: T) => string;
  actions?: (row: T) => ReactNode;
  emptyLabel?: string;
}

export function DataTable<T extends { id: string }>({
  rows,
  columns,
  searchKey,
  actions,
  emptyLabel = "No records yet.",
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim() || !searchKey) return rows;
    const q = query.toLowerCase();
    return rows.filter((r) => searchKey(r).toLowerCase().includes(q));
  }, [rows, query, searchKey]);

  return (
    <GlassCard variant="strong" className="overflow-hidden">
      {searchKey ? (
        <div className="flex items-center gap-2 border-b border-[var(--color-line)] px-4 py-3">
          <Search className="h-4 w-4 text-[var(--color-fg-2)]" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="h-9 border-transparent bg-transparent focus-visible:bg-transparent"
          />
          <span className="mono-caption text-[var(--color-fg-2)]">
            {filtered.length} / {rows.length}
          </span>
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <div className="p-10 text-center text-sm text-[var(--color-fg-2)]">
          {emptyLabel}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-line)] text-left">
                {columns.map((c) => (
                  <th
                    key={c.key}
                    className={cn(
                      "mono-caption px-4 py-3 font-medium text-[var(--color-fg-2)]",
                      c.width,
                    )}
                  >
                    {c.header}
                  </th>
                ))}
                {actions ? <th className="px-4 py-3" /> : null}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[var(--color-line)] transition-colors hover:bg-white/[0.025]"
                >
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3 align-middle">
                      {c.render(row)}
                    </td>
                  ))}
                  {actions ? (
                    <td className="px-4 py-3 text-right align-middle">
                      {actions(row)}
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </GlassCard>
  );
}
