# CH13-EX04. Target Sales Quantity Calculation — Monthly Minimum Sales Target for a Hypothetical Cafe

- **Related Chapter**: CH13. BEP — Break-Even Point (§10 Deep Dive)
- **Related Tool**: None (manual calculation. It applies the same formula as BEP, `FC / CMu`, but the product mix is calculated as a simple weighted average and is not a calculation defined by the Harness.)
- **Source**: The calculation framework of the workshop teaching material cited by Standard Lecture Plan 3-1-10 (AI-assisted cost management and revenue model workshop, section E). A hypothetical teaching cafe [Practice-only hypothetical data]; not figures of an actual business.

## Inputs

| Item | Value |
|---|---|
| Total monthly fixed cost | 5,900,000 KRW |
| Desired monthly net profit | 500,000 KRW |

| Product | Selling price | Variable cost per unit |
|---|---|---|
| Coffee | 5,000 KRW | 2,000 KRW |
| Sandwich | 7,500 KRW | 3,100 KRW |
| Dessert | 6,000 KRW | 2,100 KRW |

The selling prices are read as VAT-exclusive values (the workshop source does not address VAT. If they are VAT-inclusive, VAT must be subtracted first). The monthly sales mix is assumed to be coffee 60 : sandwich 25 : dessert 15.

## Think it through

1. How much money is actually left (profit) per unit of each product?
2. If only coffee is sold, what are the monthly minimum sales quantity that recovers fixed costs and the sales quantity with the 500,000 KRW net profit added?
3. If the three products are sold in the above sales mix, what are the average profit per unit, the monthly minimum sales quantity, and the quantity of each product?
4. What kind of number is this quantity?

<details>
<summary>Show answer and walkthrough</summary>

## Calculation

```
Profit per unit = selling price − variable cost per unit
  Coffee       5,000 − 2,000 = 3,000
  Sandwich     7,500 − 3,100 = 4,400
  Dessert      6,000 − 2,100 = 3,900

Coffee only
  Minimum sales quantity            = 5,900,000 / 3,000            ≈ 1,966.7 cups (rounded up: 1,967 cups)
  Quantity including net profit     = (5,900,000 + 500,000) / 3,000 ≈ 2,133.3 cups (rounded up: 2,134 cups)
  Target revenue incl. net profit   = 2,133.3 × 5,000              ≈ 10,666,667 KRW

Product mix (60 : 25 : 15)
  Average profit per unit = 0.60×3,000 + 0.25×4,400 + 0.15×3,900 = 1,800 + 1,100 + 585 = 3,485
  Minimum sales quantity  = 5,900,000 / 3,485                    ≈ 1,693 units
  By product              Coffee about 1,016 / Sandwich about 423 / Dessert about 254
```

## Interpretation

- "Monthly minimum sales target = monthly fixed cost ÷ actual profit per unit" is the same formula as BEP's `Q_BEP = FC / CMu`. Profit per unit is the value with only variable cost subtracted, so it corresponds to contribution margin.
- This quantity is the minimum target needed to survive. To also earn net profit, add the net profit to the fixed cost and apply the same formula.
- When the share of higher-margin products grows, the average profit per unit rises and the required quantity falls (1,967 cups when selling only coffee, 1,693 units with the mix). The mix is an assumption, not a forecast.
- The calculation treats fixed cost as the same even if the sales quantity changes. If fixed and variable costs are mixed together, this formula does not hold.
- Whether this quantity can actually be sold is a separate matter. Verify it separately with the Qty estimation basis by transaction type (CH13 §7, KM062).

</details>

Source: Standard Lecture Plan 3-1-10 (AI-assisted cost management and revenue model workshop, section E). [Practice-only hypothetical data]
