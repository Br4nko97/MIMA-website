"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 220,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[120] h-px origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, var(--color-aura-3), var(--color-aura-1) 50%, var(--color-aura-2))",
      }}
    />
  );
}
