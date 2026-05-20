"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Calendar } from "lucide-react";
import { useDictionary } from "@/lib/i18n/use-locale";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/shared/reveal";
import { GlassCard } from "@/components/shared/glass-card";
import { ClassifiedTag } from "@/components/shared/classified-tag";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils/format-date";
import type { EventRow } from "@/lib/supabase/types";

const STATUS_VARIANT: Record<EventRow["status"], "success" | "aura" | "default" | "danger"> = {
  live: "success",
  planned: "aura",
  archived: "default",
  classified: "danger",
};

export function RecentOps({ events }: { events: EventRow[] }) {
  const { dict, locale } = useDictionary();

  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <div className="mono-caption mb-3">
                // {dict.landing.recentOpsEyebrow}
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display text-balance text-4xl font-bold leading-[1.05] tracking-[-0.03em] md:text-6xl">
                {dict.landing.recentOpsTitle}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Button asChild variant="outline">
              <Link href="/tour" data-cursor="link">
                {dict.landing.recentOpsCta}
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <StaggerContainer className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {events.map((ev) => (
            <StaggerItem key={ev.id}>
              <Link
                href={`/tour#${ev.slug}`}
                data-cursor="view"
                className="block h-full"
              >
                <GlassCard hoverable className="group h-full p-6">
                  <div className="flex items-center justify-between gap-2">
                    <ClassifiedTag
                      label={dict.tour.statusLabels[ev.status]}
                      variant={STATUS_VARIANT[ev.status]}
                    />
                    <motion.div whileHover={{ rotate: 45 }} className="text-[var(--color-fg-2)] group-hover:text-[var(--color-fg-0)]">
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.div>
                  </div>

                  <div className="mono-caption mt-6 text-[var(--color-aura-3)]">
                    {ev.codename}
                  </div>

                  <h3 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight">
                    {locale === "it" ? ev.title_it : ev.title_en}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm text-[var(--color-fg-1)]">
                    {(locale === "it" ? ev.description_it : ev.description_en) ?? "—"}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--color-fg-2)]">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(ev.starts_at, locale)}
                    </div>
                    {ev.location ? (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {ev.location}
                      </div>
                    ) : null}
                  </div>
                </GlassCard>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
