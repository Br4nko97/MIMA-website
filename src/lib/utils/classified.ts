/**
 * Generates a consistent fake "classification code" for any string input.
 * Looks like spy/intelligence agency reference codes (e.g., "MIMA-RX-7791").
 */
export function classifiedCode(seed: string, prefix = "MIMA"): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const abs = Math.abs(hash);
  const letters = "ABCDEFGHJKLMNPRSTUVWXYZ";
  const a = letters[abs % letters.length];
  const b = letters[Math.floor(abs / 23) % letters.length];
  const digits = (abs % 9000) + 1000;
  return `${prefix}-${a}${b}-${digits}`;
}

export const CLASSIFICATION_LEVELS = [
  "PUBLIC",
  "DOCUMENTED",
  "RESTRICTED",
  "CLASSIFIED",
  "UNSTABLE",
  "LEGEND",
] as const;

export type ClassificationLevel = (typeof CLASSIFICATION_LEVELS)[number];
