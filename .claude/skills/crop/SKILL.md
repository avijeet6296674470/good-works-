---
name: crop
description: Use to crop a real proof image (a client dashboard, a results screenshot, an owner headshot, a site capture) down to the region that matters, or to a consistent portrait or aspect for a proof stack or a card grid. Runs via tools/imgtool.py: probe the source dimensions first, then crop by explicit region (--rect or --box), or to a locked aspect (--aspect with a gravity). Keeps every owner portrait on one shared aspect so a row of faces lines up, and never stretches or squashes the picture. Auto-fires on "crop this screenshot", "trim the dashboard to the number", "make these headshots match", "cut out the metric", "square this photo", "portrait crop", any request to reframe a proof asset before it is annotated, framed, or placed.
---

# /crop: Reframe a proof image to the region or aspect that matters

The first move on almost any raw proof asset. A dashboard export is 90% chrome and empty panels; an owner photo arrives at whatever ratio the phone shot it. Crop pulls the eye to the one region that carries the proof, or locks a set of portraits to a single shared aspect so a proof row reads as one system. The engine is `tools/imgtool.py` (Pillow), which always writes a new file and never overwrites the source.

## Canonical grounding (read first)
- `tools/imgtool.py` (the docstring is the command contract: `crop`, `probe`, coordinate rules).
- `docs/BRAND-TRUTHS.md` and `truth.forbiddenClaims` (no fake or doctored dashboards, real proof only, images sized and served from R2).
- `docs/BRAND-DIRECTION.md` (refined-premium, generous space, consistent rhythm; a portrait row reads as one system only if every face shares an aspect).
- `proof/case-studies/INDEX.md` and the `proof/` tree (where the raw dashboards, owner photos, and site captures live).

## When to invoke
- "Crop this dashboard down to the ROAS number."
- "Trim the empty panels off the export."
- "Make these owner headshots all the same shape."
- "Square this photo" / "portrait crop the founder shot."
- Any reframe of a raw proof asset before `/annotate` or placement in a stack.

## Inputs (extract from the prompt, do not ask unless truly missing)
1. **Source file**: the raw image path under `proof/` (a dashboard, screenshot, owner photo, or site capture).
2. **Intent**: crop to a specific region (isolate the metric) OR normalize to a shared aspect (a portrait set, a card grid).
3. **Target aspect** (only for normalize): the locked ratio for this set. If a set already exists, match its aspect; do not introduce a second one.
4. **Output path**: where the cropped file lands (a working path, not a live R2 key).

## Step 1: Probe the source dimensions (always first)

Never guess pixel coordinates. Read the real size:

```bash
python3 tools/imgtool.py probe proof/notion-reports/<client-slug>/images/image-00.png
```

The printed `WxH` is the coordinate space for every `--rect`, `--box`, and gravity that follows. Coordinates are pixels on the source image, origin at the top left.

## Step 2: Crop

**Isolate a region** (a metric, a panel, a chart). Use `--rect X,Y,W,H` (top-left corner plus width and height) or `--box L,T,R,B` (left, top, right, bottom edges):

```bash
# Pull the one real metric tile out of the dashboard
python3 tools/imgtool.py crop IN.png OUT.png --rect 120,340,560,220
```

**Normalize to a consistent aspect** (a portrait set, a card grid). Use `--aspect W:H` with a `--gravity` so the crop keeps the important part of the frame:

```bash
# Lock an owner headshot to a 4:5 portrait, keep the face (top-biased)
python3 tools/imgtool.py crop proof/client-owners/<owner-name>.jpg OUT.jpg --aspect 4:5 --gravity top
```

Gravity options: `center` (default), `top`, `bottom`, `left`, `right`. For faces, `top` or `center` keeps the head in frame; never let a chin get cut.

## Step 3: Verify

Probe the output and confirm the aspect and framing:

```bash
python3 tools/imgtool.py probe OUT.jpg
```

For a portrait set, probe every output and confirm the `WxH` ratios match to the pixel. One odd portrait breaks the row.

## Inputs
- The raw proof file(s) under `proof/`.
- The intent (isolate a region, or normalize a set to one aspect) and the target aspect for a set.
- The working output path(s).

## Output
1. The cropped image(s), written to a new working path (source untouched).
2. For a set: every file on one shared aspect, verified by probe.
3. A one-line note of what region or aspect was chosen, so the next step (annotate, frame, place) knows the coordinate space.

## Guardrails
- **Never distort.** `--aspect` crops to the ratio; it never squashes or stretches. If the requested region is a different shape than the source, crop, do not scale to fit.
- **One aspect per set.** Every owner portrait in a row, every card in a grid, shares one locked ratio. A second aspect in the same set is a defect.
- **Never crop a face out of frame.** Use gravity to keep the head; a cut chin or forehead fails.
- **Source is sacred.** imgtool writes a new file; never overwrite the raw proof.
- **Real proof only.** Crop the picture, never invent one. This skill reframes real client assets; it does not fabricate a dashboard or a face.
- **No em dashes or en dashes** in any note, label, or caption. Use commas, periods, colons, parentheses.

## Boundaries
This skill owns the crop. Highlighting the metric and redacting PII is `/annotate`. Framing (browser or card chrome) and the final hosted resize is `/proof-card`. Verifying the right locked brand family is on a surface is Vigil's `/brand-asset-integrity`. Crop hands a clean, correctly-framed region to whichever of those runs next.
