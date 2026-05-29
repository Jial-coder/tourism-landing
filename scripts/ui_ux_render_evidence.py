"""Collect rendered UI/UX evidence for AI-triggered review.

The script assumes a running local app, captures desktop/mobile screenshots,
records console and page errors, and detects horizontal overflow. It writes
machine-readable and human-readable reports for follow-up agents.
"""

from __future__ import annotations

import argparse
import json
import sys
import time
from pathlib import Path
from typing import Any

from playwright.sync_api import sync_playwright


DEFAULT_BASE = "http://localhost:3001"
DEFAULT_OUT = Path("qa/ui-ux-review/codex-2026-05-24")
VIEWPORTS = [
    ("desktop-1440", {"width": 1440, "height": 900, "device_scale_factor": 1}),
    ("mobile-375", {"width": 375, "height": 812, "device_scale_factor": 2}),
]
ROUTES = [
    ("/", "home"),
    ("/plan", "plan"),
    ("/destinations/beijing", "destinations-beijing"),
    ("/itineraries", "itineraries"),
    ("/about", "about"),
    ("/reviews", "reviews"),
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", default=DEFAULT_BASE)
    parser.add_argument("--out-dir", default=str(DEFAULT_OUT))
    parser.add_argument("--route", action="append", help="Optional route path to scan. Can be repeated.")
    parser.add_argument(
        "--motion",
        choices=["reduce", "no-preference"],
        default="reduce",
        help="Browser motion preference for deterministic evidence. Defaults to reduce so reveal animations do not hide offscreen full-page content.",
    )
    return parser.parse_args()


def route_slug(route: str) -> str:
    if route == "/":
        return "home"
    return route.strip("/").replace("/", "-").replace("[", "").replace("]", "") or "home"


def collect_overflow(page) -> dict[str, Any]:
    return page.evaluate(
        """() => {
            const width = window.innerWidth;
            const doc = document.documentElement;
            const body = document.body;
            const scrollWidth = Math.max(doc.scrollWidth, body ? body.scrollWidth : 0);
            const overflowPx = Math.max(0, scrollWidth - width);
            const offenders = [];
            for (const el of Array.from(document.body.querySelectorAll('*'))) {
                const style = window.getComputedStyle(el);
                if (style.display === 'none' || style.visibility === 'hidden') continue;
                const rect = el.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) continue;
                if (rect.right > width + 1 || rect.left < -1) {
                    offenders.push({
                        tag: el.tagName.toLowerCase(),
                        id: el.id || null,
                        className: String(el.className || '').slice(0, 140),
                        left: Math.round(rect.left),
                        right: Math.round(rect.right),
                        width: Math.round(rect.width),
                    });
                }
                if (offenders.length >= 10) break;
            }
            return { viewportWidth: width, scrollWidth, overflowPx, offenders };
        }"""
    )


def prepare_visual_evidence(page) -> None:
    page.add_style_tag(
        content="""
        nextjs-portal,
        next-route-announcer {
          display: none !important;
        }
        """
    )


def scan_route(page, base: str, route: str, slug: str, viewport_name: str, out: Path) -> dict[str, Any]:
    url = base.rstrip("/") + route
    console_entries: list[dict[str, str]] = []
    page_errors: list[str] = []

    def on_console(msg) -> None:
        if msg.type in {"error", "warning"}:
            console_entries.append({"type": msg.type, "text": msg.text[:500]})

    def on_page_error(exc) -> None:
        page_errors.append(str(exc)[:500])

    page.on("console", on_console)
    page.on("pageerror", on_page_error)
    started = time.time()
    row: dict[str, Any] = {
        "route": route,
        "slug": slug,
        "viewport": viewport_name,
        "url": url,
    }
    try:
        response = page.goto(url, wait_until="networkidle", timeout=60000)
        prepare_visual_evidence(page)
        page.wait_for_timeout(500)
        overflow = collect_overflow(page)
        screenshot = f"render-{viewport_name}-{slug}.png"
        page.screenshot(path=str(out / screenshot), full_page=True)
        row.update(
            {
                "ok": True,
                "status": response.status if response else None,
                "title": page.title(),
                "durationMs": round((time.time() - started) * 1000),
                "screenshot": screenshot,
                "console": console_entries,
                "pageErrors": page_errors,
                "overflow": overflow,
                "issueCount": len(page_errors)
                + len([entry for entry in console_entries if entry["type"] == "error"])
                + (1 if overflow["overflowPx"] > 1 else 0),
            }
        )
    except Exception as exc:
        row.update(
            {
                "ok": False,
                "error": str(exc),
                "durationMs": round((time.time() - started) * 1000),
                "console": console_entries,
                "pageErrors": page_errors,
                "issueCount": 1,
            }
        )
    finally:
        page.remove_listener("console", on_console)
        page.remove_listener("pageerror", on_page_error)
    return row


def write_markdown(out: Path, summary: dict[str, Any]) -> None:
    lines = [
        "# Render Evidence",
        "",
        "Date: 2026-05-24  ",
        "Run: `ui-ux-render-evidence`",
        "",
        "## Summary",
        "",
        f"- Base: `{summary['base']}`",
        f"- Motion preference: `{summary.get('motion', 'reduce')}`",
        f"- Pages scanned: `{len(summary['pages'])}`",
        f"- Errors: `{summary['totals']['errors']}`",
        f"- Console errors: `{summary['totals']['consoleErrors']}`",
        f"- Horizontal overflow pages: `{summary['totals']['overflowPages']}`",
        "",
        "## Pages",
        "",
        "| Viewport | Route | OK | Status | Issues | Overflow | Screenshot |",
        "| --- | --- | --- | --- | ---: | ---: | --- |",
    ]
    for row in summary["pages"]:
        overflow = row.get("overflow", {}).get("overflowPx", "")
        lines.append(
            f"| `{row['viewport']}` | `{row['route']}` | `{row.get('ok')}` | "
            f"`{row.get('status', '')}` | {row.get('issueCount', 0)} | "
            f"{overflow} | `{row.get('screenshot', '')}` |"
        )
    lines.extend(
        [
            "",
            "## Next Use",
            "",
            "Use these screenshots and metrics as rendered evidence for aesthetic, hierarchy, responsive, and interaction review. A clean render-evidence pass does not replace product mock-gate decisions or manual taste judgment.",
            "",
        ]
    )
    (out / "RENDER-EVIDENCE.md").write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    args = parse_args()
    out = Path(args.out_dir).resolve()
    out.mkdir(parents=True, exist_ok=True)

    routes = [(route, route_slug(route)) for route in args.route] if args.route else ROUTES
    summary: dict[str, Any] = {
        "run": "ui-ux-render-evidence",
        "base": args.base,
        "motion": args.motion,
        "viewports": [name for name, _ in VIEWPORTS],
        "routes": [route for route, _ in routes],
        "pages": [],
    }

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for viewport_name, viewport in VIEWPORTS:
            context = browser.new_context(
                viewport={"width": viewport["width"], "height": viewport["height"]},
                device_scale_factor=viewport["device_scale_factor"],
                reduced_motion=args.motion,
            )
            page = context.new_page()
            for route, slug in routes:
                print(f"[render] {viewport_name} {route}")
                summary["pages"].append(scan_route(page, args.base, route, slug, viewport_name, out))
            context.close()
        browser.close()

    totals = {
        "errors": len([row for row in summary["pages"] if not row.get("ok")]),
        "consoleErrors": sum(
            len([entry for entry in row.get("console", []) if entry.get("type") == "error"])
            for row in summary["pages"]
        ),
        "pageErrors": sum(len(row.get("pageErrors", [])) for row in summary["pages"]),
        "overflowPages": len(
            [row for row in summary["pages"] if row.get("overflow", {}).get("overflowPx", 0) > 1]
        ),
    }
    summary["totals"] = totals

    (out / "render-evidence-summary.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    write_markdown(out, summary)

    print(json.dumps({"totals": totals, "pages": len(summary["pages"])}, ensure_ascii=False))
    return 1 if totals["errors"] or totals["consoleErrors"] or totals["overflowPages"] else 0


if __name__ == "__main__":
    sys.exit(main())
