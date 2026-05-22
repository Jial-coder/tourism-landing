"""Perf audit on the home page + screenshots required by Phase 2.7 verify."""

from __future__ import annotations

import json
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path("D:/projects/tourism-landing")
OUT = ROOT / "qa" / "ui-ux-review" / "post-fix" / "phase27"
OUT.mkdir(parents=True, exist_ok=True)

BASE = "http://localhost:3001"

DESKTOP = {"width": 1440, "height": 900}
MOBILE = {"width": 375, "height": 812}

SHOTS_DESKTOP = [
    ("/", "home-desktop"),
    ("/reviews", "reviews-desktop"),
    ("/about", "about-desktop"),
    ("/destinations", "destinations-desktop"),
]
SHOTS_MOBILE = [
    ("/", "home-mobile"),
]


def measure_perf(page, url: str) -> dict:
    page.goto(url, wait_until="networkidle", timeout=60000)
    # Use PerformancePaintTiming + LayoutShift
    metrics = page.evaluate(
        """async () => {
            // LCP
            const lcp = await new Promise((resolve) => {
                let last = 0;
                const obs = new PerformanceObserver((list) => {
                    for (const e of list.getEntries()) last = e.startTime;
                });
                obs.observe({ type: 'largest-contentful-paint', buffered: true });
                setTimeout(() => { obs.disconnect(); resolve(last); }, 1500);
            });
            // CLS
            const cls = await new Promise((resolve) => {
                let total = 0;
                const obs = new PerformanceObserver((list) => {
                    for (const e of list.getEntries()) {
                        if (!e.hadRecentInput) total += e.value;
                    }
                });
                obs.observe({ type: 'layout-shift', buffered: true });
                setTimeout(() => { obs.disconnect(); resolve(total); }, 1500);
            });
            // FCP / DCL / load
            const nav = performance.getEntriesByType('navigation')[0] || {};
            const paint = performance.getEntriesByType('paint');
            const fcp = paint.find((p) => p.name === 'first-contentful-paint');
            return {
                lcp_ms: Math.round(lcp || 0),
                cls: Number((cls || 0).toFixed(4)),
                fcp_ms: fcp ? Math.round(fcp.startTime) : null,
                domContentLoaded_ms: Math.round(nav.domContentLoadedEventEnd || 0),
                loadEvent_ms: Math.round(nav.loadEventEnd || 0),
                transferSize_bytes: nav.transferSize || 0,
            };
        }"""
    )
    return metrics


def main() -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # Perf
        ctx = browser.new_context(viewport=DESKTOP)
        page = ctx.new_page()
        perf_home = measure_perf(page, BASE + "/")
        with (OUT / "perf-home.json").open("w", encoding="utf-8") as f:
            json.dump(perf_home, f, ensure_ascii=False, indent=2)
        print("perf-home:", perf_home)
        ctx.close()

        # Desktop fullpage shots
        ctx = browser.new_context(viewport=DESKTOP)
        page = ctx.new_page()
        for path, slug in SHOTS_DESKTOP:
            url = BASE + path
            print("[shot]", url)
            page.goto(url, wait_until="networkidle", timeout=60000)
            time.sleep(1)
            page.screenshot(path=str(OUT / f"{slug}.png"), full_page=True)
        ctx.close()

        # Mobile fullpage shot
        ctx = browser.new_context(viewport=MOBILE, device_scale_factor=2)
        page = ctx.new_page()
        for path, slug in SHOTS_MOBILE:
            url = BASE + path
            print("[shot]", url)
            page.goto(url, wait_until="networkidle", timeout=60000)
            time.sleep(1)
            page.screenshot(path=str(OUT / f"{slug}.png"), full_page=True)
        ctx.close()

        browser.close()


if __name__ == "__main__":
    main()
