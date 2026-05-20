"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Video, Music } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { ClassifiedTag } from "@/components/shared/classified-tag";
import { MediaLightbox } from "./media-lightbox";
import { useDictionary } from "@/lib/i18n/use-locale";
import type { MediaRow, MediaType } from "@/lib/supabase/types";
import { cn } from "@/lib/utils/cn";

type FilterValue = "all" | MediaType;

const FILTERS: { value: FilterValue; iconKey?: MediaType }[] = [
  { value: "all" },
  { value: "image", iconKey: "image" },
  { value: "video", iconKey: "video" },
  { value: "audio", iconKey: "audio" },
];

function IconForType({ type, className }: { type: MediaType; className?: string }) {
  if (type === "image") return <ImageIcon className={className} />;
  if (type === "video") return <Video className={className} />;
  return <Music className={className} />;
}

export function MediaGrid({ media }: { media: MediaRow[] }) {
  const { dict, locale } = useDictionary();
  const [filter, setFilter] = useState<FilterValue>("all");
  const [active, setActive] = useState<MediaRow | null>(null);

  const filtered = useMemo(() => {
    return filter === "all" ? media : media.filter((m) => m.type === filter);
  }, [media, filter]);

  const filterLabel = (v: FilterValue) =>
    v === "all"
      ? dict.media.filterAll
      : v === "image"
        ? dict.media.filterImages
        : v === "video"
          ? dict.media.filterVideos
          : dict.media.filterAudio;

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            data-cursor="link"
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs uppercase tracking-wider transition-all",
              filter === f.value
                ? "border-transparent bg-white text-black"
                : "border-[var(--color-line-strong)] bg-white/[0.02] text-[var(--color-fg-1)] hover:bg-white/[0.06]",
            )}
          >
            {f.iconKey ? <IconForType type={f.iconKey} className="h-3 w-3" /> : null}
            {filterLabel(f.value)}
            <span className="ml-1 font-mono text-[10px] opacity-60">
              {f.value === "all"
                ? media.length
                : media.filter((m) => m.type === f.value).length}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          layout
          className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
        >
          {filtered.map((m, i) => {
            const caption = locale === "it" ? m.caption_it : m.caption_en;
            return (
              <motion.button
                key={m.id}
                layout
                type="button"
                onClick={() => setActive(m)}
                data-cursor="view"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.5,
                  delay: (i % 12) * 0.03,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -2 }}
                className="group block text-left"
              >
                <GlassCard hoverable className="overflow-hidden">
                  <div className="relative aspect-square overflow-hidden bg-[var(--color-bg-2)]">
                    {m.type === "image" || m.type === "video" ? (
                      <>
                        <img
                          src={m.thumb_url ?? m.url}
                          alt={caption ?? m.url}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.opacity = "0";
                          }}
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-tr from-[var(--color-aura-1)]/30 via-transparent to-[var(--color-aura-2)]/30 mix-blend-overlay"
                        />
                      </>
                    ) : (
                      <div className="grid h-full place-items-center">
                        <Music className="h-16 w-16 text-[var(--color-fg-2)]" />
                      </div>
                    )}

                    <div className="absolute left-2 top-2 rounded-full bg-black/60 p-1.5 backdrop-blur-sm">
                      <IconForType type={m.type} className="h-3 w-3 text-white" />
                    </div>

                    {m.type === "video" && m.duration ? (
                      <div className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-0.5 font-mono text-[10px] text-white backdrop-blur-sm">
                        {String(Math.floor(m.duration / 60)).padStart(2, "0")}:
                        {String(m.duration % 60).padStart(2, "0")}
                      </div>
                    ) : null}
                  </div>
                  {caption ? (
                    <div className="p-3">
                      <div className="line-clamp-1 text-xs text-[var(--color-fg-1)]">
                        {caption}
                      </div>
                    </div>
                  ) : null}
                </GlassCard>
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {active ? (
          <MediaLightbox
            items={filtered}
            initialId={active.id}
            onClose={() => setActive(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
