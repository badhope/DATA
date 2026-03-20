---
id: prompt-coding-improve-maintainability
name: Improve Code Maintainability
summary: 提高代码可维护性
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: coding
sub_category: improve
tags:
  - maintainability
  - refactor
  - technical-debt
  - quality
keywords:
  - maintainability
  - improve
  - refactor
  - technical-debt
  - quality
intent: |
  重构代码以提高可维护性，降低技术债务。
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
  - maintainability_analysis: string 可维护性分析
  - technical_debt_reduction: string 技术债务减少量
  - changes_summary: string 变更摘要
tool_requirements:
  - Read 读取完整代码
  - Write 修改文件
preconditions: |
  - 代码应当功能正确
  - 需要了解项目的架构
anti_patterns: |
  - 不要做激进的重构
  - 不要引入与项目不一致的模式
  - 不要为了"完美"而重构
failure_mones: |
  - 功能可能变化: 说明保留功能的具体措施
  - 改动范围不清: 评估影响范围
self_check: |
  - [ ] 功能是否完全保留？
  - [ ] 可维护性是否真的提升了？
  - [ ] 改动是否过于激进？
related_skills:
  - skill-coding
  - skill-refactoring
related_workflows:
  - workflow-refactor
related_prompts:
  - prompt-coding-review-code-quality
  - prompt-coding-improve-readability
  - prompt-coding-align-style
---

# Context

可维护性决定了代码长期演化的成本。这个 prompt 帮助 AI 识别可维护性问题并进行改进，降低技术债务。

# Prompt Body

你是一个软件架构师。用户的输入是一段代码。请识别可维护性问题并提供改进。

## 输入信息

```
编程语言：{language}
目标文件：{target_file}

代码：
{code}
```

## 可维护性分析维度

### 1。 耦合度
— 模块间是否过度耦合
— 依赖方向是否正确
— 是否有循环依赖

### 2。 内聚性
— 类/模块是否职责单一
— 相关功能是否放在一起
— 是否有散落的无关代码

### 3。 扩展性
— 添加新功能是否需要大量修改
— 是否使用了合理的抽象
— 变化点是否被良好封装

### 4。 可测试性
— 代码是否易于测试
— 是否有依赖难以注入
— 是否有隐藏的全局状态

### 5。 技术债务
— 是否有 TODO/FIXME/HACK
— 是否有重复代码
— 是否有过于复杂的实现

## 输出要求

### 1。 可维护性评估
```
耦合度：X/10
内聚性：X/10
扩展性：X/10
可测试性：X/10
技术债务：X/10
总体评分：X/10
```

### 2。 发现的问题
| 问题 | 类型 | 影响 | 建议 |
|------|------|------|------|
| …… | 耦合 | 高 | ... |

### 3。 改进后代码
```language
{language}
{完整代码}
```

### 4。 技术债务减少
```
移除重复代码：X 处
解耦依赖：X 处
简化复杂逻辑：X 处
添加抽象：X 处
```

### 5。 变更摘要
```
修改：
— {文件}
  — {改进内容}
```

## 约束条件

— 功能必须完全保留
— 采用渐进式重构
— 必须遵循项目的架构模式
- 改动应当是可验证的