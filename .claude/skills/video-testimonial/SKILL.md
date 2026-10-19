---
name: video-testimonial
description: >
  Use to turn a raw or curated client testimonial clip into a site-ready video asset: optionally
  cut the segment that lands (`mediatool clip`), brand it with a lower-third naming the owner and
  business (`mediatool caption`), compress it for the web (`mediatool compress`), and extract a
  poster frame so nothing loads as a black box (`mediatool poster`). Also covers stitching several
  clips into a short montage (`mediatool stitch`) and a social-clip GIF (`mediatool gif`). Only
  real, permission-secured footage; the edit never changes what a quote means; a poster frame every
  time; no autoplay-with-sound at placement. Auto-fires on "cut this testimonial", "add the
  lower-third", "brand the client video", "compress the clip for the site", "poster frame", "make a
  testimonial montage", "stitch the client clips".
---

# /video-testimonial: turn a raw clip into a site-ready testimonial

A phone-shot testimonial is proof a headline can never be: a real customer, on camera, saying the
win in their own words. This skill turns that raw clip into an asset the site can drop in, on-brand
and light enough to load fast. The engine is `tools/mediatool.py` (ffmpeg); it always writes a new
file, never touches the source. Transcription, when you need to find the segment or confirm the
exact words, is `tools/transcribe.py` (Groq Whisper).

## Canonical grounding (read first)
- `tools/mediatool.py` — the command contract: `clip`, `caption`, `compress`, `poster`, `stitch`,
  `gif`, `probe`. The lower-third reads its accent colour from `palette` in `brand.config.json`
  (falls back to a neutral blue with no config).
- `tools/transcribe.py` — Groq Whisper, to locate the exact segment or verify a quote is unaltered.
  Needs `GROQ_API_KEY` (see `docs/API-KEYS.md`); stops and says so if it's missing, never guesses
  at what was said.
- Wherever this project keeps testimonials and their permission status — a case-study file, a
  reviews doc, a CRM note. If there's no single canonical place yet, ask where permission is
  tracked before shipping a name.
- `docs/BRAND-TRUTHS.md` (real proof and real permission only, never fabricate or reshape a quote)
  and `docs/BRAND-DIRECTION.md` (the accent colour and treatment the lower-third should carry).

## When to invoke
- "Cut this testimonial down to the [result] line."
- "Add the lower-third with the name and business."
- "Compress this clip for the site."
- "Grab a poster frame."
- "Stitch these client clips into a short montage."

## Inputs (extract from the prompt, do not ask unless truly missing)
1. **Source clip(s)**: the raw or curated file.
2. **Owner name and business**: confirm permission is secured before it goes on the lower-third. If
   a name isn't yet cleared, it stays off the lower-third until it is — flag it, don't guess.
3. **Segment** (optional): the start and end of the part that lands. Transcribe first if you need
   to find it.
4. **Placement width**: the delivery size (a card clip is smaller than a hero).

## Step 1: Find the segment (transcribe if needed)
```bash
python3 tools/transcribe.py path/to/raw.mp4 --out transcript.txt --verbose
```
`--verbose` prints timestamped segments so you can read off an exact `--start`/`--end` for the next
step. Read the transcript, pick the segment where the customer says the win cleanly. **Never move
words around to build a sentence they didn't say.**

## Step 2: Clip the segment (optional)
```bash
python3 tools/mediatool.py clip raw.mp4 clipped.mp4 --start 00:00:14 --end 00:00:27
```
`--dur` also works (a length from `--start` instead of an absolute end point). Keep the sentence
whole — a cut that lops off the qualifier and changes the meaning is a lie, even if every word in
it is real.

## Step 3: Add the lower-third
```bash
python3 tools/mediatool.py caption clipped.mp4 captioned.mp4 --name "Keith" --business "The Business Name"
```
Renders a dark scrim with an accent bar and the name/business text, sized to the video's own
resolution. Reads the accent colour from `palette` in `brand.config.json`; pass `--accent
"#RRGGBB"` to override. Name and business come from wherever this project tracks permission,
verbatim — a name that isn't cleared yet waits.

## Step 4: Compress for the web
```bash
python3 tools/mediatool.py compress captioned.mp4 final.mp4 --width 1280 --crf 24
```
Scales down only (never up), re-encodes at a web CRF, and sets `+faststart` so it streams. Keep it
small — a testimonial shouldn't be a multi-MB drag on the page.

## Step 5: Extract a poster frame (always)
```bash
python3 tools/mediatool.py poster final.mp4 poster.jpg --at 00:00:02
```
Every video asset ships with a poster so it never loads as a black rectangle and never causes
layout shift. Pick a frame where the subject looks present, not mid-blink.

## Step 6 (optional): Build a montage
```bash
python3 tools/mediatool.py stitch montage.mp4 --clips keith.mp4 jay.mp4 sam.mp4
```
Normalizes each clip's scale/fps/audio rate before concatenating. Caption per-segment first if
each clip needs its own lower-third, then stitch, compress, and poster the montage as above.

## Step 7 (optional): A social clip
```bash
python3 tools/mediatool.py gif final.mp4 clip.gif --start 00:00:00 --dur 3 --width 480
```
A short, muted GIF cut for a share card or a social post — not a substitute for the real video.

## Step 8: Upload and verify
Upload the mp4 and the poster to `assets.cdnDomain` (or wherever this project serves media) at a
fresh, versioned path — never overwrite a live key. Confirm both URLs resolve, then hand the
placement to Cortex with the poster wired as the `poster` attribute and autoplay-with-sound off.

## Output
1. A site-ready testimonial mp4 (segment cut if needed, lower-third, web-compressed) at a versioned
   CDN path.
2. A poster frame image at a versioned CDN path, wired as the video `poster`.
3. Optionally a montage mp4 (with its own poster) or a social GIF.
4. The record: source clip, the segment used, the transcript line proving the quote is unaltered,
   the CDN paths.

## Guardrails
- **Real, permission-secured footage only.** Never a stock actor, never a reenactment, never a clip
  whose subject hasn't cleared attribution. An unconfirmed name stays off the lower-third.
- **Never change what a quote means.** Cut for length, never for spin. Don't splice two moments
  into a sentence the subject never said. Verify against the transcript.
- **Poster frame every time.** No video ships without one — that's what prevents the black box and
  the layout shift.
- **No autoplay with sound.** At placement, the asset is muted-or-click-to-play.
- **One accent moment.** The lower-third's accent bar is the accent in the frame — don't add a
  competing one elsewhere in the same asset.
- **CDN discipline.** Lean mp4, fresh versioned paths, confirm the URLs resolve, never overwrite a
  live key.
- No em dashes or en dashes in the lower-third text, a caption, or the record.

## Boundaries
This skill owns the clip-to-asset pipeline. `/proof-card` owns still proof cards, not video. Cortex
wires the video and poster into a component with autoplay off and the box reserved. Placing the
clip inside a full proof block next to a screenshot card is `/wire-proof`. A flagged, unconfirmed
name needs the project owner's sign-off before it ships.
