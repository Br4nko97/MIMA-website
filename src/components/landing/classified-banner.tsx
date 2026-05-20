"use client";

import { useDictionary } from "@/lib/i18n/use-locale";
import { Marquee } from "@/components/shared/marquee";

export function ClassifiedBanner() {
  const { dict } = useDictionary();
  return (
    <section className="relative border-y border-[var(--color-line)] bg-black/40 py-5 backdrop-blur-md md:hidden">
      <Marquee speed={40}>
        {dict.landing.classifiedBanner.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="mono-caption flex items-center gap-10 text-[var(--color-fg-2)]"
          >
            {label}
            <span className="text-[var(--color-aura-1)]">◆</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
