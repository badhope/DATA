---
name: problem-decomposer
description: "Tier 2: Systematic Problem Decomposition using Divide & Conquer. Break complex problems into independent subproblems. Keywords: divide and conquer, problem decomposition, break down problem, 分治法, 问题分解"
layer: workflow
role: decomposer
tier: 2
version: 5.0.0
architecture: handoff-chain
invokes:
  - decomposition-planner
  - task-planner
  - aggregation-processor
invoked_by:
  - lead-agent
  - full-stack-development
  - enterprise-project
capabilities:
  - divide_and_conquer
  - problem_subdivision
  - independency_analysis
  - subproblem_identification
triggers:
  keywords:
    - divide and conquer
    - problem decomposition
    - break down problem
    - too complex
    - split into parts
    - 分治法
    - 问题分解
    - 拆分问题
  conditions:
    - "problem is too large/complex"
    - "can be split into independent parts"
    - "needs parallel execution"
metrics:
  avg_execution_time: 10m
  subproblems_created: 3-8
  parallelizable: true
---

# Problem Decomposer - Tier 2

> **Tier 2 Skill**: Systematic Problem Decomposition using Divide and Conquer

## What is Divide and Conquer?

The classic algorithmic paradigm: **Divide → Conquer → Combine**

```
COMPLEX PROBLEM
    │
    │ Divide: Break into subproblems
    ▼
┌───────────────┬───────────────┬───────────────┐
│  Subproblem 1 │  Subproblem 2 │  Subproblem 3 │
│  (Independent)│  (Independent)│  (Independent)│
└───────┬───────┴───────┬───────┴───────┬───────┘
        │               │               │
        │ Conquer: Solve each subproblem
        ▼               ▼               ▼
   Solution 1      Solution 2      Solution 3
        │               │               │
        └───────────────┼───────────────┘
                        │
                        │ Combine: Merge solutions
                        ▼
                FINAL SOLUTION
```

## Key Principles

| Principle | Check |
|-----------|-------|
| **Independency** | Subproblems can be solved in parallel without interference |
| **Similarity** | Subproblems are similar to original (just smaller) |
| **Base Case** | Subproblems get small enough to solve directly |
| **Combineable** | Solutions can be merged back |

## Handoff Chain

```
Problem Analyzer ━━(handoff)━━► Subproblem Identifier ━━(handoff)━━► Independency Checker ━━(handoff)━━► Solution Combiner
     │                           │                           │                         │
  ├─ Problem scope        ├─ Split points        ├─ Verify independent    ├─ Merge all
  └─ Complexity           └─ Subproblem list     └─ Can parallelize?     └─ Final solution
```

## Phase 1: Problem Analysis

```yaml
purpose: "Analyze the problem"
state: analyzing
questions:
  - "What is the overall goal?"
  - "What are the inputs/outputs?"
  - "What's the complexity?"
  - "Can this be split?"

output: ProblemAnalysis
```

## Phase 2: Divide - Identify Subproblems

```yaml
purpose: "Break into subproblems"
state: dividing
strategies:
  - by_functionality: "Split by feature/module"
  - by_data: "Split by data partition"
  - by_stage: "Split by processing stage"
  - by_component: "Split by system component"

check_independency: true

output: SubproblemList
  - subproblem_1: {...}
  - subproblem_2: {...}
  - subproblem_3: {...}
```

## Phase 3: Conquer - Solve Subproblems

```yaml
purpose: "Solve each subproblem"
state: conquering
parallel: true  # If independent

for each subproblem in SubproblemList:
  if subproblem is simple:
    solve directly
  else:
    recursively decompose further

output: SubproblemSolutions
```

## Phase 4: Combine - Merge Solutions

```yaml
purpose: "Merge into final solution"
state: combining
strategies:
  - concatenation: "Put results together"
  - aggregation: "Sum/avg/merge results"
  - integration: "Connect components"
  - composition: "Build hierarchy"

quality_gate:
  checks:
    - "All subproblems solved"
    - "Integration works"
    - "Original problem solved"

output: FinalSolution
```

## Example: Full Stack Todo App

```
COMPLEX PROBLEM: Build full stack todo app
  (Too big to solve as one)

PHASE 1: Divide
  Subproblem 1: Backend API (Go + PostgreSQL)
  Subproblem 2: Frontend UI (Vue3)
  Subproblem 3: DevOps (CI/CD + Docker)
  ✓ All independent!

PHASE 2: Conquer (in parallel)
  Team 1 solves Subproblem 1 (Backend)
  Team 2 solves Subproblem 2 (Frontend)
  Team 3 solves Subproblem 3 (DevOps)
  (3x faster because parallel!)

PHASE 3: Combine
  - Connect Frontend ↔ Backend API
  - Deploy with Docker + CI/CD
  - Integration testing

RESULT: Full stack app, 3x faster than sequential!
```

## Example: Complex Algorithm

```
COMPLEX PROBLEM: Sort 1,000,000 numbers

PHASE 1: Divide (Merge Sort style)
  Split into 2 arrays of 500,000 each

PHASE 2: Conquer (recursive)
  Sort left 500,000
  Sort right 500,000

PHASE 3: Combine
  Merge the two sorted arrays

RESULT: Sorted array, O(n log n) time!
```

## Related Skills

- **decomposition-planner** - Task decomposition
- **aggregation-processor** - Result aggregation
- **task-planner** - Planning
