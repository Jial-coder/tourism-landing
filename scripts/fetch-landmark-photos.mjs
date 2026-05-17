#!/usr/bin/env node
// Fetch landmark hero photos from Unsplash and cache locally.
// Run once or after landmark list changes:
//   node scripts/fetch-landmark-photos.mjs
// Output: public/landmarks/{id}.jpg + public/landmarks/_attribution.json
//
// Why build-time, not runtime?
// - Demo Unsplash key has 50/h hard limit, runtime fetches risk client-visible 403s
// - Photos rarely change; static asset = predictable Lighthouse + cacheable
// - Attribution is required by Unsplash ToS; we record photographer + photo URL

import fs from "node:fs";
import path from "node:path";
import https from "node:https";

const ROOT = path.resolve(import.meta.dirname, "..");
const ENV_FILE = path.join(ROOT, ".env.local");
const MAP_FILE = path.join(ROOT, "app/_generated/china-map.json");
const OUT_DIR = path.join(ROOT, "public/landmarks");
const ATTR_FILE = path.join(OUT_DIR, "_attribution.json");

// Read .env.local manually (no dotenv dep)
function readEnv(file, key) {
  const txt = fs.readFileSync(file, "utf8");
  const m = txt.match(new RegExp(`^${key}=(.+)$`, "m"));
  if (!m) throw new Error(`Missing ${key} in ${file}`);
  return m[1].trim();
}

const ACCESS_KEY = readEnv(ENV_FILE, "UNSPLASH_ACCESS_KEY");

const { landmarks } = JSON.parse(fs.readFileSync(MAP_FILE, "utf8"));
fs.mkdirSync(OUT_DIR, { recursive: true });

function get(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers }, (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () =>
          resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) }),
        );
      })
      .on("error", reject);
  });
}

async function searchOne(query) {
  const url =
    `https://api.unsplash.com/search/photos` +
    `?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&content_filter=high`;
  const res = await get(url, {
    Authorization: `Client-ID ${ACCESS_KEY}`,
    "Accept-Version": "v1",
  });
  if (res.status !== 200) {
    throw new Error(`Unsplash search ${res.status}: ${res.body.toString().slice(0, 200)}`);
  }
  const data = JSON.parse(res.body.toString("utf8"));
  if (!data.results?.length) throw new Error(`no results for "${query}"`);
  return data.results[0];
}

async function downloadPhoto(photo, outPath) {
  // Unsplash: trigger download endpoint per ToS, then fetch the actual URL
  const trigger = await get(photo.links.download_location + `&client_id=${ACCESS_KEY}`);
  if (trigger.status >= 400) {
    console.warn(`  ! download_location trigger ${trigger.status}, continuing anyway`);
  }
  const dlUrl = `${photo.urls.raw}&w=1200&q=80&fm=jpg&fit=crop&crop=entropy`;
  const res = await get(dlUrl);
  if (res.status !== 200) throw new Error(`download ${res.status}`);
  fs.writeFileSync(outPath, res.body);
  return res.body.length;
}

const attribution = [];

for (const lm of landmarks) {
  const out = path.join(OUT_DIR, `${lm.id}.jpg`);
  if (fs.existsSync(out)) {
    console.log(`✓ ${lm.id} cached`);
    continue;
  }
  try {
    process.stdout.write(`→ ${lm.id} (${lm.query}) ... `);
    const photo = await searchOne(lm.query);
    const bytes = await downloadPhoto(photo, out);
    attribution.push({
      id: lm.id,
      query: lm.query,
      photo_id: photo.id,
      photographer: photo.user.name,
      photographer_url: photo.user.links.html,
      photo_url: photo.links.html,
      alt: photo.alt_description ?? photo.description ?? lm.query,
      width: photo.width,
      height: photo.height,
      color: photo.color,
    });
    console.log(`✓ ${(bytes / 1024).toFixed(0)}KB by ${photo.user.name}`);
  } catch (err) {
    console.error(`✗ ${lm.id}: ${err.message}`);
  }
}

if (attribution.length) {
  // Merge with existing attribution
  let existing = [];
  if (fs.existsSync(ATTR_FILE)) {
    existing = JSON.parse(fs.readFileSync(ATTR_FILE, "utf8"));
  }
  const byId = new Map(existing.map((a) => [a.id, a]));
  attribution.forEach((a) => byId.set(a.id, a));
  fs.writeFileSync(ATTR_FILE, JSON.stringify([...byId.values()], null, 2));
  console.log(`\n✓ wrote ${ATTR_FILE} with ${byId.size} entries`);
}

console.log(`\nDone. ${landmarks.length} landmarks processed.`);
