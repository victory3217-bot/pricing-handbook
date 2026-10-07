import { writeFileSync } from "node:fs";

import { dirname, resolve as __resolve } from "node:path";
import { fileURLToPath } from "node:url";
const REPO = __resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = REPO + "/assets/images/";
const C = { navy: "#14253D", teal: "#315B62", gold: "#C49A5A", ivory: "#F6F2EA", ink: "#252A30" };
const FONT = "system-ui, 'Noto Sans KR', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif";
const ST = { title: { fs: 20, lh: 27, w: 700 }, sub: { fs: 17, lh: 23, w: 400 }, small: { fs: 16, lh: 21, w: 400 } };
const warnings = [];
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const textH = (nt, ns) => nt * ST.title.lh + ns * ST.sub.lh;
function estWidth(t, st) {
  let w = 0;
  for (const ch of t) w += /[\u1100-\u11ff\u3130-\u318f\uac00-\ud7af\u00b7·—]/.test(ch) ? st.fs : st.fs * (st.w >= 700 ? 0.6 : 0.54);
  return w;
}
function block(id, cx, top, boxW, boxH, titles, subs, tc, sc) {
  const total = textH(titles.length, subs.length);
  if (total > boxH - 12) warnings.push(`${id}: text ${total} > box ${boxH - 12}`);
  let y = top + (boxH - total) / 2;
  const out = [];
  const put = (t, st, color) => {
    const s = ST[st];
    if (estWidth(t, s) > boxW - 16) warnings.push(`${id}: "${t}" ~${Math.round(estWidth(t, s))} > ${boxW - 16}`);
    out.push(`    <text x="${cx}" y="${Math.round(y + s.lh * 0.5 + s.fs * 0.35)}" text-anchor="middle" font-size="${s.fs}" font-weight="${s.w}" fill="${color}">${esc(t)}</text>`);
    y += s.lh;
  };
  titles.forEach((t) => put(t, "title", tc));
  subs.forEach((t) => put(t, "sub", sc));
  return out.join("\n");
}
const rect = (x, y, w, h, fill) => `    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${fill}"/>`;
const arrow = (x1, y1, x2, y2) => `    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.navy}" stroke-width="2.5" marker-end="url(#arrow-navy)"/>`;
const plain = (x, y, t, fs, w, color, anchor = "middle") => `    <text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${fs}" font-weight="${w}" fill="${color}">${esc(t)}</text>`;
function wrapSvg({ H, title, desc, body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 ${H}" role="img" aria-labelledby="t d" font-family="${FONT}">
  <title id="t">${esc(title)}</title>
  <desc id="d">${esc(desc)}</desc>
  <defs>
    <marker id="arrow-navy" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="${C.navy}"/>
    </marker>
    <marker id="arrow-gold" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="${C.gold}"/>
    </marker>
  </defs>
  <g id="background">
    <rect width="480" height="${H}" rx="14" fill="${C.ivory}"/>
  </g>
${body}
</svg>
`;
}
const needH = (b) => ["ko", "en"].map((l) => textH(b[l].t.length, b[l].s.length) + 28);
const gtc = (fill) => (fill === C.gold ? C.ink : "#FFFFFF");
const gsc = (fill) => (fill === C.gold ? C.ink : C.ivory);

// ------------------------------------------------------------------ CH01: six overlapping questions, then one arrow into price
const CH01 = {
  meta: {
    ko: { title: "가격은 비즈니스모델의 결과", desc: "가격은 누가 사는가, 왜 사는가, 어디에서 사는가, 우리는 무엇을 해야 하는가, 얼마가 드는가, 어떤 경쟁자와 비교되는가라는 여러 질문이 겹쳐 있는 구조이며, 이 질문들에 대한 잠정적 답이 수치로 모인 결과다. 가격은 정합성의 기준이자 포지셔닝 신호이고, 다시 시장 인식을 강화한다." },
    en: { title: "Price is the outcome of the business model", desc: "Price is a structure in which several questions overlap: who is buying, why they are buying, where they are buying, what we must do, how much doing that costs, and how it compares to which competitors. Price is the outcome in which the provisional answers to these questions are gathered as a number. It is a consistency check and a positioning signal, and it reinforces market perception." },
  },
  headline: { ko: ["비즈니스모델의 답이 가격으로 모인다"], en: ["Business-model answers meet in price"] },
  grid: [
    { id: "customer", ko: { t: ["고객"], s: ["누가 사는가?"] }, en: { t: ["Customer"], s: ["Who is buying?"] } },
    { id: "value", ko: { t: ["가치"], s: ["왜 사는가?"] }, en: { t: ["Value"], s: ["Why are they", "buying?"] } },
    { id: "delivery", ko: { t: ["전달방식"], s: ["어디에서 사는가?"] }, en: { t: ["Delivery"], s: ["Where are they", "buying?"] } },
    { id: "activities", ko: { t: ["활동"], s: ["우리는 무엇을", "해야 하는가?"] }, en: { t: ["Activities"], s: ["What must we do?"] } },
    { id: "cost", ko: { t: ["비용"], s: ["그 일을 하는 데", "얼마가 드는가?"] }, en: { t: ["Cost"], s: ["How much does", "doing that cost?"] } },
    { id: "competition", ko: { t: ["경쟁"], s: ["어떤 경쟁자와", "비교되는가?"] }, en: { t: ["Competition"], s: ["How does this", "compare to which", "competitors?"] } },
  ],
  gold: { id: "price", ko: { t: ["가격"], s: ["질문들에 대한 잠정적 답이", "수치로 모인 결과", "정합성의 기준 · 포지셔닝 신호"] }, en: { t: ["PRICE"], s: ["Provisional answers to these", "questions, gathered as a number", "Consistency check · positioning signal"] } },
  caption: { ko: ["가격은 다시 시장 인식을 강화한다"], en: ["Price reinforces market perception"] },
};

function buildCh01(loc) {
  const S = CH01;
  const g = [];
  const hlN = Math.max(S.headline.ko.length, S.headline.en.length);
  g.push(`  <g id="headline">`);
  S.headline[loc].forEach((t, i) => g.push(plain(240, 44 + i * 27, t, 20, 700, C.ink)));
  g.push("  </g>");
  let y = 24 + hlN * 27 + 24;
  const h = Math.max(...S.grid.flatMap(needH), 90);
  const xs = [40, 248], w = 192, gap = 14;
  g.push(`  <g id="questions">`);
  S.grid.forEach((b, i) => {
    const bx = xs[i % 2], by = y + Math.floor(i / 2) * (h + gap);
    g.push(`  <g id="${b.id}">`);
    g.push(rect(bx, by, w, h, C.teal));
    g.push(block(b.id, bx + w / 2, by, w, h, b[loc].t, b[loc].s, "#FFFFFF", C.ivory));
    g.push("  </g>");
  });
  g.push("  </g>");
  const gridB = y + 3 * h + 2 * gap;
  const gy = gridB + 48;
  g.push(`  <g id="flow">`);
  g.push(arrow(240, gridB + 2, 240, gy - 3));
  g.push("  </g>");
  const gh = Math.max(...needH(S.gold), 120);
  g.push(`  <g id="${S.gold.id}">`);
  g.push(rect(40, gy, 400, gh, C.gold));
  g.push(block(S.gold.id, 240, gy, 400, gh, S.gold[loc].t, S.gold[loc].s, C.ink, C.ink));
  g.push("  </g>");
  const cy = gy + gh + 30;
  g.push(`  <g id="caption">`);
  S.caption[loc].forEach((t, i) => g.push(plain(240, cy + 14 + i * 27, t, 20, 700, C.ink)));
  g.push("  </g>");
  const H = cy + Math.max(S.caption.ko.length, S.caption.en.length) * 27 + 28;
  return wrapSvg({ H, title: S.meta[loc].title, desc: S.meta[loc].desc, body: g.join("\n") });
}

// ------------------------------------------------------------------ CH15: validation design, feedback, reopen the affected component, next hypothesis
const CH15 = {
  meta: {
    ko: { title: "가격가설 검증 순환", desc: "가격가설을 검증설계 4요소(조사검증대상, 측정지표, 방법 및 계획, 피드백데이터)로 검증한다. 피드백이 가정을 흔들었다면 원가구조, 가치기반 가격, 세그먼트·채널 중 해당 구성요소를 다시 열고, 업데이트한 뒤 다음 가설로 넘어간다." },
    en: { title: "Price-hypothesis validation loop", desc: "Test a price hypothesis through the four elements of validation design: validation target, metric, method and plan, and feedback data. If the feedback shook an assumption, reopen the affected component — cost structure, value-based pricing, or segment and channel — and after updating move on to the next hypothesis." },
  },
  headline: { ko: ["가격은 검증하고", "수정하는 가설이다"], en: ["Price is a hypothesis", "to test and revise"] },
  boxes: [
    { id: "price-hypothesis", fill: C.gold, minH: 80, ko: { t: ["가격가설"], s: [] }, en: { t: ["PRICE HYPOTHESIS"], s: [] } },
    { id: "validation-target", fill: C.teal, ko: { t: ["1. 조사검증대상"], s: ["무엇을 확인할 것인가?"] }, en: { t: ["1. Validation target"], s: ["What will we test?"] } },
    { id: "metric", fill: C.teal, ko: { t: ["2. 측정지표"], s: ["무엇으로 판단할 것인가?"] }, en: { t: ["2. Metric"], s: ["How will we judge it?"] } },
    { id: "method-plan", fill: C.teal, ko: { t: ["3. 방법 및 계획"], s: ["어떻게 · 언제 · 누구에게?"] }, en: { t: ["3. Method and plan"], s: ["How · when · with whom?"] } },
    { id: "feedback", fill: C.navy, ko: { t: ["4. 피드백데이터"], s: ["어느 가정을 수정할 것인가?"] }, en: { t: ["4. Feedback data"], s: ["Which assumption must change?"] } },
    { id: "reopen", fill: C.teal, ko: { t: ["흔들린 가정의", "구성요소를 다시 연다"], s: ["원가구조 · 가치기반 가격 ·", "세그먼트 · 채널"] }, en: { t: ["Reopen the component", "whose assumption shook"], s: ["Cost structure · value-based", "pricing · segment/channel"] } },
  ],
  legend: {
    ko: { a: "실선 화살표: 검증의 순서", b: ["점선 화살표: 업데이트한 뒤", "다음 가설로"] },
    en: { a: "Solid arrow: order of validation", b: ["Dashed arrow: after updating,", "on to the next hypothesis"] },
  },
};

function buildCh15(loc) {
  const S = CH15;
  const g = [];
  const hlN = Math.max(S.headline.ko.length, S.headline.en.length);
  g.push(`  <g id="headline">`);
  S.headline[loc].forEach((t, i) => g.push(plain(240, 44 + i * 27, t, 20, 700, C.ink)));
  g.push("  </g>");
  let y = 24 + hlN * 27 + 24;
  const X = 40, W = 380, gap = 36;
  const pos = [];
  S.boxes.forEach((b) => {
    const h = Math.max(b.minH || 0, ...needH(b));
    g.push(`  <g id="${b.id}">`);
    g.push(rect(X, y, W, h, b.fill));
    g.push(block(b.id, X + W / 2, y, W, h, b[loc].t, b[loc].s, gtc(b.fill), gsc(b.fill)));
    g.push("  </g>");
    pos.push([y, h]);
    y += h + gap;
  });
  y -= gap;
  g.push(`  <g id="flow">`);
  for (let i = 0; i < pos.length - 1; i++) g.push(arrow(230, pos[i][0] + pos[i][1] + 2, 230, pos[i + 1][0] - 3));
  g.push("  </g>");
  const first = pos[0], last = pos[pos.length - 1];
  const yl = last[0] + Math.round(last[1] / 2), yf = first[0] + Math.round(first[1] / 2);
  g.push(`  <g id="return-loop">\n    <path d="M${X + W} ${yl} H452 V${yf} H${X + W + 2}" fill="none" stroke="${C.gold}" stroke-width="3" stroke-dasharray="7 5" marker-end="url(#arrow-gold)"/>\n  </g>`);
  const lg = S.legend[loc];
  const nB = Math.max(S.legend.ko.b.length, S.legend.en.b.length);
  y += 36;
  g.push(`  <g id="legend">`);
  g.push(`    <line x1="40" y1="${y}" x2="84" y2="${y}" stroke="${C.navy}" stroke-width="2.5" marker-end="url(#arrow-navy)"/>`);
  g.push(plain(96, y + 6, lg.a, 16, 400, C.ink, "start"));
  g.push(`    <line x1="40" y1="${y + 40}" x2="84" y2="${y + 40}" stroke="${C.gold}" stroke-width="3" stroke-dasharray="7 5" marker-end="url(#arrow-gold)"/>`);
  lg.b.forEach((t, i) => g.push(plain(96, y + 46 + i * 22, t, 16, 400, C.ink, "start")));
  g.push("  </g>");
  const H = y + 46 + nB * 22 + 28;
  return wrapSvg({ H, title: S.meta[loc].title, desc: S.meta[loc].desc, body: g.join("\n") });
}

for (const loc of ["ko", "en"]) {
  writeFileSync(OUT + `ch01-business-model-price-${loc}.svg`, buildCh01(loc), "utf8");
  writeFileSync(OUT + `ch15-validation-loop-${loc}.svg`, buildCh15(loc), "utf8");
}
console.log(warnings.length ? "WARNINGS:\n" + warnings.join("\n") : "no fit warnings");
