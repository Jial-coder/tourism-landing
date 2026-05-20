#!/usr/bin/env python3
"""Generate 8 documentary-style mood-only references for tourism-landing v3.5."""
from __future__ import annotations
import base64
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

BASE_URL = "https://image.codesonline.dev/v1"
MODEL = "gpt-image-2"
OUT_DIR = Path(r"D:/projects/tourism-landing/docs/visual-references/mood-only")
OUT_DIR.mkdir(parents=True, exist_ok=True)

SHARED_REALISM = (
    "Documentary travel photography, captured on a full-frame DSLR with a 35mm or 50mm prime lens, "
    "shallow depth-of-field where appropriate, natural daylight with no artificial gloss, true color, "
    "subtle film-like grain, slight imperfection, mild atmospheric haze, realistic shadows, no over-saturation, "
    "no HDR halo, no over-sharpening, no watermark, no text, no captions, no logo, no UI elements, "
    "no painterly look, no AI poster aesthetic, no perfect symmetry, no fake smiling stock tourists, "
    "no stylized illustration, no oversaturated tropical postcard look, no over-stylized Chinese ink motifs. "
    "Composition feels candid and journalistic, like a real on-location travel editorial spread."
)

PROMPTS: list[tuple[str, str]] = [
    (
        "destinations/01_zhangjiajie_mist_peaks",
        "Zhangjiajie Wulingyuan quartzite sandstone pillars rising through low morning fog, "
        "soft cool dawn light, layers of forested ridges, atmospheric depth, telephoto compression, "
        "no people in frame, horizontal 16:9 framing for a hero photograph. " + SHARED_REALISM,
    ),
    (
        "destinations/02_guilin_li_river_dawn",
        "Guilin Li River karst limestone landscape at dawn, low river fog, a single bamboo raft "
        "as a tiny human-scale element, soft pastel sky, calm water reflection, faint distant peaks, "
        "horizontal 16:9 cinematic framing. " + SHARED_REALISM,
    ),
    (
        "destinations/03_jiuzhaigou_turquoise_lake",
        "Jiuzhaigou turquoise alpine lake near sunrise, calm clear water with submerged tree trunks, "
        "autumn forest reflection, distant mist on the slopes, real natural color of glacial water, "
        "no cartoon saturation, horizontal 16:9 framing suitable for a hero or destination tile. "
        + SHARED_REALISM,
    ),
    (
        "destinations/04_yunnan_old_town_life",
        "Yunnan Lijiang or Dali old town early morning, narrow stone street, low golden light, "
        "an elderly local sweeping or carrying produce, distant mountains visible at street end, "
        "warm but real lighting, no exaggerated lanterns, no theme-park feel, horizontal 16:9. "
        + SHARED_REALISM,
    ),
    (
        "service/05_local_advisor_planning",
        "A local Chinese travel advisor sitting at a small wooden desk, viewed from behind or "
        "from a low side angle, hands annotating a paper map of China and a printed itinerary, "
        "laptop open with a generic map, soft indoor daylight from a window, a cup of tea on the desk, "
        "no faces visible, hands and shoulders only, candid moment, 16:9 horizontal. " + SHARED_REALISM,
    ),
    (
        "service/06_concierge_itinerary_note",
        "Top-down still life of an open paper travel notebook with handwritten English notes, a small "
        "printed China route map, a vintage compass, a pair of reading glasses, an unfolded plane "
        "boarding pass, on a deep slate blue desk with soft north-window light, calm composition, "
        "no readable text or logos, 16:9 horizontal. " + SHARED_REALISM,
    ),
    (
        "background/07_misty_mountain_atmosphere",
        "Atmospheric wide landscape backdrop of layered Chinese mountain ridges fading into fog, "
        "deep blue-green to charcoal slate gradient, very low contrast subject, a lot of negative "
        "sky for headline overlay, almost minimalist, calm cinematic mood, 16:9 horizontal. "
        + SHARED_REALISM,
    ),
    (
        "background/08_film_grain_overlay_texture",
        "Subtle dark photographic texture: deep charcoal blue field with very faint cool-toned "
        "film grain, a soft natural light leak in one corner, no patterns, no shapes, no text, "
        "intended as a background overlay layer for hero typography. 16:9 horizontal. "
        + SHARED_REALISM,
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
        return {"name": name, "ok": False, "status": e.code, "error": e.read().decode("utf-8", errors="replace")[:500]}
    except Exception as e:  # noqa: BLE001
        return {"name": name, "ok": False, "status": None, "error": f"{type(e).__name__}: {e}"}

    item = (payload.get("data") or [{}])[0]
    url = item.get("url")
    b64 = item.get("b64_json")
    out_path = OUT_DIR / f"{name}.png"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    if url:
        try:
            with urllib.request.urlopen(url, timeout=300) as r2:
                out_path.write_bytes(r2.read())
        except Exception as e:  # noqa: BLE001
            return {"name": name, "ok": False, "status": "download_failed", "error": str(e), "url": url}
    elif b64:
        out_path.write_bytes(base64.b64decode(b64))
    else:
        return {"name": name, "ok": False, "status": "no_image", "error": json.dumps(payload)[:500]}

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
