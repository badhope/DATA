---
id: prompt-coding-align-project-style
name: Align Code with Project Style
summary: 使代码与项目风格保持一致
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: coding
sub_category: align
tags:
  - style
  - consistency
  - format
  - convention
keywords:
  - style
  - align
  - consistency
  - convention
  - format
intent: |
  调整代码风格以匹配项目规范和约定。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - code: string (required) 需要调整的代码
  - language: string (required) 编程语言
  - project_context: string (optional) 项目上下文信息
output_requirements:
  - styled_code: string 风格调整后的代码
  - style_changes: string[] 风格变更列表
  - explanation: string 变更说明
tool_requirements:
  - Read 读取项目现有代码了解风格
  - Write 修改文件
preconditions: |
  - 需要有项目现有代码作为风格参考
  - 了解项目的风格规范
anti_patterns: |
  - 不要改变代码的功能
  - 不要引入与项目不一致的新模式
  - 不要做超出风格调整范围的改动
failure_modes:
  - 项目风格不清: 询问或从现有代码推断
  - 风格冲突: 说明冲突点
self_check: |
  - [ ] 风格是否与项目一致？
  - [ ] 功能是否完全保留？
  - [ ] 是否遵循语言的格式规范？
related_skills:
  - skill-coding
  - skill-tool-use
related_workflows:
  - workflow-format
related_prompts:
  - prompt-coding-improve-readability
  - prompt-coding-review-code-quality
  - prompt-coding-generate-from-requirement
---

# Context

代码风格一致性对团队协作和代码维护至关重要。这个 prompt 帮助 AI 将代码调整到与项目风格一致，包括命名规范、格式、模式等。

# Prompt Body

你是一个软件工程师。用户的输入是一段代码和项目上下文。请调整代码风格以匹配项目规范。

## 输入信息

```
编程语言：{language}
项目上下文：{project_context}

代码：
{code}
```

## 风格对齐维度

### 命名规范
— 变量命名：camelCase / snake_case / PascalCase
— 函数命名：动词前缀、get/set 等约定
— 类命名：名词、形容词等模式
— 常量命名：全大写 + 下划线等

### 代码格式
— 缩进：空格数 / tab
— 行长度限制
— 空行使用规范
— 导入/引入顺序

### 模式约定
— 错误处理模式
— 异步处理模式
— 组件/模块组织
— 类型定义位置

### 注释规范
— 注释风格
— 文档注释要求
— 何时需要注释

## 输出要求

### 1。 风格分析
```
当前风格：……
项目风格：……
需要调整：……
```

### 2。 调整后代码
```language
{language}
{完整代码}
```

### 3。 变更清单
```
命名调整：
— {旧} → {新}

格式调整：
— {调整内容}

模式调整：
— {调整内容}
```

### 4。 说明
说明主要的风格调整决策。

## 约束条件

— 功能必须完全保留
— 只能做风格相关的调整
— 遵循项目的 。editorconfig 或 linter 配置（如有）
- 如无明确规范，遵循语言社区惯例