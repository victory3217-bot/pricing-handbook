# ch04-price-structure

- diagram_id: `price-structure`
- chapter: CH04. 채널과 고객관계가 바꾸는 가격구조 / How channel and customer relationship reshape price structure
- files: `assets/images/ch04-price-structure-ko.svg`, `assets/images/ch04-price-structure-en.svg`
- layout type: vertical stack of four combined inputs, then the price structure box, 480 x 784 units

## Learning purpose

Show that the price structure has to carry the target customer, the channel, the customer relationship cost, and the cost with target margin together, and then be checked for whether the target margin still holds.

## Source sections

- 발표 핵심 메시지: 지속 가능한 가격은 원가와 마진뿐 아니라 채널비용과 고객관계 비용까지 감당해야 한다.
- 2. 핵심개념: 특정 가격은 특정 고객을 전제로 하고, 그 고객에게 접근하는 채널을 전제로 하며, 그 채널의 수수료와 운영비는 다시 원가와 마진을 바꾼다. 간접채널은 유통마진과 수수료가 발생하고, 직접채널은 고객 획득·배송·서비스 부담이 따른다.
- 2. 핵심개념: 고객관계는 고객을 획득하고, 구매경험을 관리하고, 재구매와 추가구매로 이어지게 만드는 활동이며 인력과 시스템, 프로모션 비용이 든다.
- 5. 적용 절차 4–5: 원가, 채널비용, 고객관계 유지비용을 모두 반영했을 때도 목표 마진이 남는지 검토하고, 남지 않으면 채널 구성, 가격, 고객관계 운영방식 중 무엇을 조정할지 판단한다.

## Concepts included

목표 고객; 채널 (직접 vs 간접; 수수료, 유통마진, 운영부담); 고객관계 비용 (획득, 유지, 재구매); 원가와 목표 마진; 가격구조와 목표 마진 점검.

## Concepts intentionally excluded

채널별 숫자 비교; Pricing Harness의 `applies_to_component` / `allocation_rule` 필드 (the chapter says channel cost allocation is not implemented); 파트너십.

## Relationship semantics

The `+` signs mean the four items are combined and considered together. The arrow into the gold box means the combined result is the price structure, which is then checked against the target margin.

## Fidelity notes

The chapter says these items are all reflected in the price structure; the box label "가격구조의 기본 요소" for cost and target margin is a paraphrase, not a quote.

## KO labels

가격구조를 바꾸는 요소; 목표 고객 / 특정 가격은 특정 고객을 전제로 한다; 채널 (직접 vs 간접) / 수수료 · 유통마진 · 운영부담; 고객관계 비용 / 획득 · 유지 · 재구매; 원가 · 목표 마진 / 가격구조의 기본 요소; 가격구조 / 모두 반영한 뒤에도 목표 마진이 남는가? 남지 않으면 채널 · 가격 · 관계 운영을 조정.

## EN labels

What reshapes price structure; Target customer / A given price assumes a particular customer; Channel (direct vs. indirect) / Fees · distribution margin · operating burden; Customer Relationship Cost / Acquisition · retention · repurchase; Cost and target margin / The base elements of price structure; Price structure / Does the target margin still hold after all of it? If not: adjust channel, price, or relationship.

## Color meaning

Teal = the inputs. Gold = the price structure and its margin check.

## Accessibility description

The `<title>` and `<desc>` elements of each SVG state the diagram in the matching language; the chapter Markdown carries a longer alt text.
