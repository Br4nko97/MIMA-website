"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useDictionary } from "@/lib/i18n/use-locale";
import { Reveal } from "@/components/shared/reveal";
import { Magnetic } from "@/components/shared/magnetic";
import { AnimatedGradient } from "@/components/effects/animated-gradient";

export function EnterArchive() {
  const { dict } = useDictionary();

  return (
    <section className="relative px-6 py-32 md:py-44">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line-strong)] bg-[var(--color-bg-1)] p-10 md:p-20">
          <AnimatedGradient intensity="low" />
          <div className="relative z-10 flex flex-col items-center text-center">
            <Reveal>
              <div className="mono-caption mb-6">// END OF PREVIEW</div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-display text-balance text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] md:text-7xl">
                {dict.landing.enterTitle}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-base text-[var(--color-fg-1)] md:text-lg">
                {dict.landing.enterSubtitle}
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <Magnetic strength={0.4}>
                <Link
                  href="/members"
                  data-cursor="link"
                  data-cursor-label={dict.nav.enterArchive}
                  className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-[var(--color-aura-1)] via-[var(--color-aura-glow)] to-[var(--color-aura-2)] px-9 py-4 text-base font-medium text-white shadow-[0_20px_60px_-15px_rgba(124,77,255,0.6)] transition-transform"
                >
                  <span>{dict.landing.enterCta}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </Link>
              </Magnetic>
            </Reveal>

            <div className="mono-caption mt-12 grid grid-cols-2 gap-x-12 gap-y-2 text-[var(--color-fg-2)] md:grid-cols-4">
              <div>VERIFIED · 1247</div>
              <div>AURA · 98.7%</div>
              <div>EST. 2007</div>
              <div>MN · 46100</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
