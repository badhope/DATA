# Asset Map

This document provides a comprehensive inventory of all assets in the repository as of v1.1.0.

---

## Statistics Summary

| Category | Count | Path |
|----------|-------|------|
| **Prompts** | 132+ | `prompts/` |
| **Skills** | 14 | `skills/` |
| **Workflows** | 10 | `prompts/workflow/` |
| **Tool-Use Guides** | 8 | `prompts/tool-use/` |
| **Output Formats** | 6 | `prompts/output/` |
| **Meta Prompts** | 8 | `prompts/meta/` |
| **System Prompts** | 4 | `prompts/system/` |
| **Routing Prompts** | 4 | `prompts/_routing/` |
| **Core Specs** | 5 | `prompts/_core/` |

---

## Prompts by Category

### Task Prompts (71)

| Sub-category | Count | Path |
|--------------|-------|------|
| coding | 20 | `prompts/task/coding/` |
| debugging | 20 | `prompts/task/debugging/` |
| repo-analysis | 10 | `prompts/task/repo-analysis/` |
| planning | 2 | `prompts/task/planning/` |
| research | 1 | `prompts/task/research/` |
| refactoring | 8 | `prompts/task/refactoring/` |
| testing | 8 | `prompts/task/testing/` |
| engineering-planning | 8 | `prompts/task/engineering-planning/` |
| documentation-for-code | 6 | `prompts/task/documentation-for-code/` |
| code-review | 8 | `prompts/task/code-review/` |

### General Prompts (70)

| Sub-category | Count | Path |
|--------------|-------|------|
| clarification | 8 | `prompts/general/clarification/` |
| context-memory | 8 | `prompts/general/context-memory/` |
| reasoning | 7 | `prompts/general/reasoning/` |
| search | 7 | `prompts/general/search/` |
| user-style-adaptation | 8 | `prompts/general/user-style-adaptation/` |
| long-term-assistant | 8 | `prompts/general/long-term-assistant/` |
| creative-special | 10 | `prompts/general/creative-special/` |
| personal | 6 | `prompts/general/personal/` |
| reflection | 6 | `prompts/general/reflection/` |
| learning-support | 8 | `prompts/general/learning-support/` |

### Other Prompts

| Category | Count | Path |
|----------|-------|------|
| routing | 4 | `prompts/_routing/` |
| system | 4 | `prompts/system/` |
| workflow | 10 | `prompts/workflow/` |
| tool-use | 8 | `prompts/tool-use/` |
| output | 6 | `prompts/output/` |
| meta | 8 | `prompts/meta/` |
| core specs | 5 | `prompts/_core/` |

---

## Skills (14)

| Skill ID | Name | Path |
|----------|------|------|
| skill-ai-routing-v1 | AI Routing | `skills/ai-routing/` |
| skill-routing-v1 | Routing | `skills/routing/` |
| skill-coding-v1 | Coding | `skills/coding/` |
| skill-coding-code-review-v1 | Code Review | `skills/coding/` |
| skill-coding-bug-fixing-v1 | Bug Fixing | `skills/coding/` |
| skill-debugging-v1 | Debugging | `skills/debugging/` |
| skill-planning-v1 | Planning | `skills/planning/` |
| skill-repo-analysis-v1 | Repository Analysis | `skills/repo-analysis/` |
| skill-research-v1 | Research | `skills/research/` |
| skill-tool-use-v1 | Tool Use | `skills/tool-use/` |
| skill-prompt-composition-v1 | Prompt Composition | `skills/prompt-composition/` |
| skill-system-prompts-v1 | System Prompts | `skills/system-prompts/` |
| skill-workflows-v1 | Workflows | `skills/workflows/` |
| skill-writing-v1 | Writing | `skills/writing/` |

---

## Workflows (10)

| Workflow ID | Name | Path |
|-------------|------|------|
| workflow-bug-investigation | Bug Investigation | `prompts/workflow/` |
| workflow-feature-implementation | Feature Implementation | `prompts/workflow/` |
| workflow-new-repo-onboarding | New Repo Onboarding | `prompts/workflow/` |
| workflow-research-to-summary | Research to Summary | `prompts/workflow/` |
| workflow-vague-request-to-action | Vague Request to Action | `prompts/workflow/` |
| workflow-repo-reading-to-change-plan | Repo Reading to Change Plan | `prompts/workflow/` |
| workflow-prompt-selection-composition | Prompt Selection & Composition | `prompts/workflow/` |
| workflow-documentation-generation | Documentation Generation | `prompts/workflow/` |
| workflow-tool-assisted-debug | Tool-Assisted Debug | `prompts/workflow/` |
| workflow-change-verify-report | Change Verify Report | `prompts/workflow/` |

---

## Routes (18)

| Route ID | Task Type | Category |
|----------|-----------|----------|
| route-coding | coding | Task |
| route-debugging | debugging | Task |
| route-repo-analysis | repo-analysis | Task |
| route-planning | planning | Task |
| route-research | research | Task |
| route-code-review | code-review | Task |
| route-fuzzy-request | fuzzy-request | Meta |
| route-prompt-engineering | prompt-engineering | Meta |
| route-personal | personal | General |
| route-reflection | reflection | General |
| route-learning | learning | General |
| route-creative | creative | General |
| route-style-adaptation | style-adaptation | General |
| route-long-term | long-term | General |
| route-refactoring | refactoring | Task |
| route-testing | testing | Task |
| route-engineering-planning | engineering-planning | Task |
| route-documentation-for-code | documentation-for-code | Task |

---

## Version History

| Version | Date | Status |
|---------|------|--------|
| v1.0.0 | 2026-03-19 | MVP - Core task coverage |
| v1.1.0 | 2026-03-20 | Expansion - New modules, registry completion |

---

## What's Next (Future Versions)

See [PROJECT-PLAN.md](PROJECT-PLAN.md) for planned future development.

---

**Last Updated**: 2026-03-20
