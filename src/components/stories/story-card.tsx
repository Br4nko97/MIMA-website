"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/glass-card";
import { ClassifiedTag } from "@/components/shared/classified-tag";
import { useDictionary } from "@/lib/i18n/use-locale";
import { formatDate } from "@/lib/utils/format-date";
import { classifiedCode } from "@/lib/utils/classified";
import type { StoryRow } from "@/lib/supabase/types";

interface StoryCardProps {
  story: StoryRow;
  index: number;
  onClick: () => void;
}

const CLASSIFICATION_VARIANT = {
  public: "default",
  restricted: "warn",
  classified: "danger",
} as const;

// Vary card heights to give the masonry feel
const HEIGHT_VARIANTS = [
  "h-72",
  "h-96",
  "h-80",
  "h-[28rem]",
  "h-64",
  "h-[30rem]",
];

export function StoryCard({ story, index, onClick }: StoryCardProps) {
  const { dict, locale } = useDictionary();
  const code = classifiedCode(story.slug, "DOC");
  const height = HEIGHT_VARIANTS[index % HEIGHT_VARIANTS.length];

  const title = locale === "it" ? story.title_it : story.title_en;
  const body = locale === "it" ? story.body_it : story.body_en;

  const isClassified = story.classification === "classified";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      data-cursor="view"
      data-cursor-label="Open document"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: (index % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="block w-full text-left"
    >
      <GlassCard
        hoverable
        className={`relative flex w-full flex-col overflow-hidden p-6 ${height}`}
      >
        <div className="flex items-center justify-between gap-3">
          <ClassifiedTag
            label={
              story.classification === "classified"
                ? dict.stories.classificationClassified
                : story.classification === "restricted"
                  ? dict.stories.classificationRestricted
                  : dict.stories.classificationPublic
            }
            variant={CLASSIFICATION_VARIANT[story.classification]}
          />
          <span className="mono-caption">{code}</span>
        </div>

        <div className="mono-caption mt-6 text-[var(--color-fg-2)]">
          {formatDate(story.occurred_at, locale)}
        </div>

        <h3 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight md:text-3xl">
          {title}
        </h3>

        {body ? (
          <p
            className={`mt-4 flex-1 overflow-hidden text-sm leading-relaxed text-[var(--color-fg-1)] ${isClassified ? "blur-[3px] select-none" : ""}`}
          >
            {body.length > 320 ? `${body.slice(0, 320)}…` : body}
          </p>
        ) : null}

        <div className="mono-caption mt-auto pt-6 text-[var(--color-aura-3)]">
          → {dict.stories.readMore}
        </div>
      </GlassCard>
    </motion.button>
  );
}
