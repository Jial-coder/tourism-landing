#!/usr/bin/env node
// Build static SVG path data from DataV China GeoJSON.
// Run once after geojson updates: `node scripts/build-china-svg.mjs`
// Output: app/_generated/china-map.json with { path, viewBox, landmarks }
import fs from "node:fs";
import path from "node:path";
import { geoMercator, geoPath } from "d3-geo";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "public/maps/china-outline.json");
const OUT_DIR = path.join(ROOT, "app/_generated");
const OUT = path.join(OUT_DIR, "china-map.json");

const VIEWBOX_W = 1000;
const VIEWBOX_H = 750;

const LANDMARKS = [
  { id: "beijing", zh: "北京", en: "Beijing", tagline: "故宫 · 紫禁城 600 年", lng: 116.4074, lat: 39.9042, query: "Forbidden City Beijing aerial" },
  { id: "shanghai", zh: "上海", en: "Shanghai", tagline: "外滩 · 东方明珠夜色", lng: 121.4737, lat: 31.2304, query: "Shanghai Bund Pudong night skyline" },
  { id: "xian", zh: "西安", en: "Xi'an", tagline: "兵马俑 · 千年长安", lng: 108.9398, lat: 34.3416, query: "Terracotta warriors Xi'an" },
  { id: "zhangjiajie", zh: "张家界", en: "Zhangjiajie", tagline: "悬空山 · 阿凡达取景地", lng: 110.4792, lat: 29.1170, query: "Zhangjiajie floating mountains" },
  { id: "guilin", zh: "桂林", en: "Guilin", tagline: "漓江 · 山水甲天下", lng: 110.2900, lat: 25.2736, query: "Guilin Li River karst mountains" },
  { id: "chengdu", zh: "成都", en: "Chengdu", tagline: "熊猫基地 · 麻辣火锅", lng: 104.0668, lat: 30.5728, query: "Chengdu giant panda" },
  { id: "hangzhou", zh: "杭州", en: "Hangzhou", tagline: "西湖 · 烟雨江南", lng: 120.1551, lat: 30.2741, query: "West Lake Hangzhou misty" },
  { id: "dunhuang", zh: "敦煌", en: "Dunhuang", tagline: "莫高窟 · 沙漠丝路", lng: 94.6614, lat: 40.1421, query: "desert sand dunes" },
  { id: "lhasa", zh: "拉萨", en: "Lhasa", tagline: "布达拉宫 · 雪域圣地", lng: 91.1322, lat: 29.6500, query: "Potala Palace Lhasa Tibet" },
  { id: "lijiang", zh: "丽江", en: "Lijiang", tagline: "古城 · 玉龙雪山", lng: 100.2331, lat: 26.8721, query: "Lijiang old town Yulong snow mountain" },
];

const geo = JSON.parse(fs.readFileSync(SRC, "utf8"));

// Manual mercator projection tuned to fit mainland China within 1000x750.
// fitExtent on full-geo (with 9-dash line down to 3.4°N) over-shrinks landmarks
// into a tiny cluster — see scripts notes for tuning history.
const projection = geoMercator()
  .center([105, 35])
  .scale(700)
  .translate([VIEWBOX_W / 2, VIEWBOX_H / 2]);

const pathGen = geoPath(projection);
const pathData = pathGen(geo);

const landmarks = LANDMARKS.map((l) => {
  const [x, y] = projection([l.lng, l.lat]) ?? [0, 0];
  return { ...l, x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) };
});

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(
  OUT,
  JSON.stringify(
    {
      copyright: "审图号 GS(2019)1822 — DataV.GeoAtlas",
      viewBox: `0 0 ${VIEWBOX_W} ${VIEWBOX_H}`,
      width: VIEWBOX_W,
      height: VIEWBOX_H,
      path: pathData,
      landmarks,
    },
    null,
    2,
  ),
);

console.log(`✓ wrote ${OUT}`);
console.log(`  path length: ${pathData.length} chars`);
console.log(`  landmarks: ${landmarks.length}`);
