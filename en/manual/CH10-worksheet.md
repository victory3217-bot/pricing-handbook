# CH10 MODE A Input Checklist

> Related Chapter: CH10 (MODE A — Current Price Diagnosis)
> Related Tool: MODE A (`core/engine/modes/mode_a.py`, `run_mode_a`)
> Purpose: A checklist for confirming, before running MODE A, that the inputs SPEC.md requires for each component in `product.price_components[]` are actually available. Do not add input items that are not on this list.

The consultant fills out the table below once for each component of the target product/service. For a product made up of multiple components (e.g., hardware + subscription service), use a separate sheet per component.

---

## Component Identification

- [ ] Component ID (`component_id`): ______________________
- [ ] Confirmed how many individual price/cost components this component contains (MODE A does not blend components together)

## 1. Price Information

- [ ] `actual_price` (actual selling price): ______________________
- [ ] `currency`: ______________________
- [ ] `price_includes_vat` (does the selling price include VAT?) — [ ] Yes (true) / [ ] No (false) / [ ] Unconfirmed

## 2. Tax Information

- [ ] `tax.vat_rate` (VAT rate): ______________________ (if unconfirmed, mark it "unconfirmed" and leave it as null — do not enter 0 arbitrarily)

## 3. Exchange Rate / Currency Information

- [ ] `fx.base_currency`: ______________________
- [ ] `fx.reporting_currency`: ______________________
- [ ] `fx.rate_base_per_reporting` (conversion rate): ______________________
  - If this component's currency differs from both `base_currency` and `reporting_currency`, MODE A returns `ERROR` (SPEC.md "Explicitly out of scope"). Be sure to confirm the currency is one of these two.

## 4. Cost Items (`costs.items[]`) — only items attributable to this component

For each cost item, confirm the following.

| Item Name | `applies_to_component` (this component / shared) | `cost_category` | `amount` or `rate` | `basis` (if rate) | `allocation_rule` (if shared) |
|---|---|---|---|---|---|
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |

- [ ] Was `cost_category` classified precisely into `product_service_direct_cost` (direct cost) / `variable_selling_delivery` (variable selling/delivery cost) / `fixed_operating_cost` (fixed operating cost)?
  - Note: installation cost, even though it looks like a one-time per-unit cost, defaults to `variable_selling_delivery` (SPEC.md). Reclassifying it as a direct cost requires a client-specific cost-accounting policy basis.
- [ ] Was it recognized that items classified as `fixed_operating_cost` are included in neither MODE A calculation (Gross Profit, Contribution Margin) — reserved for the future BEP module only?
- [ ] Was only one of `amount` (money) or `rate` (percentage) filled in? (Do not meaningfully fill in both values at once)
- [ ] For rate-based items, was `basis` confirmed as `rate_of_net_sales` (net sales excluding VAT) or `rate_of_gross_payment` (actual amount paid including VAT)?
- [ ] For items with `applies_to_component = "shared"`, was `allocation_rule` confirmed?
  - `blended_only`: excluded from this component's calculation (normal)
  - `by_component_revenue` / `fixed_share`: treated as `UNKNOWN` for this component (requires the future blended module)
  - `direct`: setting this on a `shared` item causes `ERROR` — it must be re-entered as a non-shared item, or `allocation_rule` corrected
  - Not specified: treated as `UNKNOWN`

## 5. Final Check of Unconfirmed Items

- [ ] For any of the above items whose value is unknown, was it left blank (null) rather than filled with an estimate?
- [ ] For any items left blank, has it been anticipated which metrics (`actual_price_ex_vat`, `direct_cost_total`, `gross_profit`, `gross_profit_rate`, `variable_cost_total`, `contribution_margin`, `contribution_margin_rate`) will come out as `UNKNOWN`?

---

Even after filling out the entire checklist, if blanks (null) remain in some items, that is not an error — it is the normal state that lets MODE A distinguish between "a value that hasn't been confirmed" and "a confirmed zero." Until the relevant item is confirmed, the associated metric will be reported as `UNKNOWN`.

## Source Map

- Harness: docs/features/mode_a_current_price/SPEC.md ("Inputs consumed" section)
