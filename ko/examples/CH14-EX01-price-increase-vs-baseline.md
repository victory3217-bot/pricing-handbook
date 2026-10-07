# CH14-EX01. 가격 인상 시나리오 vs Baseline 비교

- **관련 Chapter**: CH14. Scenario Compare — 시나리오 비교
- **관련 Tool**: Scenario Compare (`core/engine/scenario_compare.py` / `run_scenario_compare`)
- **무엇을 설명하는 사례인지**: 하나의 baseline 시나리오와 가격을 인상한 변형 시나리오를 비교할 때, MODE A/BEP 결과가 각각 어떻게 달라지고 그 차이(delta)가 어떻게 계산되는지 보여주는 사례. (출처: docs/features/scenario_compare/CASE.md, TC1 및 TC2)

> 가상 데이터입니다(`client_id: sample_co_eta`) — 실제 고객사 데이터가 아닙니다.

## 공통 Base Input

- `actual_price = 1000`, `price_includes_vat = false`, `vat_rate = 0.10`
- `direct_cost = 400`, `variable_fixed = 100`, `net_sales_fee_rate = 0`, `gross_payment_fee_rate = 0`
- `fixed_operating_cost = 50000` (component-scoped, basis: per_month)
- `target_contribution_margin_rate = 0.3`
- `target_market_price = 1000` (같은 component, `price_includes_vat = false`)

## 문제

기준 시나리오(`A_baseline`)는 위 공통 Base Input을 그대로 쓰고, 변형 시나리오(`B_price_up`)는 `actual_price`만 1200으로 바꿉니다. 직접 구해 보세요.

1. 기준 시나리오의 공헌이익(CM), 공헌이익률(CMR), 손익분기 수량(Q_BEP)은 얼마인가요?
2. 가격 인상 시나리오의 CM, CMR, Q_BEP는 얼마인가요?
3. 기준 대비 delta 4가지(순매출, 공헌이익, 공헌이익률, 손익분기 수량)는 얼마이고, 가격 인상의 효과를 어떻게 해석할 수 있나요?

<details>
<summary>정답과 풀이 보기</summary>

## TC1 — Baseline (`A_baseline`, override 없음)

이 시나리오가 그대로 `baseline_scenario_id`로 지정된다.

| 지표 | 값 |
|---|---|
| mode_a.contribution_margin (CM) | 500 |
| mode_a.contribution_margin_rate (CMR) | 0.5 |
| mode_b.required_selling_price | 571.43 |
| mode_c.allowable_direct_cost | 700 |
| bep.break_even_quantity_exact (Q_BEP) | 100 |
| scenario_status | OK |

계산: `N = 1000`, `direct = 400`, `variable = 100` → `CM = 500`, `CMR = 0.5`. BEP: `CMu = 500`, `FC = 50000` → `Q_BEP = 100`. MODE B(`t=0.3`): `D = 0.7` → `required_selling_price = 400/0.7 = 571.43`. MODE C(`target_market_price=1000, t=0.3`): `ADC = 1000×0.7 = 700`.

## TC2 — 가격 인상 (`B_price_up`, override: `actual_price = 1200`)

| 지표 | 값 |
|---|---|
| mode_a.contribution_margin (CM) | 700 |
| mode_a.contribution_margin_rate (CMR) | 0.583 |
| bep.break_even_quantity_exact (Q_BEP) | 71.43 |
| scenario_status | OK |

계산: `N = 1200` → `CM = 1200 − 400 − 100 = 700`, `CMR = 0.583`. BEP: `CMu = 700, FC = 50000` → `Q_BEP = 71.43`.

## Baseline(TC1) 대비 Delta

| Delta 지표 | 값 | 상태 | 해석 |
|---|---|---|---|
| net_sales_ex_vat_delta | +200 | OK | 순매출(부가세 제외) 200 증가 |
| contribution_margin_delta | +200 | OK | 공헌이익 200 증가 |
| contribution_margin_rate_delta | ≈ +0.083 | OK | 공헌이익률 약 8.3%p 개선 |
| break_even_quantity_delta | ≈ −28.57 | OK | 손익분기 수량이 약 28.57 감소 — BEP 개선 |

이 사례는 가격을 인상할 때 공헌이익과 공헌이익률이 함께 개선되고, 손익분기에 필요한 판매수량은 줄어든다는(BEP 개선) 전형적인 방향성을 보여준다. 모든 delta 값은 MODE A와 BEP의 기존 출력을 그대로 뺀 값이며, Scenario Compare 자체가 별도의 계산식을 도입하지 않았다.

</details>
