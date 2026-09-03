# -*- coding: utf-8 -*-
"""Stamp assets/style.css and assets/script.js with a content hash in index.html.

GitHub Pages serves assets with Cache-Control: max-age=600, so a browser can
keep showing an old build long after a deploy. Appending a hash of the file's
own contents means the URL changes only when the file really changes - the
browser then fetches it immediately, with no hard refresh from the visitor.

Run this before every commit:  python build.py
"""
import hashlib
import io
import os
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
INDEX = os.path.join(ROOT, "index.html")
ASSETS = {
    "assets/style.css": r'(<link rel="stylesheet" href="assets/style\.css)(\?v=[0-9a-f]+)?(">)',
    "assets/script.js": r'(<script src="assets/script\.js)(\?v=[0-9a-f]+)?("></script>)',
}


def digest(path):
    with open(path, "rb") as fh:
        return hashlib.md5(fh.read()).hexdigest()[:10]


def main():
    html = io.open(INDEX, encoding="utf-8").read()
    changed = []

    for rel, pattern in ASSETS.items():
        full = os.path.join(ROOT, rel.replace("/", os.sep))
        if not os.path.exists(full):
            sys.exit("missing asset: " + rel)
        ver = digest(full)
        new_html, n = re.subn(pattern, lambda m: m.group(1) + "?v=" + ver + m.group(3), html)
        if n != 1:
            sys.exit("could not stamp %s (matched %d times)" % (rel, n))
        if new_html != html:
            changed.append("%s -> ?v=%s" % (rel, ver))
        html = new_html

    io.open(INDEX, "w", encoding="utf-8").write(html)
    print("stamped" if changed else "already current")
    for c in changed:
        print("  " + c)


if __name__ == "__main__":
    main()
