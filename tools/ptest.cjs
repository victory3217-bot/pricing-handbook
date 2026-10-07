const fs = require("fs");
const vm = require("vm");
const PATH = require("path");
const PR = PATH.resolve(__dirname, "..");
const BP = PATH.resolve(PR, "..", "business-planning-handbook");
const m = { exports: {} };
vm.runInNewContext(fs.readFileSync(PR + "/site/public/worksheet-writer.js", "utf8"), { module: m });
const { parse, serialize } = m.exports;
const norm = (s) => s.replace(/\n{3,}/g, "\n\n").replace(/[ \t]+$/gm, "").trim();
let bad = 0;
for (const loc of ["ko", "en"])
  for (let n = 1; n <= 15; n++) {
    const ch = "CH" + String(n).padStart(2, "0");
    const md = fs.readFileSync(`${PR}/${loc}/manual/${ch}-worksheet.md`, "utf8").replace(/\r\n/g, "\n");
    const tk = parse(md);
    const rt = serialize(tk, {});
    const same = norm(rt) === norm(md);
    if (!same) {
      bad++;
      const a = norm(md).split("\n"), b = norm(rt).split("\n");
      for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) { console.log("  DIFF", loc, ch, i, JSON.stringify(a[i]), JSON.stringify(b[i])); break; }
    }
    const cnt = {};
    tk.forEach((t) => (cnt[t.t] = (cnt[t.t] || 0) + 1));
    // suspicious: lines that are not fields but look like a prompt expecting an answer
    const lines = md.split("\n");
    const sus = [];
    lines.forEach((l) => {
      if (/^\s*(\d+\.|[A-Z]\.)\s+.*[:：]\s*$/.test(l)) sus.push("NUMBERED-COLON " + l.trim().slice(0, 50));
      if (/^\s*>\s*.*_{3,}/.test(l)) sus.push("QUOTE-BLANK " + l.trim().slice(0, 50));
    });
    if (loc === "ko") console.log(loc, ch, "roundtrip", same, JSON.stringify(cnt), sus.length ? "SUS: " + sus.slice(0, 3).join(" | ") : "");
  }
console.log("roundtrip failures:", bad);
