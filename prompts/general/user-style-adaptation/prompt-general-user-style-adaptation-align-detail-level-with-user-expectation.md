---
id: prompt-general-user-style-adaptation-align-detail-level-with-user-expectation-v1
name: Align Detail Level with User Expectation
summary: 对齐用户的期望细节程度
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: user-style-adaptation
tags:
  - detail
  - level
  - depth
  - expectation
keywords:
  - 细节程度
  - 详细度
  - 深度适配
  - 期望对齐
intent: |
  指导 AI 根据用户期望的细节程度调整响应的深度和详细度。
  强调不同场景需要不同详细度，要避免过度解释或解释不足。
  核心原则：细节程度服务于任务需求，不是越多越好。
applicable_models:
  - "*"
input_requirements:
  - user_request: string 用户请求
  - context: object 上下文
  - available_context: array 可用上下文
output_requirements:
  - expected_detail_level: string 期望的细节程度
  - detail_justification: string 细节程度选择理由
  - adapted_response: string 适配后的响应
tool_requirements: []
preconditions:
  - 有内容需要确定详细程度
anti_patterns:
  - 过度详细
  - 解释不足
  - 细节不一致
failure_modes:
  - 误判需求：准确识别用户需要的详细程度
  - 过度解释：简洁响应被稀释
  - 细节不足：复杂问题被过度简化
self_check: |
  调整前自检：
  □ 用户期望的是概要还是详细解释？
  □ 当前任务的复杂度需要什么详细程度？
  □ 是否有足够的上下文判断详细程度？
related_skills:
  - skill-user-style-adaptation
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-user-style-adaptation-detect-user-style-and-adapt-tone
  - prompt-general-user-style-adaptation-adapt-response-structure-to-user-preference
---

# Context

用户在不同场景下需要不同的详细程度。有些人只需要高层概要，有些人需要完整细节。本 prompt 的核心目标是：**指导 AI 根据用户请求的隐含或显式需求，提供恰到好处的详细程度**。

# Prompt Body

## 阶段 1：需求分析

### 1.1 详细程度类型

```markdown
## 详细程度类型

### 概要级 (Summary)
```markdown
**描述**: 只提供核心要点
**适用**:
- 快速了解
- 高层决策
- 熟悉领域

**响应规模**: 1-3句话
**特点**: 简洁、一目了然
```

### 标准级 (Standard)
```markdown
**描述**: 提供必要信息
**适用**:
- 日常任务
- 常规问题
- 学习理解

**响应规模**: 段落或简短列表
**特点**: 完整但不冗余
```

### 详细级 (Detailed)
```markdown
**描述**: 提供完整解释
**适用**:
- 复杂问题
- 学习场景
- 不熟悉的领域

**响应规模**: 多段落+示例
**特点**: 全面、解释清晰
```

### 深度级 (Comprehensive)
```markdown
**描述**: 穷尽式覆盖
**适用**:
- 教学场景
- 文档编写
- 高风险决策

**响应规模**: 长文档+代码+图表
**特点**: 极其详细、无遗漏
```
```

### 1.2 需求判断

```markdown
## 需求判断

### 显式信号
```markdown
**明确要求详细程度**:
- "简要说明" → 概要级
- "解释一下" → 标准级
- "详细解释" → 详细级
- "完整文档" → 深度级

**隐式信号**:
- 问题复杂度 → 复杂度高需要更详细
- 用户专业度 → 非专业需要更详细
- 使用场景 → 决策需要更详细
```

### 判断因素
| # | 因素 | 指向更详细 | 指向更概要 |
|---|------|------------|------------|
| 1 | 问题复杂度 | 高 | 低 |
| 2 | 用户专业度 | 低 | 高 |
| 3 | 使用场景 | 决策/学习 | 快速参考 |
| 4 | 时间紧迫性 | 低 | 高 |
| 5 | 风险程度 | 高 | 低 |
```

## 阶段 2：详细程度决策

### 2.1 决策框架

```markdown
## 详细程度决策

### 决策树
```markdown
问题复杂度?
  ├─ 高 → 需要详细解释?
  │     ├─ 是 → 详细级
  │     └─ 否 → 标准级
  └─ 低 → 用户专业度?
          ├─ 低 → 标准级
          └─ 高 → 概要级
```
```

### 2.2 决策结果

```markdown
## 决策结果

**选定详细程度**: [级别]

**决策依据**:
1. [依据1]
2. [依据2]

**预期响应长度**: [长度]
**关键内容**: [核心要点数]
```
```

## 阶段 3：内容适配

### 3.1 各层级内容模板

```markdown
## 各层级内容模板

### 概要级模板
```markdown
**核心要点**:
- [要点1]
- [要点2]
- [要点3]

**一句话总结**: [总结]
```
```

### 标准级模板
```markdown
**概述**: [简要说明]

**要点**:
1. [要点1] - [简要解释]
2. [要点2] - [简要解释]
3. [要点3] - [简要解释]

**简要结论**: [结论]
```
```

### 详细级模板
```markdown
**背景**: [背景说明]

**核心内容**:
1. [主题1]
   - [详细解释]
   - [示例]

2. [主题2]
   - [详细解释]
   - [示例]

3. [主题3]
   - [详细解释]
   - [示例]

**总结**: [完整总结]
```
```

### 3.2 层级转换

```markdown
## 层级转换

### 从概要扩展到详细
```markdown
**概要版本**:
[概要内容]

**可按需扩展**:
- 需要更多细节请告诉我
- 我可以提供更详细的解释
```

### 从详细压缩到概要
```markdown
**详细版本**:
[详细内容]

**简明版本**:
[概要内容]
```
```

## 阶段 4：输出模板

### 4.1 完整模板

```markdown
## 详细程度适配

### 需求分析
```markdown
**问题复杂度**: [高/中/低]
**用户专业度**: [高/中/低]
**使用场景**: [场景]
```

### 决策
```markdown
**选定级别**: [级别]

**决策依据**:
1. [依据]
```

### 适配输出
```markdown
[按选定级别组织的响应]
```
