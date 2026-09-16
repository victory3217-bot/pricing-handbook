# CH13 BEP Calculation Worksheet

This worksheet follows exactly the input/output structure for the BEP (Break-Even Point) calculation as defined by `docs/features/bep/SPEC.md`. It includes only the fields actually defined in SPEC.md, and should be filled in the order below for practical use.

## 0. Preliminary Check — Number of Components

- [ ] How many `price_components` does this product have? ______
  - If two or more, it cannot be calculated with BEP v0.1 (`MULTI_COMPONENT_BEP_NOT_SUPPORTED`). Fill in the items below only for a **single component**.

## 1. Price Input (Component: ______________ )

| Item | Value |
|---|---|
| actual_price (current actual selling price) | |
| price_includes_vat (whether VAT is included, true/false) | |
| tax.vat_rate (VAT rate, if needed) | |
| → N (net_sales_ex_vat, net sales excluding VAT) | |

## 2. Contribution Margin Input

| Item | Value |
|---|---|
| Total product_service_direct_cost (direct cost) | |
| Total variable_selling_delivery (variable cost) | |
| → CMu = N − direct_cost − variable_cost_total | |
| CMu status (OK / UNKNOWN / ERROR) | |

If CMu is 0 or less, the result is determined according to the table below (proceed to item 3).

## 3. Fixed Operating Cost (fixed_operating_cost) Input

Enter the following for each fixed_operating_cost item.

| item_id | amount | currency | basis | applies_to_component | allocation_rule (if shared) |
|---|---|---|---|---|---|
| | | | | | |
| | | | | | |

- [ ] Is the `basis` the same across all items? (If not, `INCONSISTENT_FIXED_COST_BASIS` → ERROR)
- [ ] Is there an item with a negative amount? (If so, `INVALID_NEGATIVE_COST` → ERROR)
- [ ] Is the allocation_rule of a shared item `direct`? (If so, `INVALID_ALLOCATION_CONFIGURATION` → ERROR)
- [ ] Is the allocation_rule of a shared item `blended_only`? (If so, `FIXED_COST_BLENDED_ONLY_NOT_ALLOCATED` → UNKNOWN)
- [ ] Is the allocation_rule of a shared item `by_component_revenue`/`fixed_share`/unspecified? (If so, `UNSUPPORTED_SHARED_COST_ALLOCATION` → UNKNOWN)

→ FC (total fixed_operating_cost): ______________
→ FC status (OK / UNKNOWN / ERROR): ______________
→ analysis_period_basis (the analysis period FC belongs to, e.g. per_month): ______________

## 4. Break-Even Sales Quantity Calculation

| CMu | FC | break_even_quantity_exact | Notes |
|---|---|---|---|
| > 0 | > 0 | FC / CMu | Normal calculation |
| > 0 | = 0 | 0 | No fixed cost — break-even from the first unit |
| = 0 | either | NOT_APPLICABLE | BREAK_EVEN_UNDEFINED_ZERO_MARGIN(_ZERO_FIXED_COST) |
| < 0 | either | NOT_APPLICABLE | BREAK_EVEN_UNDEFINED_NEGATIVE_MARGIN |

- Q_BEP = ______________ (unit: units, exact value, not rounded)
- Analysis period this figure applies to: ______________ (same as analysis_period_basis in item 3)
- module status (OK / INCOMPLETE / ERROR): ______________

## 5. Warnings and Notes

- [ ] Record the warnings codes and messages produced: ______________
- [ ] Decide separately whether to round up when presenting Q_BEP in a practical report as "how many units must be sold" (the engine itself does not round, SPEC.md §8).
- [ ] Separately review whether Q_BEP is actually achievable for this product's transaction type (B2C/B2B/B2G).
