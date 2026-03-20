---
id: prompt-general-long-term-assistant-support-multi-session-task-continuity-v1
name: Support Multi-session Task Continuity
summary: 支持多会话任务连续性
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: long-term-assistant
tags:
  - continuity
  - multi-session
  - handoff
  - support
keywords:
  - 多会话连续性
  - 跨会话
  - 任务连续性
  - 会话支持
intent: |
  指导 AI 支持跨越多个独立会话的任务连续性。
  强调每个会话开始时需要快速恢复上下文，结束时需要留下清晰交接。
  核心原则：多会话任务需要每个会话都能无缝衔接。
applicable_models:
  - "*"
input_requirements:
  - current_session: object 当前会话
  - task_context: object 任务上下文
  - previous_session_summary: object 上次会话摘要
output_requirements:
  - context_restoration: object 上下文恢复
  - session_work_plan: object 会话工作计划
  - session_summary: object 会话摘要
tool_requirements:
  - Read tool (读取任务上下文)
preconditions:
  - 有跨会话的任务
anti_patterns:
  - 会话孤立
  - 上下文丢失
  - 交接不清
failure_modes:
  - 上下文恢复失败：系统化的恢复机制
  - 会话工作无组织：无结构的会话计划
  - 会话交接不清：清晰的交接模板
self_check: |
  会话开始前自检：
  □ 上次会话的进展是什么？
  □ 需要恢复哪些上下文？
  □ 本次会话的目标是什么？
related_skills:
  - skill-long-term-assistant
  - skill-context-memory
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-long-term-assistant-maintain-project-continuity-over-time
  - prompt-general-long-term-assistant-summarize-progress-before-next-step
---

# Context

多会话任务中，每个会话都是链条上的一环。本 prompt 的核心目标是：**指导 AI 在会话开始时恢复上下文，在会话结束时留下清晰交接**。

# Prompt Body

## 阶段 1：会话开始

### 1.1 上下文恢复

```markdown
## 会话开始 - 上下文恢复

### 需要恢复的信息
```markdown
**任务信息**:
- 任务名称: [名称]
- 任务目标: [目标]
- 当前阶段: [阶段]

**上下文信息**:
- 关键约束: [约束]
- 技术栈: [栈]
- 相关文档: [文档]

**用户偏好**:
- 沟通风格: [风格]
- 详细程度: [程度]
- 特殊要求: [要求]
```
```

### 恢复检查清单
```markdown
**恢复检查**:
| # | 信息 | 状态 | 来源 |
|---|------|------|------|
| 1 | 任务目标 | [✅/❌] | [来源] |
| 2 | 当前进展 | [✅/❌] | [来源] |
| 3 | 待处理事项 | [✅/❌] | [来源] |
| 4 | 用户偏好 | [✅/❌] | [来源] |
```

### 恢复确认
```markdown
## 上下文恢复确认

```markdown
**已恢复**:
- [项1]
- [项2]

**未恢复**（需要询问）:
- [项1]
```
```

## 阶段 2：会话启动

### 2.1 会话计划

```markdown
## 会话计划

### 会话目标
```markdown
**本次会话目标**: [目标]

**预期产出**:
1. [产出1]
2. [产出2]
```

### 会话议程
```markdown
**议程**:
1. [议程1] - 时间: [时间]
2. [议程2] - 时间: [时间]
```

### 风险预估
```markdown
**可能的风险**:
1. [风险] - 应对: [应对]
```

### 会话约束
```markdown
**时间约束**: [约束]
**质量要求**: [要求]
**特殊要求**: [要求]
```
```

### 2.2 开场确认

```markdown
## 会话开场确认

```markdown
**上次进展**: [摘要]

**本次目标**: [目标]

**确认**: [确认问题]
```
```

## 阶段 3：会话进行

### 3.1 进展追踪

```markdown
## 进展追踪

### 实时检查
```markdown
**检查点**: [时间点]

**检查内容**:
- 目标完成度: [百分比]
- 是否在正确方向: [是/否]
- 需要调整吗: [是/否]

**调整**（如需要）:
- [调整1]
- [调整2]
```
```

### 问题处理
```markdown
## 问题处理

**遇到的问题**: [问题]

**处理方式**:
1. [方式]

**结果**: [结果]

**是否需要告知用户**: [是/否]
```
```

## 阶段 4：会话结束

### 4.1 会话摘要

```markdown
## 会话摘要

### 完成的工作
```markdown
**完成**:
1. [工作1] - 结果: [结果]
2. [工作2] - 结果: [结果]
```

### 进展状态
```markdown
**任务完成度**: [百分比]
**当前阶段**: [阶段]
```

### 遗留事项
```markdown
**待处理**:
1. [事项] - 状态: [状态]

**待决策**:
1. [决策] - 等待: [等待]

**待确认**:
1. [确认] - 等待: [等待]
```
```

### 4.2 交接文档

```markdown
## 会话交接

### 快速状态
```markdown
**任务**: [名称]
**阶段**: [阶段]
**进度**: [百分比]
```

### 关键信息
```markdown
**刚刚完成**:
- [项]

**下一步**:
- [项]

**需要注意**:
- [项]
```

### 交接问题
```markdown
**下个会话开始时请确认**:
1. [确认项]
```
```

## 阶段 5：输出模板

### 5.1 开始模板

```markdown
## 会话开始

### 上下文恢复
```markdown
**任务**: [任务]
**阶段**: [阶段]
**进度**: [百分比]

**已完成**: [列表]
**待处理**: [列表]
```

### 本次目标
```markdown
**目标**: [目标]

**请确认**: [确认问题]
```
