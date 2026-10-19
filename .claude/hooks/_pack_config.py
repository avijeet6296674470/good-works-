#!/usr/bin/env python3
"""Shared config loader for the website-pack hooks.

Every hook reads brand.config.json instead of carrying project rules in its
source. That is the whole difference between a pack you configure and a pack you
fork.

Design rules, learned the hard way:

- **Fail open, always.** A hook that cannot find or parse its config exits
  quietly and lets the work through. A guard that blocks all editing because of
  its own bug is worse than no guard. The cost is that a silently broken guard
  looks like a passing one, so PORTING.md tells you to test it deliberately
  after install.
- **No absolute paths.** The project root comes from CLAUDE_PROJECT_DIR, or is
  found by walking up. Absolute paths break the moment a project moves and the
  failure is invisible.
- **Defaults are the safe subset.** With no config at all the guard still blocks
  the checks that are true on every project (dashes, hosted fonts), and skips
  everything that needs project knowledge.
"""
import json
import os
import re
from pathlib import Path

CONFIG_NAME = "brand.config.json"

DEFAULTS = {
    "sourceGlobs": ["src/**"],
    "tokenFiles": [],
    "ledgerFile": "_agency-internal/seo/CHANGE-LOG.md",
    "seoDataDir": "_agency-internal/seo/data/",
    "rules": {
        "noEmDash": True,
        "noRawHexOutsideTokenFiles": False,
        "noArbitraryColorUtilities": False,
        "noInlineAppearanceStyles": False,
        "noImportantUtilities": False,
        "noHostedFontLinks": True,
        "bannedSchemaTypes": [],
        "faqBankFile": None,
        "fontDigitTraps": [],
    },
    "grandfathered": [],
}

# Deliberately broad. A pack that only understands one framework is not
# framework-agnostic, whatever its documentation claims.
CODE_EXTS = {".tsx", ".ts", ".jsx", ".js", ".mjs", ".vue", ".svelte", ".astro", ".html"}
STYLE_EXTS = {".css", ".scss", ".sass", ".less", ".pcss"}


def project_root() -> Path:
    """CLAUDE_PROJECT_DIR if set, else walk up from cwd looking for the config."""
    env = os.environ.get("CLAUDE_PROJECT_DIR")
    if env and Path(env).is_dir():
        return Path(env)
    here = Path.cwd()
    for d in (here, *here.parents):
        if (d / CONFIG_NAME).is_file():
            return d
    return here


def load(root: Path | None = None) -> dict:
    """Return the enforcement block, defaults merged in. Never raises."""
    root = root or project_root()
    cfg = {}
    try:
        cfg = json.loads((root / CONFIG_NAME).read_text(encoding="utf-8-sig"))
    except Exception:
        pass
    enf = cfg.get("enforcement") or {}
    out = {**DEFAULTS, **{k: v for k, v in enf.items() if k != "rules"}}
    out["rules"] = {**DEFAULTS["rules"], **(enf.get("rules") or {})}
    out["_root"] = root
    out["_config"] = cfg
    return out


def _glob_re(pattern: str) -> re.Pattern:
    """Translate a path glob to a regex. fnmatch does not understand '**'."""
    out, i = [], 0
    while i < len(pattern):
        if pattern.startswith("**/", i):
            out.append("(?:.*/)?")
            i += 3
        elif pattern.startswith("**", i):
            out.append(".*")
            i += 2
        elif pattern[i] == "*":
            out.append("[^/]*")
            i += 1
        elif pattern[i] == "?":
            out.append("[^/]")
            i += 1
        else:
            out.append(re.escape(pattern[i]))
            i += 1
    return re.compile("^" + "".join(out) + "$")


def rel_posix(path: Path, root: Path) -> str | None:
    """Path relative to the project root, forward slashes. None if outside."""
    try:
        return path.resolve().relative_to(root.resolve()).as_posix()
    except Exception:
        return None


def in_scope(path: Path, cfg: dict) -> bool:
    """Is this file inside sourceGlobs and not grandfathered?"""
    rel = rel_posix(path, cfg["_root"])
    if rel is None:
        return False
    if path.name in set(cfg.get("grandfathered") or []):
        return False
    if rel in set(cfg.get("grandfathered") or []):
        return False
    globs = cfg.get("sourceGlobs") or []
    return any(_glob_re(g).match(rel) for g in globs)


def is_token_file(path: Path, cfg: dict) -> bool:
    rel = rel_posix(path, cfg["_root"])
    for t in cfg.get("tokenFiles") or []:
        if rel == t or path.name == Path(t).name:
            return True
    return False


def brand(cfg: dict, *keys, default=""):
    """Read a dotted path out of the full config. brand(cfg,'identity','name')."""
    node = cfg.get("_config") or {}
    for k in keys:
        if not isinstance(node, dict):
            return default
        node = node.get(k)
        if node is None:
            return default
    return node
