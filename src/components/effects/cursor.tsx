"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useCursorStore } from "@/lib/store/cursor";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function CustomCursor() {
  const isLarge = useMediaQuery("(min-width: 1024px)");
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(false);

  const variant = useCursorStore((s) => s.variant);
  const label = useCursorStore((s) => s.label);
  const hidden = useCursorStore((s) => s.hidden);
  const setVariant = useCursorStore((s) => s.setVariant);
  const reset = useCursorStore((s) => s.reset);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { damping: 28, stiffness: 320, mass: 0.4 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 320, mass: 0.4 });

  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLarge || reducedMotion) {
      document.documentElement.classList.remove("cursor-none");
      setActive(false);
      return;
    }
    document.documentElement.classList.add("cursor-none");
    setActive(true);

    function onMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }
    function onOver(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a, button, [data-cursor]",
      );
      if (!target) {
        reset();
        return;
      }
      const dataVariant = target.dataset.cursor as
        | "link"
        | "view"
        | "drag"
        | "play"
        | undefined;
      const dataLabel = target.dataset.cursorLabel || null;
      setVariant(dataVariant ?? "link", dataLabel);
    }
    function onLeave() {
      reset();
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [isLarge, reducedMotion, mouseX, mouseY, reset, setVariant]);

  if (!active || hidden) return null;

  const size = variant === "default" ? 14 : variant === "view" ? 88 : variant === "play" ? 72 : 44;
  const bg =
    variant === "default"
      ? "rgba(255,255,255,0.85)"
      : "rgba(124,77,255,0.85)";

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[200]"
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
          width: size,
          height: size,
          background: bg,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="rounded-full mix-blend-difference will-change-transform"
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      />
      <AnimatePresence>
        {label ? (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            style={{ x: springX, y: springY }}
            className="absolute -translate-x-1/2 translate-y-7 whitespace-nowrap rounded-full bg-[var(--color-aura-1)] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white"
          >
            {label}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
