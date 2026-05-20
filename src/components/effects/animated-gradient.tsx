"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface AnimatedGradientProps {
  className?: string;
  intensity?: "low" | "med" | "high";
}

export function AnimatedGradient({
  className,
  intensity = "med",
}: AnimatedGradientProps) {
  const opacity = intensity === "low" ? 0.25 : intensity === "high" ? 0.7 : 0.45;
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <motion.div
        className="absolute inset-[-20%] blur-3xl"
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
