---
id: prompt-general-user-style-adaptation-infer-user-output-format-preference-v1
name: Infer User Output Format Preference
summary: 推断用户输出格式偏好
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: user-style-adaptation
tags:
  - format
  - output
  - preference
  - inference
keywords:
  - 输出格式
  - 格式偏好
  - 格式推断
  - 输出类型
intent: |
  指导 AI 推断用户期望的输出格式偏好。
  强调格式偏好影响用户体验，但不应牺牲内容完整性。
  核心原则：在用户未明确时，合理推断其格式偏好。
applicable_models:
  - "*"
input_requirements:
  - user_request: string 用户请求
  - context: object 上下文
  - conversation_history: array 对话历史
output_requirements:
  - inferred_preference: object 推断的格式偏好
  - format_justification: string 格式选择理由
  - formatted_output: string 格式化输出
tool_requirements: []
preconditions:
  - 有输出需要确定格式
anti_patterns:
  - 格式过于花哨
  - 忽略用户偏好
  - 格式与内容不匹配
failure_modes:
  - 推断不准确：多维度推断
  - 格式不当：适合内容类型
  - 偏好冲突：与历史偏好一致
self_check: |
  推断前自检：
  □ 是否有历史格式偏好？
  □ 当前任务适合什么格式？
  □ 推断的置信度如何？
related_skills:
  - skill-user-style-adaptation
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-user-style-adaptation-adapt-response-structure-to-user-preference
  - prompt-general-user-style-adaptation-maintain-consistent-style-across-session
---

# Context

用户可能有隐含的输出格式偏好，这些偏好在对话中会表现出来。本 prompt 的核心目标是：**指导 AI 从对话历史和当前请求中推断用户的输出格式偏好**。

# Prompt Body

## 阶段 1：格式类型识别

### 1.1 常见格式类型

```markdown
## 格式类型

### 文本格式
```markdown
**纯文本**: 无格式标记，适合简单内容
**Markdown**: 标题、列表、代码块
**富文本**: 多种样式，适合复杂文档
```

### 结构化格式
```markdown
**JSON**: 结构化数据，机器可读
**YAML**: 配置文件，人类易读
**表格**: 对比数据，行列清晰
**列表**: 步骤或要点
```

### 文档格式
```markdown
**代码**: 带语法高亮的代码块
**文档**: 多级标题的专业文档
**邮件**: 正式格式的信件风格
**报告**: 结构化的分析报告
```
```

## 阶段 2：偏好推断

### 2.1 历史偏好分析

```markdown
## 历史格式偏好

### 从对话历史推断
```markdown
**使用的格式类型**:
| # | 日期 | 用户格式 | AI格式 | 场景 |
|---|------|----------|--------|------|
| 1 | [日期] | [格式] | [格式] | [场景] |
```

### 偏好模式
```markdown
**代码相关请求**: 使用代码块+解释
**列表相关请求**: 使用列表格式
**对比相关请求**: 使用表格格式
**文档相关请求**: 使用多级标题
```
```

### 2.2 当前请求推断

```markdown
## 当前请求分析

### 请求特征
```markdown
**请求内容**: [内容]
**隐含格式需求**: [推断]

**信号分析**:
- "给我一个列表" → 列表格式
- "写代码实现" → 代码块
- "对比一下" → 表格
- "写成文档" → Markdown文档
```
```

## 阶段 3：格式选择

### 3.1 格式选择决策

```markdown
## 格式决策

### 推断的偏好
```markdown
**主要格式**: [格式]
**次要格式**: [格式]
**置信度**: [高/中/低]
```

### 选择理由
```markdown
**理由**:
1. [理由1]
2. [理由2]
```
```

### 3.2 格式实现

```markdown
## 格式实现

[按选定格式组织的内容]
```

## 阶段 4：输出模板

### 4.1 完整模板

```markdown
## 格式推断

### 推断结果
```markdown
**推断偏好**: [格式]
**置信度**: [置信度]

**依据**:
1. [依据1]
2. [依据2]
```

### 格式输出
```markdown
[格式化输出]
```
