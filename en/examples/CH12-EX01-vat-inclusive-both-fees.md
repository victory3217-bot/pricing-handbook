# CH12-EX01. VAT-Inclusive Displayed Price + Both Fee Types Present

- **Related Chapter**: CH12. MODE C — Allowable Cost Reverse Calculation
- **Related Tool**: MODE C (`core/engine/modes/mode_c.py`, `run_mode_c`)
- **Source**: docs/features/mode_c_allowable_cost/CASE.md, TC5 (hypothetical data, `client_id: sample_co_epsilon` — not a real company)

## What This Example Illustrates

This example shows how MODE C's allowable-cost formula is calculated when (1) a VAT-inclusive displayed price, (2) a fee based on net sales (b), (3) a fee based on gross payment (a), and (4) a fixed-amount cost (F) are all present at the same time. It also confirms, via the self-check (expected_contribution_margin_rate), that the calculated result matches the target CM rate exactly.

## Input Values

| Item | Value |
|---|---|
| price_includes_vat | true |
| target_market_price | 110,000 (VAT-inclusive, i.e., G) |
| vat_rate (v) | 0.10 |
| target_contribution_margin_rate (t) | 0.3 |
| b (sum of rate_of_net_sales) | 0.1 |
| a (sum of rate_of_gross_payment) | 0.03 |
| F (sum of fixed-amount variable_selling_delivery) | 1,000 |

## Calculation Process

```
Since price_includes_vat = true:
  G = target_market_price = 110,000
  N = G / (1+v) = 110,000 / 1.1 = 100,000

D = 1 − t − b − a×(1+v)
  = 1 − 0.3 − 0.1 − 0.03×1.1
  = 0.567

ADC = N × D − F
    = 100,000 × 0.567 − 1,000
    = 56,700 − 1,000
    = 55,700
```

## Self-Check

```
aG = 0.03 × 110,000 = 3,300
CM = N − ADC − F − bN − aG
   = 100,000 − 55,700 − 1,000 − 10,000 − 3,300
   = 30,000
CMR = 30,000 / 100,000 = 0.30 = t  ✓
```

## Result

| Metric | Value | Status |
|---|---|---|
| market_net_sales_ex_vat (N) | 100,000 | OK |
| market_gross_payment_incl_vat (G) | 110,000 | OK |
| allowable_direct_cost (ADC) | 55,700 | OK |
| expected_contribution_margin | 30,000 | OK |
| expected_contribution_margin_rate | 0.30 | OK |

## Note (the display method does not change the result)

CASE.md's TC6 enters the same underlying economics (N=100,000, G=110,000) with `price_includes_vat=false` (VAT-exclusive display), and produces the same ADC of 55,700. This shows that the VAT display method (inclusive/exclusive) does not change the actual allowable cost itself — a principle already established in MODE A/B that holds equally in MODE C.
