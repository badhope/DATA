---
id: prompt-coding-patch-for-scenario
name: Patch Code for Specific Scenario
summary: 为特定场景修补代码
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: coding
sub_category: patch
tags:
  - patch
  - bug-fix
  - scenario
  - edge-case
keywords:
  - patch
  - scenario
  - specific
  - fix
  - edge-case
intent: |
  针对特定场景修补代码，处理特定边界情况或问题。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - code: string (required) 需要修补的代码
  - scenario: string (required) 需要处理的特定场景
  - current_behavior: string (optional) 当前行为描述
  - expected_behavior: string (optional) 期望行为描述
output_requirements:
  - patched_code: string 修补后的代码
  - scenario_handling: string 场景处理说明
  - changes_summary: string 变更摘要
tool_requirements:
  - Read 读取完整上下文
  - Write 修改代码文件
preconditions: |
  - 场景描述应当具体
  - 期望行为应当清晰
anti_patterns: |
  - 不要过度修补，只处理指定的场景
  - 不要引入与场景无关的变更
  - 不要改变其他正常场景的行为
failure_modes:
  - 场景描述不清: 要求更具体的场景描述
  - 影响其他场景: 分析并说明如何避免
self_check: |
  - [ ] 是否只处理了指定的场景？
  - [ ] 是否影响了其他正常场景？
  - [ ] 修补是否完整？
  - [ ] 是否添加了测试用例？
related_skills:
  - skill-coding
  - skill-testing
related_workflows:
  - workflow-change-verify
  - workflow-bug-fix
related_prompts:
  - prompt-coding-modify-with-minimal-change
  - prompt-debugging-fix-logic
  - prompt-testing-write-unit
---

# Context

针对特定场景的修补（patch）是常见的开发任务。这个 prompt 帮助 AI 针对特定场景进行精准修补，只解决指定问题而不影响其他正常功能。

# Prompt Body

你是一个软件工程师。用户的输入是一段代码和一个需要处理的特定场景。请针对这个场景修补代码。

## 输入信息

```
代码：
{code}

特定场景：
{scenario}

当前行为：{current_behavior}
期望行为：{expected_behavior}
```

## 工作流程

1。 **理解场景**：分析需要处理的特定场景
2。 **定位代码**：找到需要修改的部分
3。 **设计补丁**：设计最小、最精准的修补方案
4。 **验证范围**：确保补丁不影响其他场景
5。 **应用补丁**：修改代码
6。 **添加测试**：为该场景添加测试用例

## 输出要求

### 1。 场景分析
```
场景描述：……
触发条件：……
根本原因：……
```

### 2。 修补方案
```
补丁位置：……
修改方式：……
```

### 3。 修补后代码
```language
{语言}
{完整代码}
```

### 4。 变更摘要
```
修改：
— {文件} (修补场景： {场景简述})
```

### 5。 场景验证
说明如何验证该场景已被正确处理。

## 约束条件

— 只修补指定的场景，不做额外改动
— 确保不影响其他正常场景
— 补丁应当最小化
— 必须为该场景添加测试用例
- 如果有多个相关场景，一并考虑