#!/usr/bin/env node
// Convert hero-gen/v2-*.jpg → webp for production-ready hero use.
// Sharp is already installed (used by next/image).
//
// Usage: node scripts/convert-hero-webp.mjs

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIR = path.join(ROOT, "public/landmarks/hero-gen");

const TARGETS = [
  "v2-a", "v2-b", "v2-c", "v2-d",
  "v3-batch1-a", "v3-batch1-b", "v3-batch2-a", "v3-batch2-b",
  "v4-a", "v4-b", "v4-c", "v4-d",
];

for (const name of TARGETS) {
  const src = path.join(DIR, `${name}.jpg`);
  const dst = path.join(DIR, `${name}.webp`);
  if (!fs.existsSync(src)) {
    console.log(`- skip ${name}.jpg (not found)`);
    continue;
  }
  if (fs.existsSync(dst) && !process.argv.includes("--force")) {
    console.log(`✓ ${name}.webp already exists`);
    continue;
  }
  const before = fs.statSync(src).size;
  await sharp(src)
    .webp({ quality: 85, effort: 5 })
    .toFile(dst);
  const after = fs.statSync(dst).size;
  console.log(
    `✓ ${name}: ${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024 / 1024).toFixed(1)}MB webp (${((after / before) * 100).toFixed(0)}%)`,
  );
}
