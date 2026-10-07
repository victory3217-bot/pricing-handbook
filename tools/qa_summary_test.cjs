// Checks the worksheet writer's Q&A summary (summarize) against all 30 worksheets.
// Run: node tools/qa_summary_test.cjs
const fs = require("fs");
const vm = require("vm");
const PATH = require("path");
const PR = PATH.resolve(__dirname, "..");
const m = { exports: {} };
vm.runInNewContext(fs.readFileSync(PR + "/site/public/worksheet-writer.js", "utf8"), { module: m });
const { parse, summarize } = m.exports;

function fields(tokens) {
  const out = []; // { fid, box }
  const add = (fid, box) => out.push({ fid, box: !!box });
  const parts = (ps) => ps.forEach((p) => p.fid && add(p.fid, p.k === "box" || p.k === "check"));
  tokens.forEach((t) => {
    if (t.id) add(t.id);
    if (t.t === "inline") parts(t.segs);
    if (t.t === "check") parts(t.parts);
    if (t.t === "form") t.lines.forEach((l) => parts(l.parts));
    if (t.t === "table") t.rows.forEach((r) => r.cells.forEach((c) => parts(c.segs)));
  });
  return out;
}
const blocks = (s) => s.split("\n").filter((l) => /^A\. /.test(l)).length;

let bad = 0;
let totalFields = 0;
const fail = (msg) => { bad++; console.log("  FAIL", msg); };

for (const loc of ["ko", "en"]) {
  for (let n = 1; n <= 15; n++) {
    const ch = "CH" + String(n).padStart(2, "0");
    const md = fs.readFileSync(`${PR}/${loc}/manual/${ch}-worksheet.md`, "utf8").replace(/\r\n/g, "\n");
    const tk = parse(md);
    const fs_ = fields(tk);
    totalFields += fs_.length;

    const empty = summarize(tk, {}, loc);
    if (blocks(empty) !== 0 || /\nQ/.test(empty)) fail(`${loc} ${ch}: empty worksheet should have no Q/A`);

    const all = {};
    fs_.forEach((f) => (all[f.fid] = f.box ? true : "ZQ" + f.fid + "Z"));
    const full = summarize(tk, all, loc);
    fs_.filter((f) => !f.box).forEach((f) => {
      if (!full.includes("ZQ" + f.fid + "Z")) fail(`${loc} ${ch}: lost answer ZQ${f.fid}Z`);
    });
    if (/ZQ(\w+)Z[\s\S]*ZQ\1Z/.test(full)) fail(`${loc} ${ch}: an answer appears twice`);

    let single = 0;
    fs_.forEach((f) => {
      const v = {};
      v[f.fid] = f.box ? true : "ZQ" + f.fid + "Z";
      const s = summarize(tk, v, loc);
      const marker = "ZQ" + f.fid + "Z";
      const inHeading = blocks(s) === 0 && s.includes(marker) && /\n## .*ZQ/.test(s); // answer written into a section heading
      if (blocks(s) !== 1 && !inHeading) { single++; if (single <= 2) fail(`${loc} ${ch}: ${f.fid} alone gives ${blocks(s)} Q/A blocks`); }
      else if (!f.box && !s.includes(marker)) fail(`${loc} ${ch}: ${f.fid} alone is missing from the summary`);
    });
    console.log(loc, ch, "fields", fs_.length, "fullBlocks", blocks(full), single ? "single-field issues " + single : "ok");
  }
}
console.log("fields checked:", totalFields, "failures:", bad);
process.exit(bad ? 1 : 0);
