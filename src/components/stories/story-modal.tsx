"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ClassifiedTag } from "@/components/shared/classified-tag";
import { useDictionary } from "@/lib/i18n/use-locale";
import { formatDate } from "@/lib/utils/format-date";
import { classifiedCode } from "@/lib/utils/classified";
import type { StoryRow } from "@/lib/supabase/types";

const CLASSIFICATION_VARIANT = {
  public: "default",
  restricted: "warn",
  classified: "danger",
} as const;

interface StoryModalProps {
  story: StoryRow;
  open: boolean;
  onClose: () => void;
}

export function StoryModal({ story, open, onClose }: StoryModalProps) {
  const { dict, locale } = useDictionary();
  const code = classifiedCode(story.slug, "DOC");
  const title = locale === "it" ? story.title_it : story.title_en;
  const body = locale === "it" ? story.body_it : story.body_en;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <div className="flex items-center gap-3">
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
          <span className="mono-caption text-[var(--color-fg-2)]">
            · {formatDate(story.occurred_at, locale)}
          </span>
        </div>

        <DialogTitle className="font-display text-balance text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
          <span className="aura-text">{title}</span>
        </DialogTitle>

        <DialogDescription className="sr-only">{title}</DialogDescription>

        {body ? (
          <p className="mt-4 font-serif text-lg leading-[1.7] text-[var(--color-fg-1)] md:text-xl">
            {body}
          </p>
        ) : null}

        {story.tags && story.tags.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {story.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-[var(--color-line-strong)] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--color-fg-2)]"
              >
                #{t}
              </span>
            ))}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
