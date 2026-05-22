"""Run axe-core scan against pages on localhost:3001.

Outputs JSON per page to qa/ui-ux-review/post-fix/phase27/axe-{slug}.json
plus a summary.json with counts grouped by impact level.
"""

from __future__ import annotations

import json
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path("D:/projects/tourism-landing")
OUT = ROOT / "qa" / "ui-ux-review" / "post-fix" / "phase27"
OUT.mkdir(parents=True, exist_ok=True)

AXE_URL = "https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.0/axe.min.js"
BASE = "http://localhost:3001"

PAGES = [
    ("/", "home"),
    ("/destinations", "destinations"),
    ("/destinations/beijing", "destinations-beijing"),
    ("/itineraries", "itineraries"),
    ("/itineraries/sample-10d", "itineraries-sample-10d"),
    ("/plan", "plan"),
    ("/visa-free", "visa-free"),
    ("/about", "about"),
    ("/reviews", "reviews"),
]


def scan(page, url: str) -> dict:
    page.goto(url, wait_until="networkidle", timeout=60000)
    page.add_script_tag(url=AXE_URL)
    # axe.run with default WCAG ruleset
    result = page.evaluate(
        """async () => {
            const r = await window.axe.run(document, {
                runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] },
            });
            return r;
        }"""
    )
    return result


def main() -> int:
    summary = {"pages": []}
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(viewport={"width": 1440, "height": 900})
        page = ctx.new_page()
        for path, slug in PAGES:
            url = BASE + path
            print(f"[axe] scanning {url}")
            try:
                result = scan(page, url)
            except Exception as e:
                print(f"[axe] FAIL {url}: {e}")
                summary["pages"].append({"slug": slug, "url": url, "error": str(e)})
                continue
            outpath = OUT / f"axe-{slug}.json"
            with outpath.open("w", encoding="utf-8") as f:
                json.dump(result, f, ensure_ascii=False, indent=2)
            counts = {"critical": 0, "serious": 0, "moderate": 0, "minor": 0}
            for v in result.get("violations", []):
                impact = v.get("impact") or "minor"
                counts[impact] = counts.get(impact, 0) + 1
            summary["pages"].append(
                {
                    "slug": slug,
                    "url": url,
                    "violations": len(result.get("violations", [])),
                    "by_impact": counts,
                    "rules": [
                        {
                            "id": v.get("id"),
                            "impact": v.get("impact"),
                            "help": v.get("help"),
                            "nodes": len(v.get("nodes", [])),
                            "first_target": (
                                v["nodes"][0].get("target", []) if v.get("nodes") else []
                            ),
                        }
                        for v in result.get("violations", [])
                    ],
                }
            )
            print(
                f"  -> {len(result.get('violations', []))} violations "
                f"(crit {counts['critical']} / serious {counts['serious']} / "
                f"mod {counts['moderate']} / minor {counts['minor']})"
            )
        browser.close()

    sumpath = OUT / "summary.json"
    with sumpath.open("w", encoding="utf-8") as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)
    totals = {"critical": 0, "serious": 0, "moderate": 0, "minor": 0}
    for pg in summary["pages"]:
        if "by_impact" in pg:
            for k, v in pg["by_impact"].items():
                totals[k] = totals.get(k, 0) + v
    print(
        f"\nTOTAL: crit {totals['critical']} / serious {totals['serious']} / "
        f"mod {totals['moderate']} / minor {totals['minor']}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
