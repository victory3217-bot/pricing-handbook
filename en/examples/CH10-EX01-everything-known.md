# CH10-EX01. Case 1 — Everything Known (Premium Tumbler)

- Related Chapter: CH10 (MODE A — Current Price Diagnosis)
- Related Tool: MODE A (`core/engine/modes/mode_a.py`, `run_mode_a`)
- Data source: `docs/features/mode_a_current_price/CASE.md` "Case 1 — everything known" (fictional data, `client_id: sample_co_alpha`, not an actual client)

## Case Data

Sample Co. Alpha sells a "premium tumbler" at **35,000 KRW** (a VAT-inclusive display price). VAT rate 10%. Cost breakdown:
- Direct cost: materials 12,000 KRW, packaging 1,500 KRW
- Variable cost: PG fee at 2.5% of the gross payment amount, shipping 3,000 KRW

## Exercise

Using the case data above, work out the following yourself.

1. What is net sales excluding VAT?
2. What are Gross Profit and Contribution Margin (amount and rate)?
3. On which amount should the PG fee be calculated, and what does it come to?

<details>
<summary>Show answer and walkthrough</summary>

## What This Case Illustrates

A normal case where every input value (price, VAT status, direct cost, variable cost) is confirmed, and MODE A produces all 7 metrics as `OK`, with no warnings. It shows that Gross Profit and Contribution Margin are different numbers, and that a rate-based cost (the PG fee) is calculated on the basis of the gross payment amount, not net sales excluding VAT.

## Calculation Steps

| Step | Calculation | Result |
|---|---|---|
| Net sales excluding VAT | 35,000 ÷ 1.10 | **31,818.18** |
| Total direct cost | 12,000 + 1,500 | **13,500** |
| **Gross Profit** | 31,818.18 − 13,500 | **18,318.18 (57.6%)** |
| PG fee | 35,000 × 2.5% | 875 |
| Total variable cost | 875 + 3,000 | **3,875** |
| **Contribution Margin** | 18,318.18 − 3,875 | **14,443.18 (45.4%)** |

All 7 metrics are `status: "OK"`, with no warnings. Because every dependent value is confirmed, the engine trusts and outputs every number as-is.

Note: the PG fee is calculated not on net sales excluding VAT (31,818.18) but on the full gross payment amount (35,000, the amount actually charged). This difference in basis connects to the `basis` (rate_of_net_sales vs. rate_of_gross_payment) discussion in CH10 Sections 4 and 5.

</details>
