"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Calendar, Users } from "lucide-react";
import { useDictionary } from "@/lib/i18n/use-locale";
import { GlassCard } from "@/components/shared/glass-card";
import { ClassifiedTag } from "@/components/shared/classified-tag";
import { formatDate } from "@/lib/utils/format-date";
import { classifiedCode } from "@/lib/utils/classified";
import type { EventRow } from "@/lib/supabase/types";

const STATUS_VARIANT: Record<EventRow["status"], "success" | "aura" | "default" | "danger"> = {
  live: "success",
  planned: "aura",
  archived: "default",
  classified: "danger",
};

export function EventCard({ event }: { event: EventRow }) {
  const { dict, locale } = useDictionary();
  const code = classifiedCode(event.slug, "OP");
  const upcoming =
    event.status === "planned" &&
    new Date(event.starts_at).getTime() > Date.now();

  return (
    <motion.article
      id={event.slug}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard hoverable className="p-6 md:p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-start">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2">
              <ClassifiedTag
                label={dict.tour.statusLabels[event.status]}
                variant={STATUS_VARIANT[event.status]}
              />
              {upcoming ? <ClassifiedTag label="UPCOMING" variant="aura" /> : null}
            </div>
            <div className="mono-caption mt-5 text-[var(--color-aura-3)]">
              {event.codename}
            </div>
            <h3 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              {locale === "it" ? event.title_it : event.title_en}
            </h3>
            <div className="mono-caption mt-4">{code}</div>
          </div>

          <div className="md:col-span-5">
            <p className="text-base text-[var(--color-fg-1)]">
              {(locale === "it" ? event.description_it : event.description_en) ?? "—"}
            </p>

            {event.tags && event.tags.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {event.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-[var(--color-line-strong)] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--color-fg-2)]"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="md:col-span-3">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="mono-caption mb-1 flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" /> Date
                </dt>
                <dd className="font-display text-base font-bold">
                  {formatDate(event.starts_at, locale)}
                </dd>
              </div>
              {event.location ? (
                <div>
                  <dt className="mono-caption mb-1 flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" /> Location
                  </dt>
                  <dd className="font-display text-base font-bold">
                    {event.location}
                  </dd>
                </div>
              ) : null}
              {event.participants ? (
                <div>
                  <dt className="mono-caption mb-1 flex items-center gap-1.5">
                    <Users className="h-3 w-3" /> Subjects
                  </dt>
                  <dd className="font-display text-base font-bold">
                    {event.participants.length}/7
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>
        </div>
      </GlassCard>
    </motion.article>
  );
}
