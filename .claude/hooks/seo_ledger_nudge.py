#!/usr/bin/env python3
"""SEO ledger nudge (PostToolUse hook, never blocks).

If an edit touches an SEO surface (meta, canonical, JSON-LD, H1, robots,
sitemap, internal links), remind the model to write a ledger row. Always exit 0.

Why a nudge and not a block: the ledger row belongs at the end of the change,
not in the middle of it. Blocking mid-edit would force a row before the change
is even finished. The nudge is a reminder with a deadline of "before you
finish", which is when it can actually be written honestly.
"""
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from _pack_config import load, in_scope, rel_posix  # noqa: E402

SURFACE_PATTERNS = [
    (r"rel=[\"']canonical|og:url|og:title|og:image|twitter:card|"
     r"name:\s*[\"']description|<meta\b", "meta, canonical or OG"),
    (r"application/ld\+json|@context|@graph|schema\.org", "JSON-LD schema"),
    (r"<h1|faqPage\(|breadcrumb\(|BreadcrumbList", "H1, FAQ or breadcrumb"),
    (r"noindex|nofollow|x-robots", "indexing directive"),
]

# Files that are an SEO surface whatever is inside them.
SURFACE_FILES = re.compile(
    r"robots\.txt|sitemap|llms\.txt|(^|/)seo\.[a-z]+$|site-?config\.[a-z]+$|_headers|_redirects",
    re.I)

READABLE = {".tsx", ".ts", ".jsx", ".js", ".mjs", ".vue", ".svelte", ".astro",
            ".html", ".txt", ".xml", ".json"}


def main() -> int:
    try:
        payload = json.loads(sys.stdin.buffer.read().decode("utf-8-sig"))
    except Exception:
        return 0
    fp = (payload.get("tool_input") or {}).get("file_path") or ""
    if not fp:
        return 0
    p = Path(fp)
    cfg = load()
    ledger = cfg.get("ledgerFile") or "_agency-internal/seo/CHANGE-LOG.md"

    rel = rel_posix(p, cfg["_root"]) or ""
    # Never nudge about editing the ledger itself, or anything alongside it.
    if rel.startswith(str(Path(ledger).parent).replace("\\", "/")):
        return 0

    hits = []
    if SURFACE_FILES.search(rel or p.name):
        hits.append("SEO-critical file")
    elif in_scope(p, cfg) and p.suffix.lower() in READABLE:
        try:
            text = p.read_text(encoding="utf-8", errors="replace")
        except Exception:
            text = ""
        for pattern, label in SURFACE_PATTERNS:
            if re.search(pattern, text, re.I):
                hits.append(label)

    if not hits:
        return 0

    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PostToolUse",
            "additionalContext": (
                "SEO surface touched (" + ", ".join(sorted(set(hits))) + "). "
                f"If this change alters meta, canonicals, schema, H1s, internal links, "
                f"robots or the sitemap, add a row to {ledger} before you finish: "
                "what changed, why, the hypothesis, and the date to measure on. "
                "A change with no row is a change nobody can explain in three months."
            ),
        }
    }))
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        sys.exit(0)
