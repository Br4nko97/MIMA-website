"use client";

import { motion } from "framer-motion";

/**
 * Floating aura blobs — large radial gradients that drift slowly.
 * Sit behind everything else (z-0). Render in body, before any content.
 */
export function AmbientLights() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        className="absolute -left-1/4 top-[-10%] h-[60vmax] w-[60vmax] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(124,77,255,0.45), transparent 70%)",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-15%] top-[35%] h-[55vmax] w-[55vmax] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(74,125,255,0.42), transparent 70%)",
        }}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 30, -25, 0],
          scale: [1, 0.95, 1.08, 1],
        }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-25%] left-[25%] h-[45vmax] w-[45vmax] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(181,156,255,0.4), transparent 70%)",
        }}
        animate={{
          x: [0, -25, 40, 0],
          y: [0, -50, 10, 0],
          scale: [1, 1.05, 0.92, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
