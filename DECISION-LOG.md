# Decision Log

This document records key architectural decisions and their rationale.

---

## Why skills/ is the canonical directory?

**Decision**: All skill definitions live in `skills/` directory, not `.trae/skills/`

**Rationale**:
- `.trae/skills/` contains Apache-2.0 licensed content from Trae
- `skills/` contains our own CC BY 4.0 licensed content
- Clear licensing separation is essential for open source
- AI should reference `skills/` for this repository's own definitions

**Date**: 2026-03-19
**Status**: Established (v1.0.0)

---

## Why creative-special is an extension module?

**Decision**: creative-special (creative writing assistance) is under `prompts/general/` as an extension

**Rationale**:
- Creative tasks are secondary to core engineering tasks (coding, debugging)
- Extension modules allow modular addition without affecting core stability
- Future versions may elevate creative-special to first-class module if demand warrants

**Date**: 2026-03-20
**Status**: Established (v1.1.0)

---

## Why registry uses YAML?

**Decision**: All registries use YAML format for machine readability

**Rationale**:
- YAML is widely supported, human-readable, and machine-parseable
- AI can easily read and process registries for autonomous operation
- Structured format enables filtering, searching, and relationship mapping

**Date**: 2026-03-19
**Status**: Established (v1.0.0)

---

## Why frontmatter in all prompt files?

**Decision**: Every prompt file must include YAML frontmatter with standardized fields

**Rationale**:
- Frontmatter provides consistent metadata (id, name, tags, related_*)
- Enables automated registry generation
- Supports AI asset discovery
- Human users can quickly understand prompt purpose

**Required Fields**:
- `id`: Unique identifier (format: `{type}-{category}-{name}-v{n}`)
- `name`: Human-readable name
- `type`: prompt | skill | workflow
- `category`: Primary category
- `sub_category`: Secondary category (if applicable)
- `tags`: Array of relevant tags
- `related_prompts`: Array of related prompt IDs
- `related_skills`: Array of related skill IDs
- `related_workflows`: Array of related workflow IDs

**Date**: 2026-03-19
**Status**: Established (v1.0.0)

---

## Why separate task/ and general/ prompts?

**Decision**: Task-specific prompts go in `prompts/task/`, general capabilities in `prompts/general/`

**Rationale**:
- `task/` = prompts for specific jobs (coding, debugging, analysis)
- `general/` = prompts for any situation (clarification, reasoning, memory)
- Clear separation helps AI route to appropriate prompts
- Human users can quickly find domain-specific or general-purpose prompts

**Date**: 2026-03-19
**Status**: Established (v1.0.0)

---

## Why routes use task_type and trigger_patterns?

**Decision**: Routes define task_type and trigger_patterns (zh/en) for routing

**Rationale**:
- `task_type`: Primary classification for the task
- `trigger_patterns`: Common phrases that indicate this task type
- Bilingual support ensures routing works regardless of user language
- AI can match user input against patterns to determine task type

**Date**: 2026-03-19
**Status**: Established (v1.0.0)

---

## Why tool-use/ is separate from prompts/?

**Decision**: Tool usage guides live in `prompts/tool-use/`, not embedded in prompts

**Rationale**:
- Tool operation is a cross-cutting concern used by many prompts
- Separate directory allows reuse across different task types
- AI can add tool-use prompts alongside any primary prompt
- Clear separation of "what to do" (task prompt) from "how to do it safely" (tool-use prompt)

**Date**: 2026-03-19
**Status**: Established (v1.0.0)

---

## Why system prompts are minimal?

**Decision**: System prompts in `prompts/system/` are brief, with detailed specs in `skills/` and `docs/`

**Rationale**:
- System prompts should configure AI behavior, not provide detailed instructions
- Detailed guidance lives in skills (which AI can read as needed)
- Reduces redundancy between system prompts and skill documentation
- Allows flexible behavior without editing system-level configs

**Date**: 2026-03-19
**Status**: Established (v1.0.0)

---

## Why add code-review under task/ not coding/?

**Decision**: code-review is a separate sub-category under `prompts/task/`, not under `prompts/task/coding/`

**Rationale**:
- Code review is a distinct activity from code generation
- Different trigger patterns, different prompts, different workflows
- Allows independent expansion of code review capabilities
- Cleaner categorization for AI routing

**Date**: 2026-03-20
**Status**: Established (v1.1.0)

---

## Why personal/reflection/learning-support are under general/?

**Decision**: These are general capabilities applicable across domains, not task-specific

**Rationale**:
- Personal assistance (daily life, organization) is a general AI capability
- Reflection and learning support are meta-capabilities applicable to any task
- Placing under `general/` signals these are foundational, not specialized
- Future expansion can build on these general foundations

**Date**: 2026-03-20
**Status**: Established (v1.1.0)

---

## Why multiple licensing?

**Decision**: Content uses CC BY 4.0, code uses Apache-2.0

**Rationale**:
- Prompts, skills, workflows, documentation = CC BY 4.0 (shareable with attribution)
- Code snippets and implementations = Apache-2.0 (permissive licensing)
- Dual licensing allows wide reuse while protecting the project

**Date**: 2026-03-19
**Status**: Established (v1.0.0)

---

## Future Considerations

| Topic | Status | Notes |
|-------|--------|-------|
| Model variants | Deferred to v1.2.0 | May need model-specific prompt variants |
| Examples expansion | Deferred to v1.2.0 | Need more real-world examples |
| Eval framework | Deferred to v1.2.0 | Need quantitative quality metrics |
| Automation scripts | Deferred to v1.2.0 | Registry generation, validation scripts |
| Community contributions | Deferred | Need contribution guidelines first |

---

**Last Updated**: 2026-03-20
