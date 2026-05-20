#!/usr/bin/env node
// Image-to-image edit via codesonline.dev /v1/images/edits.
//
// Usage:
//   node scripts/edit-hero-image.mjs                       # uses B image, n=4, upscale=4k
//   node scripts/edit-hero-image.mjs --n 2 --upscale 2k    # smaller batch / lower upscale
//   node scripts/edit-hero-image.mjs --base v2             # output v2-a.jpg .. v2-d.jpg
//
// Reference image: docs/visual-references/B_destination_discovery_collage.png
// Output: public/landmarks/hero-gen/{base}-{a|b|c|d}.jpg
//
// Requires CODESONLINE_IMAGE_API_KEY (or _API_KEY / OPENAI_API_KEY) in .env.local.

import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import { randomBytes } from "node:crypto";

const ROOT = path.resolve(import.meta.dirname, "..");
const ENV_FILE = path.join(ROOT, ".env.local");
const DEFAULT_REF = path.join(ROOT, "docs/visual-references/B_destination_discovery_collage.png");
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
  console.error("✗ Missing CODESONLINE_IMAGE_API_KEY in .env.local");
  process.exit(1);
}

const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
}

const N = Number(arg("n", "4"));
const UPSCALE = arg("upscale", "4k"); // 2k | 4k
const BASE = arg("base", "v2");
const SIZE = arg("size", "1792x1024");
const REF_IMAGE = path.resolve(ROOT, arg("ref", path.relative(ROOT, DEFAULT_REF)));
const PROMPT_FILE = arg("prompt-file", null);

if (!fs.existsSync(REF_IMAGE)) {
  console.error(`✗ Reference image not found: ${REF_IMAGE}`);
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const DEFAULT_PROMPT = [
  "Edit this reference image: keep the right-half exactly as it is — keep the warm-gold ink-line outline of mainland China, keep all four gold circle markers and their labels (ZHANGJIAJIE 张家界 DYG, JIUZHAIGOU 九寨沟 JZH, GUILIN 桂林 KWL, YUNNAN 云南 LJG), keep the gold dashed connecting route line, keep the typography placement and the dark ink-blue background of the right panel.",
  "",
  "Replace ONLY the LEFT 60% of the frame: instead of the original Guilin fisherman bamboo-raft scene, render a photorealistic Huangshan (Yellow Mountain) sea-of-clouds at golden-hour sunrise. Granite peaks rising out of a soft cloud sea, warm amber and rose-gold morning light bathing the foreground ridges, distant peaks fading into mist.",
  "",
  "Brighten the entire image by roughly +30% exposure, especially the landscape side. Lift shadows, keep highlights warm and luminous, do NOT keep the dark moody black tones of the original reference. The target mood is bright airy editorial travel magazine cover, NOT dark cinematic.",
  "",
  "STRICT photographic style for the new landscape half: shot on Sony A7R IV, 35mm prime lens, natural daylight, real DSLR photograph, sharp focus on midground peak, atmospheric depth, fine cloud texture detail. ABSOLUTELY NOT illustration, NOT digital painting, NOT poster art, NOT AI gloss, NOT 3D render, NOT cartoon, NOT watercolor, NOT ink wash, NOT painterly.",
  "",
  "The transition between the bright photographic left half and the dark map-panel right half should be a soft vertical gradient near the 60% mark — no hard edge, no visible seam.",
  "",
  "Preserve the overall 16:9 horizontal frame and the editorial magazine-cover composition. The right-half map panel and all its markers / typography must remain crisp and unchanged.",
  "",
  "Negative: dark moody black landscape, painterly brushstrokes, illustration, watercolor, ink wash, cartoon, anime, fantasy, oversaturated, AI poster gloss, oversharpened HDR, lens flare, motion blur, fake symmetry, missing markers, distorted Chinese map outline, removed typography.",
].join(" \n");

const PROMPT = PROMPT_FILE
  ? fs.readFileSync(path.resolve(PROMPT_FILE), "utf8")
  : DEFAULT_PROMPT;

console.log(`→ Editing B image via codesonline gpt-image-2`);
console.log(`  ref: ${path.relative(ROOT, REF_IMAGE)}`);
console.log(`  n=${N}, size=${SIZE}, upscale=${UPSCALE}, quality=high, style=natural`);
console.log(`  output: ${BASE}-{a..${String.fromCharCode(96 + N)}}.jpg in ${path.relative(ROOT, OUT_DIR)}/`);
console.log(`  prompt first 200: ${PROMPT.slice(0, 200)}...`);

// ───── Build multipart/form-data body manually (no FormData polyfill needed in node 18+) ─────

const boundary = `----codeflow-${randomBytes(12).toString("hex")}`;
const CRLF = "\r\n";
const refBuf = fs.readFileSync(REF_IMAGE);

function field(name, value) {
  return Buffer.from(
    `--${boundary}${CRLF}Content-Disposition: form-data; name="${name}"${CRLF}${CRLF}${value}${CRLF}`,
    "utf8",
  );
}

function fileField(name, filename, contentType, buf) {
  const head = Buffer.from(
    `--${boundary}${CRLF}Content-Disposition: form-data; name="${name}"; filename="${filename}"${CRLF}Content-Type: ${contentType}${CRLF}${CRLF}`,
    "utf8",
  );
  return Buffer.concat([head, buf, Buffer.from(CRLF, "utf8")]);
}

const parts = [
  field("model", "gpt-image-2"),
  field("prompt", PROMPT),
  field("n", String(N)),
  field("size", SIZE),
  field("quality", "high"),
  field("style", "natural"),
  field("background", "opaque"),
  field("upscale", UPSCALE),
  field("response_format", "b64_json"),
  fileField("image", "B_reference.png", "image/png", refBuf),
  Buffer.from(`--${boundary}--${CRLF}`, "utf8"),
];
const body = Buffer.concat(parts);

console.log(`  multipart body bytes: ${(body.length / 1024).toFixed(0)}KB`);

function postMultipart(url, payload, contentType) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request(
      {
        method: "POST",
        host: u.hostname,
        path: u.pathname + u.search,
        port: u.port || 443,
        headers: {
          "Content-Type": contentType,
          "Content-Length": payload.length,
          Authorization: `Bearer ${API_KEY}`,
        },
        timeout: 600000,
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
    req.on("timeout", () => req.destroy(new Error("Request timed out after 600s")));
    req.write(payload);
    req.end();
  });
}

const startedAt = Date.now();
const res = await postMultipart(
  "https://image.codesonline.dev/v1/images/edits",
  body,
  `multipart/form-data; boundary=${boundary}`,
);
const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
console.log(`  HTTP ${res.status} in ${elapsed}s`);

if (res.status !== 200) {
  console.error(`✗ API error:\n${res.body.slice(0, 1200)}`);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(res.body);
} catch (err) {
  console.error(`✗ Failed to parse JSON:\n${res.body.slice(0, 600)}`);
  process.exit(1);
}

if (!Array.isArray(data.data) || data.data.length === 0) {
  console.error(`✗ Response missing data array:\n${JSON.stringify(data, null, 2).slice(0, 800)}`);
  process.exit(1);
}

console.log(`  received ${data.data.length} image(s)`);

const log = fs.existsSync(LOG_FILE)
  ? (() => {
      try {
        return JSON.parse(fs.readFileSync(LOG_FILE, "utf8"));
      } catch {
        return [];
      }
    })()
  : [];

const written = [];
for (let i = 0; i < data.data.length; i++) {
  const item = data.data[i];
  const suffix = String.fromCharCode(97 + i); // a, b, c, d
  const outFile = path.join(OUT_DIR, `${BASE}-${suffix}.jpg`);
  let buf;
  if (item.b64_json) {
    buf = Buffer.from(item.b64_json, "base64");
  } else if (item.url) {
    // download URL
    const u = new URL(item.url);
    buf = await new Promise((resolve, reject) => {
      https.get(item.url, (r) => {
        const chunks = [];
        r.on("data", (c) => chunks.push(c));
        r.on("end", () => resolve(Buffer.concat(chunks)));
        r.on("error", reject);
      });
    });
  } else {
    console.error(`  ✗ ${suffix}: no b64_json and no url`);
    continue;
  }
  fs.writeFileSync(outFile, buf);
  console.log(`  ✓ ${BASE}-${suffix}.jpg (${(buf.length / 1024).toFixed(0)}KB)`);
  written.push({ file: path.relative(ROOT, outFile), bytes: buf.length });
}

log.push({
  version: BASE,
  generated_at: new Date().toISOString(),
  elapsed_sec: Number(elapsed),
  endpoint: "/v1/images/edits",
  model: "gpt-image-2",
  n: N,
  size: SIZE,
  upscale: UPSCALE,
  quality: "high",
  style: "natural",
  reference_image: path.relative(ROOT, REF_IMAGE),
  prompt_first_200: PROMPT.slice(0, 200),
  outputs: written,
});
fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
console.log(`\n✓ Logged ${written.length} outputs to ${path.relative(ROOT, LOG_FILE)}`);
