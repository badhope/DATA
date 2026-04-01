---
name: delta-debugger
description: "Tier 2: Delta Debugger - Binary search to minimize failure-inducing input. Inspired by Zeller's Delta Debugging & Git Bisect. Keywords: delta debug, binary search debugging, minimize input, git bisect, Delta调试, 二分查找调试"
layer: workflow
role: debugger-specialist
tier: 2
version: 5.0.0
architecture: handoff-chain
invokes:
  - error-analyzer
  - git-operations
  - test-generator
invoked_by:
  - debugging-workflow
  - hierarchical-debugger
capabilities:
  - binary_search_minimization
  - failure_inducing_input_isolation
  - git_bisect_integration
  - delta_debugging_algorithm
triggers:
  keywords:
    - delta debug
    - binary search debugging
    - minimize input
    - git bisect
    - large failing input
    - Delta调试
    - 二分查找调试
    - 最小化输入
  conditions:
    - "large input causes failure"
    - "need to find minimal failing case"
    - "git history has bug introduction"
metrics:
  avg_execution_time: 15m
  success_rate: 0.88
  reduction_factor: 10-100x
---

# Delta Debugger - Tier 2

> **Tier 2 Skill**: Delta Debugging (inspired by Zeller 2002 & Git Bisect)

## What is Delta Debugging?

Delta Debugging uses **binary search** to systematically minimize a failure-inducing input.

```
LARGE FAILING INPUT (10,000 lines)
    │
    │ Binary Search: Split in half
    ▼
┌───────────────┬───────────────┐
│   Half A      │   Half B      │
│  (5,000 lines)│  (5,000 lines)│
└───────┬───────┴───────┬───────┘
        │               │
        ▼               ▼
    Test Half A     Test Half B
    Fails? ✓         Fails? ✗
        │
        │ Keep searching Half A
        ▼
  Split Half A again...
        │
        ▼
    ... repeat until ...
        │
        ▼
MINIMAL FAILING INPUT (50 lines) ← 200x smaller!
```

## Reduction Factor

| Input Size | After Delta Debugging | Reduction |
|------------|----------------------|-----------|
| 10,000 lines | 50 lines | **200x** |
| 1,000 config settings | 5 settings | **200x** |
| 50 commits (Git Bisect) | 1 commit | **50x** |

## Two Modes

### Mode 1: Input Minimization (Zeller Style)

```yaml
purpose: "Minimize failure-inducing input"
state: input_minimization
algorithm: delta_debugging
initial_input: "large_file.json"
test_function: "does_input_fail(input)"

phases:
  - name: "Split & Test"
    repeat: until minimal
    steps:
      - Split input into N chunks
      - Test each chunk
      - Identify which chunk(s) cause failure
      - Keep only failure-inducing chunks
      - Repeat with smaller chunks

  - name: "Verify Minimal"
    steps:
      - Verify minimal input still fails
      - Verify removing any element makes it pass
```

### Mode 2: Git Bisect (Commit History)

```yaml
purpose: "Find commit that introduced bug"
state: git_bisect
algorithm: binary_search_on_commits

phases:
  - name: "Setup Bisect"
    steps:
      - git bisect start
      - git bisect bad HEAD (current commit is bad)
      - git bisect good v1.0 (known good commit)
  
  - name: "Binary Search Commits"
    repeat: until found
    steps:
      - Git checks out midpoint commit
      - Run tests
      - If fails: git bisect bad
      - If passes: git bisect good
  
  - name: "Found It!"
    output: "Commit abc123 introduced the bug"
```

## Handoff Chain

```
Input Analyzer ━━(handoff)━━► Delta Debugger ━━(handoff)━━► Minimal Input Verifier
     │                        │                        │
  ├─ Size estimate        ├─ Binary search       ├─ Confirm minimal
  └─ Failure pattern      └─ Minimize input       └─ Still fails
```

## Example 1: Input Minimization

```
PROBLEM: 10,000-line JSON file causes crash

BEFORE: Manual debugging (45min, gave up)
  - Too big to understand
  - Couldn't find what's wrong

AFTER: Delta Debugging (12min)
  Phase 1: Split into 10 chunks of 1,000 lines
  Phase 2: Test chunks → Chunk 7 fails
  Phase 3: Split Chunk 7 → Sub-chunk 7.3 fails
  Phase 4: Continue...
  Phase 5: Found minimal input: 50 lines!
  Phase 6: Verify: removing any line makes it pass

RESULT: Minimal input found, 12min, 200x reduction
```

## Example 2: Git Bisect

```
PROBLEM: Bug introduced somewhere in last 50 commits

BEFORE: Manual checking (30min, checked 10 commits)
  - Slow
  - Gave up

AFTER: Git Bisect (8min, checked 6 commits)
  git bisect start
  git bisect bad HEAD
  git bisect good v2.1.0
  
  [binary search: 6 steps]
  
  git bisect found!
  → Commit abc1234: "Refactor authentication"

RESULT: Bug found in 8min!
```

## Related Skills

- **debugging-workflow** - Can use this for large inputs
- **git-operations** - Git operations
- **error-analyzer** - Error analysis
