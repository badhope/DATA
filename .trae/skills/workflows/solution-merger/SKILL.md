---
name: solution-merger
description: "Tier 2: Merge subproblem solutions into final integrated solution. Handles conflicts, consistency checks, integration. Keywords: merge solutions, combine results, integrate components, 合并解决方案, 整合结果"
layer: workflow
role: integrator
tier: 2
version: 5.0.0
architecture: handoff-chain
invokes:
  - aggregation-processor
  - error-analyzer
  - code-review
invoked_by:
  - problem-decomposer
  - lead-agent
  - full-stack-development
capabilities:
  - solution_integration
  - conflict_resolution
  - consistency_checking
  - interface_validation
triggers:
  keywords:
    - merge solutions
    - combine results
    - integrate components
    - put it all together
    - 合并解决方案
    - 整合结果
    - 集成组件
  conditions:
    - "multiple subproblem solutions exist"
    - "integration needed"
    - "conflicts possible"
metrics:
  avg_execution_time: 12m
  conflicts_resolved: 0-5
  integration_success: 0.95
---

# Solution Merger - Tier 2

> **Tier 2 Skill**: Merge subproblem solutions into final integrated solution

## What is Solution Merging?

After using **Problem Decomposer** to split into subproblems, **Solution Merger** combines them back.

```
SUBPROBLEM SOLUTIONS (from Conquer phase)
    │
    ├─ Solution A (Backend)
    ├─ Solution B (Frontend)
    └─ Solution C (DevOps)
    │
    │ Merge: Integrate, resolve conflicts, validate
    ▼
┌─────────────────────────────────────────────────┐
│     MERGING PROCESS                               │
│                                                   │
│  1. Collect all solutions                        │
│  2. Check interfaces & compatibility             │
│  3. Resolve conflicts (if any)                   │
│  4. Integrate components                          │
│  5. Consistency verification                      │
│  6. Final validation                              │
└─────────────────────────────────────────────────┘
    │
    ▼
FINAL INTEGRATED SOLUTION ✓
```

## Common Merge Challenges

| Challenge | Solution |
|-----------|----------|
| **Interface mismatch** | Validate API contracts, generate adapters |
| **Data format conflict** | Transform data to common format |
| **Naming collision** | Rename or namespace |
| **Dependency conflict** | Resolve version, use compatible versions |
| **State inconsistency** | Synchronize state, use transactions |

## Handoff Chain

```
Solution Collector ━━(handoff)━━► Interface Validator ━━(handoff)━━► Conflict Resolver ━━(handoff)━━► Integrator ━━(handoff)━━► Final Verifier
     │                            │                         │                     │                   │
  ├─ Gather all           ├─ Check APIs        ├─ Resolve issues      ├─ Put together   ├─ Test everything
  └─ Index solutions      └─ Compatibility     └─ Document fixes      └─ Connect parts   └─ Confirm works
```

## Phase 1: Solution Collection

```yaml
purpose: "Gather all subproblem solutions"
state: collecting
inputs:
  - solution_a: {...}
  - solution_b: {...}
  - solution_c: {...}

output: SolutionCollection
  metadata:
    count: 3
    sources: [backend, frontend, devops]
```

## Phase 2: Interface Validation

```yaml
purpose: "Check interfaces & compatibility"
state: validating_interfaces
checks:
  - "API endpoints match"
  - "Data schemas compatible"
  - "Protocol versions match"
  - "Dependency versions compatible"

if issues:
  handoff_to: "Conflict Resolver"
  handoff_payload: {interface_issues: [...]}
else:
  handoff_to: "Integrator"
```

## Phase 3: Conflict Resolution

```yaml
purpose: "Resolve any conflicts"
state: resolving_conflicts
strategies:
  - auto_resolve: "Automatic if safe"
  - ask_user: "Ask user for ambiguous cases"
  - transform: "Transform data/format"
  - adapt: "Generate adapter layer"

output: ResolvedConflicts
  - conflict_1: {resolved: true, method: "transform"}
  - conflict_2: {resolved: true, method: "adapter"}
```

## Phase 4: Integration

```yaml
purpose: "Integrate all components"
state: integrating
steps:
  - Connect frontend → backend API
  - Connect backend → database
  - Setup CI/CD pipeline
  - Configure monitoring
  - Wire all together

output: IntegratedSystem
```

## Phase 5: Consistency & Final Verification

```yaml
purpose: "Verify everything works"
state: verifying
quality_gate:
  checks:
    - "All components connected"
    - "No conflicts remaining"
    - "End-to-end tests pass"
    - "Performance acceptable"

on_failure: "debug_and_fix"

output: FinalVerifiedSolution
```

## Example: Full Stack Merge

```
SUBPROBLEM SOLUTIONS:
  Solution 1: Backend (Go API)
    - POST /api/todos
    - GET /api/todos
    - PostgreSQL DB
  
  Solution 2: Frontend (Vue3)
    - TodoList.vue
    - ApiClient.js (calls /api/todos)
  
  Solution 3: DevOps
    - Dockerfile
    - docker-compose.yml
    - GitHub Actions

PHASE 1: Collect ✓

PHASE 2: Validate Interfaces
  Check: Frontend ApiClient calls /api/todos
  Check: Backend has /api/todos
  ✓ Compatible!

PHASE 3: Resolve Conflicts
  None found ✓

PHASE 4: Integrate
  - Frontend container → Backend container
  - Backend container → PostgreSQL container
  - Docker Compose connects all
  - GitHub Actions deploys

PHASE 5: Verify
  - E2E test: Create todo → appears in list
  - All tests pass ✓
  - Performance: <500ms ✓

RESULT: Integrated full stack app!
```

## Related Skills

- **aggregation-processor** - Result aggregation
- **problem-decomposer** - Problem decomposition (paired with this)
- **code-review** - Code review
