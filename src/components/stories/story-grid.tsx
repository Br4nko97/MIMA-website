"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { StoryCard } from "./story-card";
import { StoryModal } from "./story-modal";
import type { StoryRow } from "@/lib/supabase/types";

export function StoryGrid({ stories }: { stories: StoryRow[] }) {
  const [active, setActive] = useState<StoryRow | null>(null);

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
        {stories.map((s, i) => (
          <StoryCard
            key={s.id}
            story={s}
            index={i}
            onClick={() => setActive(s)}
          />
        ))}
      </div>

      <AnimatePresence>
        {active ? (
          <StoryModal
            story={active}
            open={!!active}
            onClose={() => setActive(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
