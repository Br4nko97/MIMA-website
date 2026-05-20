/**
 * Generate SVG placeholder files for the various public/placeholders/*
 * paths referenced in the codebase. Each SVG is a dark gradient tile
 * with a noise overlay and a label. Replace these with real media later.
 *
 * Run with: node scripts/generate-placeholders.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "public", "placeholders");

function hashHue(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h) % 360;
}

function svgFor(label, opts = {}) {
  const w = opts.w ?? 800;
  const h = opts.h ?? 1000;
  const hue = hashHue(label);
  const hue2 = (hue + 60) % 360;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <radialGradient id="g1" cx="30%" cy="20%" r="60%">
      <stop offset="0%" stop-color="hsl(${hue} 65% 55%)" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="hsl(${hue} 65% 55%)" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="75%" cy="80%" r="60%">
      <stop offset="0%" stop-color="hsl(${hue2} 70% 45%)" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="hsl(${hue2} 70% 45%)" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0c0c11"/>
      <stop offset="100%" stop-color="#1c1c26"/>
    </linearGradient>
    <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"/></filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#g1)"/>
  <rect width="100%" height="100%" fill="url(#g2)"/>
  <rect width="100%" height="100%" filter="url(#noise)" opacity="0.35"/>
  <text x="50%" y="92%" text-anchor="middle" font-family="ui-monospace, monospace" font-size="${Math.round(w / 28)}" fill="rgba(255,255,255,0.4)" letter-spacing="3">${label.toUpperCase()}</text>
</svg>`;
}

async function write(rel, content) {
  const abs = join(ROOT, rel);
  await mkdir(dirname(abs), { recursive: true });
  await writeFile(abs, content, "utf8");
  console.log("wrote", rel);
}

const MEMBERS = ["branko","glingo","moncio","fillo","sgurlotto","tommy","maestro"];
const EVENTS = [1,2,3,4,5,6];
const STORIES = [1,2,3,4];
const MEDIA = [1,2,3,4,5,6,7,8];

async function main() {
  // Members
  for (const m of MEMBERS) {
    await write(`members/${m}.svg`, svgFor(m, { w: 800, h: 1000 }));
    await write(`members/${m}-cover.svg`, svgFor(`${m}-cover`, { w: 1600, h: 900 }));
  }

  // Events
  for (const i of EVENTS) {
    await write(`events/event${i}.svg`, svgFor(`OP-${i}`, { w: 1600, h: 900 }));
  }

  // Stories
  for (const i of STORIES) {
    await write(`stories/story${i}.svg`, svgFor(`DOC-${i}`, { w: 1200, h: 900 }));
  }

  // Media
  for (const i of MEDIA) {
    await write(`media/m${i}.svg`, svgFor(`MEDIA-${i}`, { w: 1200, h: 900 }));
  }

  // Hero poster
  await write(`hero-poster.svg`, svgFor("MIMA", { w: 1920, h: 1080 }));

  console.log("\nplaceholder SVGs generated.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
