# Discovery routes

The machine-readable surfaces: sitemap, robots, and the optional answer-engine
file. Small, easy to get wrong, and wrong in ways nobody notices for months.

---

## The sitemap

**Contains**: every canonical, indexable, 200-status public URL. Nothing else.

**Never contains**: a redirected URL, a noindexed URL, a URL that 404s, a
parameterised duplicate, or an application route.

> A redirected or noindexed URL in the sitemap is a mixed signal: the file says
> "index this" while the page says "do not". It also spends crawl budget on a
> URL that was never going to be indexed.

**Generated from the route list**, never hand-maintained. A hand-maintained
sitemap is correct on the day it is written and wrong within a month, and its
wrongness is silent.

Every URL in the project's canonical form, matching `urls.trailingSlash`.

**Where the site is large enough to need an index**, remember that a consumer
fetching the index gets a list of sitemaps rather than pages. Anything that
crawls it must handle both shapes, and the failure mode is quiet: a handful of
plausible-looking URLs instead of all of them.

## Robots

**Allows** the crawlers the project wants, including the answer-engine crawlers
if citation matters. **Disallows** only what should genuinely never be fetched:
admin surfaces, API routes, previews.

**Lists the sitemap.**

**The trap, stated once more because it is the one that bites:** a URL that is
both noindexed and disallowed will never have its noindex read, because the page
is never fetched. It can stay indexed indefinitely. Pick one mechanism per URL:

| Goal | Use |
|---|---|
| Keep it out of the index | `noindex`, and **allow** the crawl so the directive is read |
| Keep it from being crawled at all | `Disallow`, and accept it may still be indexed from external links |
| Both | Not a thing. Choose. |

**Staging stays closed forever.** The indexing state is environment-driven, and
the default is closed, so a new environment is safe by default rather than by
someone remembering.

## The answer-engine file

Optional, and treat it as optional. **The real work is server-rendered structured
data, crawlability, and earned third-party citations**, in that order. A
well-formed text file will not rescue a site whose schema is invisible.

If the project ships one, **its facts must match the validated markup exactly**,
because a third source of truth that disagrees with the other two is worse than
no third source.

## Verification

All three are text files, so verify them by requesting them:

- The sitemap parses, and every URL in it returns 200 and is indexable. **Check the whole list, not a sample**: the broken one is never the one you spot-check.
- Robots serves the intended content **in the intended environment**, which is where this usually goes wrong.
- Nothing is both noindexed and disallowed.
- The canonical URL form is consistent across the sitemap, the internal links and the canonicals. Three places, one form.

## After every deploy

Re-check. These files are generated, so a build change can alter them without
anyone touching them deliberately, and nothing in a normal review would show it.
