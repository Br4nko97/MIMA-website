"use client";

import { type ReactNode, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
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
  const hasFinePointer = useMediaQuery("(pointer: fine)");

  // No-op on touch / reduced motion — no tilt math, no glare gradient, no motion subscriptions
  const interactive = hasFinePointer && !reducedMotion;

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
    if (!interactive) return;
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

  if (!interactive) {
    return (
      <div ref={ref} className={cn("relative", className)}>
        <div className={cn("relative h-full w-full", innerClassName)}>{children}</div>
      </div>
    );
  }

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
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d",
        }}
        className={cn("relative h-full w-full", innerClassName)}
      >
        {children}
        {glare ? (
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
