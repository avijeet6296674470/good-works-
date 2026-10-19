# Vertical overlay: agency and professional services

Load when `vertical.overlay` is `agency`.

A service business that sells expertise. Consultancies, agencies, studios,
practices, freelancers at scale. The defining constraint is that the product is
invisible before purchase, so the entire site is an evidence problem: the buyer
cannot inspect the work, only the proof that it happened.

---

## 1. What a conversion is

| Action | Notes |
|---|---|
| Signed engagement | The real one, months downstream, never attributable by the site alone |
| Qualified enquiry | The standard primary. Qualified is the operative word. |
| Call or meeting booked | Higher intent than a form, and worth measuring separately |
| Gated resource download | Weak intent. Useful for nurture, dangerous as a primary metric. |

**The measurement trap.** Enquiry volume is the wrong target. This vertical
converts on fit, and an unqualified enquiry costs real time to reject. Report
qualified enquiries and, where the client will share it, close rate by source.
A site change that halves enquiry volume and doubles qualification is a win, and
will look like a catastrophe on a volume-only dashboard.

## 2. Funnel shape

```
Referral, reputation, a search for a specific capability, or an author's own
audience
   -> a service page or a case study, rarely the homepage
   -> evidence: have they done this, for someone like me, with a real result
   -> people: who would actually do the work
   -> enquiry
   -> a long sales conversation the site does not see
```

Buyers arrive sceptical and leave on vagueness. The two questions that decide it
are "have you done this exact thing before" and "who is actually doing the work".
Most sites in this vertical answer neither, and lead with adjectives instead.

## 3. Page architecture

| Archetype | Owns |
|---|---|
| Home | Positioning, and routing to capability and proof |
| Service and capability pages | One per distinct offering, one primary keyword each |
| Case studies | The core asset. Structured, comparable, and honestly sourced. |
| Sector or industry pages | Same capability, evidence chosen for that buyer |
| People | Real named humans with real credentials. Frequently the most-read page. |
| Insight and editorial | The expertise proof, and the main organic surface |
| Process | What working together actually looks like. De-risks the enquiry. |
| Pricing or engagement models | Even a range or a model beats silence |

**Case studies are the product page of this vertical.** They deserve a fixed
structure so they compare: the situation, the constraint, what was actually done,
the result with its measurement window, and who says so. Unstructured narrative
case studies are unreadable in aggregate and unusable as proof.

## 4. Schema

| Type | When |
|---|---|
| `Organization` or `ProfessionalService` | Always, as the root node |
| `Service` | One per capability, referencing the organisation by `@id` |
| `Person` | Team members. Real credentials, real roles. |
| `Article` / `BlogPosting` | Insight content, with a real named author |
| `FAQPage` | Real visible FAQs |
| `BreadcrumbList` | Below the top level |
| `CreativeWork` or `Article` | Case studies, where they fit |

**Never emit** self-reported `AggregateRating`. This vertical rarely has a
legitimate first-party review corpus, and inventing one to win a star in the
results is both the most tempting and the most obvious fabrication available.
Put it in `truth.forbiddenClaims`.

## 5. Off-site surfaces

| Surface | What matters |
|---|---|
| The founders' and practitioners' own audiences | Usually the single largest source of qualified work, and entirely outside the site |
| Industry directories and marketplaces | Vertical-specific. Ask which ones the buyers actually use. |
| Awards and professional bodies | Real credentials, real links, and a trust signal that survives scrutiny |
| Speaking, podcasts, guest writing | The primary link and citation engine here |
| Client-side coverage | A published client result is a citable third-party source |

## 6. Conversion furniture

- One enquiry path, present on every page, that asks for the minimum needed to
  qualify.
- Qualification in the form itself: budget band, timeline, scope. Filtering at
  the form is cheaper than filtering in a meeting, and honest about fit.
- Real named people with real photographs. Stock photography of people in this
  vertical actively costs credibility.
- Proof adjacent to every claim. A capability claim with no case study behind it
  should either get one or be cut.
- A stated response time, and then meet it.
- Direct contact for the buyer who does not want a form.

## 7. Analytics taxonomy

```
page_view
view_service         { service }
view_case_study      { case, sector }
view_person          { person }
enquiry_start        { source_page }
enquiry_submit       { service, budget_band, timeline }
meeting_booked
resource_download    { resource }
```

Persist entry source and campaign parameters through to enquiry. The sales cycle
is long enough that nothing else will connect spend to signed work.

## 8. What this overlay must not assume

- That the buyer is searching. Much of this vertical's demand arrives by referral
  and the site's job is confirmation, not discovery. That changes what the
  homepage is for.
- That more services is better. A broad capability list reads as unspecialised.
- That case studies can be published. Many cannot, and the workaround is an
  anonymised structured version, not an invented one.
- That the team page is a formality.
- That thought-leadership content converts. It builds the audience that converts.
  Measuring it as a direct conversion surface will get it cancelled unfairly.

## 9. Truth traps specific to this vertical

This vertical has the worst truth hygiene of the four. Every number on a typical
agency site is a claim about someone else's business, made without their data in
front of you.

1. **Result figures.** Every one needs the source, the measurement window, the
   baseline, and the client's permission. A percentage with no baseline is not a
   result, it is a decoration.
2. **Attribution.** "We grew their revenue" is usually "revenue grew while we
   were engaged". State the contribution honestly. The honest version is still
   persuasive and it survives a reference call.
3. **Client logos.** Permission, currency, and whether the engagement was real
   work or a single small project.
4. **Team size and tenure.** Contractors counted as staff is standard and it is
   still misrepresentation.
5. **Awards.** Year, category, and whether it was won or shortlisted.
6. **Cherry-picking.** Publishing only the wins is expected. Publishing the
   single outlier as though it were typical is not. If a figure is atypical, say
   so; buyers respect it and it survives scrutiny.
7. **Anonymised case studies.** Anonymising is fine. Anonymising a composite of
   several clients and presenting it as one engagement is a fabrication.

Run every claim on this vertical's site through `/bullshit-detector` before it
ships. It exists mostly because of this vertical.
