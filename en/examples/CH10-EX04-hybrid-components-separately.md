# CH10-EX04. A Product with Hardware and a Subscription: Calculate by Component, Separately

- Related Chapter: CH10. MODE A — Current Price Diagnosis
- Related MN/KM: MN06 / KM044~KM046

## Think it through

[Practice-only hypothetical data] A product is sold with sensor hardware and a subscription service together. The VAT rate is 10% and both prices include VAT.

| Component | Selling price | Direct cost | Variable cost |
|---|---|---|---|
| Hardware | 220,000 KRW | 110,000 KRW | Delivery 8,000 KRW |
| Subscription (monthly) | 22,000 KRW | 3,000 KRW | Payment fee 3% of the gross payment |

1. Find the Contribution Margin and Contribution Margin rate for each component.
2. May the two Contribution Margins be added or averaged and reported as "this product's Contribution Margin rate"?
3. If this product has a shared cost that cannot be split among any component, how does MODE A handle it?

<details>
<summary>Show answer and walkthrough</summary>

1. Hardware: net sales 220,000 ÷ 1.10 = 200,000 KRW, Contribution Margin = 200,000 − 110,000 − 8,000 = 82,000 KRW (41.0%). Subscription: net sales 22,000 ÷ 1.10 = 20,000 KRW, fee = 22,000 × 3% = 660 KRW, Contribution Margin = 20,000 − 3,000 − 660 = 16,340 KRW (81.7%).
2. No. MODE A does not mix components and calculates each one separately; a combined whole-contract view of several components is not yet implemented (CH10 §6). Averaging 41% and 82% helps neither price decision.
3. A shared cost enters the calculation only when the allocation rule is supported. `blended_only` is excluded from MODE A, B and C; `by_component_revenue`, `fixed_share`, or an unspecified rule makes the affected metric UNKNOWN; and `direct` is contradictory in meaning and so is ERROR (CH12 §6). The handbook does not define how to split a shared cost among components.

- What this case illustrates: When there are two or more components, the unit of calculation is the component, and an average does not help decision-making. The numbers are illustrative assumptions, not real industry values.

</details>

Source: Standard Lecture Plan 3-1, reading the calculator (hypothetical hybrid, [Practice-only hypothetical data], verified in Python).
