"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GlassCard } from "@/components/shared/glass-card";

interface JsonEditorPanelProps<T> {
  title: string;
  initial: T | null;
  onSave: (input: unknown, id?: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  onDelete?: (id: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  id?: string;
  hint?: string;
  redirectAfter?: string;
}

export function JsonEditorPanel<T extends Record<string, unknown>>({
  title,
  initial,
  onSave,
  onDelete,
  id,
  hint,
  redirectAfter,
}: JsonEditorPanelProps<T>) {
  const router = useRouter();
  const [value, setValue] = useState(JSON.stringify(initial ?? {}, null, 2));
  const [pending, startTransition] = useTransition();

  async function save() {
    let parsed: unknown;
    try {
      parsed = JSON.parse(value);
    } catch {
      toast.error("Invalid JSON");
      return;
    }
    startTransition(async () => {
      const res = await onSave(parsed, id);
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      toast.success("Saved");
      if (redirectAfter) router.push(redirectAfter);
      router.refresh();
    });
  }

  async function remove() {
    if (!id || !onDelete) return;
    if (!confirm("Eliminare definitivamente? Operazione irreversibile.")) return;
    startTransition(async () => {
      const res = await onDelete(id);
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      toast.success("Deleted");
      if (redirectAfter) router.push(redirectAfter);
      router.refresh();
    });
  }

  return (
    <GlassCard variant="strong" className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
        <div className="flex items-center gap-2">
          {id && onDelete ? (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={remove}
              disabled={pending}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          ) : null}
          <Button type="button" variant="aura" size="sm" onClick={save} disabled={pending}>
            <Save className="h-3.5 w-3.5" />
            {pending ? "…" : "Save"}
          </Button>
        </div>
      </div>
      {hint ? (
        <p className="mt-2 text-xs text-[var(--color-fg-2)]">{hint}</p>
      ) : null}
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mt-4 min-h-[480px] font-mono text-xs"
        spellCheck={false}
      />
    </GlassCard>
  );
}
