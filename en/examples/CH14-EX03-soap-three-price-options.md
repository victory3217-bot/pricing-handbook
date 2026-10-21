# CH14-EX03. Comparing Three Price Options — Break-Even and Operating Profit of a Soap Set

- **Related Chapter**: CH14. Scenario Compare (§10 Deep Dive), CH13
- **Related Tool**: Scenario Compare (break-even comparison), Volume Profit (operating profit, CH13). This case calculates the same formulas by hand.
- **Source**: Standard Lecture Plan 3-1-02 (MODE A/B/C, break-even, scenarios, and price validation, Practice 3). A hypothetical teaching case [Practice-only hypothetical data]; not values of an actual industry.

## Inputs

| Item | Value |
|---|---|
| Product | Handmade soap 3-piece set |
| Selling price options | 15,000 KRW / 18,000 KRW / 21,000 KRW (all VAT 10% inclusive) |
| Direct cost | 5,500 KRW |
| Channel fee | 8% of net sales |
| Payment fee | 3% of the amount actually paid (selling price) |
| Delivery | 3,000 KRW |
| Monthly fixed operating cost | 400,000 KRW |
| Planned sales quantity | 180 sets a month (the same for all three options) |

Cost, fee rates, and fixed cost are left as they are; only the price changes. Fees are proportional to the price, so the amounts differ by option.

## Think it through

1. For each price option, work out the contribution margin, contribution margin rate, break-even quantity, operating profit at 180 sets a month, and margin of safety (quantity).
2. Can you just pick the option with the highest operating profit? Write your reason.
3. To earn at the other two prices the operating profit earned at 180 sets in the 18,000 KRW option, how many sets a month must be sold? (Let us call this quantity the "maintenance sales quantity.")

<details>
<summary>Show answer and walkthrough</summary>

## Calculation

```
N = P / 1.1
Variable cost = N×8% + P×3% + 3,000
CMu = N − 5,500 − variable cost
Q_BEP = 400,000 / CMu
Operating profit = CMu × 180 − 400,000
Margin of safety = 180 − Q_BEP
Maintenance sales quantity = (400,000 + 682,618) / CMu     (based on the 682,618 KRW operating profit in the 18,000 KRW option)
```

| Item | 15,000 KRW | 18,000 KRW | 21,000 KRW |
|---|---|---|---|
| Net sales (N) | 13,636.36 | 16,363.64 | 19,090.91 |
| Variable cost | 4,540.91 | 4,849.09 | 5,157.27 |
| Contribution margin | 3,595.45 | 6,014.55 | 8,433.64 |
| Contribution margin rate | 26.4% | 36.8% | 44.2% |
| Break-even quantity | 111.3 sets | 66.5 sets | 47.4 sets |
| Operating profit at 180 sets a month | 247,182 | 682,618 | 1,118,055 |
| Margin of safety (quantity) | 68.7 sets | 113.5 sets | 132.6 sets |
| Maintenance sales quantity | 301.1 sets | 180.0 sets | 128.4 sets |

## Interpretation

- At the same 180 sets, the higher the price, the larger the operating profit. But "21,000 KRW is the answer" does not follow. The assumption itself that the sales quantity stays the same when the price rises is a verification target.
- The maintenance sales quantity lets you read this assumption backwards. Cutting to 15,000 KRW requires about 301 sets (about 1.7 times) for the same operating profit, and at 21,000 KRW the same operating profit holds even if the quantity falls to about 128 sets. An option that raises the price asks "how far can the sales quantity fall and still hold up," and an option that lowers it asks "how much must the sales quantity grow."
- The break-even quantity can be read from Scenario Compare's delta, but operating profit and the maintenance sales quantity are calculations that take the quantity as an input, so they are obtained by running Volume Profit (CH13) separately for each option (CH14 §6).
- Demand response is an assumption, not a calculation. Which price's quantity assumption to check in the market leads on to the validation design of CH15.

</details>

Source: Standard Lecture Plan 3-1-02 (MODE A/B/C, break-even, scenarios, and price validation, Practice 3). [Practice-only hypothetical data]
