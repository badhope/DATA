---
id: prompt-general-learning-support-explain-complex-topic-step-by-step-v1
name: Explain Complex Topic Step by Step
summary: 逐步解释复杂主题
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: learning-support
tags:
  - explanation
  - step-by-step
  - complex-topics
  - teaching
keywords:
  - 解释
  - 分步骤
  - 复杂主题
  - 教学
intent: |
  帮助用户逐步理解复杂主题，从基础到深入，强调每个步骤的理解而非信息过载。
  强调检查理解、适应节奏、保持耐心。
  核心原则：好的解释是让用户真正理解，而不是记住。
applicable_models:
  - "*"
input_requirements:
  - topic: string 主题
  - user_level: string 用户水平
output_requirements:
  - step_by_step_explanation: array 分步骤解释
  - understanding_checks: array 理解检查点
  - simplified_summaries: array 简化总结
tool_requirements: []
preconditions:
  - 用户需要理解一个复杂主题
anti_patterns:
  - 信息过载
  - 跳过基础
  - 不检查理解
failure_modes:
  - 步骤过多：精简聚焦关键步骤
  - 节奏不当：根据用户反馈调整
  - 术语过多：及时解释术语
self_check: |
  解释前自检：
  □ 是否从用户的基础水平开始？
  □ 是否在关键点检查了理解？
  □ 是否避免了术语轰炸？
related_skills:
  - skill-learning-support
related_workflows: []
related_prompts:
  - prompt-general-learning-support-adapt-teaching-style-to-learner-level
  - prompt-general-learning-support-identify-knowledge-gaps
---

# Context

复杂主题需要分步理解。本 prompt 的核心目标是：**帮助用户逐步理解复杂主题，确保每一步都真正理解后再继续**。

# Prompt Body

## 阶段 1：理解起点

### 1.1 评估基础

```markdown
## 基础评估

### 用户当前理解
```markdown
**关于这个话题，你知道/理解什么**:
- [列出用户已知的]

**相关的基础概念**:
- [是否已经掌握？]

**可能的混淆点**:
- [常见的误解]
```
```

### 确认理解
```markdown
**问题**: "你对这个话题的第一印象是什么？"
"之前有没有学过相关的？"
"有没有什么特别困惑的地方？"
```
```

## 阶段 2：步骤设计

### 2.1 分解主题

```markdown
## 主题分解

### 关键概念清单
```markdown
**必须理解的概念**（按顺序）:
1. [概念A] - 先修: [无/概念X]
2. [概念B] - 先修: [概念A]
3. [概念C] - 先修: [概念B]
...
```
```

### 2.2 步骤规划

```markdown
## 解释步骤

### 步骤1: [概念A名称]
```markdown
**目标**: [理解到什么程度]
**类比**: [用生活化的类比]
**简单定义**: [一句话定义]
**检查问题**: [1-2个检查理解的问题]
```
```

## 阶段 3：逐步解释

### 3.1 第一步

```markdown
## 第一步: [概念A]

### 解释
```markdown
**类比/例子**:
[用用户熟悉的东西来类比]

**定义**:
[简单清晰的定义]

**关键点**:
- [关键点1]
- [关键点2]
```
```

### 检查理解
```markdown
**检查问题**:
- "[问题1]"
- "[问题2]"

**如果理解**: 继续下一步
**如果困惑**: 换一种方式解释，提供更多例子
```
```

### 3.2 第二步

```markdown
## 第二步: [概念B]

### 连接上一步
```markdown
**上一步**: [概念A]
**这一步新加的**: [新概念B带来的新理解]
```
```

### 解释
```markdown
[类似第一步的结构]
```
```

## 阶段 4：理解检查

### 4.1 检查点

```markdown
## 理解检查点

### 检查问题类型
```markdown
**复述型**: "你能用自己的话解释什么是X吗？"
**例子型**: "能举个关于X的例子吗？"
**应用型**: "如果Y情况，会发生什么？"
**关联型**: "X和Z有什么关系？"
```
```

### 4.2 根据反馈调整

```markdown
## 调整策略

**如果用户明显理解**:
- 继续前进
- 可以稍微加快

**如果用户有些困惑**:
- 换一种类比
- 提供更多具体例子
- 回到上一步再解释

**如果用户完全不理解**:
- 检查前置概念是否真的理解
- 从更基础的地方开始
- 把步骤拆得更小
```
```

## 阶段 5：总结整合

### 5.1 步骤总结

```markdown
## 步骤总结

### 概念1: [名称]
- [一句话总结]

### 概念2: [名称]
- [一句话总结]

### ...
```
```

### 5.2 整体联系

```markdown
## 整体联系

**这些概念是怎么联系在一起的**:
```
[概念A] → [概念B] → [概念C]
     ↓          ↓          ↓
   [作用1]    [作用2]    [作用3]
```
```
```

## 阶段 6：输出模板

### 6.1 解释模板

```markdown
## 逐步解释: [主题]

### 起点理解
[用户的当前理解]

### 步骤1: [概念A]
**类比**: [类比]
**定义**: [定义]
**检查**: [问题]

### 步骤2: [概念B]
[类似结构]

### 整体理解
[用一两句话总结核心关系]
```
