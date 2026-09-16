# CH11 MODE B 목표 CM율 설정 워크시트

> 관련 Chapter: CH11 — MODE B 목표가격 역산
> 근거: docs/features/mode_b_target_price/SPEC.md (Pricing Harness Internal Specification, Category B)

이 워크시트는 MODE B(목표가격 역산)를 실행하기 전에 필요한 입력값을 정리하고, 계산 결과를 검토하기 위한 것이다. 항목은 SPEC.md에 정의된 입력(Client Input)과 출력(Output metric)만 사용하며, 여기 없는 항목을 임의로 추가하지 않는다.

## 1. 목표 설정

| 항목 | 값 | 비고 |
|---|---|---|
| 목표 Contribution Margin Rate (`t`) | ___ % | 근거를 반드시 아래에 기록 |
| 목표율의 출처 | □ 내부 기준 □ 투자자 요구 □ 업종 벤치마크 □ 기타( ) | |
| 출처 상세 설명 | | MODE B는 이 숫자의 타당성을 검증하지 않음 — 컨설턴트 판단 영역 |

## 2. 컴포넌트 식별

| 항목 | 값 |
|---|---|
| `component_id` | |
| 상품/서비스명 | |

> 참고: `target_contribution_margin_rate`는 현재 Client Input 전체에 하나만 적용되는 global 값이다(컴포넌트별 개별 목표율은 미지원).

## 3. 원가·수수료 구조 입력 (C, b, a)

**고정금액형 비용 (C = 직접원가 + 변동비 중 금액형)**

| item_id | 항목명 | 금액 | 통화 | applies_to_component |
|---|---|---|---|---|
| | | | | |
| | | | | |

> `applies_to_component = "shared"`이면서 배부 규칙(`allocation_rule`)이 확정되지 않은 항목은 0으로 계산되지 않고 관련 지표 전체가 UNKNOWN으로 처리된다.

**비율형 비용 — net sales 기준 (b)**

| item_id | 항목명 | 요율 |
|---|---|---|
| | | |

**비율형 비용 — gross payment 기준 (a)**

| item_id | 항목명 | 요율 |
|---|---|---|

## 4. 세금 및 표시가격 기준

| 항목 | 값 |
|---|---|
| VAT율 (`v`) | ___ % (모르면 "미정"으로 표기 — 0으로 채우지 않음) |
| 표시가격이 VAT 포함인가 (`price_includes_vat`) | □ 포함(true) □ 제외(false) □ 미정 |

> VAT율이 필요한지는 지표마다 다르다. gross-payment 기준 비용(`a`)이 하나라도 있으면 표시가격 기준과 무관하게 VAT율이 필요하다.

## 5. 할인 정책 (선택)

| 항목 | 값 |
|---|---|
| 할인율 (`discount_rate`) | ___ % (없으면 "없음"으로 표기 — 공란으로 두지 않음) |

## 6. MODE B 실행 결과 기록

| Metric | 값 | 상태 (OK / UNKNOWN / ERROR) |
|---|---|---|
| `denominator` (분모 D) | | |
| `required_net_sales_ex_vat` (목표 순매출, N) | | |
| `required_gross_payment_incl_vat` (목표 총지불금액, G) | | |
| `required_selling_price` (목표 실판매가) | | |
| `required_list_price` (목표 정가) | | |
| `expected_contribution_margin` (예상 공헌이익) | | |
| `expected_contribution_margin_rate` (예상 공헌이익률, 자체검산 — `t`와 일치해야 함) | | |

## 7. 결과 해석 체크리스트

- [ ] `denominator`가 ERROR(≤ 0)인가? → 그렇다면 "이 원가·수수료 구조로는 어떤 가격을 매겨도 목표 달성 불가능"하다는 확정 진단이다. 다시 계산하지 말고 구조 자체(원가/목표율/채널구조/상품구성)를 재검토한다.
- [ ] UNKNOWN이 있는가? → 계산 실패가 아니라 데이터 미확정이다. 어떤 입력이 빠졌는지 위 표에서 확인한다.
- [ ] 목표 정가가 시장가와 크게 다른가? → CH11 §7 실무 체크포인트 참고, 고객가치(KM046)·포지셔닝(KM047) 관점에서 재검토한다.
- [ ] `expected_contribution_margin_rate`가 입력한 `t`와 정확히 일치하는가(자체검산)?
