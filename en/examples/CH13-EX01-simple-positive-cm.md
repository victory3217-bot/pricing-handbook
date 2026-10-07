# CH13-EX01. BEP Calculation Example — Simple Positive Contribution Margin Case

- **Related Chapter**: CH13. BEP — Break-Even Point
- **Related Tool**: BEP (`core/engine/modes/bep.py`, `run_bep`)
- **Source**: `docs/features/bep/CASE.md`, TC1 ("simple positive CM"). A hand-calculation verification case using hypothetical data (`client_id: sample_co_zeta`) — not actual client data.

## Inputs

| Item | Value |
|---|---|
| N (net_sales_ex_vat) | 1,000 |
| product_service_direct_cost (direct_cost) | 400 |
| variable_selling_delivery (fixed-amount item) | 100 |
| fixed_operating_cost (component-scoped, applies_to_component: "main") | 50,000 |
| fixed_operating_cost.basis | per_month |

## Exercise

Using the inputs above, work out the following yourself.

1. What is the contribution margin per unit (CMu)?
2. What is the break-even sales quantity (Q_BEP) that recovers the monthly fixed operating cost?
3. For which period should this quantity be read?

<details>
<summary>Show answer and walkthrough</summary>

## What This Example Illustrates

This example shows the most basic normal path of the BEP calculation (CMu > 0, FC > 0). It demonstrates how the formula `Q_BEP = FC / CMu` produces a normal break-even sales quantity when the per-unit contribution margin is positive and fixed operating cost exists.

## Calculation

```
CMu = N − direct_cost − variable_cost_total
    = 1,000 − 400 − 100
    = 500

FC = 50,000 (component-scoped, OK)

Q_BEP = FC / CMu
      = 50,000 / 500
      = 100
```

## Result

- `contribution_margin_per_unit` = 500, status: **OK**
- `fixed_operating_cost` = 50,000, status: **OK**
- `break_even_quantity_exact` = **100**, status: **OK**
- module status: **OK**

## Interpretation

At the current price (N=1,000) and cost structure (direct cost 400, variable cost 100), this component earns a per-unit contribution margin of 500. To recover the monthly fixed operating cost of 50,000, 100 units must be sold per month to reach break-even. Since `basis: "per_month"`, this 100 units should be interpreted as a "monthly" sales target — the `unit` of `break_even_quantity_exact` is simply a quantity unit ("units") and does not represent a period; quantity and period (analysis_period_basis) are treated as separate pieces of information (see SPEC.md §4 REVISED).

</details>
