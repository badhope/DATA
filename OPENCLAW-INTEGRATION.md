# OpenClaw Integration

This project already contains a large skill library under `.trae/skills/`.

## Goal
Make the library easy to install, refresh, and verify inside OpenClaw.

## Installed target
- Source: `C:\Users\X1882\Desktop\skill\.trae\skills`
- Target: `C:\Users\X1882\.openclaw\skills`

## Strategy
1. Treat `.trae/skills/*` as the source of truth.
2. Sync skill directories into `~/.openclaw/skills`.
3. Preserve existing local-only skills in OpenClaw unless a same-named source skill exists.
4. Skip destructive cleanup by default.

## What was added
- `sync-to-openclaw.ps1` — safe sync script from this repo into OpenClaw skills.
- `skills-inventory.md` — generated inventory of current source skills.

## Recommended workflow
```powershell
pwsh -File .\sync-to-openclaw.ps1
```

## Notes
- This repo is a skill library / prompt-workflow library, not a conventional application.
- The fastest practical extension for OpenClaw is to make the skills easy to sync and validate, rather than rewriting every individual skill.
- If a specific skill needs improvement later, edit its `SKILL.md` in `.trae/skills/<skill-name>/SKILL.md` and run sync again.
