#!/usr/bin/env python3
"""Generate 3 visual reference images via codesonline.dev image relay (OpenAI compatible)."""
from __future__ import annotations
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

BASE_URL = "https://image.codesonline.dev/v1"
MODEL = "gpt-image-2"
OUT_DIR = Path(r"D:/projects/tourism-landing/docs/visual-references")
OUT_DIR.mkdir(parents=True, exist_ok=True)

PROMPTS: list[tuple[str, str]] = [
    (
        "A_editorial_magazine_cover",
        (
            "Editorial cinematic travel magazine cover for a premium China travel concierge brand. "
            "One dramatic real-photo hero of misty Zhangjiajie sandstone peaks at golden hour, "
            "deep atmospheric mood, layered fog, photographic depth. Magazine-style typography, "
            "elegant editorial serif headline integrated into the photo, small offset destination "
            "captions for Guilin, Jiuzhaigou, Yunnan as travel-board annotations. "
            "Dark cinematic palette: charcoal blue, mist gray, alpine blue, soft ivory text. "
            "No SaaS card UI, no shadcn components, no cinnabar red, no parchment beige, no badges, "
            "no map widget. Strong asymmetric composition, magazine cover energy, immersive and "
            "premium. 16:9 widescreen."
        ),
    ),
    (
        "B_destination_discovery_collage",
        (
            "Cinematic China destination discovery board for a high-end custom-trip planner. "
            "Asymmetric editorial photo collage like a curated travel-board: one large dominant "
            "real photograph (karst river landscape of Guilin in mist), 3 smaller real-photo tiles "
            "of Zhangjiajie peaks, Jiuzhaigou alpine lakes, Yunnan old town with local life. "
            "Thin elegant route line connects the destinations, faint China outline contour "
            "in the background, small coordinate / airport-code style notations. "
            "Dark atmospheric backdrop, deep blue-green and slate, soft ivory text. "
            "No dashboard widget, no dotted markers, no circular photo bubbles, no shadcn cards, "
            "no badge grid. Layout feels like a magazine spread, not a SaaS landing page. 16:9."
        ),
    ),
    (
        "C_immersive_china_landscape",
        (
            "Immersive cinematic Chinese natural landscape hero photograph as the dominant visual "
            "anchor for a premium travel brand. Single epic scene: Jiuzhaigou turquoise alpine "
            "lake at dawn with low fog, distant snow peaks, dense forest reflection, real photo "
            "realism, atmospheric haze, golden cinematic light. Tiny editorial caption tag in "
            "lower corner with subtle bilingual annotation. Mood: National Geographic / Conde "
            "Nast Traveller cover. Deep nature palette: forest green, glacier blue, dark slate, "
            "warm sunlight accents. No UI cards, no buttons, no badges, no traditional Chinese "
            "ink-and-gold motifs, no parchment, no map widget, no AI poster look. 16:9 widescreen."
        ),
    ),
]


def gen_one(name: str, prompt: str, api_key: str) -> dict[str, Any]:
    body = json.dumps({
        "model": MODEL,
        "prompt": prompt,
        "n": 1,
        "size": "16:9",
        "quality": "high",
        "style": "natural",
        "background": "opaque",
        "response_format": "url",
    }).encode("utf-8")
    req = urllib.request.Request(
        f"{BASE_URL}/images/generations",
        data=body,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            payload = json.loads(resp.read().decode("utf-8", errors="replace"))
    except urllib.error.HTTPError as e:
        return {"name": name, "ok": False, "status": e.code, "error": e.read().decode("utf-8", errors="replace")[:600]}
    except Exception as e:  # noqa: BLE001
        return {"name": name, "ok": False, "status": None, "error": f"{type(e).__name__}: {e}"}

    item = (payload.get("data") or [{}])[0]
    url = item.get("url")
    b64 = item.get("b64_json")
    out_path = OUT_DIR / f"{name}.png"
    if url:
        try:
            with urllib.request.urlopen(url, timeout=300) as r2:
                out_path.write_bytes(r2.read())
        except Exception as e:  # noqa: BLE001
            return {"name": name, "ok": False, "status": "download_failed", "error": str(e), "url": url}
    elif b64:
        import base64
        out_path.write_bytes(base64.b64decode(b64))
    else:
        return {"name": name, "ok": False, "status": "no_image", "error": json.dumps(payload)[:600]}

    return {"name": name, "ok": True, "path": str(out_path), "size_bytes": out_path.stat().st_size}


def main() -> int:
    api_key = os.environ.get("CODESONLINE_IMAGE_API_KEY") or os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print(json.dumps({"ok": False, "error": "no_api_key"}))
        return 2
    results = []
    for name, prompt in PROMPTS:
        results.append(gen_one(name, prompt, api_key))
    print(json.dumps({"results": results}, ensure_ascii=False, indent=2))
    return 0 if all(r.get("ok") for r in results) else 1


if __name__ == "__main__":
    sys.exit(main())
