---
id: prompt-coding-continue-partially-written-code
name: Continue Partially Written Code
summary: 继续未完成的代码片段，补充缺失的实现
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: coding
sub_category: complete
tags:
  - code-completion
  - partial-implementation
  - code-fill
keywords:
  - incomplete
  - unfinished
  - continue
  - fill
  - complete
intent: |
  继续未完成的代码，补充缺失的实现部分。
  适用于有部分代码但需要继续完成的场景。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - partial_code: string (required) 部分完成的代码
  - context: string (required) 代码上下文（文件路径、相关代码）
  - intent: string (optional) 预期的完整功能
output_requirements:
  - completed_code: string 完整的代码
  - explanation: string 补充部分的说明
  - changes_summary: string 变更摘要
tool_requirements:
  - Read 读取上下文文件
  - Write 修改代码文件
preconditions: |
  - 提供的代码片段应当有足够的上下文
  - 需要了解项目的代码风格
anti_patterns: |
  - 不要完全重写已有的代码
  - 不要改变已有代码的意图
  - 不要添加未在上下文中暗示的功能
failure_modes:
  - 上下文不足: 要求查看更多相关代码
  - 意图不清: 猜测意图并标注待确认
  - 与现有代码冲突: 指出冲突点
self_check: |
  - [ ] 是否保留了原有代码的风格？
  - [ ] 是否没有改变原有代码的意图？
  - [ ] 补充的部分是否与原有代码衔接自然？
  - [ ] 是否有语法或类型错误？
related_skills:
  - skill-coding
  - skill-tool-use
related_workflows:
  - workflow-implementation
related_prompts:
  - prompt-coding-fill-missing-implementation
  - prompt-coding-complete-function
  - prompt-coding-improve-readability
---

# Context

编程时经常会有未完成的代码，需要继续补充。这个 prompt 帮助 AI 在已有代码的基础上继续编写，保持代码风格和意图的一致性。

# Prompt Body

你是一个软件工程师。用户的输入是一段未完成的代码。请继续完成这段代码。

## 输入信息

```
部分代码：
{partial_code}

上下文：
{context}

预期完整功能：
{intent}
```

## 工作流程

1。 **理解现有代码**：分析已有的代码结构和意图
2。 **识别缺失部分**：确定哪些部分需要继续实现
3。 **匹配风格**：确保新增代码与现有风格一致
4。 **补充实现**：编写缺失的代码
5。 **验证完整**：检查代码是否能完整运行

## 输出要求

### 1。 完整代码
```language
{语言}
{代码内容}
```

### 2。 变更说明
说明补充了哪些部分，为什么这样实现。

### 3。 变更摘要
```
修改：
— {文件路径} (添加 {具体修改内容})
```

### 4。 待验证
列出需要运行测试或手动验证的部分。

## 约束条件

— 必须保留原有代码不变
— 新增代码必须与原有代码风格一致
— 不能改变原有代码的意图
— 补充的部分应当自然衔接
- 如果不确定如何继续，说明假设并标注