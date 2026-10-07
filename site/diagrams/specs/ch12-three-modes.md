# ch12-three-modes

- diagram_id: `three-modes`
- chapter: CH12. MODE C — 허용원가 역산 / MODE C: allowable cost reverse calculation
- files: `assets/images/ch12-three-modes-ko.svg`, `assets/images/ch12-three-modes-en.svg`
- layout type: three stacked mode boxes, each with a result chip, and a closing caption, 480 x 649 units

## Learning purpose

Show that MODE A, B, and C solve the same contribution-margin identity for different unknowns.

## Source sections

- 4. Framework / Logic: MODE A/B/C는 모두 하나의 Contribution Margin 항등식을 서로 다른 미지수에 대해 푸는 구조다.
- 4. Framework / Logic: MODE A: price(given) + cost(given) -> CM (진단); MODE B: cost(given) + target CM -> price (미지수); MODE C: price(given, market) + target CM -> allowable direct cost (미지수).
- 이미지 대체 텍스트와 핵심 메시지: 시장가격이 정해져 있다면 목표마진을 지키는 최대 허용원가를 역산한다.

## Concepts included

MODE A (현재가격 진단: 가격 + 원가 → 공헌이익); MODE B (목표가격 역산: 원가 + 목표마진 → 필요 가격); MODE C (허용원가 역산: 시장가격 + 목표마진 → 허용원가).

## Concepts intentionally excluded

공식 `ADC = N(1 − t − b) − aG − F`와 기호; VAT 처리; 음수 ADC; `direct_cost_gap`; shared 비용 배부; UNKNOWN 상태 규칙. These are chapter content but not part of the three-mode comparison.

## Relationship semantics

Inside each box the gold arrow means "solves for": the inputs above the arrow produce the result in the gold chip. The three boxes are parallel; no arrows connect them.

## Fidelity notes

The caption asks which of price, cost, and margin must be solved. In the chapter the unknowns are the contribution margin (diagnosis in MODE A), the price (MODE B), and the allowable direct cost (MODE C); the caption widens "cost" and "margin" to the general question and is a summary, not a quote.

## KO labels

같은 구조, 다른 미지수; MODE A · 현재가격 진단 / 가격 + 원가 → 공헌이익; MODE B · 목표가격 역산 / 원가 + 목표마진 → 필요 가격; MODE C · 허용원가 역산 / 시장가격 + 목표마진 → 허용원가; 가격·원가·마진 중 무엇을 구할 것인가?

## EN labels

Same structure, different unknown; MODE A · Diagnose price / Price + cost → Contribution margin; MODE B · Solve target price / Cost + target margin → Required price; MODE C · Solve allowable cost / Market price + target margin → Allowable cost; Which of price, cost, and margin must be solved?

## Color meaning

Navy = the three modes (equal core concepts). Gold chips = the unknown each mode solves for.

## Accessibility description

The `<title>` and `<desc>` elements of each SVG state the diagram in the matching language; the chapter Markdown carries a longer alt text.
