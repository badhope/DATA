# Architecture

This document explains **why** this repository is structured the way it is, and **how** the different parts work together.

---

## Design Philosophy

This repository follows three core principles:

1. **Hierarchical Collaborative Skill Architecture (HCSA)**: Skills are organized in four layers - Meta, Workflow, Action, Domain
2. **AI-First Discoverability**: The routing system enables AI to autonomously find, select, and compose skills
3. **Modularity**: Each skill is self-contained and composable

---

## HCSA Architecture

```
┌─────────────────────────────────────────┐
│           Meta Layer (战略层)            │
│   task-planner | orchestrator | reflector│
│   - Strategic planning                   │
│   - Task decomposition                   │
│   - Self-reflection                      │
├─────────────────────────────────────────┤
│         Workflow Layer (战术层)          │
│      coding-workflow | debugging-workflow│
│   - Process coordination                 │
│   - State management                     │
│   - Result aggregation                   │
├─────────────────────────────────────────┤
│          Action Layer (执行层)           │
│   code-generator | test-generator | ...  │
│   - Specific operations                  │
│   - Tool calls                           │
│   - Data processing                      │
├─────────────────────────────────────────┤
│          Domain Layer (领域层)           │
│   AI | Backend | Frontend | DevOps | ... │
│   - Domain-specific expertise            │
│   - Best practices                       │
│   - Patterns and conventions             │
└─────────────────────────────────────────┘
```

---

## Directory Structure

```
.trae/skills/
├── meta/               # Strategic planning skills
│   ├── task-planner/   # Task decomposition
│   ├── orchestrator/   # Execution coordination
│   └── reflector/      # Self-reflection
├── workflows/          # Process coordination skills
│   ├── coding-workflow/
│   └── debugging-workflow/
├── actions/            # Execution skills
│   ├── code-generator/
│   ├── test/
│   ├── documentation/
│   └── tools/
├── domains/            # Domain-specific skills
│   ├── ai/
│   ├── backend/
│   ├── frontend/
│   ├── devops/
│   ├── database/
│   ├── testing/
│   ├── mobile/
│   ├── data/
│   ├── security/
│   ├── performance/
│   └── mcp/
├── config/             # Configuration files
│   └── routing.yaml    # Routing rules
└── shared/             # Shared resources
    └── schemas/        # JSON schemas
```

---

## Why This Structure?

### Layer Separation

| Layer | Responsibility | When to Use |
|-------|---------------|-------------|
| **Meta** | Strategic decisions | Complex tasks (complexity > 5) |
| **Workflow** | Process coordination | Medium tasks (complexity 3-5) |
| **Action** | Execute operations | Simple tasks (complexity < 3) |
| **Domain** | Domain expertise | Domain-specific tasks |

### Routing System

The `config/routing.yaml` file defines:
- Complexity thresholds for each layer
- Keyword-based routing rules
- Skill invocation chains

### Skill Composition

Skills can invoke other skills:
- Meta skills invoke Workflow skills
- Workflow skills invoke Action skills
- Action skills invoke Domain skills
- Domain skills provide expertise

---

## Skill Metadata

Each skill has standardized frontmatter:

```yaml
---
name: skill-name
description: "Description of the skill"
layer: meta | workflow | action | domain
role: planner | coordinator | executor | expert
version: 1.0.0
invokes: []        # Skills this skill calls
invoked_by: []     # Skills that call this skill
capabilities: []   # What this skill can do
triggers:
  keywords: []     # Keywords that trigger this skill
---
```

---

## Configuration Files

| File | Purpose |
|------|---------|
| `config/routing.yaml` | Task routing rules |
| `shared/schemas/task.json` | Task schema |
| `shared/schemas/result.json` | Result schema |
