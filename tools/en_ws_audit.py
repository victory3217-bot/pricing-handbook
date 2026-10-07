import re, os
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Blocked-term pattern comes from the environment so the list itself is not committed:
#   BLOCKED_TERMS="term1|term2" python tools/en_ws_audit.py
_bt = os.environ.get("BLOCKED_TERMS")
terms = re.compile(_bt, re.I) if _bt else re.compile(r"(?!x)x")
hangul = re.compile(r"[\uac00-\ud7a3]")

def stats(md):
    lines = md.replace("\r\n", "\n").split("\n")
    return {
        "h2": sum(1 for l in lines if l.startswith("## ")),
        "h3": sum(1 for l in lines if l.startswith("### ")),
        "table_rows": sum(1 for l in lines if l.lstrip().startswith("|")),
        "checks": len(re.findall(r"\[ \]|□", md)),
        "blanks": len(re.findall(r"_{3,}", md)),
        "fences": sum(1 for l in lines if l.startswith("```")),
        "bullets": sum(1 for l in lines if re.match(r"\s*-\s", l)),
        "questions": sum(1 for l in lines if re.match(r"\s*-\s+.*\?\s*$", l)),
        "numbered": sum(1 for l in lines if re.match(r"\s*\d+\.\s", l)),
        "quotes": sum(1 for l in lines if l.startswith(">")),
    }

print("ch | EN-title | hangul-lines | blocker | parity(ko vs en)")
for n in range(1, 16):
    ch = "CH%02d" % n
    en = open(os.path.join(R, "en", "manual", ch + "-worksheet.md"), encoding="utf8").read()
    ko = open(os.path.join(R, "ko", "manual", ch + "-worksheet.md"), encoding="utf8").read()
    title = en.split("\n")[0]
    hl = [l.strip()[:70] for l in en.split("\n") if hangul.search(l)]
    s_en, s_ko = stats(en), stats(ko)
    diff = {k: (s_ko[k], s_en[k]) for k in s_en if s_en[k] != s_ko[k]}
    print(ch, "|", title[:62], "|", len(hl), "|", "LEAK" if terms.search(en) else "none", "|", diff or "match")
    for x in hl[:4]:
        print("     hangul:", x)
