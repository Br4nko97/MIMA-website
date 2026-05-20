"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useDictionary } from "@/lib/i18n/use-locale";
import { formatDate } from "@/lib/utils/format-date";
import type { MediaRow } from "@/lib/supabase/types";

interface MediaLightboxProps {
  items: MediaRow[];
  initialId: string;
  onClose: () => void;
}

export function MediaLightbox({ items, initialId, onClose }: MediaLightboxProps) {
  const { locale } = useDictionary();
  const [idx, setIdx] = useState(items.findIndex((i) => i.id === initialId));

  const item = items[idx];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") setIdx((i) => (i + 1) % items.length);
      else if (e.key === "ArrowLeft")
        setIdx((i) => (i - 1 + items.length) % items.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length, onClose]);

  if (!item) return null;

  const caption = locale === "it" ? item.caption_it : item.caption_en;

  return (
    <motion.div
      role="dialog"
      aria-modal
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        data-cursor="link"
        className="absolute right-6 top-6 rounded-full bg-white/[0.08] p-2 text-white/80 transition-colors hover:bg-white/[0.16] hover:text-white"
      >
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIdx((i) => (i - 1 + items.length) % items.length);
        }}
        data-cursor="link"
        className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/[0.08] p-3 text-white/80 transition-colors hover:bg-white/[0.16] hover:text-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIdx((i) => (i + 1) % items.length);
        }}
        data-cursor="link"
        className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/[0.08] p-3 text-white/80 transition-colors hover:bg-white/[0.16] hover:text-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-h-[80vh] max-w-[88vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "image" ? (
          <img
            src={item.url}
            alt={caption ?? ""}
            className="max-h-[80vh] max-w-[88vw] rounded-lg object-contain"
          />
        ) : item.type === "video" ? (
          <video
            src={item.url}
            controls
            autoPlay
            className="max-h-[80vh] max-w-[88vw] rounded-lg"
          />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-12 text-center">
            <audio src={item.url} controls autoPlay />
          </div>
        )}
      </motion.div>

      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <div className="glass-strong flex max-w-2xl items-center gap-4 rounded-full px-5 py-2 text-sm">
          <span className="mono-caption text-[var(--color-aura-3)]">
            № {String(idx + 1).padStart(3, "0")} / {String(items.length).padStart(3, "0")}
          </span>
          <span className="text-[var(--color-fg-1)]">{caption ?? "—"}</span>
          {item.taken_at ? (
            <span className="text-[var(--color-fg-2)]">
              · {formatDate(item.taken_at, locale)}
            </span>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
