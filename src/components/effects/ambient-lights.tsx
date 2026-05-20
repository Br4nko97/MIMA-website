"use client";

import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Floating aura blobs — large radial gradients that drift slowly.
 * Sit behind everything else (z-0).
 *
 * Performance budget:
 * - Desktop: 3 blurred motion blobs, full animation
 * - Mobile: 2 static gradients (no JS animation, no blur filter) — same vibe, ~0 fps cost
 * - Reduced motion: static gradients, no animation
 */
export function AmbientLights() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reducedMotion = usePrefersReducedMotion();

  // Mobile / reduced-motion: static CSS gradients painted once, no blur, no JS
  if (!isDesktop || reducedMotion) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 15% -5%, rgba(124,77,255,0.28), transparent 55%), radial-gradient(ellipse at 90% 35%, rgba(74,125,255,0.22), transparent 55%), radial-gradient(ellipse at 50% 110%, rgba(181,156,255,0.18), transparent 55%)",
        }}
      />
    );
  }

  // Desktop: animated blurred blobs
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        className="absolute -left-1/4 top-[-10%] h-[60vmax] w-[60vmax] rounded-full opacity-50 blur-3xl will-change-transform"
        style={{
          background:
            "radial-gradient(closest-side, rgba(124,77,255,0.45), transparent 70%)",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-15%] top-[35%] h-[55vmax] w-[55vmax] rounded-full opacity-40 blur-3xl will-change-transform"
        style={{
          background:
            "radial-gradient(closest-side, rgba(74,125,255,0.42), transparent 70%)",
        }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 30, -25, 0],
        }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-25%] left-[25%] h-[45vmax] w-[45vmax] rounded-full opacity-30 blur-3xl will-change-transform"
        style={{
          background:
            "radial-gradient(closest-side, rgba(181,156,255,0.4), transparent 70%)",
        }}
        animate={{
          x: [0, -25, 40, 0],
          y: [0, -50, 10, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
