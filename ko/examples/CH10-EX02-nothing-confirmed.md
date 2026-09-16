# CH10-EX02. Case 2 — 아직 아무것도 확정되지 않은 경우 (동일 상품)

- 관련 Chapter: CH10 (MODE A — 현재가격 진단)
- 관련 Tool: MODE A (`core/engine/modes/mode_a.py`, `run_mode_a`)
- 데이터 출처: `docs/features/mode_a_current_price/CASE.md` "Case 2 — same product, nothing confirmed yet" (가상 데이터, `04_incomplete_inputs.json`)

## 무엇을 설명하는 사례인가

EX01과 동일한 상품이지만, 비용·세금 데이터가 아직 하나도 입력되지 않은 상태에서 MODE A가 무엇을 출력하는지 보여주는 사례다. MODE A가 확인되지 않은 값을 0으로 대체하지 않고 `UNKNOWN`으로 정직하게 보고한다는 CH10의 핵심 설계 원칙을 확인할 수 있다.

## 사례 데이터

동일한 프리미엄 텀블러 상품이지만, `price_includes_vat`, `vat_rate`, 모든 비용 항목의 `amount`/`rate`, 심지어 `fx.rate_base_per_reporting`까지 전부 `null`인 상태(`04_incomplete_inputs.json`).

## 결과

- `mode_a.status = "INCOMPLETE"`
- 7개 지표 전부 `UNKNOWN`
- 경고 7건 — 지표마다 정확히 어떤 Client Input 필드가 누락되었는지를 명시
- `direct_cost_total`과 `variable_cost_total`은 서로 다른 누락 필드 때문에 각각 독립적으로 실패한다.
- `gross_profit`은 `actual_price_ex_vat`과 `direct_cost_total`이 모두 미해결인 결과로 실패한다(`DOWNSTREAM_UNKNOWN`). 그 이후 지표들도 연쇄적으로 실패한다.

## 왜 이 사례가 중요한가

이 케이스는 이 프로젝트의 이전(Harness 이전) 프로토타입 스프레드시트가 저질렀던 실수를 직접 교정한 사례다. 그 스프레드시트는 동일한 종류의 누락된 비용을 0으로 처리해, 근거 없는 81.5%라는 그럴듯한 마진율을 보고한 적이 있다. Case 2는 같은 상황에서 엔진이 "무엇을 모르는지"를 정직하게 보여줄 때 어떤 모습인지를 보여준다.
