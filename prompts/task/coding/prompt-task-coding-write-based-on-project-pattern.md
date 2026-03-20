---
id: prompt-coding-write-based-on-project-pattern
name: Write Code Based on Existing Project Pattern
summary: 基于项目现有模式编写新代码
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: coding
sub_category: pattern
tags:
  - pattern
  - consistency
  - convention
  - template
keywords:
  - pattern
  - existing
  - project
  - convention
  - template
intent: |
  参考项目现有模式编写新代码，保持一致性。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - requirement: string (required) 新功能需求
  - reference_files: string[] (required) 参考的现有文件
  - language: string (required) 编程语言
  - file_to_create: string (optional) 需要创建的文件
output_requirements:
  - code: string 遵循模式的代码
  - pattern_analysis: string 模式分析
  - changes_summary: string 变更摘要
tool_requirements:
  - Read 读取所有参考文件
  - Write 创建新文件
preconditions: |
  - 必须提供参考文件
  - 参考文件应当代表项目的标准模式
anti_patterns: |
  - 不要盲目复制而不理解模式
  - 不要引入与模式不一致的实现
  - 不要忽略模式中的重要细节
failure_modes: |
  - 参考文件不足: 要求更多参考
  - 模式不一致: 说明冲突点
self_check: |
  - [ ] 代码是否遵循了参考模式的结构？
  - [ ] 是否应用了相同的命名约定？
  - [ ] 是否使用了相同的抽象层次？
  - [ ] 是否处理了相同的边界情况？
related_skills:
  - skill-coding
  - skill-repo-analysis
related_workflows:
  - workflow-implementation
  - workflow-pattern-apply
related_prompts:
  - prompt-coding-generate-from-requirement
  - prompt-coding-align-project-style
  - prompt-coding-improve-readability
---

# Context

每个项目都有自己独特的代码模式和约定。新代码应当遵循这些模式以保持一致性。这个 prompt 帮助 AI 分析项目现有模式并生成符合这些模式的新代码。

# Prompt Body

你是一个软件工程师。用户的输入是一个新功能需求和项目现有的参考代码。请基于参考代码的模式实现新功能。

## 输入信息

```
新功能需求：{requirement}
编程语言：{language}
需要创建的文件：{file_to_create}

参考文件：
{reference_files}
```

## 模式分析维度

### 1。 结构模式
— 文件组织方式
— 目录结构约定
— 模块划分方式

### 2。 命名模式
— 变量命名约定
— 函数命名约定
— 类命名约定
— 文件命名约定

### 3。 抽象模式
— 类的层次结构
— 接口/协议的使用
— 组合 vs 继承

### 4。 错误处理模式
— 错误定义方式
— 错误传播方式
— 日志记录方式

### 5。 依赖注入模式
— 依赖的组织方式
— 配置的管理方式
— 服务的注册方式

### 6。 代码组织模式
— 函数的组织方式
— 状态的管理方式
— 副作用的处理方式

## 工作流程

1。 **分析参考文件**：理解现有的代码模式
2。 **提取模式**：总结模式的关键要素
3。 **映射需求**：将新需求映射到现有模式
4。 **实现代码**：按照模式实现新代码
5。 **验证一致性**：确认与模式的一致性

## 输出要求

### 1。 模式分析
```
结构模式：……
命名模式：……
抽象模式：……
错误处理模式：……
其他模式：……
```

### 2。 代码实现
```language
{language}
{完整代码}
```

### 3。 模式应用说明
```
应用的模式要素：……
与模式一致的部分：……
如有例外，说明原因：……
```

### 4。 变更摘要
```
新增：
— {文件} (基于 {参考文件} 模式)

依赖：
— {引入的依赖}
```

## 约束条件

— 必须严格遵循参考文件的模式
— 不能引入参考文件中没有的模式
— 新代码应当与现有代码无缝集成
- 遵循项目的所有约定和规范