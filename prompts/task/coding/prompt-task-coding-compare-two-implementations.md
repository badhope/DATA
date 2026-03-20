---
id: prompt-coding-compare-two-implementations
name: Compare Two Implementation Options
summary: 比较两种实现方案的优劣
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: coding
sub_category: compare
tags:
  - comparison
  - trade-off
  - decision
  - architecture
keywords:
  - compare
  - implementation
  - options
  - trade-off
  - decision
intent: |
  对比两种实现方案的优劣，辅助技术决策。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - implementation_a: string (required) 方案 A
  - implementation_b: string (required) 方案 B
  - context: string (optional) 上下文信息
  - criteria: string (optional) 评估标准
output_requirements:
  - comparison_table: string 对比表格
  - trade_offs: string[] 权衡分析
  - recommendation: string 推荐方案
  - rationale: string 推荐理由
tool_requirements:
  - Read 读取相关代码
preconditions: |
  - 两种方案应当功能等价或目的相同
  - 了解使用场景会有帮助
anti_patterns: |
  - 不要做主观偏好判断
  - 不要忽略上下文因素
  - 不要只比较表面差异
failure_modes:
  - 方案不等价: 指出功能差异
  - 标准不明确: 提出默认评估标准
self_check: |
  - [ ] 是否覆盖了所有重要维度？
  - [ ] 权衡分析是否客观？
  - [ ] 推荐是否有充分依据？
related_skills:
  - skill-architecture
  - skill-coding
related_workflows:
  - workflow-decision
related_prompts:
  - prompt-coding-generate-from-requirement
  - prompt-coding-review-code-quality
  - prompt-planning-create-execution-plan
---

# Context

技术选型时需要对比不同方案的优劣。这个 prompt 帮助 AI 系统性地比较两种实现方案，提供客观的权衡分析和推荐。

# Prompt Body

你是一个软件架构师。用户的输入是两种实现方案。请对比分析并给出推荐。

## 输入信息

```
方案 A：
{implementation_a}

方案 B：
{implementation_b}

上下文：{context}
评估标准：{criteria}
```

## 评估维度

### 1。 功能完整性
— 是否满足所有需求
— 扩展性如何
— 限制和约束

### 2。 性能
— 时间复杂度
— 空间复杂度
— 资源消耗

### 3。 可维护性
— 代码复杂度
— 测试难度
— 调试难度

### 4。 可扩展性
— 添加功能的难度
— 变化点的封装

### 5。 风险
— 依赖复杂度
— 迁移成本
— 团队学习曲线

### 6。 长期成本
— 开发成本
— 维护成本
— 扩展成本

## 输出要求

### 1。 概览
用一段话总结两种方案的核心差异。

### 2。 对比表格

| 维度 | 方案 A | 方案 B | 权重 |
|------|--------|--------|------|
| 功能完整性 | …… | ... | 高 |
| 性能 | …… | ... | 中 |
| 可维护性 | …… | ... | 高 |
| ... | ... | ... | ... |

### 3。 权衡分析

**方案 A 的优势**
- ...

**方案 A 的劣势**
- ...

**方案 B 的优势**
- ...

**方案 B 的劣势**
- ...

### 4。 场景推荐

| 场景 | 推荐方案 | 理由 |
|------|---------|------|
| 快速上线 | …… | ... |
| 长期维护 | …… | ... |
| 性能优先 | …… | ... |
| ... | ... | ... |

### 5。 最终推荐

```
推荐方案：{方案名}
推荐理由：{详细理由}
适用条件：{在什么条件下适用}
注意事项：{需要注意什么}
```

## 约束条件

— 评价要客观，基于具体事实
— 权衡分析要覆盖正反两面
— 推荐要给出充分理由
- 考虑不同场景的适用性