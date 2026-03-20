---
id: prompt-coding-implement-todo-safely
name: Implement TODO Safely
summary: 安全地实现代码中的 TODO 项
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: coding
sub_category: implement
tags:
  - todo
  - implementation
  - safe
  - refactor
keywords:
  - TODO
  - implement
  - refactor
  - safe
intent: |
  安全地实现代码中的 TODO 项，充分考虑上下文和潜在影响。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - todo_location: string (required) TODO 所在的文件路径
  - todo_content: string (required) TODO 的内容
  - surrounding_code: string (required) TODO 周围的代码上下文
output_requirements:
  - implementation: string 完整实现
  - impact_analysis: string 影响分析
  - changes_summary: string 变更摘要
  - test_suggestions: string 测试建议
tool_requirements:
  - Read 读取完整的上下文文件
  - Write 修改代码文件
preconditions: |
  - TODO 应当有足够的上下文
  - 需要了解项目的代码风格
anti_patterns: |
  - 不要只替换 TODO，要理解其背后的真正需求
  - 不要忽略 TODO 周围代码的约束
  - 不要引入与项目风格不一致的实现
failure_modes:
  - 上下文不足: 要求查看更多代码
  - 意图不清: 分析 TODO 的意图并说明假设
  - 影响范围不清: 分析 TODO 实现对其他代码的影响
self_check: |
  - [ ] 是否完全理解了 TODO 的意图？
  - [ ] 实现是否影响了周围的代码？
  - [ ] 是否有回归风险？
  - [ ] 是否需要更新相关的测试？
related_skills:
  - skill-coding
  - skill-testing
related_workflows:
  - workflow-implementation
  - workflow-change-verify
related_prompts:
  - prompt-coding-fill-missing-implementation
  - prompt-coding-complete-function
  - prompt-debugging-fix-logic
---

# Context

代码中的 TODO 标记表示有待完成的功能。这些 TODO 通常是开发过程中留下的，可能涉及重要的功能或修复。这个 prompt 帮助 AI 安全地实现 TODO 项，充分理解意图并评估影响。

# Prompt Body

你是一个软件工程师。用户的输入是一个代码中的 TODO。请安全地实现这个 TODO。

## 输入信息

```
文件路径：{todo_location}
TODO 内容：{todo_content}

周围代码：
{surrounding_code}
```

## 工作流程

1。 **理解 TODO 意图**：分析 TODO 的上下文，确定真正需要实现什么
2。 **分析影响范围**：确定 TODO 实现可能影响的代码范围
3。 **设计实现方案**：考虑最小改动原则
4。 **实现代码**：编写符合项目风格的新代码
5。 **验证完整性**：确保没有引入回归

## 输出要求

### 1。 TODO 分析
```
意图理解：……
潜在影响：……
实现约束：……
```

### 2。 完整实现
```language
{语言}
{代码内容}
```

### 3。 影响分析
列出实现后可能影响的代码和功能。

### 4。 变更摘要
```
修改：
— {文件路径} (实现 TODO： {简要描述})
```

### 5。 测试建议
说明需要运行或添加哪些测试。

## 约束条件

— 必须在实现前理解 TODO 的真正意图
— 考虑最小改动原则
— 确保不影响现有功能
— 实现后应当移除 TODO 标记
- 如果有多个相关 TODO，一并处理