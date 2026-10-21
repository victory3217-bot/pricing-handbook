# CH13-EX03. Question-Bank Practice — Break-Even and Profit at 150 Units a Month for a 33,000 KRW Product

- **Related Chapter**: CH13. BEP — Break-Even Point (§10 Deep Dive)
- **Related Tool**: BEP (`run_bep`), Volume Profit (`run_volume_profit`)
- **Source**: Standard Lecture Plan 3-1-09 (Integrated case practice, Problems 1 and 4). Hypothetical data for teaching [Practice-only hypothetical data]; not actual company data. The formulas are the same as CH13 §4 and §6.

## Inputs

| Item | Value |
|---|---|
| Selling price | 33,000 KRW (VAT 10% inclusive) |
| Direct cost | 9,800 KRW |
| Payment fee | 2.8% of the amount actually paid (33,000 KRW) |
| Delivery | 3,200 KRW (per 1 unit sold) |
| Monthly fixed operating cost (FC) | 1,200,000 KRW (period basis: monthly) |
| Planned sales quantity | 150 units a month |

## Think it through

1. First work out the contribution margin per unit (CMu) and the contribution margin rate. (Net sales is the value with VAT subtracted.)
2. What is the break-even sales quantity (Q_BEP) that recovers the monthly fixed operating cost? How many units would you write in the report?
3. What is the operating profit of the plan to sell 150 units a month?
4. What is the margin of safety (quantity and rate), and how should it be read?

<details>
<summary>Show answer and walkthrough</summary>

## Calculation

```
N      = 33,000 / 1.1                    = 30,000
Variable cost = 33,000 × 2.8% + 3,200 = 924 + 3,200 = 4,124
CMu    = 30,000 − 9,800 − 4,124          = 16,076      (contribution margin rate 16,076 / 30,000 ≈ 53.6%)
Q_BEP  = 1,200,000 / 16,076              ≈ 74.65 units     (rounded up: 75 units)

operating_profit          = 16,076 × 150 − 1,200,000 = 2,411,400 − 1,200,000 = 1,211,400
margin_of_safety_quantity = 150 − 74.65             ≈ 75.35 units
margin_of_safety_rate     = 75.35 / 150             ≈ 50.2%
```

## Interpretation

- Break-even is about 74.65 units a month. The engine outputs the unrounded value, so the judgment to round up and write "75 units" is made at the reporting stage (CH13 §7).
- Selling 150 units a month gives an operating profit of 1,211,400 KRW. The plan is about twice break-even, so fixed cost is still recovered even if the sales quantity falls about 50% short of plan (down to about 74.65 units).
- This interpretation rests on the premise that 150 units sell. `planned_quantity` is just an input, not a demand forecast.
- If the 3,200 KRW delivery fee is entered as a per-order cost, the calculator assumes one unit sold per order, so metrics that depend on CMu are shown as `ESTIMATED` and an `ASSUMES_ONE_UNIT_PER_ORDER` warning is attached (CH13 §6). If many customers buy two or more units per order, actual operating profit is larger than this value.
- This problem has no selling costs other than fees and delivery, so nothing more was added to contribution margin. In a real business, first check that no cost is missing.

</details>

Source: Standard Lecture Plan 3-1-09 (Integrated case practice, Problems 1 and 4). [Practice-only hypothetical data]
