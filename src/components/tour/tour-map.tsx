"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EventRow } from "@/lib/supabase/types";
import { useDictionary } from "@/lib/i18n/use-locale";
import { GlassCard } from "@/components/shared/glass-card";

/**
 * Lightweight SVG map of Europe centered on Italy.
 * No external API key — coordinates are projected manually with
 * a simple equirectangular projection scoped to [35°N–55°N, -10°E–25°E].
 */

const VIEWBOX_W = 800;
const VIEWBOX_H = 600;

const LAT_MIN = 35;
const LAT_MAX = 55;
const LNG_MIN = -10;
const LNG_MAX = 25;

function project(lat: number, lng: number) {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * VIEWBOX_W;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * VIEWBOX_H;
  return { x, y };
}

export function TourMap({ events }: { events: EventRow[] }) {
  const { locale } = useDictionary();
  const [hovered, setHovered] = useState<string | null>(null);

  const pins = useMemo(
    () =>
      events
        .filter((e) => e.lat != null && e.lng != null)
        .map((e) => ({
          ...e,
          ...project(e.lat as number, e.lng as number),
        })),
    [events],
  );

  return (
    <GlassCard className="overflow-hidden">
      <div className="relative aspect-[4/3] w-full">
        <svg
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid */}
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
              />
            </pattern>
            <radialGradient id="pinGlow">
              <stop offset="0%" stopColor="#9a6bff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#9a6bff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width={VIEWBOX_W} height={VIEWBOX_H} fill="url(#grid)" />

          {/* Italy + Europe rough silhouette */}
          <g
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.8"
          >
            {/* Coarse Italy peninsula */}
            <path d="M 450 280 Q 460 240 470 220 L 480 200 Q 490 200 500 220 L 510 260 L 525 320 Q 530 360 510 400 L 490 440 L 470 470 Q 460 480 455 470 L 450 440 Q 445 400 450 360 Z" />
            {/* Sicily */}
            <ellipse cx="450" cy="490" rx="30" ry="14" />
            {/* Sardinia */}
            <ellipse cx="380" cy="430" rx="14" ry="28" />
            {/* Iberian peninsula */}
            <path d="M 140 380 Q 130 360 145 330 L 200 310 Q 240 310 270 330 L 280 370 L 270 410 Q 240 430 190 420 Z" />
            {/* France */}
            <path d="M 290 270 Q 280 250 300 230 L 360 220 Q 400 230 410 260 L 420 320 Q 400 340 360 340 L 300 330 Z" />
            {/* UK */}
            <path d="M 260 100 Q 280 90 290 110 L 295 160 L 280 200 Q 260 200 250 180 L 245 130 Z" />
          </g>

          {/* Connection lines between events */}
          {pins.length > 1 ? (
            <g
              stroke="rgba(124,77,255,0.3)"
              strokeWidth="0.8"
              strokeDasharray="2 4"
              fill="none"
            >
              {pins.map((pin, i) => {
                const next = pins[(i + 1) % pins.length];
                return (
                  <line
                    key={`line-${pin.id}`}
                    x1={pin.x}
                    y1={pin.y}
                    x2={next.x}
                    y2={next.y}
                  />
                );
              })}
            </g>
          ) : null}

          {/* Pins */}
          {pins.map((pin) => (
            <g
              key={pin.id}
              transform={`translate(${pin.x}, ${pin.y})`}
              onMouseEnter={() => setHovered(pin.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
            >
              <circle r="22" fill="url(#pinGlow)" />
              <motion.circle
                r="6"
                fill="#9a6bff"
                animate={{ scale: hovered === pin.id ? 1.4 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <circle r="3" fill="white" />
              <text
                x="10"
                y="4"
                fill="white"
                className="font-mono text-[10px] uppercase tracking-wider"
              >
                {pin.codename}
              </text>
            </g>
          ))}
        </svg>

        <AnimatePresence>
          {hovered ? (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="pointer-events-none absolute bottom-5 left-5 right-5 max-w-md glass-strong rounded-2xl p-4"
            >
              {(() => {
                const ev = pins.find((p) => p.id === hovered);
                if (!ev) return null;
                return (
                  <>
                    <div className="mono-caption text-[var(--color-aura-3)]">
                      {ev.codename}
                    </div>
                    <div className="font-display text-lg font-bold">
                      {locale === "it" ? ev.title_it : ev.title_en}
                    </div>
                    <div className="text-xs text-[var(--color-fg-2)]">
                      {ev.location} · {new Date(ev.starts_at).getFullYear()}
                    </div>
                  </>
                );
              })()}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
}
