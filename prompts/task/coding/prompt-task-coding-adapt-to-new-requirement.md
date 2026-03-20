---
id: prompt-coding-adapt-to-new-requirement
name: Adapt Code to New Requirement
summary: 根据新需求调整代码实现
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: coding
sub_category: adapt
tags:
  - adapt
  - requirement
  - change
  - migrate
keywords:
  - adapt
  - requirement
  - change
  - migrate
  - modify
intent: |
  根据新需求调整代码，同时保持代码质量和一致性。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - current_code: string (required) 当前代码
  - new_requirement: string (required) 新需求描述
  - context: string (optional) 额外上下文
output_requirements:
  - adapted_code: string 调整后的代码
  - change_analysis: string 变更分析
  - migration_notes: string 迁移说明
  - test_updates: string[] 需要的测试更新
tool_requirements:
  - Read 读取相关文件
  - Write 修改代码
preconditions: |
  - 新需求应当清晰描述期望的行为变化
  - 需要了解代码的当前用途
anti_patterns: |
  - 不要盲目替换，要理解变化的本质
  - 不要忽略相关的调用方
  - 不要留下不一致的代码
failure_modes:
  - 需求歧义: 要求澄清具体变更
  - 影响分析: 列出所有需要同步修改的地方
  - 一致性问题: 确保代码库一致
self_check: |
  - [ ] 变更是否完整覆盖了新需求？
  - [ ] 相关调用方是否都已更新？
  - [ ] 代码是否保持一致风格？
  - [ ] 是否有遗漏的边界情况？
related_skills:
  - skill-coding
  - skill-testing
related_workflows:
  - workflow-change-verify
  - workflow-implementation
related_prompts:
  - prompt-coding-modify-with-minimal-change
  - prompt-coding-add-feature-without-breaking
  - prompt-debugging-fix-logic
---

# Context

需求变化时需要相应调整代码。这个 prompt 帮助 AI 分析需求变化、理解影响范围，并进行一致的代码调整。

# Prompt Body

你是一个软件工程师。用户的输入是当前代码和新需求。请根据新需求调整代码。

## 输入信息

```
当前代码：
{current_code}

新需求：
{new_requirement}

额外上下文：
{context}
```

## 工作流程

1。 **理解当前实现**：分析现有代码的逻辑和结构
2。 **理解新需求**：明确需求变化的本质
3。 **影响分析**：确定需要修改的范围
4。 **设计调整方案**：规划如何满足新需求
5。 **执行调整**：按方案修改代码
6。 **同步更新**：更新相关的调用方和测试

## 输出要求

### 1。 需求理解
```
当前行为：……
期望新行为：……
核心变化点：……
```

### 2。 影响分析
```
直接影响的代码：……
间接影响的代码：……
需要同步更新的文件：……
```

### 3。 调整后代码
```language
{语言}
{完整代码}
```

### 4。 变更摘要
```
修改：
— {文件} ({修改内容})

新增：
— {新文件}

删除：
— {删除的内容}
```

### 5。 迁移说明
— 如何从旧行为迁移到新行为
— 需要调用方做的调整
— 可能的兼容性问题

### 6。 测试更新
列出需要添加或修改的测试。

## 约束条件

— 变更应当完整覆盖新需求
— 代码内部应当保持一致
— 相关调用方需要同步更新
— 测试需要覆盖新的行为
- 如果有数据迁移需求，提供迁移脚本