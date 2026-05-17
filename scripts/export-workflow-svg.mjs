// Lightweight .drawio → SVG renderer (only handles ellipse / rounded-rect / rhombus / arrows
// for our client-workflow.drawio spec). No external dependencies.
//
// Why not the full drawio engine? We only need to render this one workflow file
// in a static client-page. The full mxgraph runtime is ~500KB and overkill.
// If we ever need general drawio rendering, switch to drawio-export Docker image.

import fs from "node:fs";
import path from "node:path";
import { DOMParser } from "@xmldom/xmldom";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "docs/client-workflow.drawio");
const OUT = path.join(ROOT, "public/client-workflow.svg");

const xml = fs.readFileSync(SRC, "utf8");
const doc = new DOMParser().parseFromString(xml, "text/xml");

function parseStyle(s) {
  const out = {};
  if (!s) return out;
  s.split(";")
    .filter(Boolean)
    .forEach((kv) => {
      const idx = kv.indexOf("=");
      if (idx === -1) {
        out[kv] = true;
      } else {
        out[kv.slice(0, idx)] = kv.slice(idx + 1);
      }
    });
  return out;
}

function getCells() {
  const cells = doc.getElementsByTagName("mxCell");
  return Array.from({ length: cells.length }, (_, i) => cells[i]);
}

function getGeometry(cell) {
  const geoms = cell.getElementsByTagName("mxGeometry");
  if (!geoms || !geoms.length) return null;
  const g = geoms[0];
  return {
    x: parseFloat(g.getAttribute("x") || "0"),
    y: parseFloat(g.getAttribute("y") || "0"),
    w: parseFloat(g.getAttribute("width") || "0"),
    h: parseFloat(g.getAttribute("height") || "0"),
  };
}

function getMeta(cell) {
  const objs = cell.getElementsByTagName("object");
  if (!objs || !objs.length) return {};
  const o = objs[0];
  return {
    feedbackId: o.getAttribute("feedbackId") || "",
    workflowNodeId: o.getAttribute("workflowNodeId") || "",
    status: o.getAttribute("status") || "",
  };
}

const cellById = new Map();
const nodes = [];
const edges = [];

for (const cell of getCells()) {
  const id = cell.getAttribute("id");
  if (!id || id === "0" || id === "1") continue;
  cellById.set(id, cell);

  const geo = getGeometry(cell);
  const style = parseStyle(cell.getAttribute("style") || "");
  const value = (cell.getAttribute("value") || "").replace(/&#10;/g, "\n");
  const isEdge = cell.getAttribute("edge") === "1";

  if (isEdge) {
    edges.push({
      id,
      source: cell.getAttribute("source"),
      target: cell.getAttribute("target"),
      label: value,
      style,
    });
  } else if (geo) {
    nodes.push({ id, geo, value, style, meta: getMeta(cell) });
  }
}

function renderNode(n) {
  const { x, y, w, h } = n.geo;
  const fill = n.style.fillColor || "#F8F4EC";
  const stroke = n.style.strokeColor || "#1F4E5C";
  const fontColor = n.style.fontColor || "#1A1A1A";
  const fontSize = n.style.fontSize || "12";
  const sw = n.style.strokeWidth || "1";
  const lines = n.value.split("\n");
  const cx = x + w / 2;
  const startY = y + h / 2 - ((lines.length - 1) * parseInt(fontSize, 10) * 1.2) / 2;

  let shape = "";
  if (n.style.ellipse) {
    shape = `<ellipse cx="${cx}" cy="${y + h / 2}" rx="${w / 2}" ry="${h / 2}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`;
  } else if (n.style.rhombus) {
    const p = `${cx},${y} ${x + w},${y + h / 2} ${cx},${y + h} ${x},${y + h / 2}`;
    shape = `<polygon points="${p}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`;
  } else if (n.style.rounded === "1") {
    const r = parseInt(n.style.arcSize || "12", 10);
    shape = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ry="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`;
  } else if (n.style.text === "1" || n.style.text) {
    shape = "";
  } else {
    shape = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" />`;
  }

  const labels = lines
    .map(
      (line, i) =>
        `<text x="${cx}" y="${startY + i * parseInt(fontSize, 10) * 1.25}" fill="${fontColor}" font-size="${fontSize}" text-anchor="middle" font-family="Helvetica, sans-serif" dominant-baseline="middle">${escape(line)}</text>`,
    )
    .join("");

  const dataAttrs = n.meta.feedbackId
    ? ` data-feedback-id="${n.meta.feedbackId}" data-status="${n.meta.status}" data-workflow-node="${n.meta.workflowNodeId}"`
    : "";

  return `<g${dataAttrs}>${shape}${labels}</g>`;
}

function escape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderEdge(e) {
  const src = nodes.find((n) => n.id === e.source);
  const tgt = nodes.find((n) => n.id === e.target);
  if (!src || !tgt) return "";
  const sx = src.geo.x + src.geo.w / 2;
  const sy = src.geo.y + src.geo.h / 2;
  const tx = tgt.geo.x + tgt.geo.w / 2;
  const ty = tgt.geo.y + tgt.geo.h / 2;
  // Adjust endpoints to nearest edge of source/target rect (orthogonal-ish)
  const angle = Math.atan2(ty - sy, tx - sx);
  const adj = (geo, sign) => {
    const halfW = geo.w / 2;
    const halfH = geo.h / 2;
    const dx = Math.cos(angle) * sign;
    const dy = Math.sin(angle) * sign;
    const tan = Math.abs(dy / dx);
    const aspect = halfH / halfW;
    let ox, oy;
    if (tan < aspect) {
      ox = halfW * Math.sign(dx);
      oy = ox * (dy / dx);
    } else {
      oy = halfH * Math.sign(dy);
      ox = oy * (dx / dy);
    }
    return { x: geo.x + halfW + ox, y: geo.y + halfH + oy };
  };
  const start = adj(src.geo, 1);
  const end = adj(tgt.geo, -1);
  const stroke = e.style.strokeColor || "#1F4E5C";
  const sw = e.style.strokeWidth || "1.5";
  const labelEl = e.label
    ? `<text x="${(start.x + end.x) / 2}" y="${(start.y + end.y) / 2 - 6}" fill="${e.style.fontColor || "#1A1A1A"}" font-size="${e.style.fontSize || "11"}" text-anchor="middle" font-family="Helvetica, sans-serif">${escape(e.label)}</text>`
    : "";
  return `<g><line x1="${start.x}" y1="${start.y}" x2="${end.x}" y2="${end.y}" stroke="${stroke}" stroke-width="${sw}" marker-end="url(#arrow)"/>${labelEl}</g>`;
}

// Compute viewBox
let xmin = Infinity, ymin = Infinity, xmax = -Infinity, ymax = -Infinity;
nodes.forEach((n) => {
  xmin = Math.min(xmin, n.geo.x);
  ymin = Math.min(ymin, n.geo.y);
  xmax = Math.max(xmax, n.geo.x + n.geo.w);
  ymax = Math.max(ymax, n.geo.y + n.geo.h);
});
const padding = 40;
const vbX = xmin - padding;
const vbY = ymin - padding;
const vbW = xmax - xmin + padding * 2;
const vbH = ymax - ymin + padding * 2;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<!-- generated from docs/client-workflow.drawio by scripts/export-workflow-svg.mjs -->
<!-- DO NOT EDIT: regenerate via \`node scripts/export-workflow-svg.mjs\` -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vbX} ${vbY} ${vbW} ${vbH}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="客户业务流程">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#1F4E5C"/>
    </marker>
  </defs>
  <rect x="${vbX}" y="${vbY}" width="${vbW}" height="${vbH}" fill="#F8F4EC"/>
  ${edges.map(renderEdge).join("\n  ")}
  ${nodes.map(renderNode).join("\n  ")}
</svg>
`;

fs.writeFileSync(OUT, svg);
console.log(`✓ wrote ${OUT}`);
console.log(`  nodes: ${nodes.length}, edges: ${edges.length}`);
console.log(`  viewBox: ${vbX} ${vbY} ${vbW} ${vbH}`);
