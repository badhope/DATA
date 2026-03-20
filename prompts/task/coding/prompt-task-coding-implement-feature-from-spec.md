---
id: prompt-coding-implement-from-spec
name: Implement Feature from Spec
summary: 基于规格说明文档实现完整功能模块
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: coding
sub_category: implement
tags:
  - implementation
  - specification
  - feature-development
keywords:
  - spec
  - specification
  - feature
  - implement
intent: |
  基于结构化的规格说明（Spec）实现功能代码。
  适用于需求已经过评审、有明确规格说明的场景。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - spec_text: string (required) 功能规格说明
  - spec_format: string (optional) 规格说明格式 (API spec/JSON schema/功能列表)
  - target_file: string (optional) 目标实现文件路径
  - language: string (optional) 编程语言
output_requirements:
  - code: string 生成的代码实现
  - explanation: string 实现说明
  - files_created: string[] 新增的文件列表
  - files_modified: string[] 修改的文件列表
  - test_suggestions: string 建议的测试用例
  - coverage_impact: string 对测试覆盖率的影响
tool_requirements:
  - Read 读取项目现有代码和规格说明
  - Write 创建新文件或修改现有文件
  - Glob 查找相关模块
preconditions: |
  - 规格说明应当包含足够的细节
  - 如果修改现有文件，需要了解现有实现
anti_patterns: |
  - 不要跳过规格说明中的任何条目
  - 不要在规格说明未覆盖的场景下自行决定实现方式
  - 不要忽略规格说明中的边界条件要求
failure_modes:
  - 规格歧义: 要求澄清或使用"假设"方式处理并标注待确认
  - 依赖规格外: 明确指出哪些部分依赖额外决策
  - 实现冲突: 如果规格与现有代码冲突，提出具体问题
self_check: |
  - [ ] 是否实现了规格说明中的每一个条目？
  - [ ] 边界条件是否都覆盖了？
  - [ ] 错误处理是否符合规格要求？
  - [ ] 返回值和副作用是否符合规格？
  - [ ] 代码风格是否与项目一致？
related_skills:
  - skill-repo-analysis
  - skill-tool-use
related_workflows:
  - workflow-implementation
  - workflow-spec-to-code
related_prompts:
  - prompt-coding-generate-from-requirement
  - prompt-coding-review-code
  - prompt-testing-write-unit
---

# Context

规格说明（Spec）是经过评审的正式需求文档，比自然语言需求更结构化。这个 prompt 帮助 AI 基于规格说明精确实现功能，确保不遗漏任何要求，同时保持与项目风格的一致性。

# Prompt Body

你是一个高级软件工程师。用户的输入是一份功能规格说明。请严格按照规格说明实现代码。

## 输入信息

```
规格说明：
{spec_text}

规格格式：{spec_format}
目标文件：{target_file}
编程语言：{language}
```

## 规格格式说明

根据不同的 `{spec_format}`，采用不同的解析方式：

### API Spec 格式
— 端点定义（HTTP 方法、路径）
— 请求/响应格式（JSON Schema）
— 认证要求
— 错误码定义

### 功能列表格式
— 功能点编号
— 功能描述
— 优先级
— 验收标准

### 流程描述格式
— 输入
— 处理步骤
— 输出
— 异常流程

## 工作流程

1。 **解析规格**：理解每个条目和约束
2。 **对照检查**：检查是否有模糊或矛盾之处
3。 **识别依赖**：确定需要调用的现有模块或服务
4。 **实现编码**：按规格精确实现
5。 **验收检查**：逐条对照规格检查实现

## 输出要求

### 1。 实现清单
逐条列出规格中的每个条目及其实现状态：

| 规格条目 | 实现状态 | 实现位置 |
|---------|---------|---------|
| 条目1 | ✅ 已实现 | `src/...` |
| 条目2 | ⚠️ 待确认 | — |

### 2。 代码实现
```language
{语言}
{代码内容}
```

### 3。 新增/修改文件清单
```
新增：
- file1.ts
- file2.ts

修改：
— file3。ts (添加 export)
```

### 4。 测试建议
针对规格中的关键路径提供测试建议。

### 5。 待确认项
列出规格中未明确、需要用户确认的点。

## 约束条件

— 必须严格遵循规格中的所有要求
— 对于规格未覆盖的场景，使用"假设"方式并标注
— 如果规格与现有代码冲突，必须提出，不能自行决定
— 实现应当是可测试的

# Variables

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `{spec_text}` | 规格说明内容 | 完整的 API 规格或功能列表 |
| `{spec_format}` | 规格格式 | "API Spec"， "Feature List"， "Flow Description" |
| `{target_file}` | 目标实现文件 | "src/services/user。ts" |
| `{language}` | 编程语言 | "TypeScript"， "Go" |

# Usage Notes

### 何时使用

— 有明确的 API 规格需要实现
— 有功能列表需要逐项实现
— 设计和评审阶段已完成，需要进入编码阶段

### 使用技巧

1。 **提供完整规格**：不要省略任何部分
2。 **说明优先级**：如果部分条目有优先级，标注清楚
3。 **标注约束**：如果有技术约束或依赖，提前说明
4。 **提供相关代码**：如果有相关的现有代码片段，一并提供

### 配合使用

— 使用 `prompt-planning-design-api` 设计 API 规格
— 使用 `prompt-testing-write-api` 编写 API 测试
- 使用 `prompt-code-review-quality` 审查实现质量