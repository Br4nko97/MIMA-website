"use client";

import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils/cn";

interface AnimatedGradientProps {
  className?: string;
  intensity?: "low" | "med" | "high";
}

export function AnimatedGradient({
  className,
  intensity = "med",
}: AnimatedGradientProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reducedMotion = usePrefersReducedMotion();
  const opacity = intensity === "low" ? 0.25 : intensity === "high" ? 0.7 : 0.45;

  // Static on mobile / reduced motion — no rotation, smaller blur
  if (!isDesktop || reducedMotion) {
    return (
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      >
        <div
          className="absolute inset-[-10%] blur-2xl"
          style={{
            opacity: opacity * 0.85,
            background:
              "radial-gradient(circle at 30% 30%, rgba(124,77,255,0.45), transparent 55%), radial-gradient(circle at 70% 70%, rgba(74,125,255,0.4), transparent 55%)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <motion.div
        className="absolute inset-[-20%] blur-3xl will-change-transform"
        style={{
          opacity,
          background:
            "conic-gradient(from 90deg at 50% 50%, rgba(124,77,255,0.55), rgba(74,125,255,0.5), rgba(181,156,255,0.45), rgba(124,77,255,0.55))",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
