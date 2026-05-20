"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useDictionary } from "@/lib/i18n/use-locale";
import { formatDate } from "@/lib/utils/format-date";
import { ClassifiedTag } from "@/components/shared/classified-tag";
import { GlassCard } from "@/components/shared/glass-card";
import { cn } from "@/lib/utils/cn";
import type { TimelineEntryRow } from "@/lib/supabase/types";
import { ERAS, type Era } from "@/lib/content/timeline-seed";

export function TimelineVertical({ entries }: { entries: TimelineEntryRow[] }) {
  const { dict, locale } = useDictionary();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 30%", "end 70%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  // Group by era
  const grouped = ERAS.map((era) => ({
    era,
    entries: entries.filter((e) => e.era === era),
  })).filter((g) => g.entries.length > 0);

  const eraLabel = (era: Era) => dict.timeline.eras[era] ?? era;

  return (
    <div ref={ref} className="relative">
      {/* Center vertical line (desktop) */}
      <div
        aria-hidden
        className="absolute bottom-0 left-7 top-0 hidden w-px bg-[var(--color-line)] md:left-1/2 md:block md:-translate-x-1/2"
      />
      <motion.div
        aria-hidden
        style={{ scaleY: lineScale }}
        className="absolute bottom-0 left-7 top-0 hidden w-px origin-top bg-gradient-to-b from-[var(--color-aura-3)] via-[var(--color-aura-1)] to-[var(--color-aura-2)] md:left-1/2 md:block md:-translate-x-1/2"
      />

      <div className="space-y-24">
        {grouped.map((group) => (
          <section key={group.era}>
            {/* Era header */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7 }}
              className="mb-12 flex items-center justify-center"
            >
              <div className="glass-strong relative z-10 rounded-full border border-[var(--color-line-strong)] px-6 py-2">
                <span className="mono-caption text-[var(--color-aura-3)]">
                  ERA · {eraLabel(group.era as Era)}
                </span>
              </div>
            </motion.div>

            <div className="space-y-10">
              {group.entries.map((entry, i) => {
                const side = i % 2 === 0 ? "left" : "right";
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: side === "left" ? -30 : 30, y: 12 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "relative grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-12",
                    )}
                  >
                    {/* Dot */}
                    <div className="absolute left-7 top-7 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--color-bg-0)] ring-2 ring-[var(--color-aura-1)] md:left-1/2 md:block" />

                    {/* Card */}
                    <div
                      className={cn(
                        "md:col-start-1 md:row-start-1 pl-14 md:pl-0",
                        side === "right" && "md:col-start-2",
                      )}
                    >
                      <GlassCard
                        hoverable
                        className="p-6"
                      >
                        <div className="flex items-center gap-2">
                          <ClassifiedTag
                            label={`№ ${String(entry.importance).padStart(2, "0")}`}
                            variant={entry.importance >= 5 ? "aura" : "default"}
                          />
                          <span className="mono-caption text-[var(--color-fg-2)]">
                            {formatDate(entry.occurred_at, locale)}
                          </span>
                        </div>
                        <h3 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                          {locale === "it" ? entry.title_it : entry.title_en}
                        </h3>
                        <p className="mt-3 text-sm text-[var(--color-fg-1)]">
                          {(locale === "it" ? entry.description_it : entry.description_en) ?? "—"}
                        </p>
                      </GlassCard>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
