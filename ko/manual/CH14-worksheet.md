# CH14 시나리오 설계 워크시트

> 이 워크시트는 Scenario Compare의 요청 구조(`scenario_compare_request`, SPEC.md §4/§19)를 그대로 따릅니다. 스키마에 없는 항목은 추가하지 않습니다.

## 1. Base Input (기준 시나리오)

| 항목 | 값 |
|---|---|
| component_id | |
| actual_price (실제 판매가) | |
| price_includes_vat (VAT 포함 여부) | |
| target_market_price (목표 시장가) | |
| discount_rate (할인율) | |
| direct_cost (직접비, item_id 별) | |
| variable cost items (rate/amount, item_id 별) | |
| fixed_operating_cost (고정영업비) | |
| target_contribution_margin_rate (목표 공헌이익률) | |
| vat_rate (부가세율) | |
| fx.rate_base_per_reporting (환율, 해당 시) | |

## 2. Baseline Scenario 지정

- `baseline_scenario_id`: ________________
- 위 Base Input을 그대로 사용하는 시나리오인지, 별도 override가 있는지: ________________

> 주의: 목록의 첫 번째 시나리오가 자동으로 baseline이 되지 않습니다. 반드시 명시적으로 지정합니다.

## 3. 변형 시나리오 (Variant Scenarios)

시나리오는 최소 2개 이상이어야 합니다(baseline 포함). 아래 표를 시나리오 수만큼 반복합니다.

### 시나리오 [ ]

| 항목 | scenario_id | label |
|---|---|---|
| | | |

**overrides.components[]** (component_id로 지정, 변경하는 필드만 기입)

| component_id | actual_price | target_market_price | price_includes_vat | discount_rate |
|---|---|---|---|---|
| | | | | |

**overrides.cost_items[]** (item_id로 지정, 변경하는 필드만 기입)

| item_id | amount | rate |
|---|---|---|
| | | |

**overrides.targets**

| target_contribution_margin_rate |
|---|
| |

**overrides.tax**

| vat_rate |
|---|
| |

**overrides.fx**

| rate_base_per_reporting |
|---|
| |

> 생략한 필드는 base_input 값을 그대로 유지합니다. 값을 명시적으로 비우고 싶다면(null 처리) "null"이라고 적어 UNKNOWN으로 처리되게 합니다.
> component_id/item_id는 base_input에 이미 존재하는 값만 사용할 수 있습니다. 새 구성요소·비용항목 추가는 v0.1 범위 밖입니다.
> 하나의 시나리오 안에서 같은 component_id 또는 item_id를 두 번 override할 수 없습니다 — 바꿀 필드가 여러 개라면 한 항목에 모두 기입합니다.

## 4. 무엇을(What Changes) 요약

| 시나리오 | 바뀌는 것 (가격/비용/채널/고객군 등) | 검토 목적 |
|---|---|---|
| | | |
| | | |

## 5. 결과 확인 체크리스트

- [ ] 시나리오 수 2개 이상
- [ ] baseline_scenario_id 명시 및 실제 존재하는 scenario_id와 일치
- [ ] scenario_id 중복 없음
- [ ] override 대상 component_id/item_id가 base_input에 실재
- [ ] 각 시나리오 내 override 대상 중복 없음
- [ ] 각 시나리오의 scenario_status 확인 (OK / INCOMPLETE / ERROR)
- [ ] baseline 대비 delta 4종 확인: net_sales_ex_vat_delta, contribution_margin_delta, contribution_margin_rate_delta, break_even_quantity_delta
- [ ] delta 상태가 UNKNOWN/NOT_APPLICABLE/ERROR인 항목이 있는지, 있다면 원인 확인
