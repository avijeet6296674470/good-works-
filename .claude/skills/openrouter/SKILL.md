---
name: openrouter
description: Call any LLM (Claude, GPT, Gemini, Llama, DeepSeek, Mistral…) through one OpenAI-compatible OpenRouter endpoint + one API key, with automatic model fallback and cost/latency routing. Use for batch SEO/content tasks (classify intent across hundreds of keywords, draft meta descriptions, summarize competitor pages, extract entities) where you want a cheap bulk model with a strong-model fallback. Needs OPENROUTER_API_KEY.
---

# openrouter: one key, every model

Reusable, project-agnostic. OpenRouter exposes a single OpenAI-compatible API in front of every major
model, so bulk audit/content work can route to a cheap-fast model and fall back to a stronger one
without re-plumbing. Chunk large batches yourself (send N items per call, handle partial failures by
retrying only the failed items) — there's no separate batching skill in this pack.

## Setup
```bash
# .env  → OPENROUTER_API_KEY=sk-or-v1-...
export OPENROUTER_API_KEY="$(grep OPENROUTER_API_KEY .env | cut -d= -f2)"
```
Base URL: `https://openrouter.ai/api/v1` (drop-in for any OpenAI SDK: `baseURL` + this key).

## Minimal call (curl)
```bash
curl -s https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-sonnet-4.6",
    "models": ["anthropic/claude-sonnet-4.6", "google/gemini-2.5-flash"],
    "messages": [{"role":"user","content":"Classify search intent (informational/commercial/transactional/navigational): \"emergency plumber near me\""}]
  }' | jq -r '.choices[0].message.content'
```
- `"models": [...]` = ordered **fallback list**: if the first is down/over-quota, OpenRouter tries the next. This is the resilience win.
- Model ids are `vendor/model`, e.g. `anthropic/claude-opus-4.8`, `openai/gpt-5`, `google/gemini-2.5-pro`, `deepseek/deepseek-chat`, `meta-llama/llama-3.3-70b-instruct`. Browse current ids + live prices at `https://openrouter.ai/models`.

## Node SDK (OpenAI-compatible)
```js
import OpenAI from 'openai';
const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});
const r = await client.chat.completions.create({
  model: 'google/gemini-2.5-flash',                       // cheap bulk default
  messages: [{ role: 'user', content: prompt }],
  response_format: { type: 'json_object' },               // most models honor this
});
```

## Audit/SEO use-patterns (where it earns its place)
- **Bulk keyword intent + clustering:** feed 50 keywords per call, ask for a JSON array of `{keyword,intent,cluster}`. Route to a cheap model; spot-check on a strong one.
- **Meta-description drafts** at scale: one call per page-batch from the `site-crawl` inventory of pages with missing/weak meta.
- **Competitor page summaries:** pipe `/scrape` or `/web-fetch` output in, get a 40-to-60-word positioning summary per competitor for the teardown.
- **Entity extraction** for schema gaps: pull the entities a page *should* mark up, hand to Weave (`/schema-audit`).

## Cost & headers
- Cheapest reliable bulk tier today is the flash/mini class (`gemini-2.5-flash`, `gpt-5-mini`, `deepseek-chat`); reserve opus/pro-class for human-read output. Quality-gate before downgrading.
- Optional ranking/attribution headers: `-H "HTTP-Referer: https://yoursite.com" -H "X-Title: Audit Tooling"`.
- Check spend: `curl -s https://openrouter.ai/api/v1/key -H "Authorization: Bearer $OPENROUTER_API_KEY" | jq` (usage/limit).

## Notes
- Prices and model availability move constantly, so pull `https://openrouter.ai/api/v1/models` rather than hard-coding a price.
- For Anthropic models specifically with full feature parity, the native Claude API is the source of truth. OpenRouter is for *multi-model* routing/fallback convenience.

## Done definition
`OPENROUTER_API_KEY` is in `.env`; a test call returns content; bulk tasks route to a cheap model with a named fallback and are quality-spot-checked.
