---
id: prompt-general-clarification-confirm-goal-before-execution-v1
name: Confirm Goal Before Execution
summary: 在执行前确认目标
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: clarification
tags:
  - clarification
  - goal
  - confirmation
  - execution
keywords:
  - 目标确认
  - 执行前确认
  - 目标对齐
  - 确认
intent: |
  指导 AI 在执行任务前与用户确认目标，确保理解和目标一致。
  强调执行前的目标确认可以避免大量返工。
  核心原则：目标确认应该简洁明确，不要让确认流于形式。
applicable_models:
  - "*"
input_requirements:
  - task: string 任务
  - understood_goal: string 理解的目标
  - proposed_solution: string 提议的解决方案
output_requirements:
  - goal_summary: string 目标总结
  - solution_summary: string 解决方案总结
  - confirmation_questions: array 确认问题
  - proceed_condition: string 继续执行的条件
tool_requirements:
  - Read tool (读取上下文)
preconditions:
  - 有任务需要执行
anti_patterns:
  - 跳过确认直接执行
  - 确认过于冗长
  - 不给用户反馈机会
failure_modes:
  - 确认不充分：明确的确认要素
  - 确认流于形式：确保真正理解一致
  - 确认后仍误解：验证式确认
self_check: |
  确认前自检：
  □ 是否总结了用户的目标？
  □ 是否说明了解决方案？
  □ 是否提供了确认问题？
  □ 是否说明了继续执行的条件？
related_skills:
  - skill-clarification
  - skill-context-memory
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-clarification-convert-vague-idea-into-clear-task-definition
  - prompt-general-clarification-clarify-ambiguous-user-request
---

# Context

执行前确认目标是避免返工的关键步骤。本 prompt 的核心目标是：**指导 AI 在执行前简洁明确地与用户确认目标和解决方案，确保理解一致**。

# Prompt Body

## 阶段 1：目标总结

### 1.1 目标提取

```markdown
## 目标总结

### 用户目标
```markdown
**您想要的**: [目标]

**为什么**: [原因/动机]

**期望的价值**: [价值]
```

### 目标特征
```markdown
**目标类型**: [功能/性能/改进/新功能]

**关键要求**:
1. [要求1]
2. [要求2]

**优先级**:
1. [优先级1]
2. [优先级2]
```
```

## 阶段 2：解决方案总结

### 2.1 解决方案概述

```markdown
## 解决方案概述

### 我的理解
```markdown
**我将做**: [简明描述]

**方案要点**:
1. [要点1]
2. [要点2]
```

### 方案详情
```markdown
**技术方案**: [技术方案]

**实现步骤**:
1. [步骤1]
2. [步骤2]

**交付物**: [交付物]
```
```

## 阶段 3：确认问题

### 3.1 关键确认点

```markdown
## 确认点

### 必须确认
```markdown
**目标确认**:
"我的理解是您想要[目标]，对吗？"

**方案确认**:
"我将采用[方案]，这符合您的预期吗？"

**范围确认**:
"这个方案会包含[范围]，不包括[排除范围]，对吗？"
```

### 3.2 确认问题清单

```markdown
## 确认问题

| # | 问题 | 确认内容 | 类型 |
|---|------|----------|------|
| 1 | [问题] | [内容] | [目标/方案/范围] |
```

## 阶段 4：执行条件

### 4.1 继续条件

```markdown
## 继续执行条件

### 如果确认
```markdown
**继续**: 收到确认后立即开始执行

**执行顺序**:
1. [步骤1]
2. [步骤2]
```

### 如果有调整
```markdown
**调整**: 收到调整意见后重新确认

**可能调整的方向**:
1. [方向1]
2. [方向2]
```
```

### 4.2 确认流程

```markdown
## 确认流程

```markdown
1. 确认目标 → [✅/调整]
2. 确认方案 → [✅/调整]
3. 确认范围 → [✅/调整]
4. 开始执行 → 等待所有确认
```
```

## 阶段 5：确认输出

### 5.1 简洁确认模板

```markdown
## 执行前确认

### 目标
**您想要的**: [目标]

### 方案
**我将做**: [简明方案]

### 确认
**请确认**:
1. 目标正确？ → [✅/调整]
2. 方案符合预期？ → [✅/调整]
3. 范围正确？ → [✅/调整]

**确认后我将立即开始执行**
```
```

### 5.2 完整确认模板

```markdown
## 执行前确认

### 目标确认
```markdown
**您的目标**: [目标]

**确认问题**: 这个目标正确吗？
```
```

### 方案确认
```markdown
**我的方案**: [方案]

**关键设计**:
1. [设计1]
2. [设计2]

**确认问题**: 这个方案符合您的预期吗？
```
```

### 范围确认
```markdown
**包含**:
- [项1]
- [项2]

**不包含**:
- [项1]
- [项2]

**确认问题**: 范围正确吗？
```
```

### 执行
```markdown
**收到您的确认后**: 我将立即开始执行

**预计完成时间**: [时间]
**我会提供**: [交付物]
```
```

## 阶段 6：输出模板

### 6.1 确认清单模板

```markdown
## 执行前确认清单

### ✅ 目标
[目标]

### ✅ 方案
[方案]

### ✅ 范围
- 包含: [列表]
- 不包含: [列表]

### ❓ 需要确认
[确认问题]

### ▶️ 继续执行
**请回复"确认"或告诉我需要调整的地方**
```
