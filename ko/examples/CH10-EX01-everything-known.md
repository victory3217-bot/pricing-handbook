# CH10-EX01. Case 1 — 모든 입력이 확정된 경우 (프리미엄 텀블러)

- 관련 Chapter: CH10 (MODE A — 현재가격 진단)
- 관련 Tool: MODE A (`core/engine/modes/mode_a.py`, `run_mode_a`)
- 데이터 출처: `docs/features/mode_a_current_price/CASE.md` "Case 1 — everything known" (가상 데이터, `client_id: sample_co_alpha`, 실제 고객사 아님)

## 사례 데이터

Sample Co. Alpha는 "프리미엄 텀블러"를 **35,000원**(VAT 포함 표시가)에 판매한다. VAT율 10%. 비용 구성:
- 직접원가: 재료비 12,000원, 포장비 1,500원
- 변동비: PG 수수료 실지급액의 2.5%, 배송비 3,000원

## 문제

위 사례 데이터로 다음을 직접 구해 보세요.

1. VAT 제외 순매출은 얼마인가요?
2. Gross Profit과 Contribution Margin은 각각 얼마(금액과 비율)인가요?
3. PG 수수료는 어떤 금액을 기준으로 계산해야 하나요? 그렇게 계산하면 얼마인가요?

<details>
<summary>정답과 풀이 보기</summary>

## 무엇을 설명하는 사례인가

모든 입력값(가격, VAT 여부, 직접원가, 변동비)이 확정되어 있을 때 MODE A가 7개 지표를 모두 `OK` 상태로, 경고 없이 산출하는 정상 케이스다. Gross Profit과 Contribution Margin이 서로 다른 숫자라는 점, 그리고 정률형 비용(PG 수수료)이 VAT 제외 순매출이 아니라 실지급액(gross payment)을 기준으로 계산된다는 점을 보여준다.

## 계산 과정

| 단계 | 계산 | 결과 |
|---|---|---|
| VAT 제외 순매출 | 35,000 ÷ 1.10 | **31,818.18** |
| 직접원가 합계 | 12,000 + 1,500 | **13,500** |
| **Gross Profit** | 31,818.18 − 13,500 | **18,318.18 (57.6%)** |
| PG 수수료 | 35,000 × 2.5% | 875 |
| 변동비 합계 | 875 + 3,000 | **3,875** |
| **Contribution Margin** | 18,318.18 − 3,875 | **14,443.18 (45.4%)** |

7개 지표 모두 `status: "OK"`, 경고 없음. 모든 의존값이 확인되었기 때문에 엔진이 모든 숫자를 그대로 신뢰해 출력한 경우다.

주의: PG 수수료는 VAT 제외 순매출(31,818.18)이 아니라 실지급액(35,000, 실제 청구된 금액) 전체를 기준으로 계산되었다. 이 기준 차이는 CH10 4절/5절의 `basis`(rate_of_net_sales vs. rate_of_gross_payment) 설명과 연결된다.

</details>
