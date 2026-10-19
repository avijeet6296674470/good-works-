# Stage 3 — Infrastructure

**Goal:** stand up, or audit, the technical foundation with boring, proven choices sized to the
project — before any real page gets built against it. Infrastructure that needs to be exciting to
justify itself is usually the wrong choice.

---

## 1. The portable process

1. **Decide up front whether this is "build the infrastructure" or "audit someone else's
   infrastructure," and don't blur the two.** A greenfield build and an audit of an existing system
   need genuinely different postures. An audit engagement should never quietly turn into a rewrite
   of code that isn't yours to touch.
2. **Choose boring, proven, sized-to-the-project tools over exotic ones.** The goal is a stack that
   a different developer could pick up without re-learning anything exotic — framework, hosting,
   database, object storage, email, all chosen for being well-understood, not impressive.
3. **If auditing someone else's platform, verify vendor claims against the vendor's own
   documentation before writing anything off.** "It's built on a no-code platform" is not
   automatically an SEO red flag or a technical dead end — check whether the specific platform
   actually supports what you need (server-rendering, prerendering) before assuming it doesn't.
4. **Name and lock frozen subsystems explicitly, in writing, before touching anything nearby.**
   Anything already live and carrying real consequence (a payment flow, a booking system, its API
   and analytics contracts) gets marked as restyle-only or fully off-limits — this is a Stage 1
   locked-decision, but infrastructure work is where it actually gets tested day to day.
5. **Provision manually and deliberately rather than trusting an automated setup wizard as a black
   box.** Manual, traceable steps (create the repo, connect the host, set up the domain, wire the
   CDN) are slower up front but more reliable and more teachable than a one-click provisioner whose
   failure mode is opaque.
6. **Treat production and development as genuinely different environments, not the same thing at a
   different URL.** A schema-sync feature, a background job, a build-time database query — any of
   these can work perfectly in development and silently fail or no-op in production. Assume the gap
   exists until it's specifically been checked, not the other way around.
7. **Verify a deploy by reading the live, deployed artifact directly** — fetch the actual page, the
   actual bundle, the actual response — never by trusting a hosting platform's own "deploy
   succeeded" status alone. A status check can report success while the deploy is stalled or still
   serving stale code.
8. **Once a site is live and carrying real traffic or bookings, every infrastructure change gets
   handled with active caution, not routine confidence.** Confirm a production build won't take the
   site offline before running it, specifically because the cost of being wrong just went from
   "annoying" to "a real business stops taking money."

**When is this stage actually done?** When the choice of build-vs-audit has been stated explicitly
(not assumed), every frozen subsystem is named in writing, and — for a greenfield build — the full
stack has actually been deployed and verified live at least once, not just planned. For an audit,
this stage is done once every concrete defect has been found, verified against the live site, and
handed over as a scoped fix list, not a vague "this could be better."

**The rule that generalizes hardest from this stage:** production and development are not the same
environment with different URLs — they diverge in specific, predictable ways (schema sync, build-time
vs. runtime execution, background job reliability), and the only way to catch the divergence is to
check the live, deployed result directly, every time, rather than trusting that what worked locally
will work the same way once it ships.

A long list of specific, concrete technical traps hit building this exact class of stack (Next.js,
a CMS, Postgres, Cloudflare R2, Railway) lives in the Massive Impact guidebook's
[`07-ENGINEERING-GOTCHAS.md`](../../../../massive-impact-website-guidebook/07-ENGINEERING-GOTCHAS.md) —
worth reading in full before a build on a similar stack, rather than reproduced here.

---

## 2. How Piyush actually talks during this stage

**Verifying something is actually live, rather than trusting that it should be by now:**
> "Okay is it all pushed and live?"
> — [Labyrinth, chat-003, 2026-08-21]

> "Are we waiting on it to deploy?"
> — [Labyrinth, chat-008, 2026-08-15]

**Catching a DNS/routing mismatch himself, not trusting the deploy was fully correct just because it
succeeded:**
> "I think even the live one should point to the updated URL and not the Railway one?"
> — [Massive Impact, chat-032, 2026-09-09]

**The clearest "this is live, be careful" instinct in either archive — production caution stated
explicitly, with the actual stakes named:**
> "yes do the production build check quickly.. make sure the client website doesn't go offline as
> we are live and running paid traffic and bookings."
> — [Labyrinth, chat-014, 2026-09-02]

**Catching an infra scare directly, in real time:**
> "how come the env is empty? I had saved so many variables here, but it's all gone?"
> — [Labyrinth, chat-008, 2026-08-15]

**Choosing manual, traceable provisioning over an automated black box — the "boring, proven"
preference, stated as an explicit argument, not just a habit:**
> "I really feel this is a bad way of doing things. We need to add a few more steps to the pdf and
> set up a repo in github via cli, also connect to railway, set up the domain etc, all these
> things, setting up basics in cloudflare ourselves etc. in resend setting up the domain and dns
> settings. These things are easy to follow with instructions and if we were to do it instead of
> provisioning, it would be faster and more reliable?"
> — [Labyrinth, chat-006, 2026-08-13]

**Naming the full stack in one breath — matches the actual locked stack (Next.js, Railway, Postgres,
Cloudflare, Resend) word for word:**
> "What I want to do is provision the github manually, connect to railway, set up a postgres
> database and railway service for the website, and connect cloudflare domain, set up the media cdn
> manually and do as much of it as we can simply do from the provisioning manually..."
> — [Labyrinth, chat-007, 2026-08-14]

**Drawing a hard line between his own credentials and what a productized buyer gets — a real,
concrete instance of the security discipline from Stage 1, applied specifically to infrastructure
handoff:**
> "Don't give my sensitive stuff but the buyer will also get the railway and cloudflare stuff so
> they can set up on their own pc right? Just make sure there is no confusion there. What are the 3
> items, clearly tell me so I know what this kit is STILL missing?"
> — [Labyrinth, chat-003, 2026-08-21] — this is also, concretely, the moment `website-pack`'s own
> "the buyer provisions their own accounts" design got worked out loud.

**Troubleshooting a hosting-platform mismatch directly rather than assuming the code is at fault:**
> "Where is this hosted on Railway?" ... "I don't see the project in Railway at all. What may be the
> issue?"
> — [Massive Impact, chat-015, 2026-08-11]

---

## 3. Specific examples, per project

These are worked examples of the process above — **not rules to copy onto the next project.** The
actual stack choices are specific to each engagement; what transfers is the discipline around them.

### Massive Impact
- Stack: Next.js, Payload CMS, Postgres, Cloudflare R2, deployed on Railway.
- A real, repeated production-only failure mode: Payload's schema auto-sync works in local `next
  dev` but is a silent no-op under `next start` in production — every new database field had to be
  applied to production by hand. Treated as a certainty for any new field, not a one-time surprise.
- Caught a live routing mismatch directly by checking the actual DNS target, rather than assuming a
  successful deploy meant the domain was pointed correctly.

### Labyrinth Escape Games
- Greenfield build: Next.js (App Router, TypeScript, React Server Components) on Railway, Postgres
  on Railway with the same `DATABASE_URL` reachable from local dev, Cloudflare R2 for images/CDN,
  Resend for email. The third-party booking widget was embedded directly as inline JavaScript rather
  than an iframe, since its design wasn't something the team had any control over either way.
- The entire provisioning sequence — GitHub, Railway, the Postgres service, the Cloudflare domain,
  the media CDN — was deliberately done manually rather than through an automated wizard, specifically
  because manual steps are more reliable and easier to document for someone else to follow later.
  This same discipline is what later became the literal instructions in `website-pack`'s own setup
  docs.
- A real production scare (an emptied `.env` file) was caught and flagged immediately rather than
  assumed to be a display glitch.

### Putt House
- **This was explicitly an audit engagement, not a build.** The venue's site was already being built
  in-house on Lovable (a no-code platform) before the engagement started. The posture, set early:
  audit what exists and hand over complete, build-ready recommendations — not propose a different
  direction, and not treat "it's no-code" as an automatic dead end.
- **A platform claim was verified against the vendor's own documentation rather than assumed.**
  Lovable's specific build in use did genuinely support server-rendering/prerendering for search and
  AI crawlers — confirmed directly, which meant the honest guidance was concrete optimization tasks,
  not a write-off of the platform.
- **A frozen subsystem, named explicitly:** the Django booking backend and Razorpay payments were
  already live — booking logic, steps, API, and analytics contracts were locked; only visual styling
  was open to change.
- **Concrete infrastructure defects found and handed over as a scoped fix list:**
  - A booking-widget bug that didn't check remaining capacity, allowing a slot to be overbooked.
  - A Terms-of-Service link built as a plain anchor tag that exited the single-page app and reset
    in-progress booking state.
  - A date picker that only opened when the calendar icon specifically was tapped, not the whole
    field.
  - Ad click identifiers (`gclid`/`fbclid`) weren't captured at booking time, breaking attribution
    back to the ad that drove the sale.
  - The tracked conversion value was the deposit amount, not the full order value.

---

## 4. Gaps

1. **No verbatim quote survives for the "frozen subsystem / don't touch someone else's live logic"
   boundary** — same shape as a gap already found at Stage 1. The rule is well-documented in prose in
   the Putt House case study (the Django booking backend and Razorpay integration being explicitly
   off-limits), but Putt House's own raw chats don't survive anywhere on this machine, so there's no
   archive to search. Not a new problem, the same known limit of the source material.
