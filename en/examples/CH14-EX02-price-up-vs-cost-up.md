# CH14-EX02. Scenario Comparison: Price +10% vs. Direct Cost +10%

- **Related Chapter**: CH14. Scenario Compare (§10 Deep Dive)
- **Related Tool**: Scenario Compare (`run_scenario_compare`). This case calculates the same formulas by hand.
- **Source**: Standard Lecture Plan 3-1-09 (Integrated case practice, Problems 1, 4, and 5). Hypothetical data for teaching [Practice-only hypothetical data]; not actual company data. The baseline is the same as CH13-EX03.

## Inputs (baseline)

| Item | Value |
|---|---|
| Selling price | 33,000 KRW (VAT 10% inclusive) |
| Direct cost | 9,800 KRW |
| Payment fee | 2.8% of the amount actually paid (changes along with the price if the price changes) |
| Delivery | 3,200 KRW |
| Monthly fixed operating cost | 1,200,000 KRW |

Scenario S1 raises only the selling price by 10% to 36,300 KRW, and scenario S2 raises only the direct cost by 10% to 10,780 KRW. Everything else is the same in all scenarios.

## Think it through

1. Work out the baseline's net sales, contribution margin, contribution margin rate, and break-even quantity.
2. Work out the same four values for each of S1 and S2, and the four deltas versus the baseline.
3. Can you say in numbers which one "hurts" more? Does Scenario Compare answer this question?

<details>
<summary>Show answer and walkthrough</summary>

## Calculation

```
Baseline  N = 30,000   Variable cost = 33,000×2.8% + 3,200 = 4,124
          CM = 30,000 − 9,800 − 4,124 = 16,076 (53.6%)    Q_BEP = 1,200,000 / 16,076 ≈ 74.6
S1        N = 36,300 / 1.1 = 33,000   Variable cost = 36,300×2.8% + 3,200 = 4,216.4
          CM = 33,000 − 9,800 − 4,216.4 = 18,983.6 (57.5%)    Q_BEP ≈ 63.2
S2        N = 30,000   Variable cost = 4,124
          CM = 30,000 − 10,780 − 4,124 = 15,096 (50.3%)       Q_BEP ≈ 79.5
```

| Delta (vs. baseline) | S1 (price +10%) | S2 (direct cost +10%) |
|---|---|---|
| `net_sales_ex_vat_delta` | +3,000 | 0 |
| `contribution_margin_delta` | +2,907.6 | −980 |
| `contribution_margin_rate_delta` | about +3.9%p | about −3.3%p |
| `break_even_quantity_delta` | about −11.4 units | about +4.8 units |

## Interpretation

- In S1, net sales rise by 3,000 KRW but contribution margin rises by only 2,907.6 KRW. This is because the payment fee, proportional to the amount actually paid, grows along with it. When raising a price, the price-proportional costs must be calculated with the changed values too, for the delta to be right.
- S2 has a net sales delta of 0, but contribution margin and break-even get worse. A delta of 0 can mean not "nothing changed" but that the metric is unrelated to the changed field (CH14 §7).
- Even for the same 10%, the direction is opposite and the size differs. A price +10% reduces break-even by about 11.4 units, and a cost +10% increases it by about 4.8 units.
- Scenario Compare does not recommend which is better. Whether the sales quantity stays the same after a 10% price increase is an assumption this calculation does not cover (a scenario does not change `planned_quantity`), and for profit at a different quantity, Volume Profit (CH13) must be run separately with a changed planned sales quantity.

</details>

Source: Standard Lecture Plan 3-1-09 (Integrated case practice, Problems 1, 4, and 5). [Practice-only hypothetical data]
