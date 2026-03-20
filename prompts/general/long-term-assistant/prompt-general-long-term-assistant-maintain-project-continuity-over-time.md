---
id: prompt-general-long-term-assistant-maintain-project-continuity-over-time-v1
name: Maintain Project Continuity Over Time
summary: 随时间保持项目连续性
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: long-term-assistant
tags:
  - continuity
  - project
  - time
  - preservation
keywords:
  - 项目连续性
  - 时间跨度
  - 上下文维护
  - 持续性
intent: |
  指导 AI 在跨越长时间的项目中保持上下文和进展的连续性。
  强调项目可能在多次会话中展开，连续性是成功的关键。
  核心原则：项目上下文是资产，需要被主动维护和传承。
applicable_models:
  - "*"
input_requirements:
  - current_session: object 当前会话
  - project_context: object 项目上下文
  - session_history: array 会话历史
output_requirements:
  - context_preservation: object 上下文保留
  - continuity_check: string 连续性检查
  - handover_summary: string 交接摘要
tool_requirements:
  - Read tool (读取项目历史)
preconditions:
  - 有跨会话的项目
anti_patterns:
  - 上下文丢失
  - 每次重新开始
  - 项目状态不清
failure_modes:
  - 上下文丢失：系统化的上下文保存
  - 状态不清：清晰的状态追踪
  - 交接失败：完整的交接文档
self_check: |
  会话前自检：
  □ 上次会话的状态是什么？
  □ 项目当前状态是什么？
  □ 需要传承什么上下文？
related_skills:
  - skill-long-term-assistant
  - skill-context-memory
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-long-term-assistant-act-as-consistent-long-term-collaborator
  - prompt-general-long-term-assistant-summarize-progress-before-next-step
---

# Context

项目可能跨越多天、多周甚至更长时间。本 prompt 的核心目标是：**指导 AI 维护项目上下文，确保每次会话都能从上次结束的地方继续**。

# Prompt Body

## 阶段 1：上下文建立

### 1.1 上下文要素

```markdown
## 项目上下文要素

### 基础信息
```markdown
**项目名称**: [名称]
**项目描述**: [描述]
**开始时间**: [时间]
**当前阶段**: [阶段]
```

### 关键要素
```markdown
**项目目标**: [目标]
**关键约束**: [约束]
**技术栈**: [栈]
**相关文档**: [文档]
```

### 进展追踪
```markdown
**已完成**:
1. [项]

**进行中**:
1. [项]

**待开始**:
1. [项]
```
```

## 阶段 2：连续性机制

### 2.1 会话交接

```markdown
## 会话交接

### 交接内容
```markdown
**项目状态**:
- 总体进度: [百分比]
- 当前阶段: [阶段]
- 关键里程碑: [里程碑]

**待处理**:
1. [事项]

**需要决策**:
1. [决策]

**风险/问题**:
1. [风险]
```

### 交接格式
```markdown
## 项目交接摘要

### 快速了解
```markdown
**项目**: [名称]
**阶段**: [阶段]
**进度**: [百分比]
```

### 关键待办
```markdown
1. [待办1]
2. [待办2]
```

### 需要注意
```markdown
- [注意1]
- [注意2]
```
```

## 阶段 3：状态维护

### 3.1 状态追踪

```markdown
## 状态追踪

### 当前状态
```markdown
**阶段**: [阶段]
**里程碑**: [里程碑]
**关键决策**: [决策]
**技术债务**: [债务]
```

### 历史状态
```markdown
**会话记录**:
| # | 日期 | 主要工作 | 决策 | 结果 |
|---|------|----------|------|------|
| 1 | [日] | [工作] | [决策] | [结果] |
```

### 状态变化
```markdown
**上次会话以来**:
- [变化1]
- [变化2]

**对项目的影响**:
- [影响1]
- [影响2]
```
```

## 阶段 4：连续性检查

### 4.1 检查清单

```markdown
## 连续性检查

### 检查项
| # | 检查项 | 状态 | 说明 |
|---|--------|------|------|
| 1 | 项目上下文可用 | [✅/❌] | [说明] |
| 2 | 进展状态清晰 | [✅/❌] | [说明] |
| 3 | 待办事项明确 | [✅/❌] | [说明] |
| 4 | 关键决策记录 | [✅/❌] | [说明] |
```

### 连续性评估
```markdown
**评估**: [良好/需要补充/需要重建]

**需要补充的内容**:
1. [内容]
2. [内容]
```
```

## 阶段 5：输出模板

### 5.1 交接模板

```markdown
## 项目交接摘要

### 项目概览
```markdown
**项目**: [名称]
**阶段**: [阶段]
**进度**: [百分比]
```

### 状态详情
```markdown
**已完成**: [列表]
**进行中**: [列表]
**待处理**: [列表]
```

### 关键信息
```markdown
**需要关注的**: [列表]
**风险**: [列表]
**决策待确认**: [列表]
```

### 会话建议
```markdown
**建议从**: [位置] 继续

**原因是**: [原因]
```
