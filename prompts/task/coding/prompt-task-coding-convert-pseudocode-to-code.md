---
id: prompt-coding-convert-pseudocode-to-code
name: Convert Pseudocode to Code
summary: 将伪代码/算法描述转换为可执行代码
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: coding
sub_category: transform
tags:
  - pseudocode
  - algorithm
  - code-generation
keywords:
  - pseudo-code
  - algorithm
  - implementation
  - conversion
intent: |
  将伪代码或算法描述转换为特定编程语言的可执行代码。
  适用于已有算法思路但需要代码实现的场景。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - pseudocode: string (required) 伪代码或算法描述
  - target_language: string (required) 目标编程语言
  - context: string (optional) 相关的代码上下文
  - data_types: string (optional) 输入输出数据类型
output_requirements:
  - code: string 转换后的代码
  - explanation: string 关键实现说明
  - complexity: string 时间/空间复杂度分析
  - test_cases: string 建议的测试用例
tool_requirements:
  - Read 了解项目代码风格（如果提供 context）
  - Write 输出代码文件
preconditions: |
  - 伪代码应当描述清晰的算法步骤
  - 目标语言应当明确指定
anti_patterns: |
  - 不要直接翻译语法，要转换为目标语言的习惯写法
  - 不要忽略伪代码中的边界条件
  - 不要生成有语法错误或类型不匹配的代码
failure_modes:
  - 伪代码歧义: 指出具体不明确的步骤，要求澄清
  - 类型推断: 根据上下文推断类型并说明
  - 依赖缺失: 说明需要的 imports 或库
self_check: |
  - [ ] 代码是否忠实还原了伪代码的逻辑？
  - [ ] 是否考虑了所有边界条件？
  - [ ] 是否使用了目标语言的最佳实践？
  - [ ] 复杂度是否符合预期？
  - [ ] 是否有类型安全的问题？
related_skills:
  - skill-coding
  - skill-refactoring
related_workflows:
  - workflow-implementation
related_prompts:
  - prompt-coding-generate-from-requirement
  - prompt-coding-optimize-algorithm
  - prompt-debugging-fix-logic
---

# Context

伪代码是表达算法思路的好方法，但需要转换为具体代码才能运行。这个 prompt 帮助 AI 将伪代码忠实地转换为目标语言的实现，同时确保代码质量、类型安全和最佳实践。

# Prompt Body

你是一个算法工程师。用户的输入是一段伪代码或算法描述。请将其转换为可执行的代码。

## 输入信息

```
伪代码：
{pseudocode}

目标语言：{target_language}
相关上下文：{context}
数据类型：{data_types}
```

## 工作流程

1。 **解析伪代码**：理解每个步骤和意图
2。 **识别模式**：检查是否有常见算法模式（排序、搜索、图算法等）
3。 **类型设计**：根据输入输出确定数据类型
4。 **代码转换**：用目标语言的习惯写法实现
5。 **复杂度分析**：分析时间和空间复杂度
6。 **添加测试**：提供验证正确性的测试用例

## 输出要求

### 1。 代码实现
```language
{target_language}
{代码内容}
```

### 2。 类型定义（如果适用）
```language
{target_language}
{类型定义}
```

### 3。 复杂度分析
```
时间复杂度：O(……)
空间复杂度：O(……)
```

### 4。 测试用例
```language
{测试代码}
```

### 5。 实现说明
简要说明关键实现点和可能的优化方向。

## 约束条件

— 代码必须能直接编译/运行
— 必须处理空输入、边界值等特殊情况
— 使用目标语言的类型系统（如果有的话）
— 遵循目标语言的代码风格和最佳实践
— 变量命名应当有意义的，注释应当解释"为什么"而非"是什么"

# Variables

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `{pseudocode}` | 伪代码内容 | "function findMax(arr)： max = arr[0]； for each item in arr： if item > max： max = item； return max" |
| `{target_language}` | 目标语言 | "Python"， "TypeScript"， "Java" |
| `{context}` | 代码上下文 | "这是项目中的工具函数，被多个模块调用" |
| `{data_types}` | 数据类型说明 | "输入：整数数组，输出：整数" |

# Usage Notes

### 何时使用

— 有算法思路但需要具体代码实现
— 将其他语言的算法转换到新语言
— 需要优化现有算法的代码实现

### 使用技巧

1。 **提供完整伪代码**：包含所有边界条件和错误处理
2。 **说明约束**：如果有性能要求或内存限制，说明清楚
3。 **提供上下文**：如果有相关的数据结构或依赖，说明
4。 **标注优先级**：如果有多步算法，标注哪些是必须的核心逻辑

### 配合使用

— 使用 `prompt-coding-optimize-algorithm` 优化生成的代码
— 使用 `prompt-testing-write-unit` 为转换后的代码编写测试
- 使用 `prompt-code-review-quality` 审查代码质量