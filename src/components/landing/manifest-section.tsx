"use client";

import { useRef } from "react";
import { motion, type MotionValue, useScroll, useTransform } from "framer-motion";
import { useDictionary } from "@/lib/i18n/use-locale";

function ManifestWord({
  word,
  start,
  end,
  progress,
}: {
  word: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.22em]">
      {word}
    </motion.span>
  );
}

export function ManifestSection() {
  const { dict } = useDictionary();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });

  const words = dict.landing.manifestBody.split(/\s+/);

  return (
    <section id="manifesto" ref={ref} className="relative px-6 py-32 md:py-48">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mono-caption mb-6"
        >
          // {dict.landing.manifestEyebrow}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-balance text-4xl font-bold leading-[1.05] tracking-[-0.03em] md:text-6xl"
        >
          {dict.landing.manifestTitle}
        </motion.h2>

        <p className="mt-10 font-serif text-2xl leading-[1.5] text-[var(--color-fg-1)] md:text-3xl">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <ManifestWord
                key={`${i}-${word}`}
                word={word}
                start={start}
                end={end}
                progress={scrollYProgress}
              />
            );
          })}
        </p>
      </div>
    </section>
  );
}
