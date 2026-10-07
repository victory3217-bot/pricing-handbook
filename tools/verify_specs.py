import re, glob, os, html
import os
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
miss_labels, miss_quotes = [], []
for sp in sorted(glob.glob(os.path.join(R, "site", "diagrams", "specs", "*.md"))):
    spec = open(sp, encoding="utf8").read()
    name = os.path.basename(sp)[:-3]
    flat = re.sub(r"\s+", " ", spec)
    for loc in ("ko", "en"):
        svg = open(os.path.join(R, "assets", "images", name + "-" + loc + ".svg"), encoding="utf8").read()
        for t in re.findall(r"<text[^>]*>([^<]*)</text>", svg):
            t = html.unescape(t).strip()
            if t in ("+", ""):
                continue
            if t not in flat:
                miss_labels.append((name, loc, t))
    # quoted chapter phrases: sentences after "N. Section: " that are not paraphrases are hard to check;
    # check every double-quoted Korean phrase in the Source sections against the ko chapter text
    ch = re.search(r"ch(\d\d)", name).group(1)
    kotxt = re.sub(r"\s+", " ", open(os.path.join(R, "ko", "chapters", "CH" + ch + ".md"), encoding="utf8").read())
    src = spec.split("## Source sections")[1].split("## Concepts included")[0]
    for q in re.findall(r'"([^"]{6,})"', src):
        if q not in kotxt:
            miss_quotes.append((name, q))
print("labels in SVG not found in spec:", len(miss_labels))
for m in miss_labels[:20]:
    print("  ", m)
print("quoted phrases not found in ko chapter:", len(miss_quotes))
for m in miss_quotes[:20]:
    print("  ", m)
