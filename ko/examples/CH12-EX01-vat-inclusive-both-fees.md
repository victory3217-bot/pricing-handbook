# CH12-EX01. VAT 포함 표시가격 + 두 종류 수수료가 함께 있는 경우

- **관련 Chapter**: CH12. MODE C — 허용원가 역산
- **관련 Tool**: MODE C (`core/engine/modes/mode_c.py`, `run_mode_c`)
- **출처**: docs/features/mode_c_allowable_cost/CASE.md, TC5 (가상 데이터, `client_id: sample_co_epsilon` — 실존 기업 아님)

## 무엇을 설명하는 사례인가

MODE C의 허용원가 공식이 (1) VAT 포함 표시가격, (2) 순매출 기준 수수료(b), (3) 총지불액 기준 수수료(a), (4) 고정 금액 비용(F)이 동시에 존재할 때 어떻게 계산되는지 보여준다. 또한 계산 결과가 자체 검산(expected_contribution_margin_rate)을 통해 목표 CM율과 정확히 일치함을 확인하는 예시다.

## 입력값

| 항목 | 값 |
|---|---|
| price_includes_vat | true |
| target_market_price | 110,000 (VAT 포함, 즉 G) |
| vat_rate (v) | 0.10 |
| target_contribution_margin_rate (t) | 0.3 |
| b (rate_of_net_sales 합) | 0.1 |
| a (rate_of_gross_payment 합) | 0.03 |
| F (고정 금액 variable_selling_delivery 합) | 1,000 |

## 계산 과정

```
price_includes_vat = true 이므로:
  G = target_market_price = 110,000
  N = G / (1+v) = 110,000 / 1.1 = 100,000

D = 1 − t − b − a×(1+v)
  = 1 − 0.3 − 0.1 − 0.03×1.1
  = 0.567

ADC = N × D − F
    = 100,000 × 0.567 − 1,000
    = 56,700 − 1,000
    = 55,700
```

## 검산

```
aG = 0.03 × 110,000 = 3,300
CM = N − ADC − F − bN − aG
   = 100,000 − 55,700 − 1,000 − 10,000 − 3,300
   = 30,000
CMR = 30,000 / 100,000 = 0.30 = t  ✓
```

## 결과

| Metric | 값 | 상태 |
|---|---|---|
| market_net_sales_ex_vat (N) | 100,000 | OK |
| market_gross_payment_incl_vat (G) | 110,000 | OK |
| allowable_direct_cost (ADC) | 55,700 | OK |
| expected_contribution_margin | 30,000 | OK |
| expected_contribution_margin_rate | 0.30 | OK |

## 참고 (표시가격 방식은 결과를 바꾸지 않는다)

CASE.md의 TC6은 동일한 경제 구조(N=100,000, G=110,000)를 `price_includes_vat=false`(VAT 제외 표시)로 입력한 경우로, ADC가 동일하게 55,700이 나온다. 이는 VAT 표시 방식(포함/제외)이 실제 허용원가 자체를 바꾸지 않는다는 것을 보여준다 — MODE A/B에서 이미 확립된 원칙이 MODE C에서도 동일하게 유지된다.
