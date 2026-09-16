# CH13 BEP 계산 워크시트

본 워크시트는 `docs/features/bep/SPEC.md`가 정의하는 BEP(손익분기점) 계산 입력·출력 구조를 그대로 따른다. 항목은 SPEC.md에 실제로 정의된 필드만 포함하며, 실무 적용 시 아래 순서대로 채운다.

## 0. 사전 확인 — 컴포넌트 개수

- [ ] 이 상품(product)의 `price_components`는 몇 개인가? ______개
  - 2개 이상이면 BEP v0.1로 계산할 수 없다(`MULTI_COMPONENT_BEP_NOT_SUPPORTED`). 아래 항목은 **단일 컴포넌트**인 경우에만 작성한다.

## 1. 가격 입력 (컴포넌트: ______________ )

| 항목 | 값 |
|---|---|
| actual_price (현재 실제 판매가) | |
| price_includes_vat (VAT 포함 여부, true/false) | |
| tax.vat_rate (VAT 세율, 필요 시) | |
| → N (net_sales_ex_vat, VAT 제외 순매출) | |

## 2. 공헌이익(Contribution Margin) 입력

| 항목 | 값 |
|---|---|
| product_service_direct_cost (직접원가) 합계 | |
| variable_selling_delivery (변동비) 합계 | |
| → CMu = N − direct_cost − variable_cost_total | |
| CMu 상태 (OK / UNKNOWN / ERROR) | |

CMu가 0 이하인 경우, 아래 표에 따라 결과가 결정된다(3번 항목으로 이동).

## 3. 고정운영비(fixed_operating_cost) 입력

각 fixed_operating_cost 항목마다 아래를 기입한다.

| item_id | amount | currency | basis | applies_to_component | allocation_rule (shared인 경우) |
|---|---|---|---|---|---|
| | | | | | |
| | | | | | |

- [ ] 모든 항목의 `basis`가 서로 동일한가? (다르면 `INCONSISTENT_FIXED_COST_BASIS` → ERROR)
- [ ] amount가 음수인 항목이 있는가? (있으면 `INVALID_NEGATIVE_COST` → ERROR)
- [ ] shared 항목의 allocation_rule이 `direct`인가? (있으면 `INVALID_ALLOCATION_CONFIGURATION` → ERROR)
- [ ] shared 항목의 allocation_rule이 `blended_only`인가? (있으면 `FIXED_COST_BLENDED_ONLY_NOT_ALLOCATED` → UNKNOWN)
- [ ] shared 항목의 allocation_rule이 `by_component_revenue`/`fixed_share`/미지정인가? (있으면 `UNSUPPORTED_SHARED_COST_ALLOCATION` → UNKNOWN)

→ FC (fixed_operating_cost 합계): ______________
→ FC 상태 (OK / UNKNOWN / ERROR): ______________
→ analysis_period_basis (FC가 속한 분석기간, 예: per_month): ______________

## 4. 손익분기 판매량 계산

| CMu | FC | break_even_quantity_exact | 비고 |
|---|---|---|---|
| > 0 | > 0 | FC / CMu | 정상 계산 |
| > 0 | = 0 | 0 | 고정비 없음 — 첫 단위부터 손익분기 |
| = 0 | 무관 | NOT_APPLICABLE | BREAK_EVEN_UNDEFINED_ZERO_MARGIN(_ZERO_FIXED_COST) |
| < 0 | 무관 | NOT_APPLICABLE | BREAK_EVEN_UNDEFINED_NEGATIVE_MARGIN |

- Q_BEP = ______________ (단위: units, 반올림하지 않은 정확한 값)
- 이 수치가 적용되는 분석기간: ______________ (3번의 analysis_period_basis와 동일)
- module status (OK / INCOMPLETE / ERROR): ______________

## 5. 경고 및 참고 사항

- [ ] 산출된 warnings 코드와 메시지를 기록한다: ______________
- [ ] Q_BEP를 실무 보고서에 "몇 개를 팔아야 하는가"로 제시할 때 올림 처리 여부를 별도로 결정한다(엔진 자체는 반올림하지 않음, SPEC.md §8).
- [ ] 이 상품의 거래유형(B2C/B2B/B2G)에서 Q_BEP가 실제로 달성 가능한 수량인지 별도로 검토한다.
