/**
 * Generates placeholder WebP frames for scroll scrubbing (replace with real assets later).
 * Usage: node scripts/generate-sequence.cjs
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const W = 1920;
const H = 1080;

async function main() {
  const outDir = path.join(__dirname, "../public/sequence");
  fs.mkdirSync(outDir, { recursive: true });

  for (let i = 1; i <= 89; i++) {
    const n = String(i).padStart(3, "0");
    const t = (i - 1) / 88;
    const hue = Math.round(210 + t * 90);

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="hsl(${hue}, 42%, 9%)"/>
      <stop offset="45%" stop-color="hsl(${hue + 25}, 38%, 13%)"/>
      <stop offset="100%" stop-color="hsl(${hue + 55}, 35%, 7%)"/>
    </linearGradient>
    <radialGradient id="v" cx="50%" cy="42%" r="70%">
      <stop offset="0%" stop-color="rgba(160,120,255,0.14)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#v)"/>
</svg>`;

    await sharp(Buffer.from(svg))
      .webp({ quality: 82, effort: 4 })
      .toFile(path.join(outDir, `frame-${n}.webp`));
  }

  console.log("Wrote 89 files to public/sequence/ (frame-001.webp … frame-089.webp)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
