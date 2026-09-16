# CH12 MODE C 허용원가 산출 워크시트

> 관련 Chapter: CH12. MODE C — 허용원가 역산
> 관련 Tool: MODE C (`core/engine/modes/mode_c.py`, `run_mode_c`)
> 출처: docs/features/mode_c_allowable_cost/SPEC.md (Client Input 항목 §1, 기호 §2, 출력 지표 §12)

이 워크시트는 SPEC.md에 정의된 입력·출력 항목만을 사용합니다. 여기 없는 항목은 임의로 추가하지 마십시오.

---

## 1. 대상 정보

| 항목 | 값 |
|---|---|
| Client / 프로젝트명 | |
| Component ID (price_components[].component_id) | |
| 작성일 | |

## 2. 입력값 (Client Input)

### 2-1. 시장가격 (product.price_components[])

| 필드 | 값 | 비고 |
|---|---|---|
| target_market_price (시장가격, 할인 반영된 effective price) | | 정가가 아님. 예: 정가 100,000 × 할인 10% → 90,000 입력 |
| price_includes_vat (true/false) | | true면 위 값은 VAT 포함가, false면 VAT 제외가 |
| currency | | |

### 2-2. 세율 (tax)

| 필드 | 값 |
|---|---|
| vat_rate (v) | |

### 2-3. 목표 (targets)

| 필드 | 값 | 유효범위 |
|---|---|---|
| target_contribution_margin_rate (t) | | 0 ≤ t < 1 (t=1 이상은 ERROR) |

### 2-4. 비제품 변동비 (costs.items[], cost_category = variable_selling_delivery)

이 컴포넌트 또는 shared로 적용되는 항목만 기입합니다. 항목이 하나도 없으면 F/b/a는 각각 확정된 0으로 처리됩니다.

| item_id | basis (amount / rate_of_net_sales / rate_of_gross_payment) | 금액 또는 비율 | applies_to_component | allocation_rule (shared인 경우) |
|---|---|---|---|---|
| | | | | |
| | | | | |
| | | | | |

- F = 금액(amount)으로 입력된 항목의 합
- b = basis=rate_of_net_sales 항목의 비율 합
- a = basis=rate_of_gross_payment 항목의 비율 합

### 2-5. 실제 직접원가 (costs.items[], cost_category = product_service_direct_cost) — 선택

`direct_cost_gap`을 계산하려면 기입합니다. ADC 계산 자체에는 사용되지 않습니다.

| item_id | 금액(amount) | applies_to_component |
|---|---|---|
| | | |
| | | |

---

## 3. 계산 (Derivation)

1. N (market_net_sales_ex_vat) = ______________
2. G (market_gross_payment_incl_vat) = ______________
3. D = 1 − t − b − a×(1+v) = ______________
4. ADC (allowable_direct_cost) = N×D − F = ______________
5. actual_direct_cost (2-5 합계) = ______________
6. direct_cost_gap = ADC − actual_direct_cost = ______________
7. expected_contribution_margin = N − ADC − F − b×N − a×G = ______________
8. expected_contribution_margin_rate = (7) ÷ N = ______________ (t와 일치해야 함)

## 4. 출력 결과 요약 (Output Metrics)

| Metric | 값 | 상태 (OK / UNKNOWN / ERROR) |
|---|---|---|
| market_net_sales_ex_vat (N) | | |
| market_gross_payment_incl_vat (G) | | |
| allowable_direct_cost (ADC) | | |
| actual_direct_cost | | |
| direct_cost_gap | | |
| expected_contribution_margin | | |
| expected_contribution_margin_rate | | |

## 5. 판정 메모

- [ ] ADC가 음수인가? → 음수라면 "계산 오류"가 아니라 "현재 조건으로 목표 달성 불가"라는 확정 진단입니다. 목표율 재검토 / 수수료 재협상 / 가격대 재검토 중 선택이 필요합니다.
- [ ] direct_cost_gap이 음수인가? → 현재 원가가 허용원가를 초과한 상태입니다.
- [ ] a > 0인데 vat_rate가 비어 있는가? → 이 경우 ADC는 UNKNOWN입니다 (G가 필요하기 때문).
