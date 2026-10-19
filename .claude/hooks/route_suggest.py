#!/usr/bin/env python3
"""Prompt router (UserPromptSubmit hook, Windows and POSIX).

Matches the prompt against keyword patterns and adds skill suggestions to
context. It only ADDS context: never blocks, never edits, prints nothing when
nothing matches. Fails open.

Two things it does beyond suggesting a skill:

1. It restates the project's own laws on every matched prompt, assembled from
   brand.config.json. Rules that are only in a document get forgotten; rules
   that arrive with the prompt do not.
2. It nags for /init-brand when there is no config, because every other failure
   downstream of a missing config is confusing rather than obvious.
"""
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from _pack_config import load, brand  # noqa: E402

MAX_SUGGESTIONS = 3

# (pattern, suggestion). Matched against the lowercased prompt, first wins.
# Nothing here names a brand, a market or a framework.
RULES = [
    (r"(init|set ?up|onboard|configure|start).{0,25}(brand|project|pack|client|site)|new project|brand config",
     "/init-brand - the interview that stands the pack up: writes brand.config.json, the governance docs, the ledger and the hook wiring"),
    (r"(build|create|ship|start|make|add).{0,30}(page|route)|new ([a-z-]+ )?page|page (for|from scratch)",
     "/page-build - full new-page orchestration: flow, SEO slots, copy, assembly map, design, code, asset check, responsive, pre-ship gate"),
    (r"(build|add|create|make|fix|update|wire|style).{0,30}(component|section|widget|strip|pill|badge|tab|bar|banner|card|hero|element|cta|form)|(overlap|z.?index|sticky|not (showing|coming back|working)|hidden behind|blank space)",
     "/component-build - the default for one surface: design spec, code, responsive check. Assemble from existing blocks, do not reinvent."),
    (r"ship.?ready|ready to ship|final pass|pre.?ship|production check|launch check",
     "/ship-ready - the final gate. Five invariants, runtime proof, ledger row."),
    (r"\b(polish (this|the) page|less ai.?generated|this page feels off|tighten up this page|more scannable|feels like a template)\b",
     "/polish-page - diagnose an already-built page against the anti-slop checklist and fix it, structure first"),
    (r"\b(security headers?|\bcsp\b|content security policy|securityheaders\.com|add hsts)\b",
     "/security-headers - CSP and security headers, rolled out Report-Only then enforced"),
    (r"\b(privacy policy|terms of (use|service)|cookie policy|consent gate copy|legal (fact|page)s?)\b",
     "/policy-pages - keep the privacy/terms/cookie pages honest and in sync with what the site actually does"),
    (r"\b(apply these changes|make these tweaks|batch of (corrections|tweaks|changes)|change .{0,20} to .{0,20} on (the|this) page)\b",
     "/rapid-execute - apply a dictated change list fast, without skipping verification"),
    (r"\b(which angle|winning angle|pick the headline stat|case stud(y|ies) repeat|lead with (which|this) (number|stat))\b",
     "/pick-winning-angle - score candidate angles and check the whole set of case studies for redundancy"),
    (r"(rewrite|audit|update|polish|shorten|fix|improve|cut).{0,20}(copy|text|wording|headline|cta|alt)|copy.*(off|too long|wordy|generic)",
     "/copy-pass - rewrite in the brand voice, then slot-check and lint against the banned-words file"),
    (r"seo (audit|check|pass)|meta (title|desc)|h1.*check|anchor.{0,20}text|keyword|internal link.*(audit|check)",
     "/seo-audit - headings, meta, alt, anchors, internal links, and which schema the page carries"),
    (r"schema (check|valid|audit)|json.?ld|structured.?data|rich result|\bgeo\b|\baeo\b|llms\.?txt|entity graph",
     "/schema-audit - JSON-LD completeness, the entity @id graph, rich-result and answer-engine validity"),
    (r"(responsive|mobile|tablet|viewport|overflow|touch target).*(audit|check|fix|pass|broken|issue)|horizontal scroll|fits on mobile|\b\d{3,4}px\b",
     "/responsive-pass - overflow kill, touch targets, spacing rhythm at the project's primary device width"),
    (r"(performance|lighthouse|lcp|cls|inp|bundle size|page speed|core web vitals|web.?vitals|caching|load (time|speed)|slow|ttfb)",
     "/performance-pass - Core Web Vitals, cacheability, image and font loading, against the project's network budget"),
    (r"(extract|consolidate|portable|reusable|dedupe).*(css|component|primitive)|make.*reusable|stop.*reimplement",
     "/css-portable-extract - promote a repeated pattern into a token, a utility, or a shared component"),
    (r"\b(soft.?404|crawl(ing)?|invisible to google|thin content|error (page|shell)|200 but broken|render integrity|site scan|scan (the )?(whole )?site)\b",
     "/crawl-integrity - full-site scan for soft 404s, error shells, uncacheable pages, content invisible without JavaScript"),
    (r"\b(migrat(e|ion)|301|redirect map|replatform|relaunch|domain change|url change)\b",
     "/migration-audit - redirect mapping, parity checks and index safety before a launch or replatform"),
    (r"\b(wrong (asset|image)|right asset|brand asset|asset (audit|integrity|discrepan)|logo used|mark used|which image|favicon|og image)\b",
     "/brand-asset-integrity - verify the correct locked asset, in the correct variant, on every surface. Read pixels, never trust a filename."),
    (r"\b(what can we quote|curate the claims|is this figure safe|safe to publish|activate this case study|redact.{0,15}(spend|revenue|figure))\b",
     "/curate-claims - turn a raw report into approved, intel-safe claims with a public/internal split"),
    (r"\b(proof card|results card|dashboard.{0,15}(site asset|screenshot)|browser.?frame this|frame this (screenshot|dashboard))\b",
     "/proof-card - crop, redact, annotate and frame a real screenshot into a site-ready proof card"),
    (r"\b(wire (up |the )?proof|proof (actually used|audit|stack)|case studies on the site|assemble the proof)\b",
     "/wire-proof - map real case studies and proof cards onto the pages that need them, and verify they're actually placed"),
    (r"\b(tracking|analytics|ga4|gtm|pixel|datalayer|data layer|consent (mode|banner)|utm|attribution|conversion (api|tracking))\b",
     "/tracking-setup - the container, the event taxonomy from the vertical overlay, consent, and attribution"),
    (r"(^|[.!?] )(lock (this|it) in|that.{0,10}(is |.s )?(done|great|good|locked|finaliz)|commit this|wrap up|session done|done for (today|now|the day)|save (this|progress)|update (the )?(log|session.?log))",
     "/session-close - log the session, mark tasks complete, save what was locked"),
    (r"(client (feedback|notes)|process.{0,20}feedback|triage|go through.{0,20}feedback|what.{0,20}s next.{0,20}feedback)",
     "/feedback-triage - classify P0/P1/P2, cross-reference build status, create tasks, output a prioritised table"),
    (r"\b(hero image|generate (an? )?image|make (an? )?(image|graphic|illustration|banner|cover)|brand image|floating cutout)\b",
     "/brand-image - the creative panel: direction, concept, capture and finish layers fused into one prompt, executed via ImageRouter, then verified"),
    (r"\b(og image|social (preview|card)|share card|twitter card|link preview.{0,15}(broken|blank|wrong|missing))\b",
     "/social-card - the dynamic, on-brand share card every page shows when linked, generated server-side, never a blank fallback"),
    (r"\b(cut (this |the )?testimonial|lower.?third|caption (this|the) (clip|video)|compress (this |the )?(clip|video)|poster frame|testimonial montage|stitch (the )?clips)\b",
     "/video-testimonial - turn a raw client clip into a captioned, compressed, poster-framed site-ready asset"),
    (r"\b(lead magnet|gated pdf|guide download|one.?sheet download|content upgrade|make a downloadable)\b",
     "/lead-magnet - a gated lead-magnet PDF end to end: offer and gate, PDF, capture route, tracked event"),
    (r"\b(humani[sz]e|sound(s)? (like )?ai|ai.?written|ai.?sounding|reads like (a bot|ai)|less robotic|more human|ai detect|ai tells)\b",
     "/humanize - rewrite to a real human register: banned vocabulary, no dashes, burstiness, concrete detail"),
    (r"\b(ai.?check|is this ai|score this text|what gives (this|it) away|forensic.{0,15}(read|breakdown))\b",
     "/ai-check - forensic scoring of machine-writing tells, per signal"),
    (r"\b(verify (the )?(claim|finding|number|stat)|is this (true|real|accurate)|bullshit|fact.?check|prove (this|it)|unverified)\b",
     "/bullshit-detector - the adversarial pass every claim and metric must survive before a client sees it"),
    (r"\b(write (the |a )?(blog|post|article)|blog post|draft the article|publish.?ready post)\b",
     "/blog-write - brief, draft, humanise, SEO slots, images, publish-ready package"),
    (r"\b(content brief|blog brief|writer.?ready brief|what should we blog|next [0-9]+ posts|blog topics)\b",
     "/content-briefs - mine search data, classify new versus refresh, emit writer-ready briefs"),
    (r"\b(content (decay|refresh)|refresh (this|the) page|stale (content|page)|losing (organic )?(traffic|clicks))\b",
     "/content-refresh - rewrite and expand, keep the SEO slots, bump the real freshness date, log the hypothesis"),
    (r"\b(internal link (pass|sculpt)|link sculpting|orphan page|topic cluster|pillar page|anchor.?text plan|link equity)\b",
     "/internal-link-pass - orphan detection, cluster wiring and an anchor plan from the real link graph"),
    (r"\b(monthly seo|seo (month|cadence|report|status)|run the seo month)\b",
     "/seo-monthly - the full cadence: pull data, grade last month, sweep health, mine, plan, execute, report"),
    (r"\b(striking distance|keyword opportunit|ctr gap|cannibali[sz]ation|what to blog about|opportunity mining)\b",
     "/seo-opportunities - five veins mined from search data, ranked by impact times confidence over effort"),
    (r"\b(log (this|the) change|seo change ?log|changelog entry|record this seo)\b",
     "/seo-log - append one row to the ledger. Nothing escapes the ledger."),
    (r"\b(seo (plan|strategy|roadmap)|content strategy|keyword strategy|site architecture)\b",
     "/seo-plan - competitive analysis, keyword ownership map, content strategy, implementation roadmap"),
    (r"\b(topic cluster|semantic cluster|keyword grouping|hub and spoke|cluster plan)\b",
     "/seo-cluster - clustering by real SERP overlap, hub and spoke architecture, internal-link matrix"),
    # Backlink analysis has no skill in this pack. The previous generation's
    # was 264 lines of calls to five scripts nobody ever wrote, so it was
    # removed rather than left to fail on first use. See README known gaps.
    (r"\b(comparison page|vs page|alternatives page|competitor comparison|versus page)\b",
     "/seo-competitor-pages - comparison and alternatives pages with a feature matrix, schema and a conversion layout"),
    (r"\b(programmatic seo|pages at scale|template pages|generated pages|data.?driven seo|index bloat)\b",
     "/seo-programmatic - template engine, URL patterns, thin-content safeguards, index-bloat prevention"),
    (r"\b(local seo|business profile|map pack|local pack|near me|nap consistency|citation|directory listing)\b",
     "/local-seo-audit - profile completeness, map-pack presence, NAP consistency, local schema and citation gaps"),
    (r"\b(ai (visibility|search|overview)|answer engine|chatgpt|perplexity|share of ai voice|llms\.txt|ai crawler)\b",
     "/ai-visibility-audit - share of answer-engine voice against competitors, plus the technical prerequisites for citability"),
    (r"\b(crawl the site|enumerate url|site.?wide (scan|inventory)|sitemap scan|every url|orphan|thin page)\b",
     "/site-crawl - enumerate every URL with its per-page signals: status, title, meta, H1, canonical, JSON-LD"),
    (r"\b(lighthouse|pagespeed|psi score|core web vitals (score|number)|crux|field data)\b",
     "/lighthouse-audit - real field data plus lab scores for any live URL"),
    (r"\b(screenshot|capture the page|grab a shot|visual evidence|before.?after shot)\b",
     "/screenshot - desktop, mobile and tablet captures of a local or live URL"),
    (r"\b(keyword volume|search volume|\bcpc\b|keyword data|people also search)\b",
     "/keywords-everywhere - real volume, CPC, competition and trend data. Costs a credit per keyword."),
    (r"\b(call (an? )?llm|batch (classify|llm)|openrouter|cheap model|bulk (classify|summari))\b",
     "/openrouter - one endpoint for every text model, with fallback and cost routing"),
    (r"\b(generate|create|make|produce).{0,25}(image|illustration|graphic|cover|banner|icon|texture|cutout|og card|social card|product shot)\b|\bimage.?router\b",
     "/generate-image - the ImageRouter path plus post-processing. Validate the pipeline on the free model first, and log the cost."),
]


def build_law(cfg: dict) -> str:
    """Restate the project's own rules, from its config. Generic fallbacks when
    a field is unset, so this is never silently empty."""
    facts = brand(cfg, "truth", "factsFile", default="docs/BRAND-TRUTHS.md")
    banned = brand(cfg, "voice", "bannedWordsFile", default="docs/BANNED-WORDS.md")
    ledger = cfg.get("ledgerFile") or "_agency-internal/seo/CHANGE-LOG.md"
    tokens = (cfg.get("tokenFiles") or ["the token file"])[0]
    name = brand(cfg, "identity", "name")

    bits = [
        f"facts only from {facts}, never invented",
        f"vocabulary per {banned}, no em or en dashes",
        f"colours from the tokens in {tokens}",
        f"every SEO-affecting change gets a row in {ledger}",
    ]

    rule = brand(cfg, "identity", "nameRule")
    if rule:
        bits.append(f"name: {rule}")

    frozen = brand(cfg, "stack", "frozenSubsystems", default=[])
    if frozen:
        labels = [f.get("path", f) if isinstance(f, dict) else str(f) for f in frozen]
        bits.append("frozen (restyle only, logic untouched): " + ", ".join(labels))

    prefix = f"{name} rules: " if name else "Project rules: "
    return prefix + "; ".join(bits) + "."


def main() -> int:
    try:
        payload = json.loads(sys.stdin.buffer.read().decode("utf-8-sig"))
    except Exception:
        return 0
    prompt = payload.get("prompt") or payload.get("user_prompt") or ""
    if not isinstance(prompt, str) or not prompt.strip():
        return 0
    p = prompt.lower()

    cfg = load()
    configured = bool(cfg.get("_config"))

    skills = []
    for pattern, suggestion in RULES:
        try:
            if re.search(pattern, p) and suggestion not in skills:
                skills.append(suggestion)
        except re.error:
            continue
        if len(skills) >= MAX_SUGGESTIONS:
            break

    if not skills:
        return 0

    ctx = "AUTO-ROUTING for this prompt:\n\n"
    ctx += ("Suggested SKILLS (skip if the task is trivial; when several match, "
            "the broadest usually wins):\n")
    ctx += "\n".join("- " + s for s in skills)

    if configured:
        ctx += "\n\n" + build_law(cfg)
    else:
        ctx += ("\n\nNo brand.config.json in this project. Run /init-brand first: "
                "every agent and hook reads it, and without it they will guess. "
                "Do not invent brand facts, prices, hours or market assumptions "
                "in the meantime.")

    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "UserPromptSubmit",
            "additionalContext": ctx,
        }
    }))
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        sys.exit(0)
