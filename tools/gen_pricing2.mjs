import { writeFileSync } from "node:fs";

import { dirname, resolve as __resolve } from "node:path";
import { fileURLToPath } from "node:url";
const REPO = __resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = REPO + "/assets/images/";
const C = { navy: "#14253D", teal: "#315B62", gold: "#C49A5A", ivory: "#F6F2EA", ink: "#252A30" };
const FONT = "system-ui, 'Noto Sans KR', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif";
const ST = { title: { fs: 20, lh: 27, w: 700 }, sub: { fs: 17, lh: 23, w: 400 } };
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
const line = (x1, y1, x2, y2) => `    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C.navy}" stroke-width="2.5" marker-end="url(#arrow-navy)"/>`;
const plain = (x, y, t, fs, w, color) => `    <text x="${x}" y="${y}" text-anchor="middle" font-size="${fs}" font-weight="${w}" fill="${color}">${esc(t)}</text>`;
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

// ------------------------------------------------------------------ CH03: two parallel logics converging on price strategy
const CH03 = {
  meta: {
    ko: { title: "가격결정의 두 논리", desc: "고객가치 기반 가격결정과 경쟁 기반 가격결정은 두 개의 병렬 흐름이며, 두 논리는 서로 배타적이지 않고 함께 가격전략을 만든다. 고객가치 흐름은 고객가치에서 사업성 역산으로, 경쟁 흐름은 진짜 경쟁자 정의에서 경쟁자 가격 비교를 거쳐 포지셔닝으로 이어진다." },
    en: { title: "Two logics of pricing", desc: "Customer-value-based pricing and competition-based pricing are two parallel flows. The two logics are not mutually exclusive and together shape the pricing strategy. The customer-value flow goes from customer value to reverse economics; the competition flow goes from defining true competitors through comparing their prices to positioning." },
  },
  headline: { ko: ["가치와 경쟁의 교차점에서", "가격을 정한다"], en: ["Price sits where", "value meets competition"] },
  heads: { ko: ["고객가치 기반", "경쟁 기반"], en: ["Customer-value based", "Competition based"] },
  col1: [
    { id: "customer-value", ko: { t: ["고객가치"], s: ["지불의사 ·", "수용가격대"] }, en: { t: ["Customer value"], s: ["WTP · acceptable", "range"] } },
    { id: "reverse-economics", ko: { t: ["사업성 역산"], s: ["원가 · 상품구성", "검토"] }, en: { t: ["Reverse economics"], s: ["Review cost ·", "offering"] } },
  ],
  col2: [
    { id: "true-competitors", ko: { t: ["진짜 경쟁자"], s: ["같은 고객 ·", "유사 가치"] }, en: { t: ["True competitors"], s: ["Same customer ·", "similar value"] } },
    { id: "competitor-prices", ko: { t: ["경쟁자 가격 비교"], s: ["업계 평균을 그대로", "복사하지 않는다"] }, en: { t: ["Compare competitor", "prices"], s: ["Don't copy the", "industry average"] } },
    { id: "positioning", ko: { t: ["포지셔닝"], s: ["가격이 보내는", "시장 신호"] }, en: { t: ["Positioning"], s: ["Price as a market", "signal"] } },
  ],
  gold: { id: "pricing-strategy", ko: { t: ["가격전략"], s: ["고객가치 × 경쟁 포지션"] }, en: { t: ["PRICING STRATEGY"], s: ["Customer value × market position"] } },
  caption: { ko: ["두 논리는 서로 배타적이지 않다"], en: ["The two logics are", "not mutually exclusive"] },
};

function buildCh03(loc) {
  const S = CH03;
  const g = [];
  const hlN = Math.max(S.headline.ko.length, S.headline.en.length);
  g.push(`  <g id="headline">`);
  S.headline[loc].forEach((t, i) => g.push(plain(240, 44 + i * 27, t, 20, 700, C.ink)));
  g.push("  </g>");
  let y = 24 + hlN * 27 + 24;
  const h = Math.max(...[...S.col1, ...S.col2].flatMap(needH), 100);
  const cx1 = 24, cx2 = 248, cw = 208, gap = 36;
  g.push(`  <g id="column-headings">`);
  g.push(plain(cx1 + cw / 2, y + 14, S.heads[loc][0], 17, 700, C.ink));
  g.push(plain(cx2 + cw / 2, y + 14, S.heads[loc][1], 17, 700, C.ink));
  g.push("  </g>");
  y += 32;
  const place = (items, x, fill, gid) => {
    const ys = [];
    items.forEach((b, i) => {
      const by = y + i * (h + gap);
      g.push(`  <g id="${b.id}">`);
      g.push(rect(x, by, cw, h, fill));
      g.push(block(b.id, x + cw / 2, by, cw, h, b[loc].t, b[loc].s, gtc(fill), gsc(fill)));
      g.push("  </g>");
      ys.push(by);
    });
    return ys;
  };
  const y1 = place(S.col1, cx1, C.navy), y2 = place(S.col2, cx2, C.teal);
  const col1B = y1[y1.length - 1] + h, col2B = y2[y2.length - 1] + h;
  const gy = col2B + 48;
  g.push(`  <g id="flow">`);
  for (let i = 0; i < y1.length - 1; i++) g.push(line(cx1 + cw / 2, y1[i] + h + 2, cx1 + cw / 2, y1[i + 1] - 3));
  for (let i = 0; i < y2.length - 1; i++) g.push(line(cx2 + cw / 2, y2[i] + h + 2, cx2 + cw / 2, y2[i + 1] - 3));
  g.push(line(cx1 + cw / 2, col1B + 2, cx1 + cw / 2, gy - 3));
  g.push(line(cx2 + cw / 2, col2B + 2, cx2 + cw / 2, gy - 3));
  g.push("  </g>");
  const gh = 100;
  g.push(`  <g id="${S.gold.id}">`);
  g.push(rect(40, gy, 400, gh, C.gold));
  g.push(block(S.gold.id, 240, gy, 400, gh, S.gold[loc].t, S.gold[loc].s, C.ink, C.ink));
  g.push("  </g>");
  const capN = Math.max(S.caption.ko.length, S.caption.en.length);
  let cy = gy + gh + 30;
  g.push(`  <g id="caption">`);
  S.caption[loc].forEach((t, i) => g.push(plain(240, cy + 14 + i * 27, t, 20, 700, C.ink)));
  g.push("  </g>");
  const H = cy + capN * 27 + 28;
  return wrapSvg({ H, title: S.meta[loc].title, desc: S.meta[loc].desc, body: g.join("\n") });
}

// ------------------------------------------------------------------ CH06: three parallel inputs cross-checked by the lenses, then feasibility
const CH06 = {
  meta: {
    ko: { title: "가격전략에서 사업타당성으로", desc: "가격 P, 비용·마진 구조, 수익모델은 병렬로 정리되는 세 입력값이며, 세 재무 렌즈(손익, 자산, 현금흐름)로 교차 점검한 뒤 사업타당성(P × Qty)으로 넘긴다." },
    en: { title: "From pricing strategy to feasibility", desc: "Price P, the cost and margin structure, and the revenue model are three parallel inputs. They are cross-checked through three financial lenses (profit, assets, cash flow) and then handed to business feasibility (P × Qty)." },
  },
  headline: { ko: ["가격전략 → 사업타당성"], en: ["Pricing strategy → Business feasibility"] },
  inputs: [
    { id: "price-p", ko: { t: ["가격 P"], s: ["고객과 가치의", "근거"] }, en: { t: ["Price P"], s: ["Customer +", "value basis"] } },
    { id: "cost-margin", ko: { t: ["비용 · 마진", "구조"], s: ["지속 가능성"] }, en: { t: ["Cost ·", "margin", "structure"], s: ["Sustainability"] } },
    { id: "revenue-model", ko: { t: ["수익모델"], s: ["누가 무엇에", "어떻게 지불?"] }, en: { t: ["Revenue", "model"], s: ["Who pays for", "what and how?"] } },
  ],
  lens: { id: "three-lenses", ko: { t: ["세 재무 렌즈로 교차 점검"], s: ["손익 · 자산 · 현금흐름", "서로 다른 경제적 구조를 함께 확인"] }, en: { t: ["Cross-check with", "three financial lenses"], s: ["Profit · assets · cash flow", "See different economic", "structures together"] } },
  gold: { id: "feasibility", ko: { t: ["사업타당성", "P × Qty"], s: ["실제로 얼마나 팔 수 있는가?"] }, en: { t: ["BUSINESS FEASIBILITY", "P × Qty"], s: ["How much can we actually sell?"] } },
};

function buildCh06(loc) {
  const S = CH06;
  const g = [];
  const hlN = Math.max(S.headline.ko.length, S.headline.en.length);
  g.push(`  <g id="headline">`);
  S.headline[loc].forEach((t, i) => g.push(plain(240, 44 + i * 27, t, 20, 700, C.ink)));
  g.push("  </g>");
  let y = 24 + hlN * 27 + 24;
  const h = Math.max(...S.inputs.flatMap(needH), 100);
  const xs = [24, 172, 320], w = 136;
  g.push(`  <g id="inputs">`);
  S.inputs.forEach((b, i) => {
    g.push(`  <g id="${b.id}">`);
    g.push(rect(xs[i], y, w, h, C.teal));
    g.push(block(b.id, xs[i] + w / 2, y, w, h, b[loc].t, b[loc].s, "#FFFFFF", C.ivory));
    g.push("  </g>");
  });
  g.push("  </g>");
  const lensY = y + h + 52;
  const lh = Math.max(...needH(S.lens), 110);
  g.push(`  <g id="flow">`);
  xs.forEach((x) => g.push(line(x + w / 2, y + h + 2, x + w / 2, lensY - 3)));
  g.push(line(240, lensY + lh + 2, 240, lensY + lh + 36 - 3));
  g.push("  </g>");
  g.push(`  <g id="${S.lens.id}">`);
  g.push(rect(40, lensY, 400, lh, C.navy));
  g.push(block(S.lens.id, 240, lensY, 400, lh, S.lens[loc].t, S.lens[loc].s, "#FFFFFF", C.ivory));
  g.push("  </g>");
  const gy = lensY + lh + 36;
  const gh = Math.max(...needH(S.gold), 120);
  g.push(`  <g id="${S.gold.id}">`);
  g.push(rect(40, gy, 400, gh, C.gold));
  g.push(block(S.gold.id, 240, gy, 400, gh, S.gold[loc].t, S.gold[loc].s, C.ink, C.ink));
  g.push("  </g>");
  const H = gy + gh + 28;
  return wrapSvg({ H, title: S.meta[loc].title, desc: S.meta[loc].desc, body: g.join("\n") });
}

for (const loc of ["ko", "en"]) {
  writeFileSync(OUT + `ch03-two-logics-${loc}.svg`, buildCh03(loc), "utf8");
  writeFileSync(OUT + `ch06-feasibility-bridge-${loc}.svg`, buildCh06(loc), "utf8");
}
console.log(warnings.length ? "WARNINGS:\n" + warnings.join("\n") : "no fit warnings");
