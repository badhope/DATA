---
id: prompt-general-long-term-assistant-preserve-user-goals-across-iterations-v1
name: Preserve User Goals Across Iterations
summary: 在迭代中保留用户目标
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: long-term-assistant
tags:
  - goals
  - preservation
  - iteration
  - continuity
keywords:
  - 目标保留
  - 迭代
  - 连续性
  - 目标追踪
intent: |
  指导 AI 在迭代过程中保持对用户目标的追踪和保留。
  强调目标可能在长过程中被遗忘，需要主动维护。
  核心原则：目标是指南针，迭代是过程，目标不能丢。
applicable_models:
  - "*"
input_requirements:
  - current_task: string 当前任务
  - user_goals: array 用户目标
  - iteration_context: object 迭代上下文
output_requirements:
  - goal_alignment_check: object 目标对齐检查
  - goal_preservation_actions: array 目标保留行动
  - goal_reminder: string 目标提醒
tool_requirements:
  - Read tool (读取历史上下文)
preconditions:
  - 有进行中的迭代任务
anti_patterns:
  - 目标丢失
  - 迭代偏离
  - 忘记原始目标
failure_modes:
  - 目标模糊：清晰的目标追踪
  - 目标偏移：及时的方向检查
  - 目标遗忘：主动的目标提醒
self_check: |
  迭代前自检：
  □ 当前任务与目标是否一致？
  □ 目标是否需要重新确认？
  □ 是否需要提醒用户目标？
related_skills:
  - skill-long-term-assistant
  - skill-context-memory
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-long-term-assistant-act-as-consistent-long-term-collaborator
  - prompt-general-long-term-assistant-remind-and-realign-when-goals-drift
---

# Context

在长迭代过程中，目标容易被遗忘或偏离。本 prompt 的核心目标是：**指导 AI 在迭代中主动追踪和保留用户目标，确保方向正确**。

# Prompt Body

## 阶段 1：目标建立

### 1.1 目标结构

```markdown
## 目标结构

### 目标层级
```markdown
**终极目标**: [用户最终想要达到的状态]

**中间目标**:
1. [目标1]
2. [目标2]
3. [目标3]

**当前任务目标**: [当前任务对应的目标]
```
```

### 目标特征
```markdown
**目标要素**:
- 具体内容: [内容]
- 成功标准: [标准]
- 时间约束: [约束]
- 质量要求: [要求]
```
```

## 阶段 2：目标追踪

### 2.1 追踪机制

```markdown
## 目标追踪

### 每次迭代检查
```markdown
**目标对齐检查**:
- 当前任务是否服务终极目标？
- 当前任务是否服务中间目标？
- 是否有偏离目标的迹象？

**追踪记录**:
- 目标状态: [状态]
- 完成进度: [进度]
- 偏离情况: [情况]
```
```

### 2.2 状态追踪

```markdown
## 状态追踪

### 目标完成状态
| # | 目标 | 状态 | 完成度 | 说明 |
|---|------|------|--------|------|
| 1 | [目标] | [进行中/完成/暂停] | [百分比] | [说明] |
```

### 迭代对齐状态
```markdown
**当前迭代**: [迭代]
**服务目标**: [目标]
**对齐程度**: [程度]
```
```

## 阶段 3：目标对齐

### 3.1 对齐检查

```markdown
## 对齐检查

### 检查问题
```markdown
**问题1**: 当前任务是否仍然服务用户目标？
**问题2**: 目标是否有变化？
**问题3**: 是否有更好的方式服务目标？
```

### 对齐评估
```markdown
**对齐评估**: [一致/轻微偏离/偏离]

**偏离内容**（如有）:
- [偏离1]
- [偏离2]
```
```

### 3.2 对齐行动

```markdown
## 对齐行动

### 一致情况
```markdown
**状态**: 目标一致

**行动**: 继续推进

**下一步**: [下一步]
```

### 偏离情况
```markdown
**状态**: 目标偏离

**提醒用户**:
[提醒内容]

**确认行动**:
- 继续当前方向
- 调整当前任务
- 更新目标
```
```

## 阶段 4：目标提醒

### 4.1 主动提醒

```markdown
## 主动提醒

### 提醒场景
```markdown
**提醒时机**:
- 开始新迭代时
- 任务方向明显改变时
- 用户似乎忘记目标时
- 目标完成时

**提醒内容**:
"我们的目标是[目标]，当前任务是[任务]，这与服务目标[一致/部分一致/不一致]"
```
```

### 4.2 提醒模板

```markdown
## 目标提醒模板

```markdown
**提醒**: 目标对齐

[提醒内容]

**您的目标**: [目标]

**当前任务**: [任务]

**对齐状态**: [状态]

**需要我调整吗**?
```
```

## 阶段 5：输出模板

### 5.1 追踪模板

```markdown
## 目标追踪

### 目标状态
```markdown
**终极目标**: [目标]
**完成度**: [百分比]

**中间目标**:
1. [目标1] - [状态] - [完成度]
2. [目标2] - [状态] - [完成度]
```

### 对齐检查
```markdown
**当前任务**: [任务]
**对齐状态**: [状态]

**下一步**: [建议]
```
