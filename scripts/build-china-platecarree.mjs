#!/usr/bin/env node
// Build a plate-carrée projected, simplified China outline for Hero overlay use.
// Source: DataV.GeoAtlas full country (审图号 GS(2019)1822) — includes Taiwan + 九段线.
// Output: lib/china-map-data.ts with viewBox / path / marker coords.
//
// Run:
//   node scripts/build-china-platecarree.mjs
//   SIMPLIFY_PCT=4 node scripts/build-china-platecarree.mjs   # finer simplify
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "public/maps/china-outline.json");
const TMP_DIR = path.join(ROOT, "scripts/_tmp");
const TMP_SIMPLIFIED = path.join(TMP_DIR, "china-simplified.json");
const OUT = path.join(ROOT, "lib/china-map-data.ts");

const VIEWBOX_W = 620;
const VIEWBOX_H = 360;
// Plate carrée bounds tuned to the Hero brief:
//   lng 73°E~135°E (62° span), lat 18°N~54°N (36° span); 10× zoom.
const LNG_MIN = 73;
const LAT_MAX = 54;
const SCALE = 10;

const MARKERS = [
  { id: "zhangjiajie", lng: 110.4792, lat: 29.117 },
  { id: "jiuzhaigou", lng: 103.92, lat: 33.26 },
  { id: "guilin", lng: 110.29, lat: 25.27 },
  { id: "dali", lng: 100.27, lat: 25.61 },
];

const project = (lng, lat) => [(lng - LNG_MIN) * SCALE, (LAT_MAX - lat) * SCALE];
const fmt = (n) => {
  // 1 decimal is sub-pixel at 620×360.
  const rounded = Math.round(n * 10) / 10;
  if (rounded === 0) return "0";
  // Drop trailing ".0" for integers.
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
};

const SIMPLIFY_PCT = process.env.SIMPLIFY_PCT ?? "6";
fs.mkdirSync(TMP_DIR, { recursive: true });
console.log(`→ simplifying with mapshaper (visvalingam ${SIMPLIFY_PCT}%, keep-shapes)…`);
execSync(
  `npx --yes mapshaper "${SRC}" -simplify visvalingam ${SIMPLIFY_PCT}% keep-shapes -o format=geojson force "${TMP_SIMPLIFIED}"`,
  { stdio: "inherit", cwd: ROOT },
);

const geo = JSON.parse(fs.readFileSync(TMP_SIMPLIFIED, "utf8"));

// Hand-rolled SVG path generator: walk every ring of every polygon, project,
// emit M / L / Z. Avoids d3-geo's stream resampling + sphere-boundary quirks.
// Also splits 九段线 outlying islands (lat < 18°N) into a separate path so the
// frontend can apply stroke-dasharray to them.
//
// 9-段线 islands are tiny (often <0.2° wide) so simplification crushes them
// down to <3 points and `keep-shapes` collapses them to dots. We emit each
// surviving 9-段线 ring as a small circle marker (`m -1,0 a 1,1 0 1,0 2,0
// a 1,1 0 1,0 -2,0`) anchored at the ring centroid, scaled to ~2px diameter.
const NANSEA_LAT_CUTOFF = 18;
const mainlandSegments = [];
const nanseaSegments = [];
const nanseaCircles = [];

const projectRing = (ring) => {
  if (!ring.length) return null;
  const pts = ring.map(([lng, lat]) => project(lng, lat));
  if (
    pts.length > 1 &&
    Math.abs(pts[0][0] - pts.at(-1)[0]) < 1e-6 &&
    Math.abs(pts[0][1] - pts.at(-1)[1]) < 1e-6
  ) {
    pts.pop();
  }
  if (pts.length < 2) return null;
  const head = `M${fmt(pts[0][0])},${fmt(pts[0][1])}`;
  const tail = pts
    .slice(1)
    .map(([x, y]) => `L${fmt(x)},${fmt(y)}`)
    .join("");
  return `${head}${tail}Z`;
};

const ringMeanLat = (ring) => {
  let s = 0;
  for (const [, lat] of ring) s += lat;
  return s / ring.length;
};

const ringCentroidLngLat = (ring) => {
  let sx = 0, sy = 0;
  for (const [lng, lat] of ring) {
    sx += lng;
    sy += lat;
  }
  return [sx / ring.length, sy / ring.length];
};

const walkPolygon = (poly, meanLat) => {
  for (const ring of poly) {
    const seg = projectRing(ring);
    if (!seg) continue;
    if (meanLat < NANSEA_LAT_CUTOFF) nanseaSegments.push(seg);
    else mainlandSegments.push(seg);
  }
};

// Also emit a tiny circle for every 九段线 island in the *unsimplified* source
// so that simplification can't erase them.
const RAW_GEO = JSON.parse(fs.readFileSync(SRC, "utf8"));
const seenCentroids = new Set();
for (const feature of RAW_GEO.features) {
  const g = feature.geometry;
  if (!g) continue;
  const polys = g.type === "Polygon" ? [g.coordinates] : g.type === "MultiPolygon" ? g.coordinates : [];
  for (const poly of polys) {
    for (const ring of poly) {
      if (ringMeanLat(ring) >= NANSEA_LAT_CUTOFF) continue;
      const [clng, clat] = ringCentroidLngLat(ring);
      const key = `${clng.toFixed(2)},${clat.toFixed(2)}`;
      if (seenCentroids.has(key)) continue;
      seenCentroids.add(key);
      const [x, y] = project(clng, clat);
      // Tiny dot: M cx,cy m-r,0 a r,r 0 1,0 2r,0 a r,r 0 1,0 -2r,0
      // r=0.6 gives ~1.2 unit diameter → ~2px when overlay is 1080×627.
      const r = 0.6;
      nanseaCircles.push(
        `M${fmt(x)},${fmt(y)}m-${r},0a${r},${r} 0 1,0 ${r * 2},0a${r},${r} 0 1,0 -${r * 2},0Z`,
      );
    }
  }
}

for (const feature of geo.features) {
  const g = feature.geometry;
  if (!g) continue;
  if (g.type === "Polygon") {
    const meanLat = ringMeanLat(g.coordinates[0] ?? []);
    walkPolygon(g.coordinates, meanLat);
  } else if (g.type === "MultiPolygon") {
    for (const poly of g.coordinates) {
      const meanLat = ringMeanLat(poly[0] ?? []);
      walkPolygon(poly, meanLat);
    }
  }
}

// 九段线 dashed segments (审图号 GS(2019)1822 标准 9 段示意位置).
// Coordinates are approximate — sourced from public 标准地图服务系统 references.
// Frontend renders these as a separate <path> with stroke-dasharray for the
// classic "dashed line" visual style.
const NINE_DASH_LINE = [
  // [lng, lat] pairs forming each dash segment as a polyline (start → end)
  [[120.5, 24.5], [121.0, 23.5]], // 1: 台湾东南
  [[121.5, 21.5], [121.0, 19.5]], // 2: 巴士海峡北
  [[120.0, 18.0], [118.5, 16.0]], // 3: 巴士海峡南
  [[117.5, 14.5], [116.0, 13.0]], // 4: 南海北
  [[114.5, 11.5], [112.5, 9.5]],  // 5: 南海中北
  [[110.5, 7.5], [109.5, 5.0]],   // 6: 曾母暗沙北
  [[109.0, 4.0], [110.0, 6.0]],   // 7: 曾母暗沙东
  [[110.5, 8.0], [109.5, 11.0]],  // 8: 越南东
  [[108.5, 13.5], [108.0, 16.5]], // 9: 越南北
];
const ninedashPath = NINE_DASH_LINE.map(([a, b]) => {
  const [ax, ay] = project(a[0], a[1]);
  const [bx, by] = project(b[0], b[1]);
  return `M${fmt(ax)},${fmt(ay)}L${fmt(bx)},${fmt(by)}`;
}).join("");
const ninedashBytes = Buffer.byteLength(ninedashPath, "utf8");

const pathData = mainlandSegments.join("");
const nanseaPath = [...nanseaSegments, ...nanseaCircles].join("");
const lengthBytes = Buffer.byteLength(pathData, "utf8");
const nanseaBytes = Buffer.byteLength(nanseaPath, "utf8");

const markerCoords = Object.fromEntries(
  MARKERS.map((m) => {
    const [x, y] = project(m.lng, m.lat);
    return [
      m.id,
      { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)), lat: m.lat, lng: m.lng },
    ];
  }),
);

// Sanity-check markers fall within viewBox.
for (const [id, c] of Object.entries(markerCoords)) {
  if (c.x < 0 || c.x > VIEWBOX_W || c.y < 0 || c.y > VIEWBOX_H) {
    throw new Error(`marker ${id} (${c.x},${c.y}) outside viewBox`);
  }
}

// Verify the mainland path stays within the viewBox; 九段线 outliers are in
// NANSEA_PATH and intentionally extend below.
const mainlandBboxFromPath = (str) => {
  const tokens = str.split(/([MLZ])/).filter(Boolean);
  let xs = [], ys = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "M" || tokens[i] === "L") {
      const next = tokens[i + 1] ?? "";
      for (const m of next.matchAll(/(-?\d+\.?\d*),(-?\d+\.?\d*)/g)) {
        xs.push(Number(m[1]));
        ys.push(Number(m[2]));
      }
    }
  }
  return { xs, ys };
};
const mainlandBbox = mainlandBboxFromPath(pathData);
const xMin = Math.min(...mainlandBbox.xs);
const xMax = Math.max(...mainlandBbox.xs);
const yMin = Math.min(...mainlandBbox.ys);
const yMax = Math.max(...mainlandBbox.ys);
if (xMin < -5 || xMax > VIEWBOX_W + 5 || yMin < -5 || yMax > VIEWBOX_H + 5) {
  throw new Error(
    `mainland path bbox out of viewBox: x[${xMin.toFixed(1)},${xMax.toFixed(1)}] y[${yMin.toFixed(1)},${yMax.toFixed(1)}]`,
  );
}

const ts = `// AUTO-GENERATED by scripts/build-china-platecarree.mjs — do not edit by hand.
// Source: DataV.GeoAtlas 100000 (审图号 GS(2019)1822, MIT-style 公共授权)
// Includes Taiwan, Hainan, Xinjiang, Tibet, Inner Mongolia + 南海岛屿.
// Projection: plate carrée (equirectangular). x = (lng - 73) * 10, y = (54 - lat) * 10.
//
// CHINA_PATH = mainland + Taiwan + Hainan + nearshore islands (lat ≥ 18°N).
// NANSEA_PATH = 南海远岛 (lat < 18°N) — small islands rendered as tiny dots.
// NINE_DASH_PATH = 九段线 (approximate dashed segments) for stroke-dasharray.
// Note: NANSEA_PATH and NINE_DASH_PATH y-coords extend below VIEWBOX_H (down
// to ~y=490). The overlay container should set overflow:visible if 九段线
// should display, or clip to the viewBox if only the mainland silhouette is
// desired.

export const CHINA_VIEWBOX = "0 0 ${VIEWBOX_W} ${VIEWBOX_H}";

export const CHINA_BOUNDS = {
  lngMin: 73,
  lngMax: 135,
  latMin: 18,
  latMax: 54,
  scale: 10,
} as const;

export type ChinaMarkerId = "zhangjiajie" | "jiuzhaigou" | "guilin" | "dali";

export const MARKER_COORDS: Record<
  ChinaMarkerId,
  { x: number; y: number; lat: number; lng: number }
> = ${JSON.stringify(markerCoords, null, 2)} as const;

export const CHINA_PATH = ${JSON.stringify(pathData)};

export const NANSEA_PATH = ${JSON.stringify(nanseaPath)};

export const NINE_DASH_PATH = ${JSON.stringify(ninedashPath)};
`;

fs.writeFileSync(OUT, ts);

console.log(`✓ wrote ${path.relative(ROOT, OUT)}`);
console.log(`  viewBox: 0 0 ${VIEWBOX_W} ${VIEWBOX_H}`);
console.log(`  CHINA_PATH bytes: ${lengthBytes} (${mainlandSegments.length} segments)`);
console.log(`  NANSEA_PATH bytes: ${nanseaBytes} (${nanseaSegments.length} polygons + ${nanseaCircles.length} dots)`);
console.log(`  NINE_DASH_PATH bytes: ${ninedashBytes} (${NINE_DASH_LINE.length} segments)`);
console.log(`  mainland bbox: x[${xMin.toFixed(1)},${xMax.toFixed(1)}] y[${yMin.toFixed(1)},${yMax.toFixed(1)}]`);
console.log(`  markers:`);
for (const [id, c] of Object.entries(markerCoords)) {
  console.log(`    ${id.padEnd(12)} → x=${c.x}, y=${c.y}`);
}
