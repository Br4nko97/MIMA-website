"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useDictionary } from "@/lib/i18n/use-locale";
import { Reveal } from "@/components/shared/reveal";

function Counter({ to, suffix }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    function step(now: number) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  const display =
    Number.isInteger(to)
      ? Math.round(value).toLocaleString("it-IT")
      : value.toFixed(1).replace(".", ",");

  return (
    <span ref={ref}>
      {display}
      {suffix ?? ""}
    </span>
  );
}

export function StatsSection() {
  const { dict } = useDictionary();

  return (
    <section className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <Reveal>
            <div className="mono-caption mb-3">// {dict.landing.statsEyebrow}</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-balance text-4xl font-bold leading-[1.05] tracking-[-0.03em] md:text-6xl">
              {dict.landing.statsTitle}
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-line-strong)] md:grid-cols-4">
          {dict.landing.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-[var(--color-bg-1)] p-8 md:p-10"
            >
              <div className="mono-caption mb-4">№ {String(i + 1).padStart(2, "0")}</div>
              <div className="font-display text-5xl font-extrabold leading-none tracking-[-0.04em] md:text-7xl">
                <span className="aura-text">
                  <Counter to={s.value} suffix={s.suffix} />
                </span>
              </div>
              <div className="mt-6 text-sm text-[var(--color-fg-1)]">{s.label}</div>

              <div className="absolute right-4 top-4 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-aura-1)] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-aura-1)]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
