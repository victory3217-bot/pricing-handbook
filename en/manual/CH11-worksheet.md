# CH11 MODE B Target CM Rate Worksheet

> Related Chapter: CH11 — MODE B Target Price Reverse Calculation
> Basis: docs/features/mode_b_target_price/SPEC.md (Pricing Harness Internal Specification, Category B)

This worksheet organizes the inputs needed before running MODE B (target price reverse calculation) and helps review the calculation results. It uses only the inputs (Client Input) and outputs (Output metric) defined in SPEC.md — do not arbitrarily add items not found there.

## 1. Setting the Target

| Item | Value | Notes |
|---|---|---|
| Target Contribution Margin Rate (`t`) | ___ % | Be sure to record the basis below |
| Source of the target rate | □ Internal standard □ Investor requirement □ Industry benchmark □ Other ( ) | |
| Detailed explanation of the source | | MODE B does not validate whether this number is reasonable — this is the consultant's judgment call |

## 2. Component Identification

| Item | Value |
|---|---|
| `component_id` | |
| Product/service name | |

> Note: `target_contribution_margin_rate` is currently a single global value applied to the entire Client Input (per-component target rates are not supported).

## 3. Cost/Fee Structure Input (C, b, a)

**Fixed-amount costs (C = direct cost + amount-valued portion of variable cost)**

| item_id | Item name | Amount | Currency | applies_to_component |
|---|---|---|---|---|
| | | | | |
| | | | | |

> An item with `applies_to_component = "shared"` whose allocation rule (`allocation_rule`) is not yet determined is not calculated as 0 — instead, every related metric is marked UNKNOWN.

**Rate-based costs — net sales basis (b)**

| item_id | Item name | Rate |
|---|---|---|
| | | |

**Rate-based costs — gross payment basis (a)**

| item_id | Item name | Rate |
|---|---|---|

## 4. Tax and Display-Price Basis

| Item | Value |
|---|---|
| VAT rate (`v`) | ___ % (if unknown, mark "undetermined" — do not fill in 0) |
| Does the display price include VAT (`price_includes_vat`) | □ Included (true) □ Excluded (false) □ Undetermined |

> Whether the VAT rate is needed differs by metric. If even one gross-payment-based cost (`a`) exists, the VAT rate is required regardless of the display-price basis.

## 5. Discount Policy (Optional)

| Item | Value |
|---|---|
| Discount rate (`discount_rate`) | ___ % (if none, mark "none" — do not leave blank) |

## 6. Recording the MODE B Results

| Metric | Value | Status (OK / UNKNOWN / ERROR) |
|---|---|---|
| `denominator` (denominator D) | | |
| `required_net_sales_ex_vat` (target net sales, N) | | |
| `required_gross_payment_incl_vat` (target gross payment, G) | | |
| `required_selling_price` (target actual selling price) | | |
| `required_list_price` (target list price) | | |
| `expected_contribution_margin` (expected Contribution Margin) | | |
| `expected_contribution_margin_rate` (expected Contribution Margin Rate, self-check — must match `t`) | | |

## 7. Result Interpretation Checklist

- [ ] Is `denominator` an ERROR (≤ 0)? → If so, this is a definitive diagnosis that "no price can achieve the target under this cost/fee structure." Do not recalculate — reexamine the structure itself (cost/target rate/channel structure/product composition).
- [ ] Is there an UNKNOWN? → This is not a calculation failure but undetermined data. Check the table above to see which input is missing.
- [ ] Does the target list price differ greatly from the market price? → Refer to CH11 §7 Practical Checkpoints, and reexamine from a customer-value (KM046)/positioning (KM047) perspective.
- [ ] Does `expected_contribution_margin_rate` exactly match the input `t` (self-check)?
