"use client";

import { Reveal } from "@/components/shared/reveal";
import { useDictionary } from "@/lib/i18n/use-locale";
import { classifiedCode } from "@/lib/utils/classified";

type PageHeaderKey = "members" | "tour" | "stories" | "media" | "timeline";

interface PageHeaderProps {
  eyebrowKey: PageHeaderKey;
  countLabel?: string;
}

export function PageHeader({ eyebrowKey, countLabel }: PageHeaderProps) {
  const { dict } = useDictionary();
  const sec = dict[eyebrowKey];
  const code = classifiedCode(eyebrowKey, "DOC");

  return (
    <header className="mx-auto mb-20 max-w-7xl px-6">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-9">
          <Reveal>
            <div className="mono-caption mb-4 flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-[var(--color-aura-1)]" />
              <span>// {sec.pageEyebrow}</span>
              <span className="text-[var(--color-fg-3)]">|</span>
              <span>{code}</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-display text-balance text-5xl font-extrabold leading-[0.95] tracking-[-0.04em] md:text-7xl">
              {sec.pageTitle}
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base text-[var(--color-fg-1)] md:text-lg">
              {sec.pageDescription}
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-3 md:text-right">
          <Reveal delay={0.15}>
            <div className="mono-caption mb-2">Volume</div>
            <div className="font-display text-3xl font-bold md:text-4xl">
              {countLabel ?? "—"}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-12 border-t border-[var(--color-line)]" />
    </header>
  );
}
