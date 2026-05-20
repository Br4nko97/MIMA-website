"use client";

import { type ReactNode, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils/cn";

interface TiltProps {
  children: ReactNode;
  max?: number;
  scale?: number;
  className?: string;
  innerClassName?: string;
  glare?: boolean;
}

export function Tilt({
  children,
  max = 9,
  scale = 1.015,
  className,
  innerClassName,
  glare = true,
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useTransform(my, [0, 1], [max, -max]);
  const rotY = useTransform(mx, [0, 1], [-max, max]);
  const springX = useSpring(rotX, { stiffness: 220, damping: 22 });
  const springY = useSpring(rotY, { stiffness: 220, damping: 22 });

  const glareX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(my, [0, 1], ["0%", "100%"]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.85), transparent 40%)`;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  const showGlare = glare && !reducedMotion;

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileHover={{ scale }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      style={{ perspective: 900 }}
      className={cn("relative", className)}
    >
      <motion.div
        style={{
          rotateX: reducedMotion ? 0 : springX,
          rotateY: reducedMotion ? 0 : springY,
          transformStyle: "preserve-3d",
        }}
        className={cn("relative h-full w-full", innerClassName)}
      >
        {children}
        {showGlare ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-30 mix-blend-overlay"
            style={{ background: glareBg }}
          />
        ) : null}
      </motion.div>
    </motion.div>
  );
}
