# CH13-EX01. BEP 계산 사례 — 단순 양(+)의 공헌이익 케이스

- **관련 Chapter**: CH13. BEP — 손익분기점
- **관련 Tool**: BEP (`core/engine/modes/bep.py`, `run_bep`)
- **출처**: `docs/features/bep/CASE.md`, TC1 ("simple positive CM"). 가상 데이터(`client_id: sample_co_zeta`)를 사용한 손계산 검증 케이스이며 실제 고객 데이터가 아니다.

## 무엇을 설명하는 사례인가

BEP 계산의 가장 기본적인 정상 경로(CMu > 0, FC > 0)를 보여주는 사례다. 단위당 공헌이익이 플러스이고 고정운영비가 존재할 때, `Q_BEP = FC / CMu` 공식으로 손익분기 판매수량이 정상적으로 산출되는 과정을 확인할 수 있다.

## 입력값

| 항목 | 값 |
|---|---|
| N (net_sales_ex_vat) | 1,000 |
| product_service_direct_cost (direct_cost) | 400 |
| variable_selling_delivery (fixed-amount 항목) | 100 |
| fixed_operating_cost (component-scoped, applies_to_component: "main") | 50,000 |
| fixed_operating_cost.basis | per_month |

## 계산 과정

```
CMu = N − direct_cost − variable_cost_total
    = 1,000 − 400 − 100
    = 500

FC = 50,000 (component-scoped, OK)

Q_BEP = FC / CMu
      = 50,000 / 500
      = 100
```

## 결과

- `contribution_margin_per_unit` = 500, 상태: **OK**
- `fixed_operating_cost` = 50,000, 상태: **OK**
- `break_even_quantity_exact` = **100**, 상태: **OK**
- module status: **OK**

## 해석

이 컴포넌트는 현재 가격(N=1,000)과 비용구조(직접원가 400, 변동비 100)에서 단위당 500의 공헌이익을 얻는다. 월 고정운영비 50,000을 회수하려면 한 달에 100단위를 판매해야 손익분기에 도달한다. `basis: "per_month"`이므로 이 100단위는 "월간" 판매목표로 해석해야 하며, `break_even_quantity_exact`의 `unit`은 수량 단위("units")일 뿐 기간을 나타내지 않는다 — 수량과 기간(analysis_period_basis)은 별개의 정보로 다뤄진다(SPEC.md §4 REVISED 참조).
