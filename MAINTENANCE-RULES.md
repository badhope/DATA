# Maintenance Rules

This document defines the rules for maintaining the repository. Following these rules ensures consistency and quality.

---

## Naming Rules

### Directory Names

| Rule | Example |
|------|---------|
| Lowercase only | `prompts/`, `skills/` |
| Use hyphens, not underscores | `tool-use/`, not `tool_use/` |
| Use hyphens, not camelCase | `code-review/`, not `codeReview/` |
| Plural for directories | `prompts/`, `skills/` |
| Singular for files | `skill-coding.md` |

### File Names

```
{type}-{category}-{name}.md
```

| Component | Rule | Example |
|-----------|------|---------|
| type | lowercase | `prompt`, `skill`, `workflow` |
| category | lowercase | `coding`, `debugging`, `general` |
| name | kebab-case | `generate-code`, `review-code` |

### ID Names

```
{type}-{category}-{name}-v{n}
```

| Component | Rule | Example |
|-----------|------|---------|
| version | `v1`, `v2`, etc. | `v1`, `v2` |

---

## Structure Rules

### Prompts Structure

```
prompts/
├── _routing/           # AI routing only
├── _core/              # Standards only
├── system/             # System prompts
├── task/               # Task-specific prompts
│   ├── coding/         # Max depth: 2
│   ├── debugging/      # (task/category)
│   └── ...
├── general/            # General prompts
├── workflow/           # Workflow definitions
├── tool-use/           # Tool usage guides
├── output/             # Output formats
└── meta/               # Prompt engineering
```

### Skills Structure

```
skills/
├── {category}/
│   ├── skill-{category}-{name}.md
│   └── README.md (optional)
└── ...
```

### Registry Structure

```
registry/
├── prompts-registry.yaml
├── skills-registry.yaml
├── routes-registry.yaml
├── relations-registry.yaml
├── tags-registry.yaml
└── workflows-registry.yaml
```

---

## Registration Rules

### Prompt Registration

1. Every prompt must have an entry in `registry/prompts-registry.yaml`
2. Entry must include all required fields (see EXTENSION-GUIDE.md)
3. Path in registry must match actual file path
4. ID must be unique across all prompts

### Skill Registration

1. Every skill must have an entry in `registry/skills-registry.yaml`
2. Entry must include all required fields
3. Path must point to `skills/` directory (not `.trae/skills/`)

### Route Registration

1. New task types require new route in `registry/routes-registry.yaml`
2. Routes must include trigger_patterns (zh/en)
3. Routes must reference existing prompts/skills/workflows

### Tag Rules

1. Use tags from `registry/tags-registry.yaml` when possible
2. New tags must be registered before use
3. Tags should be lowercase, hyphenated

---

## Routing Rules

### Route Structure

Each route must have:
- Unique `route_id`
- `task_type` matching category
- `trigger_patterns` in both zh and en
- `first_step` with decision logic
- `required_questions` for ambiguity
- `recommended_prompts` referencing real prompt IDs
- `recommended_skills` referencing real skill IDs
- `recommended_workflows` referencing real workflow IDs

### Route Conflict Prevention

- No two routes should have identical trigger_patterns
- More specific routes should take precedence
- Routes should cover the full task space without gaps

---

## Cleanup Rules

### When to Remove Assets

Remove an asset when:
- It duplicates existing functionality
- It's replaced by a better version
- It no longer serves any purpose
- It violates quality standards

### How to Deprecate

1. Change `status: active` to `status: deprecated` in registry
2. Add `deprecated: true` and `deprecated_reason` to frontmatter
3. Keep file for reference but don't recommend use
4. Update CHANGELOG

### Never Delete Without

1. Checking all references (relations, related_*, routes)
2. Updating all referencing files
3. Documenting in CHANGELOG

---

## Version Rules

### Version Increment

| Change Type | When to Increment |
|-------------|-------------------|
| Patch (bug fix) | v1.0.x |
| Minor (new feature) | v1.x.0 |
| Major (breaking change) | x.0.0 |

### Version in Files

- Frontmatter `version` field
- Registry metadata `version` field
- Document headers

---

## Documentation Rules

### Required Documentation

| File Type | Required |
|-----------|----------|
| Prompt | Frontmatter + content |
| Skill | Frontmatter + usage guide |
| Workflow | Frontmatter + steps |
| Registry | YAML with metadata |

### Recommended Documentation

| File Type | Recommended |
|-----------|-------------|
| Category | README.md in directory |
| New module | Integration into README, INDEX, AI docs |

---

## Review Rules

### Before Any Change

1. Run self-checklist in the asset
2. Verify no broken references
3. Check naming compliance
4. Ensure quality standards met

### After Any Change

1. Update CHANGELOG
2. Update INDEX if new assets added
3. Update AI docs if routing changed
4. Verify all links work

---

## Git Rules

### Commit Messages

Use conventional commits:
- `feat:` New asset
- `fix:` Bug fix
- `docs:` Documentation
- `refactor:` Restructuring
- `test:` Tests
- `chore:` Maintenance

### Branch Naming

- `main` for releases
- `feature/` for new features
- `fix/` for bug fixes
- `docs/` for documentation

---

## Exceptions

These rules may be bent only with documented rationale in DECISION-LOG.md.

---

**Last Updated**: 2026-03-20
