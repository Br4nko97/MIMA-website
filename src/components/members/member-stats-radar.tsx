"use client";

import { motion } from "framer-motion";
import { STAT_KEYS, type StatKey } from "@/lib/content/members-seed";
import { useDictionary } from "@/lib/i18n/use-locale";
import type { MemberStatsRow } from "@/lib/supabase/types";

interface MemberStatsRadarProps {
  stats: MemberStatsRow | null;
}

const RADIUS = 130;
const STROKE = 1;
const CENTER = 160;

function point(angle: number, dist: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return { x: CENTER + Math.cos(rad) * dist, y: CENTER + Math.sin(rad) * dist };
}

export function MemberStatsRadar({ stats }: MemberStatsRadarProps) {
  const { dict } = useDictionary();
  if (!stats) return null;

  const n = STAT_KEYS.length;
  const labels = STAT_KEYS.map((k) => ({
    key: k,
    label: dict.members.statLabels[k as StatKey],
    value: stats[k as StatKey] as number,
  }));

  const polygon = labels
    .map((l, i) => {
      const angle = (360 / n) * i;
      const dist = (l.value / 100) * RADIUS;
      const p = point(angle, dist);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  return (
    <div className="relative isolate flex flex-col items-center">
      <svg
        viewBox="0 0 320 320"
        width="100%"
        className="aspect-square max-w-md"
        role="img"
        aria-label="Member stats radar"
      >
        <defs>
          <radialGradient id="auraFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#b59cff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7c4dff" stopOpacity="0.15" />
          </radialGradient>
          <linearGradient id="auraStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b59cff" />
            <stop offset="100%" stopColor="#4a7dff" />
          </linearGradient>
        </defs>

        {/* Concentric rings */}
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <polygon
            key={f}
            points={Array.from({ length: n })
              .map((_, i) => {
                const p = point((360 / n) * i, RADIUS * f);
                return `${p.x},${p.y}`;
              })
              .join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={STROKE}
          />
        ))}

        {/* Axes */}
        {Array.from({ length: n }).map((_, i) => {
          const p = point((360 / n) * i, RADIUS);
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={p.x}
              y2={p.y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={STROKE}
            />
          );
        })}

        {/* Data polygon */}
        <motion.polygon
          points={polygon}
          fill="url(#auraFill)"
          stroke="url(#auraStroke)"
          strokeWidth={1.5}
          strokeLinejoin="round"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        />

        {/* Vertex dots */}
        {labels.map((l, i) => {
          const angle = (360 / n) * i;
          const dist = (l.value / 100) * RADIUS;
          const p = point(angle, dist);
          return (
            <motion.circle
              key={l.key}
              cx={p.x}
              cy={p.y}
              r={3}
              fill="#b59cff"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.05 }}
            />
          );
        })}

        {/* Axis labels */}
        {labels.map((l, i) => {
          const angle = (360 / n) * i;
          const p = point(angle, RADIUS + 16);
          return (
            <text
              key={`label-${l.key}`}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-[var(--color-fg-2)] font-mono text-[9px] uppercase tracking-wider"
            >
              {l.label}
            </text>
          );
        })}
      </svg>

      <ul className="mt-8 grid w-full grid-cols-2 gap-x-6 gap-y-3 text-sm">
        {labels.map((l) => (
          <li
            key={l.key}
            className="flex items-center justify-between gap-3 border-b border-[var(--color-line)] pb-2"
          >
            <span className="text-[var(--color-fg-1)]">{l.label}</span>
            <span className="font-mono font-medium text-[var(--color-fg-0)]">
              {l.value}
              <span className="text-[var(--color-fg-3)]">/100</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
