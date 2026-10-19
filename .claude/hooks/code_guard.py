#!/usr/bin/env python3
"""Code guard (PostToolUse hook, Windows and POSIX).

Enforces the project's code conventions on edited source. Exit 2 blocks the edit
and feeds the findings back to the model. Anything unexpected fails OPEN
(exit 0): a guard that fails closed on its own absence is worse than no guard.

Every rule is switched by `enforcement.rules` in brand.config.json. Nothing
project-specific lives in this file, which is the point. A new project
configures the guard; it does not fork it.

Verify it is alive after installing: break a rule on purpose in a policed file
and check that it blocks. A silently misconfigured guard is indistinguishable
from a passing one.
"""
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from _pack_config import (  # noqa: E402
    CODE_EXTS, STYLE_EXTS, load, in_scope, is_token_file,
)

DASHES = "—–"  # em, en


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", s).strip()


def check_faq_parity(text: str, fname: str, bank_path: Path) -> list:
    """Every question and answer in code must trace to the FAQ bank word for
    word. Computed spans are skipped; the static fragments around them must
    match.

    This exists because the same question reliably acquires three different
    answers across a site: one in the page, one in the schema, one in a card.
    Search engines and readers both notice."""
    if "faq" not in text.lower():
        return []
    try:
        bank = norm(bank_path.read_text(encoding="utf-8", errors="replace"))
    except Exception:
        return []
    out = []
    pairs = re.findall(
        r"q(?:uestion)?:\s*(?:\"([^\"]+)\"|`([^`]+)`|'([^']+)')\s*,\s*"
        r"a(?:nswer)?:\s*(?:\"([^\"]*)\"|`([^`]*)`|'([^']*)')",
        text, re.S | re.I)
    for m in pairs:
        q = norm(m[0] or m[1] or m[2])
        a = m[3] or m[4] or m[5]
        if q and q not in bank:
            out.append(f"{fname}: FAQ question is not in the bank ({bank_path.name}): "
                       f"\"{q[:70]}\". One wording must win: add it to the bank, or adopt the bank's.")
            continue
        for frag in re.split(r"\$\{[^}]*\}|\{\{[^}]*\}\}", a):
            f = norm(frag)
            if len(f) >= 12 and f not in bank:
                out.append(f"{fname}: FAQ answer drifts from the bank near \"{f[:70]}\". "
                           f"Adopt the bank wording word for word ({bank_path.name}).")
                break
    return out


def main() -> int:
    try:
        payload = json.loads(sys.stdin.buffer.read().decode("utf-8-sig"))
    except Exception:
        return 0
    fp = (payload.get("tool_input") or {}).get("file_path") or ""
    if not fp:
        return 0
    p = Path(fp)
    ext = p.suffix.lower()
    if ext not in CODE_EXTS | STYLE_EXTS:
        return 0

    cfg = load()
    if not in_scope(p, cfg):
        return 0
    r = cfg["rules"]

    try:
        text = p.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return 0

    findings = []
    token_file = is_token_file(p, cfg)

    if ext in CODE_EXTS:
        for i, line in enumerate(text.splitlines(), 1):
            s = line.strip()
            if s.startswith("//") or s.startswith("*") or s.startswith("#"):
                continue

            if r.get("noEmDash") and any(d in line for d in DASHES):
                findings.append(f"{p.name}:{i} em or en dash in a shipped string. "
                                f"Use 'to', a comma, or a new sentence.")

            if r.get("noInlineAppearanceStyles"):
                if re.search(r"style=\{\{", line) and "--" not in line:
                    findings.append(f"{p.name}:{i} inline style object that is not setting a "
                                    f"CSS custom property.")
                elif re.search(r'\sstyle="[^"]*[^-]', line) and "--" not in line:
                    findings.append(f"{p.name}:{i} inline style attribute. Move it to a class "
                                    f"or a custom property.")

            if r.get("noArbitraryColorUtilities") and re.search(
                r"(?:bg|text|border|from|via|to|fill|stroke|ring|shadow|outline|decoration|accent|caret)"
                r"-\[(?:#|rgb|hsl|oklch|lab|color-mix)", line
            ):
                findings.append(f"{p.name}:{i} arbitrary colour utility. "
                                f"Colours come from the design tokens only.")

            if (r.get("noRawHexOutsideTokenFiles") and not token_file
                    and re.search(r"[\"'`]#[0-9a-fA-F]{3,8}\b", line)
                    and "theme-color" not in line):
                findings.append(f"{p.name}:{i} raw hex colour in code. "
                                f"Colours live in the token file only.")

            if r.get("noHostedFontLinks") and re.search(
                r"fonts\.googleapis\.com|fonts\.gstatic\.com|use\.typekit\.net|fonts\.bunny\.net", line
            ):
                findings.append(f"{p.name}:{i} hosted font link. Fonts are self-hosted.")

            # The '!' may be the first class in the attribute, or follow a
            # variant prefix (hover:!mt-0). An earlier version of this rule
            # required preceding whitespace and so missed both.
            if r.get("noImportantUtilities") and re.search(
                r"class(?:Name)?=[\"'](?:[^\"']*[\s:])?!\S", line
            ):
                findings.append(f"{p.name}:{i} !important utility. "
                                f"Fix the specificity problem instead.")

            for term in r.get("bannedSchemaTypes") or []:
                if term and term in line:
                    findings.append(f"{p.name}:{i} banned schema marker '{term}'. "
                                    f"This project must not emit it (truth.forbiddenClaims).")
                    break

            # Demo or partial font cuts that render some glyphs as a foundry
            # watermark. Obscure, and it has reached production more than once.
            for trap in r.get("fontDigitTraps") or []:
                cls, chars = trap.get("class"), trap.get("chars")
                if not cls or not chars or cls not in line:
                    continue
                visible = re.sub(r"class(?:Name)?=(?:\{[^}]*\}|\"[^\"]*\"|'[^']*')", "", line)
                if re.search(f"[{chars}]", visible):
                    findings.append(
                        f"{p.name}:{i} character in the range [{chars}] rendered in '{cls}'. "
                        f"That cut renders it as a watermark: spell it out or change the face.")

        bank = r.get("faqBankFile")
        if bank:
            findings.extend(check_faq_parity(text, p.name, cfg["_root"] / bank))

    if ext in STYLE_EXTS and r.get("noRawHexOutsideTokenFiles") and not token_file:
        for i, line in enumerate(text.splitlines(), 1):
            if line.strip().startswith(("/*", "*", "//")):
                continue
            if re.search(r"#[0-9a-fA-F]{3,8}\b", line) or re.search(r"\b(?:rgb|hsl|oklch|lab)\(", line):
                findings.append(f"{p.name}:{i} raw colour value outside the token file. "
                                f"Use a token variable.")

    if findings:
        sys.stderr.write(
            "code-guard: BLOCKED. Fix these before proceeding "
            "(rules: docs/CODE-CONVENTIONS.md, switches: brand.config.json enforcement.rules):\n"
            + "\n".join(f"  - {f}" for f in findings[:20]) + "\n"
        )
        return 2
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        sys.exit(0)
