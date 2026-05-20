"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Lenis smooth scroll — desktop pointer only.
 * On touch devices we let the OS handle native momentum scroll (cheaper + feels right).
 * On reduced-motion we skip entirely.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === "undefined") return;

    // Detect touch / coarse pointer — phones, most tablets
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) return;

    setEnabled(true);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  return <>{children}</>;
}
