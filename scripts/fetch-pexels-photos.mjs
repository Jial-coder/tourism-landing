#!/usr/bin/env node
// Fetch landmark photos from Pexels (public CDN, no API key required for known photo IDs).
//
// Usage:
//   node scripts/fetch-pexels-photos.mjs
//
// Why Pexels (not Unsplash):
// - Existing Unsplash demo key has 50 req/h limit; we use it but supplement with Pexels.
// - Pexels CDN URLs are addressable directly (e.g. https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg)
//   so we can pull known good photos without API authentication.
// - Pexels License: free for commercial use, attribution appreciated, modification OK.
//
// Output:
//   public/landmarks/{id}.jpg          - photo files
//   public/landmarks/_attribution.json - merged with existing Unsplash attribution

import fs from "node:fs";
import path from "node:path";
import https from "node:https";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public/landmarks");
const ATTR_FILE = path.join(OUT_DIR, "_attribution.json");

// Curated Pexels photo IDs for inbound-China destinations.
// IDs sourced manually from pexels.com search; each one is a high-quality landscape photo.
// To add more: search pexels.com → click photo → copy the numeric ID from the URL.
const PEXELS_PHOTOS = [
  // Zhangjiajie / 张家界 — sandstone pillars in mist
  {
    id: "zhangjiajie",
    pexelsId: 19858553,
    description: "Avatar Hallelujah Mountain Zhangjiajie",
    photographer: "Pexels community",
  },
  // Guilin / 桂林 — Li River karst at golden hour
  {
    id: "guilin",
    pexelsId: 13261372,
    description: "Karst landscape Guilin",
    photographer: "Pexels community",
  },
  // Jiuzhaigou / 九寨沟 — alpine lakes
  {
    id: "jiuzhaigou",
    pexelsId: 13975984,
    description: "Alpine lakes Jiuzhaigou Sichuan",
    photographer: "Pexels community",
  },
  // Huangshan / 黄山 — sea of clouds (replaces hero default)
  {
    id: "huangshan",
    pexelsId: 18707644,
    description: "Huangshan sea of clouds at sunrise",
    photographer: "Pexels community",
  },
  // Dali / 大理 — Erhai lake & Cangshan
  {
    id: "dali",
    pexelsId: 14907895,
    description: "Erhai lake Cangshan Dali Yunnan",
    photographer: "Pexels community",
  },
  // Lijiang / 丽江 — old town night (replaces previous lijiang.jpg)
  {
    id: "lijiang-night",
    pexelsId: 13977434,
    description: "Lijiang old town lanterns",
    photographer: "Pexels community",
  },

  // ───── Hero candidates: 暖金时刻 戏剧化山水大片 (2026-05-21) ─────
  // Per user feedback: current huangshan hero is too plain. Try 4 candidates,
  // user picks visually. Each output to public/landmarks/hero-candidates/.
  {
    id: "hero-candidates/A-huangshan-golden",
    pexelsId: 5273014,
    description: "Huangshan golden-hour peaks pierced by sunlight through clouds",
    photographer: "Pexels community",
  },
  {
    id: "hero-candidates/B-guilin-sunset",
    pexelsId: 4558492,
    description: "Li River Guilin karst silhouettes at warm sunset",
    photographer: "Pexels community",
  },
  {
    id: "hero-candidates/C-zhangjiajie-golden",
    pexelsId: 16839205,
    description: "Zhangjiajie sandstone pillars side-lit by warm golden hour sun",
    photographer: "Pexels community",
  },
  {
    id: "hero-candidates/D-yuanyang-rice-terraces",
    pexelsId: 8989404,
    description: "Yuanyang rice terraces Yunnan at sunrise reflecting warm gold sky",
    photographer: "Pexels community",
  },
  {
    id: "hero-candidates/E-great-wall-golden",
    pexelsId: 19660746,
    description: "Great Wall mountain ridge bathed in golden hour light",
    photographer: "Pexels community",
  },
  {
    id: "hero-candidates/F-mountain-temple-mist",
    pexelsId: 4356144,
    description: "Chinese mountain temple in mist with golden roof catching dawn light",
    photographer: "Pexels community",
  },
];

function get(url, headers = {}, redirects = 5) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers }, (res) => {
      // follow redirects
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && redirects > 0) {
        const next = res.headers.location;
        res.resume();
        return resolve(get(next, headers, redirects - 1));
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () =>
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(chunks),
        }),
      );
    });
    req.on("error", reject);
  });
}

async function downloadPexelsPhoto(pexelsId, outPath) {
  // Pexels CDN pattern: https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w=1920
  const url = `https://images.pexels.com/photos/${pexelsId}/pexels-photo-${pexelsId}.jpeg?auto=compress&cs=tinysrgb&w=1920&q=85`;
  const res = await get(url, {
    "User-Agent":
      "Mozilla/5.0 (compatible; tourism-landing-build/1.0; +https://example.com/bot)",
    Accept: "image/jpeg,image/*",
  });
  if (res.status !== 200) {
    throw new Error(`pexels ${pexelsId}: ${res.status} ${res.body.toString().slice(0, 120)}`);
  }
  fs.writeFileSync(outPath, res.body);
  return res.body.length;
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const newAttribution = [];

for (const photo of PEXELS_PHOTOS) {
  const out = path.join(OUT_DIR, `${photo.id}.jpg`);
  if (fs.existsSync(out) && !process.argv.includes("--force")) {
    console.log(`✓ ${photo.id} already exists (use --force to refetch)`);
    continue;
  }
  try {
    process.stdout.write(`→ ${photo.id} (pexels ${photo.pexelsId}) ... `);
    const bytes = await downloadPexelsPhoto(photo.pexelsId, out);
    newAttribution.push({
      id: photo.id,
      source: "pexels",
      pexels_id: photo.pexelsId,
      photo_url: `https://www.pexels.com/photo/${photo.pexelsId}/`,
      photographer: photo.photographer,
      photographer_url: "https://www.pexels.com/",
      alt: photo.description,
      license: "Pexels License (free for commercial use, attribution appreciated)",
    });
    console.log(`✓ ${(bytes / 1024).toFixed(0)}KB`);
  } catch (err) {
    console.error(`✗ ${photo.id}: ${err.message}`);
  }
}

if (newAttribution.length) {
  let existing = [];
  if (fs.existsSync(ATTR_FILE)) {
    try {
      existing = JSON.parse(fs.readFileSync(ATTR_FILE, "utf8"));
    } catch {
      existing = [];
    }
  }
  const byId = new Map(existing.map((a) => [a.id, a]));
  newAttribution.forEach((a) => byId.set(a.id, a));
  fs.writeFileSync(ATTR_FILE, JSON.stringify([...byId.values()], null, 2));
  console.log(`\n✓ updated ${ATTR_FILE} with ${byId.size} entries`);
}

console.log(`\nDone. ${PEXELS_PHOTOS.length} pexels photos processed.`);
