"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useDictionary } from "@/lib/i18n/use-locale";
import { Magnetic } from "@/components/shared/magnetic";
import { Marquee } from "@/components/shared/marquee";
import { ChevronDown } from "lucide-react";

export function LandingHero() {
  const { dict } = useDictionary();
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityBg = useTransform(scrollY, [0, 500], [1, 0]);
  const yTitle = useTransform(scrollY, [0, 600], [0, -120]);
  const opacityTitle = useTransform(scrollY, [0, 400], [1, 0]);

  const [taglineIdx, setTaglineIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setTaglineIdx((i) => (i + 1) % dict.landing.heroTaglines.length);
    }, 3200);
    return () => clearInterval(id);
  }, [dict.landing.heroTaglines.length]);

  return (
    <section
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24"
      data-section="hero"
    >
      {/* Background video */}
      <motion.div
        style={{ y: yBg, opacity: opacityBg }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <video
          className="h-full w-full scale-110 object-cover opacity-25 mix-blend-screen"
          autoPlay
          muted
          loop
          playsInline
          poster="/placeholders/hero-poster.jpg"
        >
          <source src="/placeholders/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-0)]/40 via-transparent to-[var(--color-bg-0)]" />
      </motion.div>

      {/* Top eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mono-caption mb-8 flex items-center gap-3"
      >
        <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-[var(--color-aura-1)]" />
        <span>{dict.landing.heroEyebrow}</span>
        <span className="text-[var(--color-fg-3)]">|</span>
        <span>est. 2007 · class of 2026</span>
      </motion.div>

      {/* Title */}
      <motion.div
        style={{ y: yTitle, opacity: opacityTitle }}
        className="relative z-10 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.96, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-display font-black leading-[0.85] tracking-[-0.06em]"
          style={{
            fontSize: "clamp(5rem, 22vw, 18rem)",
          }}
        >
          <span className="aura-text">{dict.landing.heroTitle}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="-mt-4 flex flex-col items-center gap-4"
        >
          <span className="font-serif text-2xl italic text-[var(--color-fg-2)] md:text-3xl">
            {dict.meta.tagline}
          </span>

          <p className="text-balance max-w-xl text-base text-[var(--color-fg-1)] md:text-lg">
            {dict.landing.heroSubtitle}
          </p>
        </motion.div>

        {/* Rotating tagline */}
        <div className="mt-8 h-8 overflow-hidden">
          {dict.landing.heroTaglines.map((t, i) => (
            <motion.div
              key={t}
              animate={{
                y: `-${taglineIdx * 100}%`,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: i === 0 ? "block" : "block" }}
              className="mono-caption text-[11px] text-[var(--color-aura-3)]"
            >
              {t}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#manifesto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-[var(--color-fg-2)] transition-colors hover:text-[var(--color-fg-0)]"
        data-cursor="link"
        data-cursor-label="Scroll"
      >
        <span className="mono-caption">{dict.landing.scrollCue}</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.a>

      {/* Classified marquee — bottom strip */}
      <div className="absolute inset-x-0 bottom-0 z-20 hidden border-y border-[var(--color-line)] bg-black/30 py-3 backdrop-blur-md md:block">
        <Marquee speed={48}>
          {dict.landing.classifiedBanner.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="mono-caption flex items-center gap-12 text-[var(--color-fg-2)]"
            >
              {label}
              <span className="text-[var(--color-aura-1)]">◆</span>
            </span>
          ))}
        </Marquee>
      </div>

      <Magnetic className="pointer-events-none absolute" strength={0}>
        <span className="sr-only">{dict.landing.heroTitle}</span>
      </Magnetic>
    </section>
  );
}
