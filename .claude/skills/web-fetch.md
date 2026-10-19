# Skill: Web Fetch (Jina reader)

Pulls the readable text of a live page (a competitor's site, a reference source, the client's own
current site) so an audit, a comparison, or a piece of research is based on what the page actually
says, not a guess or a stale memory of it. Used by `/scrape`, `/seo-cluster`, `/content-briefs`, and
`/seo-competitor-pages` (see `docs/JINA.md`) whenever they need the real content of a URL rather
than a search snippet.

The Jina AI reader (`r.jina.ai`) fetches a page server-side and returns clean markdown, bypassing
most Cloudflare/rate-limit walls that block a plain fetch.

## Command

```bash
curl -sL "https://r.jina.ai/https://[TARGET-SITE-URL]" \
  -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36" \
  -H "X-Return-Format: markdown" \
  --max-time 40
```

## Notes

- **Works keyless at low volume.** If it rate-limits, slow down or add `-H "Authorization: Bearer $JINA_API_KEY"` (source the pack `.env` first).
- **Good for:** business websites, about/services pages, blogs, most public marketing pages.
- **Not reliable for:** Instagram/Facebook (they serve a logged-out shell with no real content). If the source lives there, read what you can see directly and pull the specific detail by eye.
- Keep it scoped to what the task actually needs — a competitor teardown or a content brief needs the full page; don't fetch more of a site than the job requires.

## What to extract

Whatever the calling skill actually needs: a competitor's positioning and claims for a teardown, a
source's real facts for a content brief, or the client's own current copy for an audit. Extract it
as clean text, attributed to the URL it came from.
