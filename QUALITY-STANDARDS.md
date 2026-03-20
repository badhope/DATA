# Quality Standards

This document defines what makes a prompt, skill, or workflow "good enough" to be included in the repository.

---

## Prompt Quality Standards

### Frontmatter Requirements

Every prompt MUST have:

```yaml
---
id: prompt-{category}-{name}-v1          # Required, unique
name: Human Readable Name                 # Required
summary: One-line description             # Required
type: prompt                              # Required
status: active                            # Required (active/deprecated)
version: "1.0.0"                         # Required
owner: skill-repository                  # Required
category: task                           # Required
sub_category: coding                      # Required (if applicable)
tags: [tag1, tag2]                       # Required (min 1)
keywords: [keyword1, keyword2]            # Required (min 1)
intent: |                                 # Required
  Clear statement of what this prompt does.
  Multiple lines allowed.
applicable_models:                        # Required
  - "*"                                  # or specific models
input_requirements:                       # Required
  - item: type  description               # At least 1
output_requirements:                      # Required
  - item: type  description               # At least 1
tool_requirements: []                     # Required (can be empty)
preconditions:                            # Required
  - Condition that must be true
anti_patterns:                            # Required (min 1)
  - What NOT to do
failure_modes:                           # Required (min 1)
  - failure: solution
self_check: |                             # Required
  - [ ] Check item 1
  - [ ] Check item 2
related_skills:                          # Required (can be empty)
related_workflows:                        # Required (can be empty)
---
```

### Content Requirements

| Requirement | Description |
|-------------|-------------|
| Clear objective | The prompt has ONE clear goal |
| Specific instructions | Avoid vague language like "do your best" |
| Input/output defined | User knows what to provide, AI knows what to output |
| Edge cases covered | anti_patterns and failure_modes are thoughtful |
| Self-checkable | At least 3 self-check items |

### Example Input/Output

Prompts SHOULD include Example Input/Output sections:

```markdown
## Example Input

User: "Generate a REST API endpoint for user authentication"

## Example Output

```python
# Generated code here
```
```

---

## Skill Quality Standards

### Frontmatter Requirements

```yaml
---
name: "skill-name"                       # Required
description: "What this skill does..."   # Required
---

# Skill Name

## When to Use                              # Required (min 2 items)

## Skill Workflow                           # Required

## Related Prompts                          # Required (can reference registry)

## Related Skills                           # Optional
```

### Content Requirements

| Requirement | Description |
|-------------|-------------|
| Clear purpose | Why would someone use this skill? |
| Use cases | At least 2 concrete scenarios |
| Workflow steps | Clear sequence of actions |
| Related assets | Links to relevant prompts/workflows |

---

## Workflow Quality Standards

### Frontmatter Requirements

```yaml
---
id: workflow-{name}-v1                    # Required
name: Workflow Name                        # Required
summary: One-line description              # Required
type: workflow                             # Required
goal: End goal of workflow                 # Required
steps:                                     # Required (min 2)
  - name: Step 1
    prompt: prompt-xxx
  - name: Step 2
    prompt: prompt-yyy
required_skills:                           # Recommended
  - skill-xxx
output_format: |                            # Recommended
  Description of expected output
---

# Workflow Name

## When to Use                              # Required

## Prerequisites                            # Recommended

## Steps                                    # Required

## Expected Output                          # Required
```

---

## Registry Quality Standards

### prompts-registry.yaml Entry

| Field | Required | Notes |
|-------|----------|-------|
| id | Yes | Must match file frontmatter |
| name | Yes | Human readable |
| path | Yes | Must match actual file location |
| type | Yes | prompt |
| category | Yes | Primary category |
| sub_category | Yes | Secondary category |
| summary | Yes | One-line description |
| intent | Yes | What the prompt does |
| when_to_use | Yes | Min 1 item |
| when_not_to_use | Yes | Min 1 item |
| input_requirements | Yes | Min 1 item |
| output_shape | Yes | Min 1 item |
| tags | Yes | Min 1 tag |
| keywords | Yes | Min 1 keyword |
| related_prompts | No | Can be empty |
| related_skills | No | Can be empty |
| related_workflows | No | Can be empty |
| status | Yes | active/deprecated |

### routes-registry.yaml Entry

| Field | Required | Notes |
|-------|----------|-------|
| route_id | Yes | Unique |
| trigger_patterns | Yes | Must have zh and en |
| task_type | Yes | Matches category |
| description | Yes | One-line description |
| first_step | Yes | Min 3 lines |
| required_questions | Yes | Min 1 |
| recommended_prompts | Yes | Must exist |
| recommended_skills | Yes | Must exist |
| recommended_workflows | No | Can be empty |
| optional_supporting_prompts | No | Can be empty |
| fallback_strategy | Yes | Min 2 lines |
| output_recommendation | Yes | Min 1 line |

---

## Anti-Patterns to Avoid

### In Prompts

| Anti-Pattern | Why Bad | Instead |
|-------------|---------|---------|
| "Do your best" | Unclear standard | Specific quality criteria |
| "Generate some code" | No specificity | "Generate Python code that..." |
| No error handling | Fragile output | Include error handling requirements |
| Overly long | Hard to use | Keep focused on one goal |
| Vague inputs | Unclear what to provide | Define specific input schema |

### In Skills

| Anti-Pattern | Why Bad | Instead |
|-------------|---------|---------|
| No use cases | Unclear when to use | Add concrete scenarios |
| Circular references | Broken chains | Define clear relationships |
| Too generic | No distinct value | Focus on specific capability |

### In Workflows

| Anti-Pattern | Why Bad | Instead |
|-------------|---------|---------|
| No end state | User doesn't know when done | Define completion criteria |
| Missing steps | Incomplete process | Cover full flow |
| No error recovery | Fragile | Add fallback paths |

---

## File-Level Requirements

### Naming Compliance

- Directory names: lowercase, hyphenated, plural
- File names: `{type}-{category}-{name}.md`
- IDs: `{type}-{category}-{name}-v{n}`

### Path Requirements

- All paths must be relative to repository root
- Paths must match actual file locations
- No broken links

### Content Requirements

| Type | Min Length | Max Width |
|------|------------|-----------|
| Prompt | 100 chars | 80 chars per line |
| Skill | 200 chars | 80 chars per line |
| Workflow | 150 chars | 80 chars per line |

---

## Quality Checklist

Before adding any asset, verify:

- [ ] Frontmatter is complete and valid YAML
- [ ] ID is unique across repository
- [ ] Name is human-readable
- [ ] Tags are registered in tags-registry.yaml
- [ ] All related_* reference existing assets
- [ ] No duplicate functionality exists
- [ ] Content is at least minimum length
- [ ] Language is consistent (Chinese or English)
- [ ] No hardcoded secrets or credentials
- [ ] self_check has at least 3 items
- [ ] anti_patterns has at least 1 item
- [ ] failure_modes has at least 1 item

---

## Review Process

1. **Self-review**: Author runs checklist
2. **Automated checks**: (future) Linting scripts
3. **Registry validation**: Verify registry entries
4. **Link validation**: Verify all paths work

---

**Last Updated**: 2026-03-20
