"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FileUploadProps {
  bucket: "members" | "events" | "stories" | "media" | "audio";
  value?: string | null;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
}

export function FileUpload({
  bucket,
  value,
  onChange,
  label = "Upload",
  accept,
}: FileUploadProps) {
  const [busy, setBusy] = useState(false);

  async function handleFile(file: File) {
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("bucket", bucket);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        toast.error(json.error || "Upload failed");
        return;
      }
      onChange(json.url);
      toast.success("Uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="mono-caption block text-[var(--color-fg-1)]">{label}</label>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          type="text"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… or /placeholders/…"
          className="flex-1"
        />
        <label className="cursor-pointer">
          <input
            type="file"
            accept={accept}
            className="hidden"
            disabled={busy}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          <Button asChild type="button" variant="outline" disabled={busy}>
            <span>
              <Upload className="h-4 w-4" />
              {busy ? "…" : "File"}
            </span>
          </Button>
        </label>
      </div>
    </div>
  );
}
