# Component contracts

The library every content site needs, and what each component promises.

Implement natively. **The contract is what ports; the code is not.**

---

## The rule that makes a library work

**Map every slot in a page to an existing component before writing a new one.**

Reinventing a card, a hero or an accordion that already exists is a defect, and
it is the most common one on a fast build, because writing a fresh component is
always slightly easier than reading the existing one.

The symptom is three buttons that are almost the same. By the time anyone
notices, all three are in production.

---

## The core set

### Shell
Wraps every page: header, footer, the skip link, and the mobile rail.

**Promises**: consistent chrome; the rail appears per `docs/CHROME-SPEC.md`; the
skip link is the first focusable element on every page.

### Section
The band primitive. Everything vertical goes through it.

**Promises**: spacing from the scale, never bespoke; the surface treatment is a
named variant rather than an ad-hoc class; **it does not render a heading**, so
the consumer owns the heading level.

> A section that renders its own heading level will eventually be used where a
> different level belongs, and the document outline breaks silently.

### PageHero
The top of a page.

**Promises**: the largest-paint element is eager and prioritised; the box is
reserved so nothing shifts on load; exactly one primary action; the heading
level comes from the consumer.

### CTA band
The conversion moment, repeated down a page.

**Promises**: one primary action in the accent colour; targets at 44px minimum;
the label says what happens next, never "learn more".

### Card
The repeating content unit.

**Promises**: a reserved image box; a typed shape; **the heading level passed in,
not baked in**; an honest empty state.

### Accordion
Collapsible content, usually the FAQ.

**Promises**: keyboard operable, correct expansion state exposed to assistive
technology, **and its content array is the same array the structured data reads.
Never forked.**

### Breadcrumb
**Promises**: the visible trail and the markup come from one source and match
exactly. Every href in the project's URL form.

### Form
Enquiry and contact.

**Promises**: labels that are real labels; errors that say what to do rather than
what went wrong; a submitting state; a success state that is not a redirect into
nowhere; **no field the business will not actually use.**

### Logo
**Promises**: the correct variant for its background, selected by a prop rather
than by whoever is placing it; the mark never recoloured, skewed or stretched;
the compact mark wherever it renders small.

### NotFound
**Promises**: a real 404 status, not a 200 with an apology. A 200 gets indexed as
a page and drags site quality down quietly.

---

## Contracts every component honours

**Headings.** A component **never hardcodes a heading level.** It takes one. A
display line styled large is not a heading, and promoting it to one to win visual
weight is a real defect that breaks the outline.

**Images.** Real image elements with alt and dimensions. The box is reserved so
loading causes no shift. Decorative images take an empty alt; meaningful ones
take real alt text.

**Facts.** No component hardcodes a price, an hour or a contact detail. They come
in as data, from the fact files.

**States.** Every component that can be empty, loading or failed **has a designed
state for each.** The empty state is the one users hit on the worst day, and it
is the one that never gets built.

**Tokens.** No raw values. Ever.

**Focus.** Everything interactive has a visible focus state. Not the default one
that the reset removed.

**Motion.** Reduced motion respected.

---

## When to add a component

When a **markup shape** repeats, not when styling repeats. Styling that repeats
is a token or a utility.

A new component gets: a typed interface, a named place in the library, and an
entry wherever the library is documented. A component nobody can find gets
rebuilt by the next person.
