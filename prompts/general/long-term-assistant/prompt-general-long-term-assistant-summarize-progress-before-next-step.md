---
id: prompt-general-long-term-assistant-summarize-progress-before-next-step-v1
name: Summarize Progress Before Next Step
summary: 在下一步前总结进展
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: long-term-assistant
tags:
  - progress
  - summary
  - handoff
  - alignment
keywords:
  - 进展总结
  - 交接
  - 下一步
  - 进度
intent: |
  指导 AI 在每个关键步骤前总结当前进展，确保方向正确。
  强调进展总结帮助对齐期望，避免走弯路。
  核心原则：停下来总结是为了走得更稳，不是浪费时间。
applicable_models:
  - "*"
input_requirements:
  - current_task: string 当前任务
  - completed_work: array 已完成工作
  - context: object 上下文
output_requirements:
  - progress_summary: object 进展总结
  - next_step_alignment: string 下一步对齐
  - alignment_confirmation: string 对齐确认
tool_requirements: []
preconditions:
  - 有工作需要交接或继续
anti_patterns:
  - 不总结直接继续
  - 总结过于冗长
  - 总结与下一步脱节
failure_modes:
  - 总结不清晰：清晰的总结框架
  - 方向不对齐：明确的下一步对齐
  - 跳过确认：必要的确认步骤
self_check: |
  继续前自检：
  □ 当前进展是否清晰？
  □ 下一步是否与目标对齐？
  □ 用户是否确认继续方向？
related_skills:
  - skill-long-term-assistant
  - skill-context-memory
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-long-term-assistant-maintain-project-continuity-over-time
  - prompt-general-long-term-assistant-preserve-user-goals-across-iterations
---

# Context

在继续下一步之前，总结当前进展能确保方向正确、期望对齐。本 prompt 的核心目标是：**指导 AI 在关键节点总结进展，确认下一步方向**。

# Prompt Body

## 阶段 1：进展总结

### 1.1 总结框架

```markdown
## 进展总结框架

### 已完成工作
```markdown
**本周/本阶段完成**:
1. [工作1] - 结果: [结果]
2. [工作2] - 结果: [结果]
```

### 当前状态
```markdown
**当前阶段**: [阶段]
**完成度**: [百分比]
**当前进行**: [工作]
```

### 关键成果
```markdown
**主要成果**:
1. [成果1]
2. [成果2]

**解决的问题**:
1. [问题] - 解决方案: [方案]
```
```

### 1.2 状态快照

```markdown
## 状态快照

### 代码/项目状态
```markdown
**最新版本**: [版本]
**主要变更**: [变更]
**技术决策**: [决策]
```

### 风险/问题状态
```markdown
**已解决**: [列表]
**进行中**: [列表]
**待处理**: [列表]
```
```

## 阶段 2：下一步定义

### 2.1 下一步内容

```markdown
## 下一步

### 计划工作
```markdown
**即将进行**: [工作]

**预期产出**:
1. [产出1]
2. [产出2]

**预计时间**: [时间]
```
```

### 关键检查点
```markdown
**检查点**:
1. [检查点1]
2. [检查点2]
```

### 风险预期
```markdown
**可能的风险**:
1. [风险] - 应对: [应对]

**不确定因素**:
1. [因素] - 处理: [处理]
```
```

## 阶段 3：对齐确认

### 3.1 对齐检查

```markdown
## 对齐检查

### 目标对齐
```markdown
**下一步是否服务目标**: [是/否]

**服务哪个目标**: [目标]

**对齐程度**: [高/中/低]
```

### 期望对齐
```markdown
**预期结果**: [描述]
**是否符合期望**: [是/否/不确定]

**需要调整**: [调整内容]
```
```

### 3.2 确认请求

```markdown
## 确认请求

```markdown
**当前进展**: [总结]

**计划下一步**: [下一步]

**请确认**:
1. 进展是否符合预期？
2. 下一步方向是否正确？
3. 需要调整吗？
```
```

## 阶段 4：输出模板

### 4.1 完整模板

```markdown
## 进展总结与下一步

### 当前状态
```markdown
**已完成**: [列表]
**进行中**: [列表]
**完成度**: [百分比]
```

### 下一步
```markdown
**计划**: [计划]
**预期产出**: [列表]
**预计时间**: [时间]
```

### 需要确认
```markdown
**请确认**:
1. [确认项1]
2. [确认项2]
```
