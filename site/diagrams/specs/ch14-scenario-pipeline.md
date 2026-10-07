# ch14-scenario-pipeline

- diagram_id: `scenario-pipeline`
- chapter: CH14. Scenario Compare — 시나리오 비교 / Scenario Compare
- files: `assets/images/ch14-scenario-pipeline-ko.svg`, `assets/images/ch14-scenario-pipeline-en.svg`
- layout type: vertical flow of six boxes with a closing caption, 480 x 907 units

## Learning purpose

Show the six-step pipeline of Scenario Compare and that it compares changed assumptions against a fixed baseline without recommending a best scenario.

## Source sections

- 4. Framework / Logic: Scenario Compare는 6단계 파이프라인으로 실행된다 (STEP 1 요청 수준 사전점검, STEP 2 base + override 병합, STEP 3 병합된 client_input의 스키마 검증, STEP 4 run_mode_a/b/c/run_bep 실행, STEP 5 읽기 전용 summary, STEP 6 baseline 대비 delta).
- 4. Framework / Logic: 시나리오 간 무엇이 달라졌는지가 override 목록에서 바로 드러나고, override되지 않은 모든 필드는 구조적으로 동일함이 보장된다. STEP 3 실패는 해당 시나리오만 ERROR로 만들고 다른 시나리오는 계속 진행된다. STEP 4는 모든 시나리오에 네 모드를 전부 실행한다.
- 6. Pricing 또는 Harness 적용: delta 지표는 순매출, 공헌이익, 공헌이익률, 손익분기수량의 네 가지이며, 시나리오에 순위를 매기거나 최선의 시나리오를 추천하지 않는다.
- 발표 핵심 메시지: 같은 기준선에서 가정 하나의 변화가 숫자를 어떻게 바꾸는지 보여주는 도구이며 정답을 추천하는 도구가 아니다.

## Concepts included

여섯 단계와 그 한 줄 설명; 네 엔진 (MODE A, MODE B, MODE C, BEP); baseline 대비 Δ와 네 지표; 최선을 추천하지 않는다는 마무리 문장.

## Concepts intentionally excluded

override allowlist (components, cost_items, targets, tax, fx); 시나리오 상태 규칙 ERROR > INCOMPLETE > OK; 단계 1 실패 시 요청 전체 ERROR; delta 상태(OK/UNKNOWN/NOT_APPLICABLE/ERROR); Volume Profit이 포함되지 않는다는 점; 다중 컴포넌트 BEP 제약.

## Relationship semantics

Arrows run in the order of the pipeline steps. The navy box is the engine step (the one step that runs four independent engines); the gold box is the final output.

## Fidelity notes

The delta box lists "BEP" for the chapter's break_even_quantity delta. The first step's sub-label (중복 · 대상 · 기준선 확인) summarizes the checks the chapter lists; it does not mention that a failure there stops the whole request, which is a point of the chapter that the diagram omits.

## KO labels

Baseline은 고정하고 달라진 가정만 비교; 1. 요청 수준 사전점검 / 중복 · 대상 · 기준선 확인; 2. base + override 병합 / 달라진 필드만 치환; 3. 시나리오별 스키마 검증 / 오류는 해당 시나리오에 한정; 4. 네 엔진 실행 / MODE A · MODE B · MODE C · BEP, 각 시나리오에 모두 실행; 5. 결과 요약 / 기존 모듈 결과의 읽기 전용 뷰; 6. Baseline 대비 Δ / 순매출 · 공헌이익 · 공헌이익률 · BEP; 숫자를 비교하되 “최선”은 추천하지 않는다.

## EN labels

Hold the baseline; compare changes; 1. Request preflight / Duplicates · targets · baseline; 2. Merge base + override / Replace only changed fields; 3. Validate each scenario / Errors stay with that scenario; 4. Run four engines / MODE A · MODE B · MODE C · BEP, Run all four for every scenario; 5. Summarize results / Read-only view of module outputs; 6. Δ vs baseline / Net sales · CM · CM rate · BEP; Compare numbers; don't name a “best”.

## Color meaning

Teal = pipeline steps. Navy = the engine step. Gold = the delta output.

## Accessibility description

The `<title>` and `<desc>` elements of each SVG state the diagram in the matching language; the chapter Markdown carries a longer alt text.
