#!/usr/bin/env node
// Generate hero image via codesonline.dev gpt-image-2 API.
//
// Usage:
//   node scripts/generate-hero-image.mjs               # generates v1
//   node scripts/generate-hero-image.mjs --version v2  # generates v2 with same prompt
//   node scripts/generate-hero-image.mjs --prompt-file prompts/hero-v3.txt --version v3
//
// Requires CODESONLINE_API_KEY in .env.local
// Output:
//   public/landmarks/hero-gen/{version}.jpg
//   public/landmarks/hero-gen/_gen-log.json (append-only audit trail)

import fs from "node:fs";
import path from "node:path";
import https from "node:https";

const ROOT = path.resolve(import.meta.dirname, "..");
const ENV_FILE = path.join(ROOT, ".env.local");
const OUT_DIR = path.join(ROOT, "public/landmarks/hero-gen");
const LOG_FILE = path.join(OUT_DIR, "_gen-log.json");

function readEnv(file, key) {
  if (!fs.existsSync(file)) return null;
  const txt = fs.readFileSync(file, "utf8");
  const m = txt.match(new RegExp(`^${key}=(.+)$`, "m"));
  return m ? m[1].trim() : null;
}

const API_KEY =
  readEnv(ENV_FILE, "CODESONLINE_IMAGE_API_KEY") ||
  readEnv(ENV_FILE, "CODESONLINE_API_KEY") ||
  readEnv(ENV_FILE, "OPENAI_API_KEY") ||
  process.env.CODESONLINE_IMAGE_API_KEY ||
  process.env.CODESONLINE_API_KEY ||
  process.env.OPENAI_API_KEY;

if (!API_KEY) {
  console.error(
    "✗ Missing CODESONLINE_IMAGE_API_KEY in .env.local (also tried CODESONLINE_API_KEY / OPENAI_API_KEY).\n" +
      "  Add a line: CODESONLINE_IMAGE_API_KEY=sk-xxx",
  );
  process.exit(1);
}

const args = process.argv.slice(2);
const versionIdx = args.indexOf("--version");
const VERSION = versionIdx >= 0 ? args[versionIdx + 1] : "v1";
const promptFileIdx = args.indexOf("--prompt-file");
const PROMPT_FILE = promptFileIdx >= 0 ? args[promptFileIdx + 1] : null;

const DEFAULT_PROMPT = [
  "Wide cinematic horizontal composition, 16:9 aspect ratio, single coherent image (NOT a collage of separate panels).",
  "",
  "LEFT 60% of the frame: photorealistic landscape photograph of Huangshan (Yellow Mountain) sea of clouds at golden-hour sunrise.",
  "Granite peaks rising out of a soft cloud sea, warm amber and rose gold morning light bathing the foreground ridges, distant peaks fading into mist.",
  "Bright, airy, luminous — NOT dark, NOT moody, NOT black. Highlights soft and warm, shadows lifted, mid-tones gently contrasted.",
  "Shot on Sony A7R IV, 35mm prime lens, f/8, low ISO, natural daylight, real DSLR photograph quality, sharp focus on midground peak, atmospheric depth, fine cloud detail.",
  "Color grading: warm neutral, slight teal in shadows, gold in highlights — like a National Geographic landscape feature.",
  "",
  "RIGHT 40% of the frame: a deep ink-blue background panel, on top of which a delicate elegant outline of mainland China is drawn in fine warm gold (paper-gold #c9a65c) thin hairline strokes — editorial map sketch style, NOT a real geographic map, NOT a Mercator projection mockup, just a soft suggestive silhouette.",
  "Inside the gold map outline, four small luminous gold circle markers (4-6px equivalent) connected by a thin dashed gold line tracing a route, in this order top-to-bottom:",
  "  1. ZHANGJIAJIE 张家界 · 29.10°N 110.48°E · DYG",
  "  2. JIUZHAIGOU 九寨沟 · 33.26°N 103.92°E · JZH",
  "  3. GUILIN 桂林 · 25.27°N 110.29°E · KWL",
  "  4. YUNNAN 云南 · 25.04°N 102.72°E · LJG",
  "Each marker labeled with small clean sans-serif text in soft ivory: city name (English caps), Chinese name, GPS coordinates, IATA airport code on separate lines.",
  "Right panel mood: editorial wayfinding chart, restrained, museum-grade typography, plenty of dark negative space around the map.",
  "",
  "Overall composition: left landscape glows warm and bright, right panel cool and dark — but the LEFT MUST NOT be dark. Increase exposure on the landscape side. The two halves are joined by a soft vertical gradient transition near the 60% mark, no hard edge.",
  "",
  "STRICT photographic style for the landscape half: realistic photography, ABSOLUTELY NOT illustration, NOT digital painting, NOT poster art, NOT AI gloss, NOT cinematic 3D render, NOT cartoon, NOT watercolor, NOT ink wash. The viewer must believe the left half was shot with a camera by a professional landscape photographer.",
  "",
  "Negative: dark moody black landscape, oversaturated colors, AI poster gloss, painterly brushstrokes, illustration, watercolor, ink wash painting, cartoon, anime, 3D render, fantasy, vignetting, lens flare, fisheye, tilt-shift, oversharpened HDR, plastic skin, bilingual text stacks crowded, generic stock photo composition, motion blur, double exposure.",
].join(" \n");

const PROMPT = PROMPT_FILE
  ? fs.readFileSync(path.resolve(PROMPT_FILE), "utf8")
  : DEFAULT_PROMPT;

const body = JSON.stringify({
  model: "gpt-image-2",
  prompt: PROMPT,
  n: 1,
  size: "1792x1024",
  quality: "high",
  style: "natural",
  background: "opaque",
  response_format: "b64_json",
});

function postJSON(url, payload, headers = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request(
      {
        method: "POST",
        host: u.hostname,
        path: u.pathname + u.search,
        port: u.port || 443,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
          ...headers,
        },
        timeout: 180000,
      },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () =>
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: Buffer.concat(chunks).toString("utf8"),
          }),
        );
      },
    );
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy(new Error("Request timed out after 180s"));
    });
    req.write(payload);
    req.end();
  });
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const outFile = path.join(OUT_DIR, `${VERSION}.jpg`);
if (fs.existsSync(outFile) && !args.includes("--force")) {
  console.error(`✗ ${outFile} already exists. Use --force to overwrite.`);
  process.exit(1);
}

console.log(`→ Calling codesonline gpt-image-2 (size 1792x1024, quality high, style natural)...`);
const startedAt = Date.now();

const res = await postJSON(
  "https://image.codesonline.dev/v1/images/generations",
  body,
  { Authorization: `Bearer ${API_KEY}` },
);

const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
console.log(`  HTTP ${res.status} in ${elapsed}s`);

if (res.status !== 200) {
  console.error(`✗ API error:\n${res.body.slice(0, 800)}`);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(res.body);
} catch (err) {
  console.error(`✗ Failed to parse JSON:\n${res.body.slice(0, 400)}`);
  process.exit(1);
}

if (!data.data?.[0]?.b64_json) {
  console.error(`✗ Response missing b64_json:\n${JSON.stringify(data, null, 2).slice(0, 600)}`);
  process.exit(1);
}

const buf = Buffer.from(data.data[0].b64_json, "base64");
fs.writeFileSync(outFile, buf);
console.log(`✓ Wrote ${outFile} (${(buf.length / 1024).toFixed(0)}KB)`);

let log = [];
if (fs.existsSync(LOG_FILE)) {
  try {
    log = JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
  } catch {
    log = [];
  }
}
log.push({
  version: VERSION,
  generated_at: new Date().toISOString(),
  elapsed_sec: Number(elapsed),
  model: "gpt-image-2",
  size: "1792x1024",
  quality: "high",
  style: "natural",
  prompt_first_120: PROMPT.slice(0, 120),
  output_file: path.relative(ROOT, outFile),
  output_bytes: buf.length,
});
fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
console.log(`✓ Logged to ${LOG_FILE}`);
