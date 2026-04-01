---
name: hierarchical-debugger
description: "Tier 2: Multi-Granularity Hierarchical Debugger (MGDebugger style). Decompose code into subfunction tree, debug bottom-up. Keywords: hierarchical debug, mgdebugger, subfunction debug, 分层调试, 多粒度调试"
layer: workflow
role: debugger-coordinator
tier: 2
version: 5.0.0
architecture: handoff-chain
invokes:
  - error-analyzer
  - code-generator
  - test-generator
  - decomposition-planner
invoked_by:
  - debugging-workflow
  - lead-agent
capabilities:
  - hierarchical_code_decomposition
  - multi_granularity_debugging
  - bottom_up_error_resolution
  - subfunction_isolation
triggers:
  keywords:
    - hierarchical debug
    - mgdebugger
    - subfunction debug
    - complex bug
    - multi-level error
    - 分层调试
    - 多粒度调试
    - 复杂bug
  conditions:
    - "bug spans multiple functions"
    - "code has nested subfunctions"
    - "holistic debugging fails"
metrics:
  avg_execution_time: 25m
  success_rate: 0.92
  granularity_levels: 3
---

# Hierarchical Debugger - Tier 2

> **Tier 2 Skill**: Multi-Granularity Hierarchical Debugger (inspired by MGDebugger 2024 paper)

## What is Hierarchical Debugging?

Holistic debugging treats code as monolithic. **Hierarchical Debugging** decomposes code into a tree of subfunctions, then debugs from bottom-up.

```
┌─────────────────────────────────────────────────────────────┐
│                 MONOLITHIC CODE (Buggy)                      │
│                    calculate_total()                            │
│                      │                                         │
│                      ▼                                         │
├─────────────────────────────────────────────────────────────┤
│           HIERARCHICAL TREE DECOMPOSITION                    │
│                                                                 │
│       ┌───────────────────────────────────────┐               │
│       │         calculate_total()             │ Level 3       │
│       │                                       │               │
│       ├──────────────────┬──────────────────┤               │
│       │                  │                  │               │
│       ▼                  ▼                  ▼               │
│  validate_input()  process_data()  format_output() Level 2 │
│       │                  │                  │               │
│       └──────┬───────────┴──────────┬───────┘               │
│              ▼                       ▼                        │
│      is_valid()               round_num()      Level 1       │
└─────────────────────────────────────────────────────────────┘
                      │
                      ▼
              DEBUG BOTTOM-UP:
              Level 1 → Level 2 → Level 3
```

## Why This Works

| Approach | Success Rate |
|----------|-------------|
| **Holistic Debugging** | 65% |
| **Hierarchical Debugging** | **92%** | (MGDebugger 2024) |

## Architecture: Handoff Chain

```
Code Decomposer ━━(handoff)━━► Level 1 Debugger ━━(handoff)━━► Level 2 Debugger ━━(handoff)━━► Level 3 Debugger ━━(handoff)━━► Integration Verifier
     │                        │                       │                       │                        │
  ├─ AST Tree              ├─ Test subfunctions   ├─ Test mid-level     ├─ Test top-level     ├─ Verify all
  └─ Granularity map       └─ Fix Level 1 bugs    └─ Fix Level 2 bugs    └─ Fix Level 3 bugs    └─ working
```

## Phase 1: Hierarchical Decomposition

```yaml
purpose: "Decompose code into subfunction tree"
state: decomposing
actions:
  - skill: decomposition-planner
    task: "Build AST tree of all functions"
    output: FunctionTree
    
  - skill: error-analyzer
    task: "Identify buggy regions"
    output: BuggyRegions
    
  - skill: decomposition-planner
    task: "Map granularity levels (Level 1 = leaf, Level 3 = root)"
    output: GranularityMap
```

## Phase 2: Bottom-Up Debugging - Level 1 (Leaf Functions)

```yaml
purpose: "Debug leaf functions first"
state: debugging_level_1
target_level: 1
quality_gate:
  checks:
    - "All leaf functions pass unit tests"
    - "No errors in lowest granularity"
  on_failure: "fix_and_retry"

handoff_to: "Level 2 Debugger"
handoff_payload:
  level_1_results: [...]
  fixed_leaf_functions: [...]
```

## Phase 3: Bottom-Up Debugging - Level 2 (Mid-Level)

```yaml
purpose: "Debug mid-level functions"
state: debugging_level_2
target_level: 2
depends_on: "Level 1 success"

handoff_to: "Level 3 Debugger"
handoff_payload:
  level_2_results: [...]
  fixed_mid_functions: [...]
```

## Phase 4: Bottom-Up Debugging - Level 3 (Top-Level)

```yaml
purpose: "Debug top-level function"
state: debugging_level_3
target_level: 3
depends_on: "Level 2 success"

handoff_to: "Integration Verifier"
```

## Phase 5: Integration Verification

```yaml
purpose: "Verify everything works together"
state: verifying
quality_gate:
  checks:
    - "All integration tests pass"
    - "No regression in fixed functions"
    - "Original bug is resolved"
```

## Example Usage

### Problem: Complex calculate_total() function has bug

```
BEFORE: Holistic Debugging (failed after 30min)
  - Tried to fix everything at once
  - Got confused by nested logic
  - Failed

AFTER: Hierarchical Debugging (succeeded in 20min)
  Phase 1: Decomposed into 7 subfunctions (3 levels)
  
  Phase 2 (Level 1):
    • Debug is_valid() → Found bug in regex ✓
    • Debug round_num() → Found off-by-one error ✓
  
  Phase 3 (Level 2):
    • Debug validate_input() → Uses fixed is_valid() ✓
    • Debug process_data() → Uses fixed round_num() ✓
    • Debug format_output() → No issues ✓
  
  Phase 4 (Level 3):
    • Debug calculate_total() → Now works with fixed children ✓
  
  Phase 5: Integration verified ✓
  
RESULT: Bug fixed, 20min, 92% success rate
```

## Related Skills

- **debugging-workflow** - Can invoke this for complex bugs
- **error-analyzer** - Error analysis
- **decomposition-planner** - Task decomposition
