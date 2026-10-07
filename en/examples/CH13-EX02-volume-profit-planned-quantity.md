# CH13-EX02. Volume Profit Calculation Example — Operating Profit and Margin of Safety at 150 Units a Month

- **Related Chapter**: CH13. BEP — Break-Even Point
- **Related Tool**: Volume Profit (`core/engine/modes/volume_profit.py`, `run_volume_profit`)
- **Source**: `core/schemas/examples/valid/08_volume_profit.json` (input) and `core/schemas/examples/analysis_results/08_volume_profit.analysis_result.json` (result); specified in `docs/features/volume_profit/SPEC.md`. Hypothetical data for teaching (`client_id: sample_co_eta`) — not actual company data.

## Inputs

| Item | Value |
|---|---|
| Selling price (`actual_price`) | 20,000 (VAT-exclusive, `price_includes_vat: false`) |
| product_service_direct_cost (`material_cost`, `per_unit`) | 8,000 |
| variable_selling_delivery (`shipping`, **`per_order`**) | 2,000 |
| fixed_operating_cost (`fixed_ops`, component-scoped, `applies_to_component: "main"`) | 1,000,000 |
| fixed_operating_cost.basis | per_month |
| `sales_plan.planned_quantity` | 150 |
| `sales_plan.period_basis` | per_month |

It matters that the fixed operating cost is entered at component scope (`main`). If shared fixed cost were entered as `blended_only`, FC would be `UNKNOWN` and this calculation would not hold (see CH13 §4).

## Exercise

Using the inputs above, work out the following yourself.

1. What are the contribution margin per unit (CMu) and the break-even sales quantity (Q_BEP)?
2. For the plan of selling 150 units a month, what are total net sales, operating profit, and operating profit rate?
3. What is the margin of safety (quantity and rate), and how should it be read?
4. Why do the metrics carry the `ESTIMATED` status?

<details>
<summary>Show answer and walkthrough</summary>

## What This Example Illustrates

If BEP answers "how many units must be sold to stop losing money," this example shows how Volume Profit answers the next question: "if we sell the quantity we planned, how much is left, and how far above break-even is that plan?" The input is the same structure as CH13-EX01 (the normal BEP path) plus a monthly sales plan, `sales_plan` — the simplest complete-input case.

## Calculation

```
N     = 20,000                          (VAT-exclusive selling price)
CMu   = N − direct_cost − variable_cost
      = 20,000 − 8,000 − 2,000
      = 10,000
FC    = 1,000,000
Q_BEP = FC / CMu = 1,000,000 / 10,000 = 100

total_net_sales_ex_vat    = N × Q        = 20,000 × 150           = 3,000,000
total_contribution_margin = CMu × Q      = 10,000 × 150           = 1,500,000
operating_profit          = CMu × Q − FC = 1,500,000 − 1,000,000  =   500,000
operating_profit_rate     = 500,000 / 3,000,000                   ≈ 16.67%
margin_of_safety_quantity = Q − Q_BEP    = 150 − 100              =        50
margin_of_safety_rate     = 50 / 150                              ≈ 33.33%
```

## Results

- `total_net_sales_ex_vat` = 3,000,000, status: **OK**
- `total_contribution_margin` = 1,500,000, status: **ESTIMATED**
- `operating_profit` = **500,000**, status: **ESTIMATED**
- `operating_profit_rate` ≈ 0.1667, status: **ESTIMATED**
- `break_even_quantity_exact` = 100, status: **ESTIMATED**
- `margin_of_safety_quantity` = **50**, status: **ESTIMATED**
- `margin_of_safety_rate` ≈ 0.3333, status: **ESTIMATED**
- Warning: `ASSUMES_ONE_UNIT_PER_ORDER`
- module status: **OK**

For the same input, the BEP module reports `break_even_quantity_exact` = 100 with status **OK** — the same value.

## Interpretation

At the current price (N = 20,000) and cost structure, the contribution margin per unit is 10,000, and recovering the monthly fixed operating cost of 1,000,000 requires selling 100 units a month (BEP). If the plan is to sell 150 a month, monthly operating profit is 500,000, and the plan sits 50 units (about 33% of the plan) above break-even. That margin of safety can be read as: "even if sales fall about 33% short of the plan — down to 100 units — fixed costs are still recovered."

**Why the status is `ESTIMATED`.** The shipping cost is `per_order` (2,000 per order). Because Volume Profit calculates `CMu × Q`, it assumes one unit is sold per order for `per_order` costs. If customers buy two or more units in one order, shipping is overstated and the true operating profit may be higher than this figure. This does not mean the value is wrong; it marks that the value depends on this assumption. The same `Q_BEP` is reported as `OK` by BEP and `ESTIMATED` by Volume Profit because Volume Profit is the module that makes this assumption visible.

**What this example does not show.** `planned_quantity` is simply an input supplied from outside; whether that volume is actually achievable must be verified separately against the basis for determining Qty by transaction type (CH13 §7, KM062). The rules for a plan that falls short of break-even (a negative margin of safety with a `BELOW_BREAK_EVEN` warning) are described in CH13 §6, but the source material for this example contains no input or result for that case, so no figures are given for it.

</details>
