// Re-encodes local PNGs to compressed WebP (used by the build at import time).
// Usage: node scripts/optimize-images.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMG_DIR = path.resolve(__dirname, "../src/assets/images");

const targets = [
  { file: "1.png", maxWidth: 700, quality: 80 },
  { file: "2.png", maxWidth: 700, quality: 80 },
  { file: "3.png", maxWidth: 700, quality: 80 },
  { file: "4.png", maxWidth: 700, quality: 80 },
  { file: "5.png", maxWidth: 700, quality: 80 },
  { file: "logo.png", maxWidth: 320, quality: 85 },
  { file: "badge-new.png", quality: 85 },
  { file: "myket.png", quality: 85 },
];

let totalBefore = 0;
let totalAfter = 0;

for (const t of targets) {
  const src = path.join(IMG_DIR, t.file);
  if (!fs.existsSync(src)) {
    console.warn(`skip (missing): ${t.file}`);
    continue;
  }
  const out = path.join(IMG_DIR, t.file.replace(/\.png$/, ".webp"));
  const before = fs.statSync(src).size;
  const meta = await sharp(src).metadata();

  let pipeline = sharp(src);
  if (t.maxWidth && (meta.width ?? 0) > t.maxWidth) {
    pipeline = pipeline.resize({ width: t.maxWidth, withoutEnlargement: true });
  }
  const buf = await pipeline.webp({ quality: t.quality, effort: 4 }).toBuffer();
  fs.writeFileSync(out, buf);

  const after = buf.length;
  totalBefore += before;
  totalAfter += after;
  const pct = Math.round((1 - after / before) * 100);
  console.log(
    `${t.file} (${meta.width}x${meta.height}) -> ${path.basename(out)}: ${(before / 1024).toFixed(0)} KB -> ${(after / 1024).toFixed(0)} KB (-${pct}%)`
  );
}

console.log(`Total: ${(totalBefore / 1024).toFixed(0)} KB -> ${(totalAfter / 1024).toFixed(0)} KB (${Math.round((1 - totalAfter / totalBefore) * 100)}% smaller)`);