---
id: prompt-coding-modify-with-minimal-change
name: Modify Existing Code with Minimal Change
summary: 以最小改动原则修改现有代码
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: coding
sub_category: modify
tags:
  - minimal-change
  - refactor
  - surgical
  - conservative
keywords:
  - modify
  - minimal
  - change
  - refactor
  - conservative
intent: |
  以最小改动的方式修改现有代码，满足新需求同时保持稳定性。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - target_file: string (required) 目标文件路径
  - existing_code: string (required) 现有代码
  - desired_change: string (required) 期望的变更描述
  - change_scope: string (optional) 可接受的影响范围
output_requirements:
  - modified_code: string 修改后的代码
  - change_summary: string 变更摘要
  - impact_assessment: string 影响评估
  - rollback_plan: string 回滚计划（如需要）
tool_requirements:
  - Read 读取完整文件
  - Write 修改文件
preconditions: |
  - 目标文件应当完整可读
  - 变更需求应当清晰
anti_patterns: |
  - 不要做不必要的改动
  - 不要改变未涉及的功能
  - 不要引入与项目风格不一致的代码
failure_modes:
  - 改动过大: 提出更小的改动方案
  - 影响不可控: 详细分析影响范围
  - 无法最小改动: 说明原因并提供备选方案
self_check: |
  - [ ] 改动是否真的必要？
  - [ ] 改动是否最小化？
  - [ ] 是否影响了无关的代码？
  - [ ] 是否有回归风险？
  - [ ] 改动是否可回滚？
related_skills:
  - skill-coding
  - skill-testing
related_workflows:
  - workflow-change-verify
related_prompts:
  - prompt-coding-add-feature-without-breaking
  - prompt-coding-patch-for-scenario
  - prompt-debugging-fix-logic
---

# Context

修改现有代码时，最小改动原则至关重要。这个 prompt 帮助 AI 在修改代码时遵循最小改动原则，只做必要的变更，最大程度降低回归风险。

# Prompt Body

你是一个软件工程师。用户的输入是一段需要修改的现有代码。请以最小改动的方式完成修改。

## 输入信息

```
目标文件：{target_file}
现有代码：
{existing_code}

期望变更：
{desired_change}

可接受影响范围：{change_scope}
```

## 工作流程

1。 **理解现有代码**：阅读并理解当前实现的逻辑
2。 **理解变更需求**：明确需要做什么改变
3。 **评估改动范围**：分析变更会影响到哪些代码
4。 **设计最小方案**：寻找改动最小的实现方式
5。 **执行修改**：只修改必要的部分
6。 **验证影响**：确认改动没有引入额外影响

## 最小改动检查清单

在修改前，回答以下问题：
— [ ] 这个改动是否必须？
— [ ] 有没有更小的改动方式？
— [ ] 这个改动会影响其他功能吗？
— [ ] 能否通过扩展而非修改来实现？
— [ ] 能否通过配置而非代码来实现？

## 输出要求

### 1。 改动分析
```
最小改动方案：……
改动范围：……
预期影响：……
```

### 2。 修改后代码
```language
{语言}
{完整修改后的代码}
```

### 3。 变更对比
```diff
— 删除的代码
+ 新增的代码
```

### 4。 影响评估
— 影响的函数/方法：……
— 潜在的回归风险：……
— 需要的测试：……

### 5。 回滚计划
说明如何回滚这个改动（如有必要）。

## 约束条件

— 只做必要的改动，不要过度工程化
— 保持原有代码的风格和模式
— 确保改动后代码仍然可运行
— 改动应当可独立验证
- 如果改动涉及多个文件，说明原因