"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/shared/glass-card";
import { ClassifiedTag } from "@/components/shared/classified-tag";
import { deleteMedia, insertMedia } from "@/lib/admin/actions";
import type { MediaRow, MediaType } from "@/lib/supabase/types";

interface AdminMediaPanelProps {
  rows: MediaRow[];
}

export function AdminMediaPanel({ rows }: AdminMediaPanelProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("serata");

  async function handleUpload(file: File) {
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("bucket", "media");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = (await res.json()) as { ok: boolean; url?: string; error?: string };
      if (!res.ok || !json.ok || !json.url) {
        toast.error(json.error || "Upload failed");
        return;
      }

      const mime = file.type || "";
      const type: MediaType = mime.startsWith("video")
        ? "video"
        : mime.startsWith("audio")
          ? "audio"
          : "image";

      const insertRes = await insertMedia({
        type,
        url: json.url,
        thumb_url: type === "audio" ? null : json.url,
        caption_it: caption || null,
        caption_en: caption || null,
        category,
        tags: [category],
      });

      if (!insertRes.ok) {
        toast.warning(
          `File caricato ma record DB non creato: ${insertRes.error}. URL: ${json.url}`,
        );
        return;
      }

      toast.success("Media caricato e indicizzato");
      setCaption("");
      router.refresh();
    } catch (e) {
      console.error(e);
      toast.error("Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Eliminare record media?")) return;
    startTransition(async () => {
      const res = await deleteMedia(id);
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      toast.success("Removed");
      router.refresh();
    });
  }

  return (
    <div className="space-y-8">
      <GlassCard variant="strong" className="p-6">
        <h2 className="font-display text-xl font-bold tracking-tight">Upload</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Caption</Label>
            <Input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="frame 03:42…"
            />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 w-full rounded-xl border border-[var(--color-line-strong)] bg-white/[0.03] px-4 text-sm"
            >
              <option value="serata">serata</option>
              <option value="vacanza">vacanza</option>
              <option value="random">random</option>
              <option value="iconic">iconic</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>File</Label>
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*,video/*,audio/*"
                disabled={busy}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleUpload(f);
                }}
              />
              <Button asChild variant="aura" disabled={busy} type="button">
                <span>
                  <Upload className="h-4 w-4" /> {busy ? "Uploading…" : "Upload"}
                </span>
              </Button>
            </label>
          </div>
        </div>
        <p className="mt-4 text-xs text-[var(--color-fg-2)]">
          File caricato su Supabase Storage e indicizzato automaticamente nella tabella
          media — appare subito nella galleria pubblica.
        </p>
      </GlassCard>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {rows.map((m) => (
          <GlassCard key={m.id} className="overflow-hidden">
            <div className="relative aspect-square bg-[var(--color-bg-2)]">
              {m.type === "image" || m.type === "video" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={m.thumb_url ?? m.url}
                  alt={m.caption_it ?? ""}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="grid h-full place-items-center text-[var(--color-fg-2)]">
                  audio
                </div>
              )}
              <div className="absolute left-2 top-2">
                <ClassifiedTag label={m.type.toUpperCase()} variant="default" />
              </div>
              <button
                type="button"
                onClick={() => remove(m.id)}
                disabled={pending}
                data-cursor="link"
                className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-[var(--color-fg-1)] backdrop-blur-sm transition-colors hover:bg-[var(--color-danger)]/80 hover:text-white"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="p-3">
              <div className="line-clamp-2 text-xs text-[var(--color-fg-1)]">
                {m.caption_it ?? m.url}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
