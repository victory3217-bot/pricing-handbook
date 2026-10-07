(function () {
  var CHAPTERS = ["CH01", "CH02", "CH03", "CH04", "CH05", "CH06", "CH07", "CH08", "CH09", "CH10", "CH11", "CH12", "CH13", "CH14", "CH15"];
  var BLANK = /_{3,}/;

  // ---------------------------------------------------------------- parsing
  function segments(text, nextId) {
    var parts = text.split(/(_{3,}|\(\s+\)|□)/);
    return parts
      .filter(function (p) { return p !== ""; })
      .map(function (p) {
        if (p === "□") return { k: "box", fid: nextId() };
        if (/^\(\s+\)$/.test(p)) return { k: "blank", fid: nextId(), orig: p, paren: true, long: false };
        return /^_{3,}$/.test(p)
          ? { k: "blank", fid: nextId(), orig: p, long: p.length >= 20 }
          : { k: "text", text: p };
      });
  }
  function isAnswerLike(line) {
    return BLANK.test(line) || /^```/.test(line) || /^\s*-\s*$/.test(line);
  }
  function isQuestion(line) {
    var t = line.replace(/^\s*-\s+/, "").trim();
    return /^\s*-\s+/.test(line) && (/[?？]\)?\s*$/.test(t) || /^(점검 질문|Check question)/i.test(t));
  }

  // A line inside a fenced template: placeholders, option lists, blanks, and checkbox squares become fields.
  function formLine(line, nextId) {
    var parts = [];
    var rest = line;
    if (/^\s*\([^()]+\)\s*$/.test(rest) && !/\s\/\s/.test(rest)) {
      return { parts: [{ k: "ph", fid: nextId(), orig: rest.trim() }], whole: true };
    }
    var box = rest.match(/^(\s*)□\s?/);
    if (box) {
      parts.push({ k: "text", text: box[1] });
      parts.push({ k: "box", fid: nextId() });
      rest = rest.slice(box[0].length);
    }
    var re = /(\((?:작성|write here)\)|\([^()]+(?:\s\/\s[^()]+)+\)|_{3,})/gi;
    var last = 0, m;
    while ((m = re.exec(rest))) {
      if (m.index > last) parts.push({ k: "text", text: rest.slice(last, m.index) });
      var tok = m[0];
      if (/^_+$/.test(tok)) parts.push({ k: "blank", fid: nextId(), orig: tok });
      else if (/^\((?:작성|write here)\)$/i.test(tok)) parts.push({ k: "ph", fid: nextId(), orig: tok });
      else parts.push({ k: "opt", fid: nextId(), orig: tok, opts: tok.slice(1, -1).split(/\s\/\s/).map(function (o) { return o.trim(); }) });
      last = m.index + tok.length;
    }
    if (last < rest.length) parts.push({ k: "text", text: rest.slice(last) });
    if (/(→|:|：)\s*$/.test(rest)) parts.push({ k: "blank", fid: nextId(), orig: "", trail: true });
    return { parts: parts, whole: parts.length === 1 && parts[0].k === "ph" };
  }

  function parse(md) {
    var lines = md.replace(/\r\n/g, "\n").split("\n");
    var tokens = [];
    var n = 0;
    var nextId = function () { return "f" + n++; };
    var i = 0;
    while (i < lines.length) {
      var line = lines[i];

      if (/^```/.test(line)) {
        var j = i + 1;
        var body = [];
        while (j < lines.length && !/^```/.test(lines[j])) body.push(lines[j++]);
        var blank = body.every(function (l) { return l.trim() === ""; });
        if (blank) {
          tokens.push({ t: "answer", id: nextId(), blank: body });
        } else {
          var form = body.map(function (l) { return formLine(l, nextId); });
          var interactive = form.some(function (fl) { return fl.parts.some(function (p) { return p.k !== "text"; }); });
          tokens.push(interactive ? { t: "form", lines: form } : { t: "code", lines: body });
        }
        i = j + 1;
        continue;
      }

      if (/^\s*\|/.test(line)) {
        var rows = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) {
          var raw = lines[i].trim().replace(/^\|/, "").replace(/\|$/, "");
          var cells = raw.split("|").map(function (c) { return c.trim(); });
          var isSep = cells.every(function (c) { return /^:?-{3,}:?$/.test(c); });
          var first = rows.length === 0;
          rows.push({
            sep: isSep,
            raw: lines[i].trim(),
            cells: cells.map(function (c) {
              if (isSep) return { segs: [{ k: "text", text: c }] };
              if (c === "" && !first) return { segs: [{ k: "blank", fid: nextId(), orig: "", long: false }] };
              return { segs: segments(c, nextId) };
            }),
          });
          i++;
        }
        tokens.push({ t: "table", rows: rows });
        continue;
      }

      if (/^\s*_{3,}\s*$/.test(line)) {
        tokens.push({ t: "under", id: nextId(), orig: line, indent: line.match(/^\s*/)[0] });
        i++;
        continue;
      }

      if (/\[ \]/.test(line)) {
        var parts = line.split(/(\[ \]|_{3,}|\(\s+\))/).filter(function (p) { return p !== ""; }).map(function (p) {
          if (p === "[ ]") return { k: "check", fid: nextId() };
          if (/^\(\s+\)$/.test(p)) return { k: "blank", fid: nextId(), orig: p, paren: true, long: false };
          if (/^_{3,}$/.test(p)) return { k: "blank", fid: nextId(), orig: p, long: false };
          return { k: "text", text: p };
        });
        tokens.push({ t: "check", parts: parts });
        i++;
        continue;
      }

      if (BLANK.test(line)) {
        tokens.push({ t: "inline", indent: line.match(/^\s*/)[0], segs: segments(line.replace(/^\s*/, ""), nextId) });
        i++;
        continue;
      }

      if (/^\s*-\s*$/.test(line)) {
        tokens.push({ t: "bullet", id: nextId(), indent: line.match(/^\s*/)[0] });
        i++;
        continue;
      }

      if (/^\s*-\s+.+[:：]\s*$/.test(line)) {
        tokens.push({ t: "colon", id: nextId(), text: line });
        i++;
        continue;
      }

      tokens.push({ t: "line", text: line });

      if (isQuestion(line)) {
        var k = i + 1;
        while (k < lines.length && lines[k].trim() === "") k++;
        if (!(k < lines.length && isAnswerLike(lines[k]))) {
          tokens.push({ t: "autoq", id: nextId() });
        }
      }
      i++;
    }
    return tokens;
  }

  // ---------------------------------------------------------------- serialization
  function oneLine(v) {
    return v.replace(/\s+$/, "").replace(/\n/g, "<br>");
  }
  function segText(segs, v, pipeSafe) {
    return segs
      .map(function (s) {
        if (s.k === "text") return s.text;
        if (s.k === "box") return v[s.fid] ? "■" : "□";
        var val = v[s.fid];
        if (val && val.trim()) {
          var o = oneLine(val);
          if (pipeSafe) o = o.replace(/\|/g, "\\|");
          return s.paren ? "(" + o + ")" : o;
        }
        return s.orig;
      })
      .join("");
  }

  function serialize(tokens, v, answerLabel) {
    var out = [];
    tokens.forEach(function (tk) {
      if (tk.t === "answer") {
        var val = v[tk.id];
        out.push("```");
        if (val && val.trim()) out.push(val.replace(/\s+$/, ""));
        else tk.blank.forEach(function (l) { out.push(l); });
        out.push("```");
      } else if (tk.t === "code") {
        out.push("```");
        tk.lines.forEach(function (l) { out.push(l); });
        out.push("```");
      } else if (tk.t === "form") {
        out.push("```");
        tk.lines.forEach(function (fl) {
          out.push(
            fl.parts
              .map(function (p) {
                if (p.k === "text") return p.text;
                if (p.k === "box") return v[p.fid] ? "■ " : "□ ";
                var val = v[p.fid];
                if (val && val.trim()) return (p.trail ? " " : "") + oneLine(val);
                return p.orig;
              })
              .join("")
              .replace(/^(\s*)(□|■)\s\s/, "$1$2 ")
          );
        });
        out.push("```");
      } else if (tk.t === "under") {
        var u = v[tk.id];
        if (u && u.trim()) u.replace(/\s+$/, "").split("\n").forEach(function (l) { out.push(tk.indent + l); });
        else out.push(tk.orig);
      } else if (tk.t === "table") {
        tk.rows.forEach(function (r) {
          if (r.sep) { out.push(r.raw); return; }
          var cells = r.cells.map(function (c) { return segText(c.segs, v, true); });
          out.push("|" + cells.map(function (c) { return c === "" ? " " : " " + c + " "; }).join("|") + "|");
        });
      } else if (tk.t === "check") {
        out.push(
          tk.parts
            .map(function (p) {
              if (p.k === "check") return v[p.fid] ? "[x]" : "[ ]";
              if (p.k === "blank") return v[p.fid] && v[p.fid].trim() ? (p.paren ? "(" + oneLine(v[p.fid]) + ")" : oneLine(v[p.fid])) : p.orig;
              return p.text;
            })
            .join("")
        );
      } else if (tk.t === "inline") {
        out.push(tk.indent + segText(tk.segs, v, false));
      } else if (tk.t === "bullet") {
        var bv = v[tk.id];
        out.push(bv && bv.trim() ? tk.indent + "- " + oneLine(bv) : tk.indent + "-");
      } else if (tk.t === "colon") {
        var c = v[tk.id];
        out.push(c && c.trim() ? tk.text.replace(/\s+$/, "") + " " + oneLine(c) : tk.text);
      } else if (tk.t === "autoq") {
        var a = v[tk.id];
        if (a && a.trim()) out.push("  - " + (answerLabel || "답변") + ": " + oneLine(a));
      } else {
        out.push(tk.text);
      }
    });
    return out.join("\n").replace(/\n{4,}/g, "\n\n\n") + "\n";
  }

  // ---------------------------------------------------------------- Q&A summary
  // Plain text of only the answered items, as "Q. question / A. answer", for pasting elsewhere.
  var SUMMARY_L = {
    ko: { suffix: "답변 정리", empty: "아직 답변한 항목이 없습니다.", checked: "확인함", row: "행" },
    en: { suffix: "Answer summary", empty: "No answers yet.", checked: "Checked", row: "Row" },
  };

  // Whitespace tidy-up only (used on text that includes the user's own answers).
  function squash(s) {
    return s.replace(/\s+/g, " ").replace(/\(\s+/g, "(").replace(/\s+\)/g, ")").trim();
  }
  // For the worksheet's own wording: drop the list marker and Markdown emphasis marks.
  function clean(s) {
    return squash(s.replace(/^\s*-\s+/, "").replace(/\*\*|`/g, ""));
  }
  function isField(p) {
    return p.k === "blank" || p.k === "ph" || p.k === "opt";
  }
  // Text of a run of parts with the answers filled in; unanswered fields show as "—".
  function fillParts(parts, v) {
    var answered = false;
    var text = parts
      .map(function (p) {
        if (p.k === "text") return p.text.replace(/\*\*|`/g, "");
        if (p.k === "check" || p.k === "box") {
          if (v[p.fid]) { answered = true; return p.k === "check" ? "[x]" : "■"; }
          return p.k === "check" ? "[ ]" : "□";
        }
        var val = v[p.fid];
        if (val && String(val).trim()) {
          answered = true;
          var o = oneLine(String(val));
          return p.paren ? "(" + o + ")" : o;
        }
        return "—";
      })
      .join("");
    return { text: squash(text.replace(/^\s*-\s+/, "")), answered: answered };
  }
  // Split a line of parts into its question text (before the first field) and the filled answer.
  function splitQA(parts, v, L) {
    var fi = -1;
    for (var i = 0; i < parts.length; i++) if (isField(parts[i])) { fi = i; break; }
    var q = clean(
      (fi < 0 ? parts : parts.slice(0, fi))
        .filter(function (p) { return p.k === "text"; })
        .map(function (p) { return p.text; })
        .join("")
    ).replace(/[:：]\s*$/, "");
    var checked = parts.some(function (p) { return (p.k === "check" || p.k === "box") && v[p.fid]; });
    var ar = fi < 0 ? { text: "", answered: false } : fillParts(parts.slice(fi), v);
    var a = ar.answered ? ar.text : checked ? L.checked : "";
    if (ar.answered && checked) a = "[x] " + a;
    return { q: q, a: a, answered: ar.answered || checked };
  }

  function summarize(tokens, v, locale) {
    var L = SUMMARY_L[locale] || SUMMARY_L.ko;
    var out = [];
    var title = "";
    var section = "";
    var sectionShown = true;
    var topic = null; // last numbered topic line, e.g. "1. 고객 정의"
    var cur = null; // { q, answers[] } for the question being answered
    var count = 0;

    function qLabel(q) {
      if (!q) return null;
      var t = clean(q);
      var m = t.match(/^(\d+)\.\s+(.*)$/);
      return m ? "Q" + m[1] + ". " + m[2] : "Q. " + t;
    }
    function showSection() {
      if (!sectionShown && section) { out.push("", "## " + section); sectionShown = true; }
    }
    function write(q, answers) {
      showSection();
      out.push("");
      var ql = qLabel(q);
      if (ql) out.push(ql);
      var first = true;
      answers.forEach(function (a) {
        String(a).split("\n").forEach(function (ln) {
          out.push((first ? "A. " : "   ") + ln);
          first = false;
        });
      });
      count++;
    }
    function flush() {
      if (cur && cur.answers.length) write(cur.q, cur.answers);
      cur = null;
    }
    // A self-contained Q/A that must not disturb the open question's context.
    function own(q, a) {
      var keep = cur && cur.q;
      flush();
      write(q, [a]);
      if (keep) cur = { q: keep, answers: [] };
    }
    function sub(line, ownQ, ownA) {
      if (cur && cur.q) cur.answers.push(line);
      else own(ownQ, ownA);
    }
    function free(text) {
      if (cur && cur.q) cur.answers.push(text);
      else own(topic, text);
    }
    function withTopic(q) {
      var m = q && topic && !/^\s*\d+\.\s/.test(q) ? topic.match(/^(\d+)\.\s+(.*)$/) : null;
      return m ? m[1] + ". " + clean(m[2]) + " — " + clean(q) : q;
    }
    function tableRows(tk) {
      var hdr = null;
      var n = 0;
      tk.rows.forEach(function (r) {
        if (r.sep) return;
        if (!hdr) {
          hdr = r.cells.map(function (c) { return fillParts(c.segs, v).text; });
          return;
        }
        n++;
        var statics = [];
        var pairs = [];
        var any = false;
        r.cells.forEach(function (c, i) {
          var hasField = c.segs.some(function (s) { return s.k !== "text"; });
          var f = fillParts(c.segs, v);
          if (!hasField) { if (f.text) statics.push(f.text); return; }
          if (f.answered) {
            any = true;
            pairs.push({ h: hdr[i] || "", t: f.text });
          }
        });
        if (!any) return;
        var label = statics.join(" / ");
        var qText = label || L.row + " " + n;
        var ans = r.cells.length === 2 && pairs.length === 1
          ? pairs[0].t
          : pairs.map(function (p) { return (p.h ? p.h + ": " : "") + p.t; }).join(", ");
        var line = r.cells.length === 2 && label ? label + ": " + ans : (label ? label + " — " : "") + ans;
        sub(line, qText, ans);
      });
    }

    tokens.forEach(function (tk) {
      if (tk.t === "line") {
        var s = tk.text;
        var h = s.match(/^(#{1,6})\s+(.*)$/);
        if (h) {
          if (h[1].length === 1) { if (!title) title = clean(h[2]); return; }
          flush();
          section = clean(h[2]);
          sectionShown = false;
          topic = null;
          cur = null;
        } else if (/^\s*\d+\.\s+\S/.test(s)) {
          // A numbered item is both the topic of the bullets below it and a question in its own right.
          flush();
          topic = s.trim();
          cur = { q: s.trim(), answers: [] };
        } else if (isQuestion(s)) {
          flush();
          cur = { q: withTopic(s.trim()), answers: [] };
        }
      } else if (tk.t === "answer" || tk.t === "under" || tk.t === "autoq" || tk.t === "bullet") {
        var val = v[tk.id];
        if (val && String(val).trim()) free(String(val).replace(/\s+$/, ""));
      } else if (tk.t === "colon") {
        var cv = v[tk.id];
        if (cv && String(cv).trim()) {
          var label = clean(tk.text).replace(/[:：]\s*$/, "");
          sub(label + ": " + oneLine(String(cv)), label, oneLine(String(cv)));
        }
      } else if (tk.t === "inline") {
        var segs = tk.segs;
        var hd = segs[0] && segs[0].k === "text" ? segs[0].text.match(/^\s*#{1,6}\s+/) : null;
        if (hd) {
          // A heading that itself contains a blank, e.g. "## 1. 가격 입력 (컴포넌트: ____ )".
          var hf = fillParts(segs, v);
          flush();
          section = hf.answered
            ? clean(hf.text.replace(/^\s*#{1,6}\s+/, ""))
            : clean(segs.filter(function (p) { return p.k === "text"; }).map(function (p) { return p.text; }).join("").replace(/^\s*#{1,6}\s+/, "")).replace(/\s*\([^()]*[:：]\s*\)\s*$/, "");
          sectionShown = false;
          topic = null;
          if (hf.answered) { showSection(); count++; }
        } else {
          var f = fillParts(segs, v);
          if (f.answered) {
            var qa = splitQA(segs, v, L);
            sub(f.text, withTopic(qa.q), qa.a);
          }
        }
      } else if (tk.t === "check") {
        var cq = splitQA(tk.parts, v, L);
        if (cq.answered) {
          var hasField = tk.parts.some(isField);
          own(hasField ? cq.q : topic || cq.q, hasField ? cq.a : fillParts(tk.parts, v).text);
        }
      } else if (tk.t === "form") {
        tk.lines.forEach(function (fl) {
          var ff = fillParts(fl.parts, v);
          if (!ff.answered) return;
          var fq = splitQA(fl.parts, v, L);
          sub(ff.text, withTopic(fq.q), fq.a);
        });
      } else if (tk.t === "table") {
        tableRows(tk);
      }
    });
    flush();

    var head = (title ? title + " — " : "") + L.suffix;
    if (!count) return "# " + head + "\n\n" + L.empty + "\n";
    return "# " + head + "\n" + out.join("\n") + "\n";
  }

  if (typeof document === "undefined") {
    module.exports = { parse: parse, serialize: serialize, summarize: summarize };
    return;
  }

  // ---------------------------------------------------------------- UI
  var root = document.getElementById("ws-app");
  if (!root) return;
  var locale = root.dataset.locale;
  var base = root.dataset.base;

  var T = {
    ko: {
      download: "Markdown(.md) 다운로드",
      copy: "복사",
      copied: "복사되었습니다",
      confirmReset: "이 챕터에 작성한 답변을 모두 지울까요?",
      loading: "워크시트를 불러오는 중...",
      error: "워크시트를 불러오지 못했습니다.",
      answer: "답변을 입력하세요",
      answerLabel: "답변",
    },
    en: {
      download: "Download Markdown (.md)",
      copy: "Copy",
      copied: "Copied",
      confirmReset: "Clear all answers you wrote for this chapter?",
      loading: "Loading worksheet...",
      error: "Could not load the worksheet.",
      answer: "Type your answer",
      answerLabel: "Answer",
    },
  }[locale];

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function inline(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/`(.+?)`/g, "<code>$1</code>");
  }
  function storageKey(ch) {
    return "bph-ws-v1:" + locale + ":" + ch;
  }
  function load(ch) {
    try { return JSON.parse(localStorage.getItem(storageKey(ch))) || {}; } catch (e) { return {}; }
  }
  function save(ch, values) {
    try { localStorage.setItem(storageKey(ch), JSON.stringify(values)); } catch (e) {}
  }
  function el(tag, cls) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  function render(tokens, v, onChange, host) {
    host.innerHTML = "";

    function textInput(fid, cls) {
      var inp = el("input", cls);
      inp.type = "text";
      inp.value = v[fid] || "";
      inp.setAttribute("aria-label", T.answer);
      inp.addEventListener("input", function () { v[fid] = inp.value; onChange(); });
      return inp;
    }
    function area(fid, cls, rows) {
      var ta = el("textarea", cls);
      ta.rows = rows || 3;
      ta.placeholder = T.answer;
      ta.value = v[fid] || "";
      ta.setAttribute("aria-label", T.answer);
      function grow() {
        ta.style.height = "auto";
        ta.style.height = Math.max(ta.scrollHeight + 2, rows === 2 ? 64 : 96) + "px";
      }
      ta.addEventListener("input", function () { v[fid] = ta.value; grow(); onChange(); });
      setTimeout(grow, 0);
      return ta;
    }
    function segNodes(segs, wrap, inlineArea) {
      segs.forEach(function (s) {
        if (s.k === "text") {
          var span = el("span");
          span.innerHTML = inline(s.text);
          wrap.appendChild(span);
        } else if (s.k === "box") {
          var blab = el("label", "ws-check");
          var bcb = el("input");
          bcb.type = "checkbox";
          bcb.checked = !!v[s.fid];
          bcb.addEventListener("change", function () { v[s.fid] = bcb.checked; onChange(); });
          blab.appendChild(bcb);
          wrap.appendChild(blab);
        } else if (s.long && inlineArea) {
          wrap.appendChild(area(s.fid, "ws-answer ws-answer-sm", 2));
        } else {
          wrap.appendChild(textInput(s.fid, s.long ? "ws-cell" : "ws-blank"));
        }
      });
    }

    tokens.forEach(function (tk) {
      if (tk.t === "answer" || tk.t === "under" || tk.t === "autoq" || tk.t === "bullet") {
        host.appendChild(area(tk.id, "ws-answer", 3));
      } else if (tk.t === "form") {
        tk.lines.forEach(function (fl) {
          if (!fl.parts.length || (fl.parts.length === 1 && fl.parts[0].k === "text" && !fl.parts[0].text.trim())) return;
          var rowEl = el("div", "ws-inline");
          fl.parts.forEach(function (p) {
            if (p.k === "text") {
              if (!p.text) return;
              var sp = el("span");
              sp.innerHTML = inline(p.text);
              rowEl.appendChild(sp);
            } else if (p.k === "box") {
              var lab = el("label", "ws-check");
              var cb = el("input");
              cb.type = "checkbox";
              cb.checked = !!v[p.fid];
              cb.addEventListener("change", function () { v[p.fid] = cb.checked; onChange(); });
              lab.appendChild(cb);
              rowEl.appendChild(lab);
            } else if (p.k === "ph") {
              rowEl.appendChild(area(p.fid, fl.whole ? "ws-answer" : "ws-answer ws-answer-sm", fl.whole ? 3 : 2));
            } else if (p.k === "opt") {
              var sel = el("select", "ws-select");
              sel.setAttribute("aria-label", p.orig);
              var o0 = el("option");
              o0.value = "";
              o0.textContent = p.orig;
              sel.appendChild(o0);
              p.opts.forEach(function (o) {
                var op = el("option");
                op.value = o;
                op.textContent = o;
                sel.appendChild(op);
              });
              sel.value = v[p.fid] || "";
              sel.addEventListener("change", function () { v[p.fid] = sel.value; onChange(); });
              rowEl.appendChild(sel);
            } else {
              rowEl.appendChild(textInput(p.fid, p.trail ? "ws-cell" : "ws-blank"));
            }
          });
          host.appendChild(rowEl);
        });
      } else if (tk.t === "code") {
        var pre = el("pre");
        pre.textContent = tk.lines.join("\n");
        host.appendChild(pre);
      } else if (tk.t === "table") {
        var wrap = el("div", "ws-table-wrap");
        var table = el("table");
        tk.rows.forEach(function (r, ri) {
          if (r.sep) return;
          var tr = el("tr");
          r.cells.forEach(function (c) {
            var cell = el(ri === 0 ? "th" : "td");
            segNodes(c.segs, cell, false);
            tr.appendChild(cell);
          });
          table.appendChild(tr);
        });
        wrap.appendChild(table);
        host.appendChild(wrap);
      } else if (tk.t === "check") {
        var row = el("div", "ws-check-row");
        var last = null;
        tk.parts.forEach(function (p) {
          if (p.k === "check") {
            var lab = el("label", "ws-check");
            var cb = el("input");
            cb.type = "checkbox";
            cb.checked = !!v[p.fid];
            cb.addEventListener("change", function () { v[p.fid] = cb.checked; onChange(); });
            lab.appendChild(cb);
            row.appendChild(lab);
            last = lab;
          } else if (p.k === "blank") {
            row.appendChild(textInput(p.fid, "ws-blank"));
          } else if (p.text.trim()) {
            var span = el("span");
            span.innerHTML = inline(p.text);
            (last || row).appendChild(span);
          }
        });
        host.appendChild(row);
      } else if (tk.t === "inline") {
        var p2 = el("div", "ws-inline");
        if (tk.indent.length) p2.style.marginLeft = Math.min(tk.indent.length, 8) * 0.5 + "rem";
        segNodes(tk.segs, p2, true);
        host.appendChild(p2);
      } else if (tk.t === "colon") {
        var p3 = el("div", "ws-inline");
        var m = tk.text.match(/^(\s*)-\s+(.*)$/);
        var sp = el("span");
        sp.innerHTML = inline(m[2]);
        p3.appendChild(sp);
        p3.appendChild(textInput(tk.id, "ws-cell"));
        host.appendChild(p3);
      } else {
        var s = tk.text;
        if (s.trim() === "") return;
        if (/^---+\s*$/.test(s)) { host.appendChild(el("hr")); return; }
        var mm;
        if ((mm = s.match(/^(#{1,3})\s+(.*)$/))) {
          var h = el("h" + (mm[1].length + 1));
          h.innerHTML = inline(mm[2]);
          host.appendChild(h);
        } else if ((mm = s.match(/^>\s?(.*)$/))) {
          var bq = el("blockquote");
          bq.innerHTML = inline(mm[1]);
          host.appendChild(bq);
        } else if ((mm = s.match(/^\s*-\s+(.*)$/))) {
          var q = el("p", "ws-q");
          q.innerHTML = inline(mm[1]);
          host.appendChild(q);
        } else {
          var pp = el("p");
          pp.innerHTML = inline(s);
          host.appendChild(pp);
        }
      }
    });
  }

  var nav = document.getElementById("ws-nav");
  var form = document.getElementById("ws-form");
  var toolbar = document.getElementById("ws-toolbar");
  var viewBox = document.getElementById("ws-view");
  var viewText = document.getElementById("ws-view-text");

  // "qa" = only the answered items as Q/A; "full" = the whole worksheet as Markdown.
  var viewMode = "qa";
  function currentText() {
    return viewMode === "qa" && toolbar._qa ? toolbar._qa() : toolbar._get();
  }
  // Keep the "result text" box in sync with the answers and the chapter shown above it.
  function refreshView() {
    if (viewBox && viewText && viewBox.open && toolbar._get) viewText.value = currentText();
  }
  function selectView() {
    viewBox.open = true;
    refreshView();
    try { viewBox.scrollIntoView({ block: "center" }); } catch (e) {}
    viewText.focus();
    viewText.select();
    viewText.setSelectionRange(0, viewText.value.length);
  }

  function open(ch) {
    CHAPTERS.forEach(function (c) {
      nav.querySelector('[data-ch="' + c + '"]').setAttribute("aria-current", c === ch ? "true" : "false");
    });
    try { history.replaceState(null, "", "#" + ch); } catch (e) {}
    form.textContent = T.loading;
    fetch(base + "worksheets/" + locale + "/" + ch + "-worksheet.md")
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      })
      .then(function (md) {
        var tokens = parse(md);
        var values = load(ch);
        var onChange = function () { save(ch, values); refreshView(); };
        render(tokens, values, onChange, form);
        toolbar.hidden = false;
        toolbar.dataset.ch = ch;
        toolbar._get = function () { return serialize(tokens, values, T.answerLabel); };
        toolbar._qa = function () { return summarize(tokens, values, locale); };
        toolbar._reset = function () {
          if (!confirm(T.confirmReset)) return;
          values = {};
          save(ch, values);
          render(tokens, values, onChange, form);
          refreshView();
        };
        refreshView();
      })
      .catch(function () { form.textContent = T.error; });
  }

  CHAPTERS.forEach(function (c) {
    var b = document.createElement("button");
    b.type = "button";
    b.dataset.ch = c;
    b.textContent = c;
    b.addEventListener("click", function () { open(c); });
    nav.appendChild(b);
  });

  document.getElementById("ws-download").addEventListener("click", function () {
    var blob = new Blob([toolbar._get()], { type: "text/markdown;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = toolbar.dataset.ch + "-worksheet-answers.md";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });
  document.getElementById("ws-copy").addEventListener("click", function () {
    var btn = this;
    var label = btn.textContent;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(currentText()).then(function () {
        btn.textContent = T.copied;
        setTimeout(function () { btn.textContent = label; }, 1500);
      }, selectView);
    } else {
      selectView();
    }
  });
  var shareBtn = document.getElementById("ws-share");
  if (shareBtn && navigator.share && navigator.canShare) {
    try {
      if (navigator.canShare({ files: [new File([""], "a.md", { type: "text/plain" })] })) shareBtn.hidden = false;
    } catch (e) {}
    shareBtn.addEventListener("click", function () {
      var file = new File([toolbar._get()], toolbar.dataset.ch + "-worksheet-answers.md", { type: "text/plain" });
      navigator.share({ files: [file], title: toolbar.dataset.ch }).catch(function () {});
    });
  }
  if (viewBox && viewText) {
    viewBox.addEventListener("toggle", refreshView);
    document.getElementById("ws-view-select").addEventListener("click", selectView);
    ["qa", "full"].forEach(function (mode) {
      var b = document.getElementById("ws-mode-" + mode);
      if (!b) return;
      b.addEventListener("click", function () {
        viewMode = mode;
        ["qa", "full"].forEach(function (m2) {
          document.getElementById("ws-mode-" + m2).setAttribute("aria-pressed", m2 === mode ? "true" : "false");
        });
        refreshView();
      });
    });
  }
  document.getElementById("ws-reset").addEventListener("click", function () { toolbar._reset(); });

  var start = (location.hash || "").replace("#", "");
  open(CHAPTERS.indexOf(start) >= 0 ? start : "CH01");
})();
