"use client";

import { EventCard } from "./event-card";
import type { EventRow } from "@/lib/supabase/types";

export function TourTimeline({ events }: { events: EventRow[] }) {
  // Group by year
  const groups = events.reduce<Record<string, EventRow[]>>((acc, ev) => {
    const year = new Date(ev.starts_at).getFullYear().toString();
    acc[year] = acc[year] ?? [];
    acc[year].push(ev);
    return acc;
  }, {});

  const years = Object.keys(groups).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="space-y-16">
      {years.map((year) => (
        <section key={year}>
          <div className="sticky top-24 z-20 mb-6 flex items-baseline gap-4">
            <h2 className="font-display text-6xl font-extrabold leading-none tracking-[-0.04em] md:text-8xl">
              <span className="aura-text">{year}</span>
            </h2>
            <span className="mono-caption text-[var(--color-fg-2)]">
              {groups[year].length} {groups[year].length === 1 ? "OP" : "OPS"}
            </span>
          </div>

          <div className="space-y-5">
            {groups[year]
              .sort((a, b) => new Date(b.starts_at).getTime() - new Date(a.starts_at).getTime())
              .map((ev) => (
                <EventCard key={ev.id} event={ev} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
