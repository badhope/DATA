---
id: prompt-coding-improve-readability
name: Improve Code Readability
summary: 提高代码可读性
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: coding
sub_category: improve
tags:
  - readability
  - refactor
  - clean-code
  - readability
keywords:
  - readability
  - improve
  - clean
  - refactor
  - readable
intent: |
  重构代码以提高可读性，同时保持功能不变。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - code: string (required) 需要改进的代码
  - language: string (required) 编程语言
  - target_file: string (optional) 目标文件路径
output_requirements:
  - improved_code: string 改进后的代码
  - readability_metrics: string 可读性指标变化
  - changes_summary: string 变更摘要
  - explanation: string 改进说明
tool_requirements:
  - Read 读取完整代码
  - Write 修改文件
preconditions: |
  - 代码应当功能正确
  - 需要了解项目的代码风格
anti_patterns: |
  - 不要改变代码的功能
  - 不要引入新的编程模式
  - 不要过度简化导致丢失重要信息
failure_modes:
  - 功能可能变化: 说明保留功能的具体措施
self_check: |
  - [ ] 功能是否完全保留？
  - [ ] 可读性是否真的提升了？
  - [ ] 风格是否与项目一致？
related_skills:
  - skill-coding
  - skill-refactoring
related_workflows:
  - workflow-refactor
related_prompts:
  - prompt-coding-review-code-quality
  - prompt-coding-improve-maintainability
  - prompt-coding-align-style
---

# Context

代码可读性是长期维护的关键。这个 prompt 帮助 AI 在保持功能不变的前提下，通过重构提高代码的可读性。

# Prompt Body

你是一个软件工程师。用户的输入是一段需要提高可读性的代码。请在不改变功能的前提下重构代码。

## 输入信息

```
编程语言：{language}
目标文件：{target_file}

代码：
{code}
```

## 可读性改进维度

### 命名改进
— 变量/函数/类名是否清晰表达意图
— 是否有语义不明的缩写
— 是否有过于简短的名字

### 函数重构
— 函数是否过长（建议 < 50 行）
— 函数是否单一职责
— 参数是否过多（建议 < 4 个）

### 结构优化
— 嵌套是否过深（建议 < 3 层）
— 是否有重复代码
— 代码组织是否清晰

### 注释与文档
— 注释是否解释"为什么"而非"是什么"
— 是否有必要的文档
— 复杂的逻辑是否有解释

### 代码格式
— 是否遵循项目的格式化规范
— 空行和间距是否合理
— 缩进是否一致

## 输出要求

### 1。 改进清单
```
命名改进：X 处
函数拆分：X 处
结构优化：X 处
注释添加：X 处
```

### 2。 改进后代码
```language
{language}
{完整代码}
```

### 3。 可读性指标
```
圈复杂度：X → Y
函数长度：平均 X 行 → Y 行
嵌套深度：最大 X 层 → Y 层
```

### 4。 变更摘要
```
修改：
— {文件}
  — 命名改进：{具体改动}
  — 函数拆分：{具体改动}
  - ...
```

### 5。 改进说明
解释主要的重构决策。

## 约束条件

— 功能必须完全保留
— 不能引入新的编程模式
— 必须遵循项目的代码风格
- 改动应当是可验证的