# Glossary — Pricing Strategy Handbook v0.1

> Korean ↔ English terminology actually used in this handbook, confirmed during the English translation pass. No new concepts are introduced here — this only records the mapping.

## Core Terms

| Korean | English | Notes |
|---|---|---|
| 가격 | Price / Pricing | Chosen by context |
| 원가 | Cost | |
| 비용 | Cost / Expense | Cost for general operating/structural cost; Expense for accounting/P&L line items |
| 고정비 | Fixed Cost | |
| 변동비 | Variable Cost | |
| 직접비 | Direct Cost | |
| 간접비 | Indirect Cost | |
| 판매관리비 | SG&A | |
| 제조원가 | Manufacturing Cost | |
| 고객가치 기반 가격결정 | Value-Based Pricing | |
| 경쟁 기반 가격결정 | Competition-Based Pricing | |
| 포지셔닝 | Positioning | |
| 채널 | Channel | |
| 고객관계 비용 | Customer Relationship Cost | |
| 수익원 / 수익모델 | Revenue Streams / Revenue Model | |
| 단발성 수익 | One-time Revenue | |
| 반복적 수익 | Recurring Revenue | |
| 가격메커니즘 | Pricing Mechanism | |
| 손익 / 자산가치 / 현금흐름 | P&L / Asset Value / Cash Flow | "Three financial lenses" |
| 사업타당성 | Business Feasibility | |
| 유효시장 | Effective Market | Also glossed as "Addressable Market" in one place (CH07 §1) — see translation-issues-log.md |
| 전체시장 | Total Market | |
| 구매자 기준 시장 | Buyer-Defined Market | |
| P×Qty | P×Qty | Symbol kept as-is |
| QCD | QCD | Quality/Cost/Delivery, kept as-is |
| 추정손익 | Projected P&L | |
| 손익분기점 | Break-even Point (BEP) | |
| 매출총이익 (GP) | Gross Profit (GP) | Never generalized to plain "Margin" |
| 공헌이익 (CM) | Contribution Margin (CM) | Never generalized to plain "Margin" |
| 허용원가 | Allowable Cost | MODE C's output |
| Validation (검증) | Validation | |
| 피보팅 | Pivoting | |
| 검증설계의 4요소 | The four elements of validation design | 조사검증대상/측정지표/방법및계획/피드백데이터 |
| MODE A | MODE A | Never translated |
| MODE B | MODE B | Never translated |
| MODE C | MODE C | Never translated |
| BEP | BEP | Never translated |
| Scenario Compare | Scenario Compare | Never translated; described as an orchestration layer, not a calculation engine |
| baseline | baseline | Never translated |
| delta | delta | Never translated |

## Terminology Decisions Requiring Attention (per Human Review Pack §6)

- **비용 (Cost vs. Expense)**: applied contextually per chapter; CH02 itself does not maintain a strict internal distinction (see translation-issues-log.md) — future Korean revision may want to tighten this.
- **마진 (GP vs. CM)**: never rendered as a bare "Margin" anywhere in the English text; always the specific Gross Profit or Contribution Margin term, matching the Harness's own terminology boundary (these formulas are Harness Internal Specification, not Master-Note-confirmed — stated explicitly in CH10, CH11, CH12).

## Reused from business-planning-handbook (for consistency across handbooks)

Effective Market, Projected P&L, Business Model, Value Proposition, Competitive Advantage, Positioning, User/Buyer/Payer, KBF (Key Buying Factor).

## Added by the Standard Lecture Plan 3-1 layer (ko §10; English renderings are proposals, not yet used in `en/`)

| Korean | English (proposed) | Notes |
|---|---|---|
| 균형가격 / 초과공급 / 초과수요 | Equilibrium price / Excess supply / Excess demand | CH03 |
| 가격-품질 네 칸 | Price–quality four cells | CH03; cell placement needs checking against the source diagram |
| 비교가격 | Comparative price | CH03 |
| 가격 메커니즘 (고정가격·협상·물량단가·입찰) | Pricing mechanism | CH05 |
| 권장 소비자가 / 공식가 | List price | CH04 |
| 실판매가 | Sales price | CH04 |
| 가격구조 / 채널구조 | Price Structure / Channel Structure | CH04 |
| Cost plus / Sales minus / 키스톤 | Cost plus / Sales minus / Keystone | CH04, kept as-is |
| 직매입 / 특정매입 | Outright purchase / Consignment-type purchase | CH04 |
| 프로모션 재원 | Promotion fund | CH04 |
| 재고가능원가 / 기간원가 | Inventoriable cost / Period cost | CH02 |
| 제조간접비 / 배부 / 배부 기준 | Manufacturing overhead / Allocation / Allocation basis | CH02 |
| 월 최소 판매 목표 | Monthly minimum sales target | CH01, CH13 |
| 세 재무 렌즈: 손익·자산·현금흐름 관점 | Income / Asset / Cash-flow lens | CH06 |
| 시장 경계 / 시장 상한 | Market boundary / Market cap (budget cap) | CH07, CH08 |
| 상태값 (INCOMPLETE, NOT_APPLICABLE, NOT_RUN, NOT_IMPLEMENTED) | Status values | CH10; tool terms, kept as-is |
| 구성요소 / 공유비용 / 배분 규칙 | Price component / Shared cost / Allocation rule | CH10 |
| 실지급액 기준 / 순매출 기준 | Rate on gross payment / Rate on net sales | CH10 |
| 안전한계 / 안전한계율 | Margin of safety / Margin of safety rate | CH13 |
| 관찰된 범위 | Observed range | CH15 |

Open terminology issue: whether "변동비" includes materials (accounting view, CH02) or only selling/delivery cost (calculator `variable_selling_delivery`, CH10) — recorded side by side in CH02 §10, not resolved.
