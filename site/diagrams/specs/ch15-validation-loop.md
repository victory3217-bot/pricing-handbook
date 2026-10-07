# ch15-validation-loop

- diagram_id: `validation-loop`
- chapter: CH15. 가격가설의 검증과 의사결정 / Validating price hypotheses and making decisions
- files: `assets/images/ch15-validation-loop-ko.svg`, `assets/images/ch15-validation-loop-en.svg`
- layout type: vertical flow of six boxes with a dashed return loop and legend, 480 x 956 units

## Learning purpose

Show that a price is a hypothesis tested through the four elements of validation design, and that feedback leads to reopening the component whose assumption was shaken and then to the next hypothesis.

## Source sections

- 발표 핵심 메시지: 가격은 한 번 계산해 확정하는 숫자가 아니라, 시장 데이터로 계속 검증하고 수정하는 살아 있는 가설이다.
- 2. 핵심개념: 가설을 검증 가능한 실험으로 바꾸려면 네 가지 항목을 순서대로 연결해야 한다: 조사검증대상 (어떤 가격가설인가), 측정지표 (무엇으로 판단하는가), 방법 및 계획 (어떤 방법으로, 언제, 누구를 대상으로), 피드백데이터 (어느 가격 구성요소를 수정하는 근거로 되돌릴 것인가).
- 5. 적용 절차 6: 원가구조 장인지, 가치기반 가격 장인지, 세그먼트·채널 장인지 판단하여 해당 구성요소를 다시 여는 근거로 삼는다.
- 2. 핵심개념: 이 데이터를 읽고 다음 가설로 넘어가는 과정이 이 장의 주제다.
- 4. Framework / Logic 3층: 피보팅은 새로운 아이디어가 떠올랐기 때문이 아니라 데이터가 기존 가설을 흔들었기 때문에 일어난다.
- 8. 핵심정리: 실행은 계획을 한 번 세우고 끝내는 일이 아니라, 현실이 알려주는 대로 계획의 특정 부분을 다시 여는 과정이다.

## Concepts included

가격가설; 검증설계 4요소 (조사검증대상, 측정지표, 방법 및 계획, 피드백데이터)와 각 질문; 흔들린 가정의 구성요소 (원가구조, 가치기반 가격, 세그먼트·채널)를 다시 연다; 업데이트한 뒤 다음 가설로 넘어가는 루프.

## Concepts intentionally excluded

AI와 사람의 역할 구분; 증거의 충분성(보편적 임계값이 없다는 점); 작고 반복 가능한 실험 원칙; 피보팅의 기준 자체; 수익모델 장 (the closing paragraph mentions it, application step 6 does not); Pricing Harness에 검증 데이터 저장 기능이 없다는 한계.

## Relationship semantics

Solid arrows follow the four elements in the order the chapter gives, then lead from the feedback data to the reopen step. The dashed gold arrow from the reopen step back to the Price hypothesis box means that after updating the affected component the work moves on to the next hypothesis.

## Fidelity notes

Resolved: an earlier version looped the feedback straight back into the Price hypothesis box with a mixed list of assumptions, which hid the step the chapter names (reopen the component whose assumption was shaken). The reopen step is now its own box and its list follows application step 6. Remaining notes: the closing paragraph of the chapter also names the revenue model, and the practical checkpoints name cost, value, segment, and channel; the box uses the three components of application step 6. The dashed arrow points to the Price hypothesis box as the start of the next hypothesis; the chapter says only "다음 가설로 넘어가는 과정".

## KO labels

가격은 검증하고 수정하는 가설이다; 가격가설; 1. 조사검증대상 / 무엇을 확인할 것인가?; 2. 측정지표 / 무엇으로 판단할 것인가?; 3. 방법 및 계획 / 어떻게 · 언제 · 누구에게?; 4. 피드백데이터 / 어느 가정을 수정할 것인가?; 흔들린 가정의 구성요소를 다시 연다 / 원가구조 · 가치기반 가격 · 세그먼트 · 채널; 실선 화살표: 검증의 순서; 점선 화살표: 업데이트한 뒤 다음 가설로.

## EN labels

Price is a hypothesis to test and revise; PRICE HYPOTHESIS; 1. Validation target / What will we test?; 2. Metric / How will we judge it?; 3. Method and plan / How · when · with whom?; 4. Feedback data / Which assumption must change?; Reopen the component whose assumption shook / Cost structure · value-based pricing · segment/channel; Solid arrow: order of validation; Dashed arrow: after updating, on to the next hypothesis.

## Color meaning

Gold = the price hypothesis. Teal = the first three validation elements and the reopen step. Navy = Feedback data (the closing element of the design). Gold dashed = on to the next hypothesis.

## Accessibility description

The `<title>` and `<desc>` elements of each SVG state the diagram in the matching language; the chapter Markdown carries a longer alt text.
