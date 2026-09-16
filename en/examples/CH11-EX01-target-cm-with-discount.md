# CH11-EX01. Reverse-Calculating Price to Achieve a 30% Target CM Rate (with Discount)

- Related Chapter: CH11 — MODE B Target Price Reverse Calculation
- Related Tool: MODE B (`core/engine/modes/mode_b.py`, `run_mode_b`)
- Source: docs/features/mode_b_target_price/CASE.md (fictional data, `client_id: sample_co_delta`), consistent with SPEC.md TC4/TC6

## What This Example Illustrates

This example shows the procedure for reverse-calculating the required selling price by directly specifying a target Contribution Margin Rate, when the Contribution Margin Rate at the current price (confirmed via MODE A) falls short of investor expectations. It additionally shows that, when a standing discount policy exists, the "actual billed amount" and the "price to post on the list price sheet" differ. This example uses fictional data (Sample Co. Delta) and is not a real client case.

## Scenario

Sample Co. Delta sells a subscription service. Running MODE A showed that the Contribution Margin Rate at the current price fell short of investor expectations. Management set the target Contribution Margin Rate at 30% and asked, "So what price should we sell at?"

**Inputs**

- Total fixed-amount costs `C`: 10,000 (KRW)
- Channel fee `b`: 10% of net sales (`rate_of_net_sales`)
- PG (payment gateway) fee `a`: 3% of gross payment (`rate_of_gross_payment`)
- VAT `v`: 10%, display price includes VAT (`price_includes_vat = true`)
- Target Contribution Margin Rate `t`: 0.30

## Calculation

```
D = 1 − t − b − a(1+v) = 1 − 0.30 − 0.10 − 0.03×1.10 = 0.567
N = C / D = 10,000 / 0.567 = 17,636.68     (target net sales, VAT excluded)
G = N × (1+v) = 17,636.68 × 1.10 = 19,400.35   (target gross payment, VAT included)
```

Since the display-price basis includes VAT (`price_includes_vat = true`), `required_selling_price` follows G, not N.

**Self-check** (the value that should result when this price is fed back into MODE A)

```
CM = N − C − bN − aG = 17,636.68 − 10,000 − 1,763.67 − 582.01 = 5,291.01
CM / N = 5,291.01 / 17,636.68 = 0.30   → matches the target exactly
```

## MODE B Results

| Metric | Value |
|---|---|
| `required_net_sales` | 17,636.68 |
| `required_gross_payment` | 19,400.35 |
| `required_selling_price` ("target actual selling price") | 19,400.35 |
| `expected_contribution_margin` | 5,291.01 |
| `expected_contribution_margin_rate` | 0.30 |

## Extension — Applying the Discount Policy

Sample Co. Delta always sells at a standing 10% discount off the list price. The 19,400.35 obtained above is the "actual billed amount after discount," so the price to post on the list price sheet (target list price) must be higher than this.

```
required_list_price = required_selling_price / (1 − discount_rate)
                     = 19,400.35 / 0.90
                     = 21,555.95
```

**Consulting interpretation**: The catalog/list price sheet should post 21,555.95, and applying a 10% discount should bring the actual billed amount to 19,400.35, achieving the target 30% Contribution Margin Rate. You should not judge a price as "expensive" from the list price alone — you must confirm whether the target is achieved based on the actual billed amount.
