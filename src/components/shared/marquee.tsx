"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface MarqueeProps {
  children: ReactNode;
  speed?: number; // seconds per loop
  reverse?: boolean;
  className?: string;
  fade?: boolean;
}

export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className,
  fade = true,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        fade &&
          "[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]",
        className,
      )}
    >
      <div
        className="flex shrink-0 items-center gap-12 whitespace-nowrap pr-12"
        style={{
          animation: `marquee ${speed}s linear infinite ${
            reverse ? "reverse" : ""
          }`,
        }}
      >
        {children}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 items-center gap-12 whitespace-nowrap pr-12"
        style={{
          animation: `marquee ${speed}s linear infinite ${
            reverse ? "reverse" : ""
          }`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
