# CH12-EX02. If the Market Price Is 29,000 KRW, How Much Direct Cost Can We Spend?

- Related Chapter: CH12. MODE C — Allowable Cost Reverse Calculation
- Related MN/KM: MN06 / KM054

## Think it through

[Practice-only hypothetical data] With the same selling and delivery cost structure as the product in CH10-EX03 (parcel delivery 3,200 KRW, payment fee 2.8% of the gross payment, VAT rate 10%), a competing product's actual transaction price is 29,000 KRW (including VAT). The target Contribution Margin rate is 50% and the actual direct cost is 9,800 KRW.

1. What are the market price's net sales N excluding VAT?
2. What is the allowable direct cost (ADC)?
3. What is the difference between the actual direct cost and the allowable cost (direct_cost_gap)? Which options can be considered?

<details>
<summary>Show answer and walkthrough</summary>

t = 0.50, b = 0, a = 0.028, F = 3,200 KRW, v = 0.10.

1. N = 29,000 ÷ 1.10 = 26,363.64 KRW.
2. D = 1 − 0.50 − 0.028 × 1.10 = 0.4692, ADC = N × D − F = 26,363.64 × 0.4692 − 3,200 = 9,169.82 KRW.
3. direct_cost_gap = 9,169.82 − 9,800 = −630.18 KRW. The actual cost exceeds the allowable cost by about 630 KRW. At this market price and target rate, you can consider lowering the sourcing unit price, renegotiating the payment fee or parcel delivery cost, revisiting the target rate, or revisiting the price range; the calculation does not decide which to choose. The allowable cost is calculated without reading the actual cost and is compared with it only at the end, as a difference.

- What this case illustrates: A target costing calculation that back-calculates the cost ceiling when the market price is set exogenously and compares it with the actual cost.

</details>

Source: Standard Lecture Plan 3-1, integrated case exercise Problem 3 ([Practice-only hypothetical data], verified in Python). The calculation structure is the same as CH12-EX01.
