# CH11-EX02. What Price Leaves a 55% Contribution Margin Rate?

- Related Chapter: CH11. MODE B — Target Price Reverse Calculation
- Related MN/KM: MN06 / KM046, KM047

## Think it through

[Practice-only hypothetical data] For the product in CH10-EX03 (direct cost 9,800 KRW, parcel delivery 3,200 KRW, payment fee 2.8% of the gross payment, VAT rate 10%), the target Contribution Margin rate is set at 55%. The target rate is a practice assumption.

1. What is the denominator D = 1 − t − b − a(1+v)? Does it fall to 0 or below?
2. What are the target net sales N and the target total payment G (including VAT)?
3. What conclusion do you reach when comparing with the current selling price of 33,000 KRW? Verify the Contribution Margin rate at this price.

<details>
<summary>Show answer and walkthrough</summary>

C = 9,800 + 3,200 = 13,000 KRW, b = 0, a = 0.028, v = 0.10, t = 0.55.

1. D = 1 − 0.55 − 0 − 0.028 × 1.10 = 0.4192. It is greater than 0, so it is not an ERROR.
2. N = 13,000 ÷ 0.4192 = 31,011.45 KRW, G = N × 1.10 = 34,112.60 KRW (about 34,113 KRW).
3. It is about 1,113 KRW above the current 33,000 KRW. Since the current Contribution Margin rate in CH10-EX03 was 53.6%, this is the same conclusion as falling short of the 55% target. Check: at a price of 34,112.60 KRW, fee = 34,112.60 × 2.8% = 955.15 KRW, Contribution Margin = 31,011.45 − 9,800 − 955.15 − 3,200 = 17,056.30 KRW, Contribution Margin rate = 17,056.30 ÷ 31,011.45 = 55.0%. This calculation does not tell you whether customers will accept 34,113 KRW.

- What this case illustrates: See the MODE A result first, back-calculate the price the target rate requires under the same cost structure, and confirm with a check that the target rate comes back out.

</details>

Source: Standard Lecture Plan 3-1, integrated case exercise Problem 2 ([Practice-only hypothetical data], verified in Python). The calculation structure is the same as CH11-EX01.
