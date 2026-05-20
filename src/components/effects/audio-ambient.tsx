"use client";

import { useEffect, useRef } from "react";
import { useAudioStore } from "@/lib/store/audio";

/**
 * Renders a single hidden <audio> element. Plays /placeholders/ambient.mp3
 * when the user toggles audio on (never autoplay). Fades volume in/out
 * to avoid abrupt cuts.
 */
export function AudioAmbient() {
  const enabled = useAudioStore((s) => s.enabled);
  const volume = useAudioStore((s) => s.volume);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    let raf = 0;
    const start = performance.now();
    const startVol = el.volume;
    const targetVol = enabled ? volume : 0;
    const dur = 1200;

    function step(now: number) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      if (el) el.volume = startVol + (targetVol - startVol) * eased;
      if (t < 1) raf = requestAnimationFrame(step);
      else if (!enabled && el) el.pause();
    }

    if (enabled) {
      el.play().catch(() => {
        // Autoplay blocked — store will reset enabled to false next interaction.
      });
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [enabled, volume]);

  return (
    <audio
      ref={audioRef}
      src="/placeholders/ambient.mp3"
      preload="none"
      loop
      aria-hidden
      tabIndex={-1}
      style={{ display: "none" }}
    />
  );
}
