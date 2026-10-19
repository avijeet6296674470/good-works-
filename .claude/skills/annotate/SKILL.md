---
name: annotate
description: Use to annotate a real client dashboard or results screenshot so the eye lands on THE one metric that proves the win: one accent highlight around the number, a mono label naming it (for example "7X ROAS"), an optional arrow, and PII redacted FIRST. Runs via tools/imgtool.py annotate and imgtool redact. Enforces the truth rules: redact any client PII (names, emails, account IDs, phone numbers, spend figures withheld by the case study) before the asset ever leaves the working folder, exactly one accent highlight per asset (the accent is the payoff, never decoration), and never annotate a number that is not in the case study as a real, sourced figure. Auto-fires on "annotate the dashboard", "highlight the ROAS", "point to the number", "call out the metric", "redact the PII on this screenshot", "mark up the results screenshot".
---

# /annotate: Mark the one metric, redact the PII

A raw dashboard buries the proof under twenty numbers. Annotate does one thing well: it makes the buyer's eye land on the single figure that carries the case study, and it scrubs anything private before the picture can be seen. The engine is `tools/imgtool.py`, which writes a new file and never touches the source. The rule of restraint is the whole game: one accent mark, one true number.

## Canonical grounding (read first)
- `tools/imgtool.py` (the `annotate` mark grammar and the `redact` command, in the docstring).
- `docs/BRAND-TRUTHS.md` and `truth.forbiddenClaims` (never fabricate a stat or a result; no fake dashboards; redact client PII; the accent is the impact moment, never a background field).
- `docs/BRAND-DIRECTION.md` (the accent is the payoff, used only at the payoff; labels and stats are the mono face from `type.mono`; restraint makes the punch land).
- The client's `proof/case-studies/<slug>.md` (the ONLY source for the number you are allowed to highlight; figures are tagged `[REAL]`, and some are withheld as `[confirm publishable]`).

## When to invoke
- "Highlight the 7X ROAS on this dashboard."
- "Call out the booking growth on the screenshot."
- "Redact the account name and email before we use this."
- "Point an arrow at the number."
- Any markup of a real results screenshot before it becomes a proof card.

## Inputs (extract from the prompt, do not ask unless truly missing)
1. **Source screenshot**: the real dashboard or results capture (already cropped, ideally, via `/crop`).
2. **The metric**: the exact figure and label, pulled from `proof/case-studies/<slug>.md`. If the number is not in the case study as a `[REAL]` figure, STOP and ask.
3. **PII to redact**: any client name, email, account ID, phone number, address, or a spend figure the case study withholds (`[confirm publishable]`).
4. **Region coordinates**: from `imgtool probe` (run `/crop`'s probe step, or probe here first).

## Step 1: Probe, then redact PII FIRST (before anything else)

Get the coordinate space, then scrub every private region BEFORE adding any highlight. Redaction is step one so a private value is never present in an intermediate file someone could grab:

```bash
python3 tools/imgtool.py probe screenshot.png     # get WxH

# Blur (default) or black-box (--solid) each PII region
python3 tools/imgtool.py redact screenshot.png redacted.png --rect 40,24,360,40
python3 tools/imgtool.py redact redacted.png redacted.png --rect 40,900,300,32 --solid
```

Redact: account names and IDs, logged-in email, phone, address, and any raw spend or revenue figure the case study marks as withheld. When in doubt, redact. A leaked client detail is a trust failure and possibly a permission breach.

## Step 2: Highlight the ONE metric (the accent)

Exactly one accent highlight per asset. Use the `annotate` mark grammar (fields `;`-separated, coordinate values `,`-separated). The label is the real number from the case study:

```bash
python3 tools/imgtool.py annotate redacted.png annotated.png \
  --mark "type=highlight;rect=120,340,560,220;label=7X ROAS"
```

`highlight` draws an accent fill plus an accent outline and a mono label chip (the tool pulls the accent token and the mono font automatically). Keep the label short and mono-clean: `7X ROAS`, `197 to 440 BOOKINGS`, `+45.6% YoY`.

## Step 3: Optional arrow (only if the highlight alone is not enough)

If the metric sits in a busy panel and the highlight needs a pointer, add one arrow. Never more than one, and never a second accent element competing:

```bash
python3 tools/imgtool.py annotate annotated.png annotated.png \
  --mark "type=arrow;from=700,300;to=560,420"
```

## Step 4: Verify

Read the output image. Confirm: every PII region is gone, exactly one accent highlight is present, the label matches the case study figure verbatim, and no second accent element is competing.

## Inputs
- The real screenshot (cropped) and its `WxH`.
- The exact metric and label from `proof/case-studies/<slug>.md` (a `[REAL]` figure).
- The list of PII regions to redact.

## Output
1. The annotated screenshot: PII redacted, one accent highlight on the key metric with a mono label, an optional single arrow. Written to a new working file.
2. A one-line note: the source case study, the exact figure highlighted, and every region redacted (for the sign-off trail).

## Guardrails
- **Redact first, always.** PII is scrubbed before any highlight is drawn, so no intermediate file ever carries a private value.
- **One accent highlight per asset.** The accent is the payoff, never decoration. A second accent mark, or the accent used to point at two numbers, is a defect.
- **Never annotate a fabricated number.** The label is a verbatim `[REAL]` figure from the case study. If the number is not sourced there, STOP and ask. No estimates, no rounding up, no invented squiggle.
- **Never highlight a withheld figure.** Raw spend or revenue tagged `[confirm publishable]` is redacted, not highlighted, until the project owner signs off.
- **Source is sacred.** imgtool writes a new file; never overwrite the raw screenshot.
- **No em dashes or en dashes** in any label, arrow note, or record. Use commas, periods, colons, parentheses.

## Boundaries
This skill owns the markup. Cropping to the region first is `/crop`. Wrapping the annotated shot in browser or card chrome and hosting it is `/proof-card`. Confirming a `[confirm]` owner name or a `[confirm publishable]` figure is cleared for publish is a sign-off from the project owner, not this skill's job. Annotate hands a clean, honestly-marked screenshot to whichever step runs next.
