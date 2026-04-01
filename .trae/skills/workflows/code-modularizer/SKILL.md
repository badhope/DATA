---
name: code-modularizer
description: "Tier 2: Break monolithic code into clean modules. Refactor for better maintainability. Keywords: modularize code, split monolith, refactor modules, 代码模块化, 拆分单体"
layer: workflow
role: refactoring-specialist
tier: 2
version: 5.0.0
architecture: handoff-chain
invokes:
  - dependency-analyzer
  - cross-file-refactor
  - code-review
invoked_by:
  - refactoring-workflow
  - lead-agent
capabilities:
  - monolith_decomposition
  - module_boundary_identification
  - dependency_untangling
triggers:
  keywords:
    - modularize code
    - split monolith
    - refactor modules
    - too big file
    - 代码模块化
    - 拆分单体
  conditions:
    - "file > 1000 lines"
    - "too many responsibilities"
    - "hard to maintain"
metrics:
  avg_execution_time: 20m
  modules_created: 2-5
  maintainability_improvement: 40%
---

# Code Modularizer - Tier 2

> **Tier 2 Skill**: Break monolithic code into clean modules

## What is Code Modularization?

Take a big, messy file and split it into clean, focused modules.

```
BEFORE: MONOLITH (1,500 lines)
  app.js
    ├─ auth()
    ├─ database()
    ├─ api_routes()
    ├─ validation()
    ├─ logging()
    └─ utils()
  (Too many things in one place!)

AFTER: MODULARIZED
  src/
    ├─ auth/
    │   └─ index.js (auth logic)
    ├─ database/
    │   └─ index.js (DB connection)
    ├─ api/
    │   └─ routes.js (API endpoints)
    ├─ validation/
    │   └─ schemas.js (validation)
    ├─ logging/
    │   └─ logger.js (logging)
    └─ utils/
        └─ helpers.js (utilities)
  (Clean, focused, maintainable!)
```

## Benefits

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **File size** | 1,500 lines | ~200 lines each | **87% smaller** |
| **Testability** | Hard | Easy | **Easier** |
| **Maintainability** | Low | High | **40% better** |
| **Reusability** | Low | High | **More reusable** |

## Handoff Chain

```
Dependency Analyzer ━━(handoff)━━► Module Boundary Identifier ━━(handoff)━━► Refactoring Executor ━━(handoff)━━► Verification & Test
     │                               │                              │                           │
  ├─ Analyze imports        ├─ Identify modules       ├─ Move code           ├─ Test all
  └─ Dependency graph       └─ Boundary plan          └─ Update imports      └─ Verify works
```

## Phase 1: Dependency Analysis

```yaml
purpose: "Analyze current code structure"
state: analyzing
actions:
  - skill: dependency-analyzer
    task: "Build dependency graph"
    output: DependencyGraph
    
  - Identify:
    - What functions are together?
    - What are the natural clusters?
    - What depends on what?
```

## Phase 2: Module Boundary Identification

```yaml
purpose: "Decide module boundaries"
state: identifying_modules
principles:
  - Single Responsibility: One module, one job
  - High Cohesion: Related things together
  - Low Coupling: Minimal dependencies between modules

output: ModulePlan
  modules:
    - auth: {functions: [...]}
    - database: {functions: [...]}
    - api: {functions: [...]}
```

## Phase 3: Refactoring Execution

```yaml
purpose: "Execute the refactoring"
state: refactoring
actions:
  - Create new files/directories
  - Move functions to appropriate modules
  - Update import/export statements
  - Update all references

skill: cross-file-refactor
```

## Phase 4: Verification & Test

```yaml
purpose: "Verify everything works"
state: verifying
quality_gate:
  checks:
    - "All tests pass"
    - "No broken imports"
    - "Same functionality"
    - "Better maintainability"
```

## Example

```
BEFORE: big-app.js (1,200 lines)
  - Everything in one file
  - Hard to find anything
  - Hard to test

PHASE 1: Analyze
  - Found 4 clusters: auth, db, api, utils

PHASE 2: Plan modules
  src/auth/index.js
  src/database/index.js
  src/api/routes.js
  src/utils/helpers.js

PHASE 3: Refactor
  - Move code
  - Update imports
  - Create package structure

PHASE 4: Verify
  - All tests pass ✓
  - Same functionality ✓
  - Easier to maintain ✓

RESULT: Modularized, 40% better maintainability!
```

## Related Skills

- **dependency-analyzer** - Dependency analysis
- **cross-file-refactor** - Cross-file refactoring
- **refactoring-workflow** - Refactoring workflow
