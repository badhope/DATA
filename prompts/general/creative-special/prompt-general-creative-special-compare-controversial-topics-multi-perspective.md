---
id: prompt-general-creative-special-compare-controversial-topics-multi-perspective-v1
name: Compare Controversial Topics Multi-Perspective
summary: 多视角对比争议话题
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: creative-special
tags:
  - controversial
  - multi-perspective
  - analysis
  - balanced
keywords:
  - 争议话题
  - 多视角
  - 平衡分析
  - 思辨
intent: |
  以多视角、平衡的方式分析和对比争议性话题。
  强调观点的客观呈现，避免单边倾向。
  核心原则：争议分析应该帮助理解而非说服，服务于批判性思考。
applicable_models:
  - "*"
input_requirements:
  - topic: string 话题
  - perspectives_needed: array 需要的视角
output_requirements:
  - topic_analysis: object 话题分析
  - perspectives_comparison: object 视角对比
  - balanced_summary: string 平衡总结
tool_requirements: []
preconditions:
  - 有争议性话题需要分析
anti_patterns:
  - 单边倾向
  - 事实扭曲
  - 情感操纵
failure_modes:
  - 偏见呈现：平衡的视角呈现
  - 事实混淆：区分事实和观点
  - 过度简化：复杂的多方观点
self_check: |
  分析前自检：
  □ 是否呈现了多个视角？
  □ 是否区分了事实和观点？
  □ 是否避免了情感操纵？
related_skills:
  - skill-creative-special
related_workflows: []
related_prompts:
  - prompt-general-creative-special-analyze-sensitive-topic-safely
  - prompt-general-creative-special-reframe-sensitive-user-request-into-safe-creative-task
---

# Context

争议性话题需要多视角分析。本 prompt 的核心目标是：**以平衡、客观的方式呈现争议性话题的不同视角，帮助用户形成自己的判断**。

# Prompt Body

## 阶段 1：话题界定

### 1.1 话题澄清

```markdown
## 话题界定

### 澄清问题
```markdown
**核心争议点**: [争议的核心是什么]
**相关概念**: [需要区分的概念]
**讨论边界**: [可以讨论的范围]
```

### 关键问题
```markdown
**核心问题**: [是什么问题]

**子问题**:
1. [子问题1]
2. [子问题2]
```
```

## 阶段 2：视角识别

### 2.1 主要视角

```markdown
## 主要视角

### 视角1: [名称]
```markdown
**立场**: [核心立场]
**主要论点**: [列表]
**论据来源**: [来源类型]
**合理内核**: [有价值的部分]
```

### 视角2: [名称]
```markdown
**立场**: [核心立场]
**主要论点**: [列表]
**论据来源**: [来源类型]
**合理内核**: [有价值的部分]
```

### 视角3+: [其他视角]
```markdown
[类似结构]
```
```

## 阶段 3：对比分析

### 3.1 对比维度

```markdown
## 对比分析

### 事实 vs 观点
```markdown
| 视角 | 核心事实主张 | 观点成分 |
|------|-------------|----------|
| 视角1 | [事实] | [观点] |
| 视角2 | [事实] | [观点] |
```

### 一致 vs 分歧
```markdown
**共识领域**: [各方同意的点]
**分歧核心**: [争议的核心]
**分歧类型**: [价值分歧/事实分歧/解释分歧]
```
```

## 阶段 4：平衡呈现

### 4.1 结构化呈现

```markdown
## 平衡呈现

### 视角矩阵
```markdown
| 维度 | 视角A | 视角B | 视角C |
|------|-------|-------|-------|
| 核心立场 | | | |
| 主要论据 | | | |
| 关注焦点 | | | |
| 潜在偏见 | | | |
```
```

### 4.2 透明报告

```markdown
## 分析报告

### 话题: [话题]

### 各方观点摘要
```markdown
**[视角A]**:
- 核心: [核心观点]
- 论据: [主要论据]
- 关注: [关注焦点]

**[视角B]**:
[类似结构]
```
```

## 阶段 5：批判性思考引导

### 5.1 思考问题

```markdown
## 批判性思考

### 事实核查
```markdown
**问题**:
- 这个主张有可验证的事实支持吗？
- 来源的可靠性如何？
- 是否存在被忽视的证据？
```

### 逻辑分析
```markdown
**问题**:
- 推理过程合理吗？
- 是否存在逻辑谬误？
- 因果关系是否有根据？
```

### 价值反思
```markdown
**问题**:
- 各方背后的价值观是什么？
- 不同价值观是否都合理？
- 你的价值观倾向于哪方？为什么？
```
```

## 阶段 6：安全边界

### 6.1 边界保持

```markdown
## 安全边界

### 保持中立
```markdown
**不做的**:
- 不说服用户接受特定观点
- 不暗示某些观点"正确"
- 不使用情感操纵
- 不夸大或扭曲任何观点

**应该做的**:
- 清晰标注观点来源
- 区分事实和观点
- 呈现多元视角
- 引导批判性思考
```
```

## 阶段 7：输出模板

### 7.1 分析模板

```markdown
## 争议话题分析

### 话题界定
```markdown
**核心争议**: [争议]
**关键问题**: [问题]
```

### 视角对比
```markdown
**[视角A]**: [摘要]
**[视角B]**: [摘要]
**[视角C]**: [摘要]
```

### 分歧分析
```markdown
**共识**: [列表]
**核心分歧**: [描述]
**分歧类型**: [类型]
```

### 批判性思考
```markdown
**事实问题**: [列表]
**逻辑问题**: [列表]
**价值问题**: [列表]
```

### 总结
```markdown
[平衡的总结，避免倾向性]
```
