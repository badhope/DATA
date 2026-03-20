# Extension Guide

This guide explains how to extend the repository by adding new prompts, skills, workflows, routes, relations, and tags.

---

## Adding a New Prompt

### 1. Choose the Right Location

```
prompts/
├── task/           # For task-specific prompts (coding, debugging, etc.)
├── general/        # For general capability prompts
├── workflow/       # For multi-step workflow definitions
├── tool-use/       # For tool operation guides
├── output/         # For output format specifications
└── meta/           # For prompt engineering tools
```

### 2. Follow Naming Convention

```
{type}-{category}-{name}.md
```

Examples:
- `prompt-task-coding-generate-from-spec.md`
- `prompt-general-reasoning-chain-of-thought.md`
- `prompt-tool-use-inspect-config-then-act.md`

### 3. Include Frontmatter

Every prompt must have standardized frontmatter:

```yaml
---
id: prompt-task-coding-generate-from-spec-v1
name: Generate Code from Specification
summary: Generate implementation code from a technical specification
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: coding
tags:
  - coding
  - code-generation
  - implementation
keywords:
  - 代码生成
  - 规格
  - 实现
intent: |
  从技术规格生成可用的实现代码。
  确保代码符合规格要求，包含必要的错误处理。
applicable_models:
  - "*"
input_requirements:
  - specification: string 技术规格
  - language: string 编程语言
  - framework: string 框架(可选)
output_requirements:
  - code: string 生成的代码
  - tests: string 测试代码(可选)
  - documentation: string 文档(可选)
tool_requirements: []
preconditions:
  - 用户提供了技术规格
anti_patterns:
  - 不要生成包含 secrets 或 credentials 的代码
  - 不要生成不完整的代码
failure_modes:
  - 规格不明确：先要求澄清
  - 语言不支持：说明支持的语言
self_check: |
  - [ ] 代码是否符合规格？
  - [ ] 是否有适当的错误处理？
  - [ ] 是否有安全漏洞？
related_skills:
  - skill-coding
  - skill-coding-code-review
related_workflows:
  - workflow-feature-implementation
---

# Your Prompt Content Here
```

### 4. Register the Prompt

Add entry to `registry/prompts-registry.yaml`:

```yaml
- id: prompt-task-coding-generate-from-spec-v1
  name: Generate Code from Specification
  path: prompts/task/coding/prompt-task-coding-generate-from-spec.md
  type: task
  category: coding
  sub_category: task
  summary: 从技术规格生成实现代码
  ...
```

### 5. Add Route (if needed)

If this is a new task type, add to `registry/routes-registry.yaml`:

```yaml
- route_id: route-your-task
  trigger_patterns:
    zh:
      - "你的触发词"
    en:
      - "your trigger phrase"
  task_type: your-task
  description: 任务描述
  ...
```

---

## Adding a New Skill

### 1. Create Skill File

```
skills/{category}/skill-{category}-{name}.md
```

### 2. Follow Skill Template

```yaml
---
name: "skill-name"
description: "What this skill does. Invoke when user wants to..."
---

# Skill Name

## When to Use

- Scenario 1
- Scenario 2

## Skill Workflow

### Step 1
Description...

### Step 2
Description...

## Related Prompts

- prompt-xxx
- prompt-yyy

## Related Skills

- skill-other
```

### 3. Register in skills-registry.yaml

```yaml
- id: skill-your-skill-v1
  name: Your Skill
  path: skills/{category}/skill-{category}-{name}.md
  category: your-category
  tags: [tag1, tag2]
  summary: Brief description
  intent: What this skill enables
  typical_use_cases:
    - Use case 1
    - Use case 2
  related_prompts:
    - prompt-xxx
  related_workflows:
    - workflow-xxx
  status: active
```

---

## Adding a New Workflow

### 1. Create Workflow File

```
prompts/workflow/{workflow-name}-workflow.md
```

### 2. Follow Workflow Template

```yaml
---
id: workflow-your-workflow-v1
name: Your Workflow
summary: What this workflow accomplishes
type: workflow
goal: End goal of this workflow
steps:
  - name: Step 1
    prompt: prompt-to-use
  - name: Step 2
    prompt: another-prompt
  ...
---

# Workflow Name

## When to Use

Description...

## Steps

1. **Step 1 Name** → Use `prompt-xxx`
2. **Step 2 Name** → Use `prompt-yyy`
...

## Expected Output

What you'll get at the end...
```

---

## Adding Registry Entries

### prompts-registry.yaml

Required fields:
- `id`, `name`, `path`, `type`, `category`, `sub_category`, `summary`
- `intent`, `when_to_use`, `when_not_to_use`
- `input_requirements`, `output_shape`
- `tags`, `keywords`
- `related_prompts`, `related_skills`, `related_workflows`

### routes-registry.yaml

Required fields:
- `route_id`, `trigger_patterns` (zh/en), `task_type`, `description`
- `first_step`, `required_questions`
- `recommended_prompts`, `recommended_skills`, `recommended_workflows`
- `optional_supporting_prompts`, `fallback_strategy`, `output_recommendation`

### tags-registry.yaml

Add new tags with categories and descriptions.

### relations-registry.yaml

Define relationships between assets with relation types.

---

## Adding Examples

### examples/ Structure

```
examples/
├── coding/
│   ├── example-code-generation.md
│   └── README.md
├── debugging/
│   ├── example-bug-fix.md
│   └── README.md
└── README.md
```

### Example File Template

```yaml
---
title: Example Title
description: What this example demonstrates
category: coding
tags: [example, code-generation]
---

# Example: Generating Code from Requirements

## Scenario

User wants to generate a REST API endpoint.

## Prompt Used

[Copy of prompt here]

## Input

[Example input]

## Output

[Example output]

## Notes

[What to pay attention to]
```

---

## Adding Author Picks

### author-picks/ Structure

```
author-picks/
├── README.md
└── curated/
    ├── best-for-beginners.md
    ├── most-versatile.md
    └── newest-additions.md
```

### Purpose

Author picks are curated selections of the best or most useful prompts, curated by the repository maintainers. This provides a human-friendly way to highlight quality content.

---

## Quality Checklist Before Adding

- [ ] Follows naming convention
- [ ] Has proper frontmatter
- [ ] Registered in appropriate registry
- [ ] Has no duplicate functionality
- [ ] Meets quality standards (see QUALITY-STANDARDS.md)
- [ ] Has proper licensing
- [ ] Links to related assets
- [ ] Human-readable and AI-parseable

---

**Last Updated**: 2026-03-20
