// 챕터별 내용요약 카드 SVG(한국어) 15장을 assets/images/chNN-summary-ko.svg 로 생성한다.
// 실행: node tools/gen_summaries.mjs
// 내용은 각 장의 "발표 핵심 메시지", §4 Framework, §8 핵심정리를 줄여 옮긴 것이다. 새 개념은 넣지 않는다.
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = REPO + "/assets/images/";
const C = { navy: "#14253D", teal: "#315B62", gold: "#C49A5A", ivory: "#F6F2EA", ink: "#252A30", white: "#FFFFFF" };
const FONT = "system-ui, 'Noto Sans KR', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif";
let LANG = "ko";
const W = 480, PAD = 24, BOX = W - PAD * 2;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const cw = (ch, fs, bold) => (/[ᄀ-ᇿ㄰-㆏가-힯··—]/.test(ch) ? fs : fs * (bold ? 0.62 : 0.56));
const width = (t, fs, bold) => [...t].reduce((s, ch) => s + cw(ch, fs, bold), 0);
function wrap(text, fs, maxW, bold = false) {
  const first = wrapOnce(text, fs, maxW, bold);
  if (first.length < 2) return first;
  // 마지막 줄만 한두 글자 남는 것을 막기 위해 같은 줄 수 안에서 줄 폭을 최대한 좁힌다.
  let best = first;
  for (let w = maxW; w > maxW * 0.55; w -= 4) {
    const r = wrapOnce(text, fs, w, bold);
    if (r.length > first.length) break;
    best = r;
  }
  return best;
}
function wrapOnce(text, fs, maxW, bold = false) {
  const lines = [];
  let cur = "";
  const toks = LANG === "en" ? text.match(/\S+\s*/g) || [] : [...text];
  for (const ch of toks) {
    if (width(cur + ch, fs, bold) > maxW && cur) { lines.push(cur.trimEnd()); cur = ch === " " ? "" : ch; } else cur += ch;
  }
  if (cur) lines.push(cur.trimEnd());
  return lines;
}
const t = (x, y, s, fs, w, fill, anchor = "start") =>
  `    <text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${fs}" font-weight="${w}" fill="${fill}">${esc(s)}</text>`;

const CH = [
  { n: "01", title: "가격은 비즈니스모델의 결과다",
    msg: "가격은 마지막에 붙이는 숫자가 아니라, 고객·가치·전달방식·비용이 맞물린 비즈니스모델의 결과다.",
    pts: [["고객", "누구에게 파는가"], ["가치", "고객이 왜 돈을 내는가"], ["전달방식", "어떤 채널·방식으로 전달하는가"], ["비용", "그 전달에 얼마가 드는가"]],
    ask: "이 가격은 위 네 가지와 서로 맞는가?" },
  { n: "02", title: "원가와 비용구조",
    msg: "원가는 회계표에서 시작하는 숫자가 아니라, 고객가치를 만들고 전달하는 실제 활동에서 도출된다.",
    pts: [["활동", "가치를 만들고 전달하는 일"], ["비용", "활동에 드는 돈을 항목별로 모은다"], ["분류", "직접·간접, 변동·고정으로 나눈다"], ["원가", "제품 하나가 실제로 부담하는 비용"]],
    ask: "원가표가 실제 활동과 연결되어 있는가?" },
  { n: "03", title: "가격결정의 두 논리",
    msg: "좋은 가격은 고객이 인정하는 가치와 경쟁 속에서 선택할 포지션을 함께 반영한다.",
    pts: [["고객가치 기반", "지불의사를 먼저 확인하고 사업성을 역으로 설계"], ["경쟁 기반", "진짜 경쟁자를 정의하고 가격 위치를 비교"], ["포지셔닝", "가격은 품질·브랜드 위치를 알리는 신호"], ["정직한 한계", "가격 상·하한을 정하는 표준 절차는 없다"]],
    ask: "내 가격은 의도한 포지션과 일치하는가?" },
  { n: "04", title: "채널과 고객관계가 바꾸는 가격구조",
    msg: "지속 가능한 가격은 원가와 마진뿐 아니라 채널비용과 고객관계 비용까지 감당해야 한다.",
    pts: [["목표 고객", "가격은 특정 고객을 전제로 한다"], ["채널", "직접·간접 선택이 수수료와 이익률을 바꾼다"], ["고객관계 비용", "획득·유지·재구매에 드는 비용"], ["가격구조", "모두 반영해도 목표 마진이 남는지 확인"]],
    ask: "수수료와 관계비용을 빼고도 마진이 남는가?" },
  { n: "05", title: "수익원과 가격 메커니즘",
    msg: "수익모델은 가격표가 아니라 누가·무엇에·얼마를·언제·얼마나 반복해서 지불하는지를 설계하는 일이다.",
    pts: [["누가 · 무엇에", "돈을 내는 사람과 그 대상"], ["얼마를", "가격과 가격 메커니즘"], ["언제", "돈이 들어오는 시점"], ["한 번 · 반복", "단발성 수익과 반복적 수익"]],
    ask: "다섯 질문에 모두 답할 수 있는가?" },
  { n: "06", title: "세 재무 렌즈와 사업타당성",
    msg: "가격 P, 비용·마진 구조, 수익모델이 정리되어야 사업타당성을 검증할 수 있다.",
    pts: [["손익 관점", "매출에서 비용을 뺀 이익"], ["자산 관점", "사업으로 보유자산 가치가 오르는가"], ["현금흐름 관점", "현금이 실제로 언제 들어오고 나가는가"], ["세 입력값", "가격 P · 비용·마진 구조 · 수익모델"]],
    ask: "세 입력값이 정리되었는가?" },
  { n: "07", title: "유효시장과 나의 시장",
    msg: "유효시장은 전체 시장의 일부가 아니라, 가격과 사업모델의 제약을 통과한 뒤 실제로 도달할 수 있는 시장이다.",
    pts: [["전체시장", "이론상 존재하는 시장"], ["구매자 기준", "실제로 돈을 내는 구매자로 다시 정의"], ["제약 통과", "가격과 사업모델의 제약을 적용"], ["유효시장 → 나의 시장", "내가 도달 가능한 몫"]],
    ask: "근거 없는 시장 숫자가 섞여 있지 않은가?" },
  { n: "08", title: "정성에서 정량으로 — P×Qty",
    msg: "비즈니스모델은 QCD의 현실 검증을 거쳐야 비로소 P×Qty라는 실행 가능한 시장 숫자로 바뀐다.",
    pts: [["정성", "비즈니스모델과 가정"], ["QCD 검증", "품질·비용·납기를 현실에서 확인"], ["P × Qty", "가격과 판매수량으로 시장을 숫자로"], ["거래유형별", "B2C·B2B·B2G는 Qty의 근거가 다르다"]],
    ask: "Qty의 근거를 설명할 수 있는가?" },
  { n: "09", title: "QCD·추정손익 해석과 반복검증",
    msg: "QCD와 추정손익은 채점표가 아니라, 실행 불가능한 가정을 찾아 다시 설계하게 하는 피드백이다.",
    pts: [["Quality", "요구 수준의 제품을 실제로 만들 수 있는가"], ["Delivery", "원하는 규모와 시점에 공급할 수 있는가"], ["Cost", "감당 가능한 비용으로 만들 수 있는가"], ["반복검증", "안 되는 가정은 고쳐서 다시 계산"]],
    ask: "세 가지 중 하나라도 막히면 가설을 고쳤는가?" },
  { n: "10", title: "MODE A — 현재가격 진단",
    msg: "현재가격의 건강성은 매출총이익이 아니라 판매·배송 변동비까지 뺀 공헌이익으로 확인해야 한다.",
    pts: [["입력", "가격 · 세금 · 비용 · 미확정 항목"], ["매출총이익", "직접원가까지만 반영"], ["공헌이익", "판매·배송 변동비까지 반영"], ["상태값", "계산 가능 여부와 경고를 먼저 읽는다"]],
    ask: "미확정 입력이 결과를 흔들고 있지 않은가?" },
  { n: "11", title: "MODE B — 목표가격 역산",
    msg: "목표가격 역산은 원하는 마진을 가격으로 번역하고, 현재 비용구조로 그 목표가 가능한지 드러낸다.",
    pts: [["목표", "목표 공헌이익률 t를 정한다"], ["비용 구분", "고정금액형 · 순매출 기준 · 총지불금액 기준"], ["역산", "필요한 순매출과 표시가격을 구한다"], ["해석", "그 가격이 시장에서 가능한지는 별도 판단"]],
    ask: "목표율의 출처를 말할 수 있는가?" },
  { n: "12", title: "MODE C — 허용원가 역산",
    msg: "시장가격이 정해져 있다면 목표마진을 지키는 최대 허용원가를 역산하고 실제원가와의 격차를 확인한다.",
    pts: [["시장가격", "이미 정해진 판매가"], ["목표마진", "지켜야 하는 공헌이익률"], ["허용원가", "그 마진을 지키는 최대 직접원가"], ["격차", "허용원가와 실제원가의 차이 확인"]],
    ask: "실제원가는 허용원가 안에 들어오는가?" },
  { n: "13", title: "BEP — 손익분기점",
    msg: "단위당 이익이 플러스여도, 그 이익으로 고정비를 회수할 판매량을 달성할 수 있어야 사업이 성립한다.",
    pts: [["CMu", "단위당 공헌이익 = 순매출 − 직접원가 − 변동비"], ["FC", "고정운영비의 합"], ["Q_BEP", "손익분기 판매량 = FC ÷ CMu"], ["판매량 손익", "계획 판매량에서 이익이 나는지 확인"]],
    ask: "계획 판매량이 손익분기 판매량을 넘는가?" },
  { n: "14", title: "Scenario Compare — 시나리오 비교",
    msg: "시나리오 비교는 정답을 추천하지 않고, 같은 기준선에서 가정 하나의 변화가 숫자를 어떻게 바꾸는지 보여준다.",
    pts: [["기준선", "baseline 시나리오를 하나 정한다"], ["변형", "base에 바꿀 값(override)만 얹는다"], ["실행", "각 시나리오에 모드를 실행해 요약"], ["델타", "baseline 대비 변화량을 읽는다"]],
    ask: "한 번에 가정 하나만 바꿨는가?" },
  { n: "15", title: "가격가설의 검증과 의사결정",
    msg: "가격은 한 번 계산해 확정하는 숫자가 아니라, 시장 데이터로 계속 검증하고 수정하는 살아 있는 가설이다.",
    pts: [["가설", "가격에 대한 가설을 문장으로 쓴다"], ["검증대상 · 지표", "무엇을 어떤 지표로 볼지 정한다"], ["방법 · 계획", "어떻게 확인할지 계획한다"], ["피드백", "데이터로 유지·수정·피보팅을 결정"]],
    ask: "계산 결과와 가정을 구분해 적었는가?" },
];

const CH_EN = [
  { n: "01", title: "Price Is the Outcome of the Business Model",
    msg: "Price is not a number added at the end; it is the outcome of a business model aligning customer, value, delivery, and cost.",
    pts: [["Customer", "Who are we selling to?"], ["Value", "Why does the customer pay?"], ["Delivery", "Through which channel and method?"], ["Cost", "What does that delivery cost?"]],
    ask: "Does this price fit all four?" },
  { n: "02", title: "Cost and Cost Structure",
    msg: "Cost does not begin in an accounting table; it is derived from the activities that create and deliver customer value.",
    pts: [["Activities", "The work that creates and delivers value"], ["Expenses", "Collect what activities cost, item by item"], ["Classification", "Direct/indirect and variable/fixed"], ["Cost", "What one unit actually bears"]],
    ask: "Is the cost table tied to real activities?" },
  { n: "03", title: "Two Logics of Pricing — Customer Value and Competition",
    msg: "A sound price reflects both the value customers recognize and the position chosen among alternatives.",
    pts: [["Customer-value based", "Confirm willingness to pay, then design the business case backward"], ["Competition based", "Define the true competitors and compare price position"], ["Positioning", "Price signals quality and brand position"], ["Honest limit", "No standard procedure sets price floors and ceilings"]],
    ask: "Does my price match the intended position?" },
  { n: "04", title: "How Channel and Customer Relationship Reshape Price Structure",
    msg: "A sustainable price must cover not only cost and margin, but also the costs of the channel and the customer relationship.",
    pts: [["Target customer", "A price presumes a specific customer"], ["Channel", "Direct vs. indirect changes fees and margin"], ["Relationship cost", "Acquisition, retention, repurchase"], ["Price structure", "Does the target margin survive all of it?"]],
    ask: "Is margin left after fees and relationship costs?" },
  { n: "05", title: "Revenue Streams and Pricing Mechanisms",
    msg: "A revenue model is not a price list; it defines who pays, for what, how much, when, and how repeatedly.",
    pts: [["Who and for what", "The payer and the thing paid for"], ["How much", "Price and pricing mechanism"], ["When", "The timing of cash coming in"], ["Once or repeatedly", "One-time vs. recurring revenue"]],
    ask: "Can we answer all five questions?" },
  { n: "06", title: "The Three Financial Lenses and the Bridge to Business Feasibility",
    msg: "Feasibility can be tested only after price P, the cost-and-margin structure, and the revenue model are defined.",
    pts: [["Profit lens", "Revenue minus costs"], ["Asset lens", "Does the business raise asset value?"], ["Cash-flow lens", "When does cash actually move?"], ["Three inputs", "Price P, cost-and-margin structure, revenue model"]],
    ask: "Are the three inputs defined?" },
  { n: "07", title: "The Effective Market and My Market",
    msg: "The effective market is not an arbitrary slice of the total market; it is the market the price and business model can realistically reach.",
    pts: [["Total market", "The market that exists in theory"], ["Buyer-based", "Redefine around actual paying buyers"], ["Constraints", "Apply price and business-model limits"], ["Effective → my market", "The share I can actually reach"]],
    ask: "Are any unsupported market numbers mixed in?" },
  { n: "08", title: "From Qualitative to Quantitative — Effective Market Sizing and P×Qty",
    msg: "A business model becomes an actionable market number, P×Qty, only after its assumptions pass a QCD reality check.",
    pts: [["Qualitative", "The business model and its assumptions"], ["QCD check", "Quality, cost, delivery tested in reality"], ["P × Qty", "Turn the market into price times quantity"], ["By deal type", "B2C, B2B, B2G need different Qty evidence"]],
    ask: "Can I explain the basis of Qty?" },
  { n: "09", title: "Interpreting QCD and Projected P&L, and Iterative Validation",
    msg: "QCD and projected P&L are not scorecards; they are feedback that exposes assumptions requiring redesign.",
    pts: [["Quality", "Can we make what the target customer requires?"], ["Delivery", "Can we supply at the needed scale and time?"], ["Cost", "Can we do it at an affordable cost?"], ["Iterate", "Fix failing assumptions and recalculate"]],
    ask: "If any one is blocked, did we revise the hypothesis?" },
  { n: "10", title: "MODE A — Current Price Diagnosis",
    msg: "Judge the health of the current price by contribution margin after variable selling and delivery costs, not by gross profit alone.",
    pts: [["Inputs", "Price, tax, costs, unconfirmed items"], ["Gross profit", "Reflects direct cost only"], ["Contribution margin", "Also reflects variable selling and delivery"], ["Status values", "Read calculability and warnings first"]],
    ask: "Are unconfirmed inputs shaking the result?" },
  { n: "11", title: "MODE B — Target Price Reverse Calculation",
    msg: "Target-price reverse calculation translates a desired margin into price and reveals whether the current cost structure can support it.",
    pts: [["Target", "Set the target contribution margin rate t"], ["Cost types", "Fixed amount, net-sales rate, gross-payment rate"], ["Reverse calculate", "Find required net sales and displayed price"], ["Interpret", "Whether the market accepts it is a separate judgment"]],
    ask: "Can we state where the target rate comes from?" },
  { n: "12", title: "MODE C — Allowable Cost Reverse Calculation",
    msg: "When the market price is fixed, reverse-calculate the maximum allowable cost and check its gap from actual cost.",
    pts: [["Market price", "A selling price already fixed"], ["Target margin", "The contribution margin rate to protect"], ["Allowable cost", "Maximum direct cost that keeps that margin"], ["Gap", "Allowable cost vs. actual cost"]],
    ask: "Does actual cost fit inside allowable cost?" },
  { n: "13", title: "BEP — Break-Even Point",
    msg: "A positive unit margin does not make a viable business unless the sales volume needed to recover fixed costs is achievable.",
    pts: [["CMu", "Unit contribution margin = net sales − direct cost − variable cost"], ["FC", "Sum of fixed operating costs"], ["Q_BEP", "Break-even volume = FC ÷ CMu"], ["Volume profit", "Is there profit at the planned volume?"]],
    ask: "Does planned volume exceed break-even volume?" },
  { n: "14", title: "Scenario Compare",
    msg: "Scenario comparison does not recommend the answer; it shows how changing one assumption alters the numbers against a common baseline.",
    pts: [["Baseline", "Fix one baseline scenario"], ["Variation", "Layer only the changed values (override) on base"], ["Run", "Run the modes for each scenario and summarize"], ["Delta", "Read the change against the baseline"]],
    ask: "Did we change only one assumption at a time?" },
  { n: "15", title: "Validating Price Hypotheses and Making Decisions",
    msg: "Price is not a number calculated once and finalized; it is a living hypothesis continually tested and revised with market data.",
    pts: [["Hypothesis", "Write the price hypothesis as a sentence"], ["Target and metric", "Decide what to test and which metric to read"], ["Method and plan", "Plan how it will be checked"], ["Feedback", "Keep, revise, or pivot based on data"]],
    ask: "Did we separate calculation from assumption?" },
];

function render(c, L) {
  LANG = L;
  const lab = L === "en" ? { msg: "Key message", ask: "Check question", sum: "Summary" } : { msg: "핵심 메시지", ask: "체크 질문", sum: "요약" };
  const body = [];
  let y = 24;
  // header
  const tl = wrap(c.title, 20, BOX - 24, true);
  const hh = 22 + 14 + tl.length * 27 + 14;
  body.push(`    <rect x="${PAD}" y="${y}" width="${BOX}" height="${hh}" rx="10" fill="${C.navy}"/>`);
  body.push(t(PAD + 14, y + 26, `CH${c.n}`, 14, 700, C.gold));
  tl.forEach((l, i) => body.push(t(PAD + 14, y + 22 + 14 + 22 + i * 27 - 8, l, 20, 700, C.white)));
  y += hh + 14;
  // message
  const ml = wrap(c.msg, 17, BOX - 28);
  const mh = 16 + 20 + ml.length * 24 + 12;
  body.push(`    <rect x="${PAD}" y="${y}" width="${BOX}" height="${mh}" rx="10" fill="${C.teal}"/>`);
  body.push(t(PAD + 14, y + 22, lab.msg, 13, 700, C.gold));
  ml.forEach((l, i) => body.push(t(PAD + 14, y + 22 + 22 + i * 24, l, 17, 400, C.white)));
  y += mh + 14;
  // points
  c.pts.forEach(([h, s], i) => {
    const sl = wrap(s, 16, BOX - 74);
    const ph = Math.max(54, 18 + 22 + sl.length * 21 + 6);
    body.push(`    <rect x="${PAD}" y="${y}" width="${BOX}" height="${ph}" rx="10" fill="${C.white}" stroke="${C.teal}" stroke-width="1.5"/>`);
    body.push(`    <circle cx="${PAD + 28}" cy="${y + ph / 2}" r="15" fill="${C.gold}"/>`);
    body.push(t(PAD + 28, y + ph / 2 + 6, String(i + 1), 17, 700, C.ink, "middle"));
    body.push(t(PAD + 56, y + 26, h, 17, 700, C.ink));
    sl.forEach((l, k) => body.push(t(PAD + 56, y + 26 + 22 + k * 21 - 2, l, 16, 400, C.ink)));
    y += ph + 10;
  });
  // ask
  y += 4;
  const al = wrap(c.ask, 17, BOX - 28, true);
  const ah = 14 + al.length * 24 + 10 + 18;
  body.push(`    <rect x="${PAD}" y="${y}" width="${BOX}" height="${ah}" rx="10" fill="${C.gold}"/>`);
  body.push(t(PAD + 14, y + 22, lab.ask, 13, 700, C.ink));
  al.forEach((l, i) => body.push(t(PAD + 14, y + 22 + 24 + i * 24 - 6, l, 17, 700, C.ink)));
  y += ah + 24;
  const H = Math.round(y);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t d" font-family="${FONT}">
  <title id="t">${esc(`CH${c.n} ${lab.sum}: ${c.title}`)}</title>
  <desc id="d">${esc(`${c.msg} ${c.pts.map(([h, s], i) => `${i + 1}. ${h}: ${s}.`).join(" ")} ${lab.ask}: ${c.ask}`)}</desc>
  <g id="background">
    <rect width="${W}" height="${H}" rx="14" fill="${C.ivory}"/>
  </g>
  <g id="summary">
${body.join("\n")}
  </g>
</svg>
`;
  writeFileSync(OUT + `ch${c.n}-summary-${L}.svg`, svg, "utf8");
}
for (const c of CH) render(c, "ko");
for (const c of CH_EN) render(c, "en");
console.log("wrote", CH.length + CH_EN.length, "summary SVGs");
