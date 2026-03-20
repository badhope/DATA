---
id: prompt-coding-complete-function-based-on-context
name: Complete Function Based on Context
summary: 基于函数签名和上下文补充完整的函数实现
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: coding
sub_category: complete
tags:
  - function
  - implementation
  - context
  - type-signature
keywords:
  - function
  - context
  - signature
  - implement
  - complete
intent: |
  根据函数签名和上下文推断并实现完整的函数逻辑。
  适用于只有函数声明或接口，需要推断并实现完整逻辑的场景。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - function_signature: string (required) 函数签名
  - context: string (required) 上下文代码
  - expected_behavior: string (optional) 预期行为描述
output_requirements:
  - full_implementation: string 完整函数实现
  - logic_explanation: string 逻辑说明
  - edge_cases: string[] 边界情况说明
tool_requirements:
  - Read 读取上下文了解项目模式
  - Write 输出代码
preconditions: |
  - 函数签名应当足够清晰
  - 上下文应当包含相关的类型定义和调用模式
anti_patterns: |
  - 不要改变函数签名
  - 不要添加签名中未包含的副作用
  - 不要假设不可能的参数组合
failure_modes:
  - 签名歧义: 指出具体不明确的参数或返回值
  - 上下文不足: 要求查看更多调用代码
self_check: |
  - [ ] 函数签名是否完全匹配？
  - [ ] 所有参数是否都被正确使用？
  - [ ] 返回值是否符合预期类型？
  - [ ] 边界条件是否都处理了？
related_skills:
  - skill-coding
  - skill-tool-use
related_workflows:
  - workflow-implementation
related_prompts:
  - prompt-coding-fill-missing-implementation
  - prompt-coding-continue-partially-written-code
  - prompt-debugging-fix-logic
---

# Context

有时候只有函数签名，需要推断其完整实现。这个 prompt 帮助 AI 基于函数签名、参数类型、返回类型和上下文推断并实现完整的函数逻辑。

# Prompt Body

你是一个软件工程师。用户的输入是一个函数签名和相关上下文。请推断并实现完整的函数。

## 输入信息

```
函数签名：
{function_signature}

上下文代码：
{context}

预期行为：
{expected_behavior}
```

## 工作流程

1。 **分析签名**：理解参数、返回类型和泛型
2。 **推断意图**：从名称和类型推断函数目的
3。 **分析上下文**：了解该函数如何被调用
4。 **处理边界**：识别可能的边界情况
5。 **实现逻辑**：编写完整的函数体
6。 **自检**：验证实现是否符合签名和上下文

## 输出要求

### 1。 完整实现
```language
{语言}
{代码内容}
```

### 2。 逻辑说明
说明实现的核心逻辑和决策。

### 3。 边界情况
列出函数处理的边界情况。

### 4。 假设说明
如果有任何假设，说明假设内容和原因。

## 约束条件

— 必须完全匹配函数签名
— 参数必须被正确验证和使用
— 返回值必须符合声明的类型
— 必须处理常见的边界情况
- 遵循项目的代码风格