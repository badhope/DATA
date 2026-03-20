---
id: prompt-coding-fill-missing-implementation
name: Fill Missing Implementation
summary: 补充代码中缺失的实现部分
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: coding
sub_category: complete
tags:
  - implementation
  - stub
  - skeleton
  - placeholder
keywords:
  - missing
  - implementation
  - stub
  - placeholder
  - skeleton
intent: |
  补充代码中的 stub/placeholder 实现，使其成为完整可用的代码。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - code_with_stubs: string (required) 包含 stub 的代码
  - file_path: string (required) 文件路径
  - language: string (required) 编程语言
  - project_context: string (optional) 项目上下文
output_requirements:
  - completed_code: string 完整代码
  - implementation_notes: string[] 关键实现说明
  - changes_summary: string 变更摘要
tool_requirements:
  - Read 读取相关上下文文件
  - Write 修改代码文件
preconditions: |
  - 代码应当有足够的类型定义和接口信息
  - 了解项目的代码风格
anti_patterns: |
  - 不要改变已有的类型定义或接口签名
  - 不要添加接口中未定义的功能
  - 不要使用低质量或临时的实现替代真正的 stub
failure_modes:
  - 依赖不清: 列出需要的其他模块或服务
  - 类型缺失: 说明需要的类型定义
self_check: |
  - [ ] 是否补充了所有 stub/placeholder？
  - [ ] 实现是否符合接口定义？
  - [ ] 错误处理是否完整？
  - [ ] 是否遵循项目代码风格？
related_skills:
  - skill-coding
  - skill-tool-use
related_workflows:
  - workflow-implementation
related_prompts:
  - prompt-coding-continue-partially-written-code
  - prompt-coding-complete-function
  - prompt-coding-implement-todo
---

# Context

代码中经常会有 stub、placeholder 或 TODO 标记的实现空缺。这个 prompt 帮助 AI 补充这些缺失的实现，使代码成为完整可用的状态。

# Prompt Body

你是一个软件工程师。用户的输入是一段包含 stub 或 placeholder 的代码。请补充缺失的实现。

## 输入信息

```
文件路径：{file_path}
编程语言：{language}
项目上下文：{project_context}

代码：
{code_with_stubs}
```

## 常见的 Stub 模式

```
// TODO: implement
// FIXME: not implemented
// STUB: ...
// NOT YET: ...
// ……: 实现缺失
pass  # Python stub
throw new NotImplementedException();  // C#/Java stub
undefined  # JavaScript stub
```

## 工作流程

1。 **识别 stub**：找到所有需要实现的部分
2。 **理解上下文**：了解该部分的预期行为
3。 **设计实现**：确定合理的实现方式
4。 **编写代码**：补充完整实现
5。 **验证**：检查是否与周围代码协调

## 输出要求

### 1。 完整代码
```language
{language}
{代码内容}
```

### 2。 实现说明
对于每个补充的实现，说明：
— 为什么这样实现
— 假设和约束
— 可能的替代方案

### 3。 变更摘要
```
修改：
— {文件路径} (补充 {stub 数量} 处实现)
```

### 4。 后续步骤
列出需要进一步完成或验证的部分。

## 约束条件

— 必须保持原有的接口签名不变
— 实现应当是功能完整的，不是临时代码
— 错误处理是必须的
- 遵循项目的代码风格