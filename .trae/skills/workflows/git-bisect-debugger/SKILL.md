---
name: git-bisect-debugger
description: "Tier 1: Git Bisect - Binary search through commit history to find bug introduction. Keywords: git bisect, find commit, locate bug,二分查找commit,定位bug引入"
layer: workflow
role: git-specialist
tier: 1
version: 5.0.0
architecture: single-agent
invokes:
  - git-operations
  - test-generator
invoked_by:
  - debugging-workflow
  - delta-debugger
capabilities:
  - git_bisect
  - commit_binary_search
  - bug_introduction_locator
triggers:
  keywords:
    - git bisect
    - find commit
    - locate bug
    - when did this break
    - 二分查找commit
    - 定位bug引入
  conditions:
    - "git repository"
    - "known good commit exists"
    - "current commit is bad"
metrics:
  avg_execution_time: 8m
  commits_checked: log2(N)
  success_rate: 0.93
---

# Git Bisect Debugger - Tier 1

> **Tier 1 Skill**: Git Bisect - Binary search through commit history

## What is Git Bisect?

Git Bisect uses **binary search** to find the commit that introduced a bug.

```
COMMIT HISTORY:
  v1.0 (good) ────┐
                   │
  c1               │
  c2               │
  c3 (BAD!) ◄─────┘  ← We want to find this!
  c4
  c5
  HEAD (bad)

GIT BISECT:
  git bisect start
  git bisect bad HEAD
  git bisect good v1.0
  
  [Binary search: 3 steps]
  → Check midpoint
  → Decide good/bad
  → Narrow range
  
RESULT: Found commit c3 introduced the bug!
  (Only checked log2(6) ≈ 3 commits instead of 6!)
```

## Why Binary Search is Great

| Method | Commits Checked (for N=50) |
|--------|-----------------------------|
| **Linear (manual)** | 25 (on average) |
| **Binary Search (git bisect)** | **6** (log2(50)) |

→ **4x faster!**

## How to Use

### Step 1: Setup Bisect

```yaml
purpose: "Start git bisect"
state: setup
actions:
  - git bisect start
  - git bisect bad HEAD (current is bad)
  - git bisect good v1.2.3 (known good)
```

### Step 2: Binary Search Loop

```yaml
purpose: "Binary search through commits"
state: searching
repeat: until found
loop:
  - Git checks out midpoint
  - Run tests / verify
  - If fails: git bisect bad
  - If passes: git bisect good
```

### Step 3: Found It!

```yaml
purpose: "Identify buggy commit"
state: found
output:
  commit: "abc1234def"
  message: "Refactor authentication logic"
  author: "dev@company.com"
  date: "2026-03-15"
```

## Example

```
PROBLEM: Login is broken, but worked in v2.1.0

BEFORE: Manual (30min, checked 10 commits)
  - Slow
  - Gave up

AFTER: Git Bisect (8min)
  git bisect start
  git bisect bad HEAD
  git bisect good v2.1.0
  
  [Step 1] Check commit c25: BAD
  [Step 2] Check commit c12: GOOD
  [Step 3] Check commit c18: BAD
  [Step 4] Check commit c15: GOOD
  [Step 5] Check commit c16: BAD
  [Step 6] Check commit c15: GOOD
  
  git bisect found!
  → Commit c16: "Change password hashing algorithm"

RESULT: Found in 8min!
```

## Related Skills

- **git-operations** - Git operations
- **debugging-workflow** - Debugging workflow
