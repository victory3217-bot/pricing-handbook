# CH14-EX01. Price Increase Scenario vs. Baseline Comparison

- **Related Chapter**: CH14. Scenario Compare
- **Related Tool**: Scenario Compare (`core/engine/scenario_compare.py` / `run_scenario_compare`)
- **What this example illustrates**: How the MODE A/BEP results change, and how the difference (delta) is calculated, when comparing one baseline scenario against a variant scenario with a price increase. (Source: docs/features/scenario_compare/CASE.md, TC1 and TC2)

> This is sample data (`client_id: sample_co_eta`) — not real client data.

## Common Base Input

- `actual_price = 1000`, `price_includes_vat = false`, `vat_rate = 0.10`
- `direct_cost = 400`, `variable_fixed = 100`, `net_sales_fee_rate = 0`, `gross_payment_fee_rate = 0`
- `fixed_operating_cost = 50000` (component-scoped, basis: per_month)
- `target_contribution_margin_rate = 0.3`
- `target_market_price = 1000` (same component, `price_includes_vat = false`)

## Exercise

The baseline scenario (`A_baseline`) uses the common Base Input above as it is, and the variant scenario (`B_price_up`) changes only `actual_price` to 1200. Work out the following yourself.

1. What are the baseline scenario's contribution margin (CM), contribution margin rate (CMR), and break-even quantity (Q_BEP)?
2. What are the CM, CMR, and Q_BEP of the price-increase scenario?
3. What are the four deltas against the baseline (net sales, contribution margin, contribution margin rate, break-even quantity), and how can the effect of the price increase be interpreted?

<details>
<summary>Show answer and walkthrough</summary>

## TC1 — Baseline (`A_baseline`, no overrides)

This scenario is designated as-is as the `baseline_scenario_id`.

| Metric | Value |
|---|---|
| mode_a.contribution_margin (CM) | 500 |
| mode_a.contribution_margin_rate (CMR) | 0.5 |
| mode_b.required_selling_price | 571.43 |
| mode_c.allowable_direct_cost | 700 |
| bep.break_even_quantity_exact (Q_BEP) | 100 |
| scenario_status | OK |

Calculation: `N = 1000`, `direct = 400`, `variable = 100` → `CM = 500`, `CMR = 0.5`. BEP: `CMu = 500`, `FC = 50000` → `Q_BEP = 100`. MODE B (`t=0.3`): `D = 0.7` → `required_selling_price = 400/0.7 = 571.43`. MODE C (`target_market_price=1000, t=0.3`): `ADC = 1000×0.7 = 700`.

## TC2 — Price Increase (`B_price_up`, override: `actual_price = 1200`)

| Metric | Value |
|---|---|
| mode_a.contribution_margin (CM) | 700 |
| mode_a.contribution_margin_rate (CMR) | 0.583 |
| bep.break_even_quantity_exact (Q_BEP) | 71.43 |
| scenario_status | OK |

Calculation: `N = 1200` → `CM = 1200 − 400 − 100 = 700`, `CMR = 0.583`. BEP: `CMu = 700, FC = 50000` → `Q_BEP = 71.43`.

## Delta vs. Baseline (TC1)

| Delta Metric | Value | Status | Interpretation |
|---|---|---|---|
| net_sales_ex_vat_delta | +200 | OK | Net sales (excl. VAT) increased by 200 |
| contribution_margin_delta | +200 | OK | Contribution margin increased by 200 |
| contribution_margin_rate_delta | ≈ +0.083 | OK | Contribution margin rate improved by about 8.3 points |
| break_even_quantity_delta | ≈ −28.57 | OK | Break-even quantity decreased by about 28.57 — BEP improved |

This example shows the typical pattern where raising the price improves both contribution margin and contribution margin rate together, while the sales volume needed to break even decreases (BEP improves). All delta values are simple subtractions of MODE A's and BEP's existing outputs — Scenario Compare itself introduces no separate calculation formula.

</details>
