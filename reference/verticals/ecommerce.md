# Vertical overlay: ecommerce

Load when `vertical.overlay` is `ecommerce`.

A catalogue sold online. The defining constraint is scale: decisions apply across
thousands of URLs, so a template flaw is not one bug, it is one bug multiplied by
the catalogue.

---

## 1. What a conversion is

| Action | Notes |
|---|---|
| Completed purchase | The real one |
| Add to cart | Proxy, useful for template diagnosis |
| Checkout start | The abandonment cliff sits between here and purchase |
| Subscribe or account creation | Secondary, drives repeat |

**The measurement trap.** Revenue per session beats conversion rate. A change
that lifts conversion while cutting basket size can look like a win and be a
loss. Report both, always, plus returns where the data exists, because a
category with a high return rate can convert well and lose money.

## 2. Funnel shape

```
Product search, category search, or a recommendation
   -> category or product page, rarely the homepage
   -> evaluation: is this the right item, will it fit or suit, when does it
      arrive, what if it is wrong
   -> cart
   -> checkout
   -> repeat
```

Returns policy and delivery timing are conversion content, not legal content. On
most catalogues they are read more than the product description and buried three
clicks away.

## 3. Page architecture

| Archetype | Owns |
|---|---|
| Home | Brand term, seasonal routing |
| Category | The high-volume commercial terms. The real ranking asset. |
| Subcategory and filtered views | Only where genuine search demand exists. Everything else must not be indexable. |
| Product | Long-tail and brand-plus-model terms |
| Buying guides and editorial | Upper-funnel demand, links, answer-engine citations |
| Policy pages | Delivery, returns, sizing. Conversion surfaces. |

**Faceted navigation is the defining technical problem of this vertical.**
Filter combinations generate near-infinite URLs. Left open, they consume crawl
budget, split signals across duplicates, and bloat the index. Decide up front
which facets are indexable because they have real demand, and make every other
combination non-indexable and non-crawlable. Retrofitting this after launch is
expensive.

## 4. Schema

| Type | When |
|---|---|
| `Product` | Every product page |
| `Offer` | Inside `Product`. Price, currency from `market.currencyCode`, availability, and it must match the page. |
| `AggregateOffer` | Variant ranges |
| `Review` / `AggregateRating` | Only from real, verifiable, first-party reviews. This is the one vertical where rating markup is legitimate, which is exactly why it gets abused. |
| `BreadcrumbList` | Always, and it must mirror the real hierarchy |
| `ItemList` | Category pages |
| `Organization` with return and shipping policy | Increasingly load-bearing |
| `FAQPage` | Real visible FAQs only |

Price and availability in markup that disagree with the page are a rich-result
suspension risk. They must render from the same source.

## 5. Off-site surfaces

| Surface | What matters |
|---|---|
| Shopping and product feeds | Feed quality is a ranking surface in its own right. Attribute completeness beats cleverness. |
| Marketplaces | Often competing with you for your own product terms |
| Review platforms | Volume, recency, and whether the collection method is legitimate |
| Editorial roundups and gift guides | Seasonal, high value, and planned months ahead |
| Comparison and price-tracking sites | |

## 6. Conversion furniture

- Price, delivery estimate and returns window visible on the product page without
  scrolling on `market.primaryDeviceWidth`.
- Stock status honest and current. "Low stock" that is always on is a dark
  pattern and eventually a legal one.
- Variant selection that does not lose the user's place or their scroll position.
- Guest checkout, unless there is a real reason otherwise.
- Total cost, including delivery and tax, before the final step. Surprise costs
  at the last step are the single largest abandonment cause.
- Real product imagery with scale reference.

## 7. Analytics taxonomy

Ecommerce event names follow the platform standard so reporting works out of the
box.

```
page_view
view_item_list       { list_name, items }
view_item            { item, price, currency }
select_item
add_to_cart          { item, quantity, value }
remove_from_cart
begin_checkout       { value, currency, items }
add_shipping_info
add_payment_info
purchase             { transaction_id, value, currency, items, shipping, tax }
refund
```

## 8. What this overlay must not assume

- That every product deserves a page. Thin, duplicate and permanently
  out-of-stock products are index bloat.
- That the catalogue is stable. Discontinuation is constant, and the redirect
  policy for a dead product must be decided once, not per incident.
- That one currency or tax display serves the whole audience.
- That product descriptions supplied by a manufacturer are unique. They are on
  every competitor's site too, which is why category and editorial pages carry
  the ranking load.
- That images are optimised. Catalogue imagery arrives unoptimised at volume and
  is usually the largest performance problem on the site.

## 9. Truth traps specific to this vertical

1. **Was-now pricing.** A reference price must be one genuinely charged, for a
   real period. This is regulated in many markets.
2. **Delivery promises.** Stated timeframes are a commitment. Get the real number
   from operations, not marketing.
3. **Stock scarcity.** Only if the number is real and live.
4. **Review authenticity.** Incentivised, filtered or solicited-only reviews are
   misrepresentation, and marking them up compounds it.
5. **Sustainability and origin claims.** Heavily scrutinised, frequently
   unverifiable, and asserted from a supplier's marketing copy. Source or omit.
6. **"Best seller".** Over what period, in what category, by what measure.
