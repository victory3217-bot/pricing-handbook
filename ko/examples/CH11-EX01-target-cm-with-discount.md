# CH11-EX01. 목표 CM율 30% 달성을 위한 가격 역산 (할인 포함)

- 관련 Chapter: CH11 — MODE B 목표가격 역산
- 관련 Tool: MODE B (`core/engine/modes/mode_b.py`, `run_mode_b`)
- 출처: docs/features/mode_b_target_price/CASE.md (fictional data, `client_id: sample_co_delta`), SPEC.md TC4/TC6과 일치

## 무엇을 설명하는 사례인가

MODE A로 확인한 현재 가격의 공헌이익률이 투자자 기대치보다 낮을 때, 목표 공헌이익률을 직접 지정해 필요한 판매가격을 역산하는 절차를 보여준다. 여기에 추가로, 상시 할인 정책이 있는 경우 "실제 청구액"과 "정가표에 적을 가격"이 달라진다는 점을 함께 보여준다. 이 사례는 가상 데이터(Sample Co. Delta)이며 실제 고객 사례가 아니다.

## 시나리오

Sample Co. Delta는 구독형 서비스를 판매한다. MODE A 실행 결과 현재 가격의 공헌이익률이 투자자 기대치에 못 미쳤다. 경영진은 목표 공헌이익률을 30%로 설정하고 "그럼 얼마에 팔아야 하는가"를 질문한다.

**입력값**

- 고정금액형 비용 합계 `C`: 10,000 (KRW)
- 채널수수료 `b`: 순매출의 10% (`rate_of_net_sales`)
- PG수수료 `a`: 총지불금액의 3% (`rate_of_gross_payment`)
- VAT `v`: 10%, 표시가격은 VAT 포함(`price_includes_vat = true`)
- 목표 공헌이익률 `t`: 0.30

## 계산 과정

```
D = 1 − t − b − a(1+v) = 1 − 0.30 − 0.10 − 0.03×1.10 = 0.567
N = C / D = 10,000 / 0.567 = 17,636.68     (목표 순매출, VAT 제외)
G = N × (1+v) = 17,636.68 × 1.10 = 19,400.35   (목표 총지불금액, VAT 포함)
```

표시가격 기준이 VAT 포함(`price_includes_vat = true`)이므로 `required_selling_price`는 N이 아니라 G를 따른다.

**검산** (MODE A로 이 가격을 다시 넣었을 때 나와야 하는 값)

```
CM = N − C − bN − aG = 17,636.68 − 10,000 − 1,763.67 − 582.01 = 5,291.01
CM / N = 5,291.01 / 17,636.68 = 0.30   → 목표와 정확히 일치
```

## MODE B 결과

| Metric | 값 |
|---|---|
| `required_net_sales` | 17,636.68 |
| `required_gross_payment` | 19,400.35 |
| `required_selling_price` ("목표 실판매가") | 19,400.35 |
| `expected_contribution_margin` | 5,291.01 |
| `expected_contribution_margin_rate` | 0.30 |

## 확장 — 할인 정책 반영

Sample Co. Delta는 정가에서 항상 10% 할인을 적용해 판매한다. 위에서 구한 19,400.35는 "할인 후 실제 청구액"이므로, 정가표에 게시할 가격(목표 정가)은 이보다 높아야 한다.

```
required_list_price = required_selling_price / (1 − discount_rate)
                     = 19,400.35 / 0.90
                     = 21,555.95
```

**컨설팅 해석**: 카탈로그/정가표에는 21,555.95를 게시하고, 10% 할인을 적용했을 때 실제 청구액이 19,400.35가 되어야 목표 30% 공헌이익률이 달성된다. 정가만 보고 "비싸다"고 판단해서는 안 되며, 실제 청구액 기준으로 목표 달성 여부를 확인해야 한다.
