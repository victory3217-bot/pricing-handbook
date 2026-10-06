# CH13-EX02. Volume Profit 계산 사례 — 월 150개 판매 계획의 영업이익과 안전한계

- **관련 Chapter**: CH13. BEP — 손익분기점
- **관련 Tool**: Volume Profit (`core/engine/modes/volume_profit.py`, `run_volume_profit`)
- **출처**: `core/schemas/examples/valid/08_volume_profit.json`(입력)과 `core/schemas/examples/analysis_results/08_volume_profit.analysis_result.json`(결과), 명세는 `docs/features/volume_profit/SPEC.md`. 교육용 가상 데이터(`client_id: sample_co_eta`)이며 실제 기업 데이터가 아니다.

## 무엇을 설명하는 사례인가

BEP가 "몇 개를 팔아야 손해가 아닌가"에 답한다면, 이 사례는 그다음 질문 — "계획한 수량을 팔면 얼마가 남고, 손익분기 대비 얼마나 여유가 있는가" — 을 Volume Profit이 어떻게 계산하는지 보여준다. 입력은 CH13-EX01과 같은 구조(BEP의 정상 경로)에 월 판매 계획 `sales_plan`을 더한 가장 단순한 완전-입력 케이스다.

## 입력값

| 항목 | 값 |
|---|---|
| 판매가(`actual_price`) | 20,000 (VAT 제외 표시, `price_includes_vat: false`) |
| product_service_direct_cost (`material_cost`, `per_unit`) | 8,000 |
| variable_selling_delivery (`shipping`, **`per_order`**) | 2,000 |
| fixed_operating_cost (`fixed_ops`, component-scoped, `applies_to_component: "main"`) | 1,000,000 |
| fixed_operating_cost.basis | per_month |
| `sales_plan.planned_quantity` | 150 |
| `sales_plan.period_basis` | per_month |

고정운영비를 컴포넌트 범위(`main`)로 입력했다는 점이 중요하다. 공유 고정비를 `blended_only`로 입력하면 FC가 `UNKNOWN`이 되어 이 계산이 성립하지 않는다(CH13 §4 참조).

## 계산 과정

```
N     = 20,000                          (VAT 제외 판매가)
CMu   = N − direct_cost − variable_cost
      = 20,000 − 8,000 − 2,000
      = 10,000
FC    = 1,000,000
Q_BEP = FC / CMu = 1,000,000 / 10,000 = 100

total_net_sales_ex_vat    = N × Q        = 20,000 × 150           = 3,000,000
total_contribution_margin = CMu × Q      = 10,000 × 150           = 1,500,000
operating_profit          = CMu × Q − FC = 1,500,000 − 1,000,000  =   500,000
operating_profit_rate     = 500,000 / 3,000,000                   ≈ 16.67%
margin_of_safety_quantity = Q − Q_BEP    = 150 − 100              =        50
margin_of_safety_rate     = 50 / 150                              ≈ 33.33%
```

## 결과

- `total_net_sales_ex_vat` = 3,000,000, 상태: **OK**
- `total_contribution_margin` = 1,500,000, 상태: **ESTIMATED**
- `operating_profit` = **500,000**, 상태: **ESTIMATED**
- `operating_profit_rate` ≈ 0.1667, 상태: **ESTIMATED**
- `break_even_quantity_exact` = 100, 상태: **ESTIMATED**
- `margin_of_safety_quantity` = **50**, 상태: **ESTIMATED**
- `margin_of_safety_rate` ≈ 0.3333, 상태: **ESTIMATED**
- 경고: `ASSUMES_ONE_UNIT_PER_ORDER`
- module status: **OK**

같은 입력에 대한 BEP 모듈의 결과는 `break_even_quantity_exact` = 100, 상태 **OK**로, 값은 같다.

## 해석

현재 가격(N=20,000)과 비용구조에서 단위당 공헌이익은 10,000이고, 월 고정운영비 1,000,000을 회수하려면 한 달에 100개를 팔아야 한다(BEP). 월 150개를 팔 계획이라면 월 영업이익은 500,000이고, 손익분기 판매량보다 50개(계획의 약 33%)를 더 파는 셈이다. 이 안전한계는 "판매량이 계획보다 약 33% 줄어들어도(100개까지는) 고정비를 회수한다"는 뜻으로 읽을 수 있다.

**상태가 `ESTIMATED`인 이유.** 배송비가 `per_order`(주문당 2,000)이기 때문이다. Volume Profit은 `CMu × Q`를 계산하므로 `per_order` 비용을 주문당 1개 판매로 가정한다. 고객이 한 주문에 2개 이상 사면 배송비가 과대 계상되어 실제 영업이익은 이 값보다 클 수 있다. 값이 틀렸다는 뜻이 아니라 이 가정에 의존한다는 표시이며, 같은 `Q_BEP`를 BEP는 `OK`로, Volume Profit은 `ESTIMATED`로 보고하는 것도 이 가정을 드러내는 쪽이 Volume Profit이기 때문이다.

**이 사례가 보여주지 않는 것.** `planned_quantity`는 외부에서 주어진 입력일 뿐이며, 이 판매량이 실제로 달성 가능한지는 거래유형별 Qty 산정 근거(CH13 §7, KM062)로 따로 검증해야 한다. 계획이 손익분기에 못 미치는 경우(안전한계가 음수가 되고 `BELOW_BREAK_EVEN` 경고가 붙는 경우)의 규칙은 CH13 §6에 설명되어 있으나, 이 사례의 원자료에는 그 경우의 입력·결과가 없어 수치로 싣지 않았다.
