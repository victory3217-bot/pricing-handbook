# CH12 MODE C Allowable Cost Calculation Worksheet

> Related Chapter: CH12. MODE C — Allowable Cost Reverse Calculation
> Related Tool: MODE C (`core/engine/modes/mode_c.py`, `run_mode_c`)
> Source: docs/features/mode_c_allowable_cost/SPEC.md (Client Input items §1, symbols §2, output metrics §12)

This worksheet uses only the input/output items defined in SPEC.md. Do not add items that are not listed here.

---

## 1. Subject Information

| Item | Value |
|---|---|
| Client / Project Name | |
| Component ID (price_components[].component_id) | |
| Date Prepared | |

## 2. Input Values (Client Input)

### 2-1. Market Price (product.price_components[])

| Field | Value | Notes |
|---|---|---|
| target_market_price (market price, effective price with discount applied) | | Not the list price. E.g., list price 100,000 × 10% discount → enter 90,000 |
| price_includes_vat (true/false) | | If true, the value above is VAT-inclusive; if false, VAT-exclusive |
| currency | | |

### 2-2. Tax Rate (tax)

| Field | Value |
|---|---|
| vat_rate (v) | |

### 2-3. Targets (targets)

| Field | Value | Valid Range |
|---|---|---|
| target_contribution_margin_rate (t) | | 0 ≤ t < 1 (t=1 or higher is an ERROR) |

### 2-4. Non-Product Variable Costs (costs.items[], cost_category = variable_selling_delivery)

Enter only items that apply to this component or as shared. If there are no such items, F/b/a are each treated as a confirmed 0.

| item_id | basis (amount / rate_of_net_sales / rate_of_gross_payment) | Amount or Rate | applies_to_component | allocation_rule (if shared) |
|---|---|---|---|---|
| | | | | |
| | | | | |
| | | | | |

- F = sum of items entered as amounts
- b = sum of rates for items with basis=rate_of_net_sales
- a = sum of rates for items with basis=rate_of_gross_payment

### 2-5. Actual Direct Cost (costs.items[], cost_category = product_service_direct_cost) — Optional

Enter this if you want to calculate `direct_cost_gap`. It is not used in the ADC calculation itself.

| item_id | Amount | applies_to_component |
|---|---|---|
| | | |
| | | |

---

## 3. Calculation (Derivation)

1. N (market_net_sales_ex_vat) = ______________
2. G (market_gross_payment_incl_vat) = ______________
3. D = 1 − t − b − a×(1+v) = ______________
4. ADC (allowable_direct_cost) = N×D − F = ______________
5. actual_direct_cost (sum from 2-5) = ______________
6. direct_cost_gap = ADC − actual_direct_cost = ______________
7. expected_contribution_margin = N − ADC − F − b×N − a×G = ______________
8. expected_contribution_margin_rate = (7) ÷ N = ______________ (must match t)

## 4. Output Results Summary (Output Metrics)

| Metric | Value | Status (OK / UNKNOWN / ERROR) |
|---|---|---|
| market_net_sales_ex_vat (N) | | |
| market_gross_payment_incl_vat (G) | | |
| allowable_direct_cost (ADC) | | |
| actual_direct_cost | | |
| direct_cost_gap | | |
| expected_contribution_margin | | |
| expected_contribution_margin_rate | | |

## 5. Determination Notes

- [ ] Is ADC negative? → If negative, this is not a "calculation error" but a definitive diagnosis that "the target cannot be reached under current conditions." A choice must be made among reconsidering the target rate, renegotiating fees, or reconsidering the price point.
- [ ] Is direct_cost_gap negative? → The current cost has already exceeded the allowable cost.
- [ ] Is a > 0 while vat_rate is empty? → In this case, ADC is UNKNOWN (because G is required).
