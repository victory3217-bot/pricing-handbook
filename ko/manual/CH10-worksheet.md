# CH10 MODE A 입력 체크리스트

> 관련 Chapter: CH10 (MODE A — 현재가격 진단)
> 관련 Tool: MODE A (`core/engine/modes/mode_a.py`, `run_mode_a`)
> 목적: MODE A를 실행하기 전, `product.price_components[]`의 각 component마다 SPEC.md가 요구하는 입력값이 실제로 확보되어 있는지 확인하는 체크리스트. 이 문서에 없는 입력 항목을 임의로 추가하지 않는다.

컨설턴트는 대상 상품/서비스의 component 단위마다 아래 표를 하나씩 작성한다. 여러 component(예: 하드웨어 + 구독 서비스)로 구성된 상품이라면 component별로 별도 시트를 사용한다.

---

## Component 식별

- [ ] Component ID (`component_id`): ______________________
- [ ] 이 component에 몇 개의 개별 가격/비용 구성요소가 있는지 확인했는가 (MODE A는 component를 섞어 계산하지 않음)

## 1. 가격 정보

- [ ] `actual_price` (실제 판매가격): ______________________
- [ ] `currency` (통화): ______________________
- [ ] `price_includes_vat` (판매가격이 VAT를 포함하는가?) — [ ] 예(true) / [ ] 아니오(false) / [ ] 미확정

## 2. 세금 정보

- [ ] `tax.vat_rate` (부가세율): ______________________ (미확정 시 "미확정"이라고 명시하고 null로 둘 것 — 0으로 임의 기입 금지)

## 3. 환율/통화 정보

- [ ] `fx.base_currency` (기준 통화): ______________________
- [ ] `fx.reporting_currency` (보고 통화): ______________________
- [ ] `fx.rate_base_per_reporting` (환산 환율): ______________________
  - 해당 component의 통화가 `base_currency` 또는 `reporting_currency`와 다르면 MODE A는 `ERROR`를 반환한다(SPEC.md "Explicitly out of scope"). 통화가 이 두 가지 중 하나인지 반드시 확인한다.

## 4. 비용 항목 (`costs.items[]`) — 이 component에 귀속되는 항목만

각 비용 항목마다 다음을 확인한다.

| 항목명 | `applies_to_component` (이 component / shared) | `cost_category` | `amount` 또는 `rate` | `basis` (rate인 경우) | `allocation_rule` (shared인 경우) |
|---|---|---|---|---|---|
|  |  |  |  |  |  |
|  |  |  |  |  |  |
|  |  |  |  |  |  |

- [ ] `cost_category`를 `product_service_direct_cost`(직접원가) / `variable_selling_delivery`(판매·배송 변동비) / `fixed_operating_cost`(고정운영비) 중 정확히 구분해서 표기했는가
  - 주의: 설치비(installation cost)는 1회성 단위원가처럼 보여도 기본값은 `variable_selling_delivery`로 분류한다(SPEC.md). 직접원가로 재분류하려면 클라이언트별 원가정책 근거가 필요하다.
- [ ] `fixed_operating_cost`로 분류된 항목은 MODE A 계산(Gross Profit, Contribution Margin) 어디에도 포함되지 않는다는 것을 인지했는가 (향후 BEP 모듈 전용)
- [ ] 금액형(`amount`)과 정률형(`rate`) 중 하나만 채웠는가 (두 값을 동시에 의미 있게 채우지 않는다)
- [ ] 정률형 항목의 `basis`가 `rate_of_net_sales`(VAT 제외 순매출 기준)인지 `rate_of_gross_payment`(VAT 포함 실지급액 기준)인지 확인했는가
- [ ] `applies_to_component = "shared"`인 항목의 `allocation_rule`을 확인했는가
  - `blended_only`: 이 component 계산에서는 제외됨(정상)
  - `by_component_revenue` / `fixed_share`: 이 component에서는 `UNKNOWN`으로 처리됨(향후 blended 모듈 필요)
  - `direct`: `shared` 항목에 설정하면 `ERROR` — 반드시 non-shared 항목으로 재입력하거나 `allocation_rule`을 수정할 것
  - 미기재: `UNKNOWN` 처리됨

## 5. 미확정 항목 최종 점검

- [ ] 위 항목 중 값을 모르는 것은 추정치를 채우지 않고 공란(null)으로 남겼는가
- [ ] 공란으로 남긴 항목이 있다면, 어떤 지표(`actual_price_ex_vat`, `direct_cost_total`, `gross_profit`, `gross_profit_rate`, `variable_cost_total`, `contribution_margin`, `contribution_margin_rate`)가 `UNKNOWN`으로 나올지 예상해 두었는가

---

체크리스트를 모두 채운 뒤에도 공란(null)이 남아 있는 항목이 있다면, 그것은 오류가 아니라 MODE A가 "확인되지 않은 값"과 "확인된 0"을 구분하기 위한 정상적인 상태다. 해당 항목이 확정되기 전까지 관련 지표는 `UNKNOWN`으로 보고된다.

## Source Map

- Harness: docs/features/mode_a_current_price/SPEC.md ("Inputs consumed" 섹션)
