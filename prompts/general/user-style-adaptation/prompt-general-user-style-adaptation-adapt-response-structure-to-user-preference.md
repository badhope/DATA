---
id: prompt-general-user-style-adaptation-adapt-response-structure-to-user-preference-v1
name: Adapt Response Structure to User Preference
summary: 根据用户偏好调整响应结构
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: user-style-adaptation
tags:
  - structure
  - response
  - format
  - preference
keywords:
  - 响应结构
  - 格式偏好
  - 结构适配
  - 输出格式
intent: |
  指导 AI 根据用户的格式偏好调整响应的组织结构。
  强调不同用户对结构有不同偏好，有人喜欢分层标题，有人喜欢线性叙述。
  核心原则：结构服务于理解，不是展示技巧。
applicable_models:
  - "*"
input_requirements:
  - content: string 内容
  - user_preferences: object 用户偏好
  - context: object 上下文
output_requirements:
  - adapted_structure: string 调整后的结构类型
  - structure_justification: string 结构选择理由
  - structured_response: string 结构化响应
tool_requirements: []
preconditions:
  - 有内容需要以结构化方式呈现
anti_patterns:
  - 过度结构化
  - 结构不一致
  - 牺牲内容完整性
failure_modes:
  - 结构误判：用户偏好的准确识别
  - 结构过度：保持必要简洁
  - 结构混乱：清晰的层次逻辑
self_check: |
  调整前自检：
  □ 是否识别了用户的结构偏好？
  □ 结构是否适合内容复杂度？
  □ 是否保持了内容完整性？
  □ 结构是否服务于理解？
related_skills:
  - skill-user-style-adaptation
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-user-style-adaptation-detect-user-style-and-adapt-tone
  - prompt-general-user-style-adaptation-infer-user-output-format-preference
---

# Context

不同的内容复杂度需要不同的结构，同一内容也可以用不同结构呈现。本 prompt 的核心目标是：**指导 AI 根据内容特点和用户偏好选择最合适的响应结构**。

# Prompt Body

## 阶段 1：内容分析

### 1.1 内容复杂度

```markdown
## 内容复杂度分析

### 复杂度维度
| # | 维度 | 低 | 中 | 高 |
|---|------|-----|-----|-----|
| 1 | 信息量 | 1-2点 | 3-5点 | 6+点 |
| 2 | 层次深度 | 单层 | 2-3层 | 4+层 |
| 3 | 相互关系 | 独立 | 部分关联 | 强关联 |
| 4 | 步骤数量 | 1-2步 | 3-5步 | 6+步 |

### 复杂度评估
```markdown
**信息量**: [点数]
**层次**: [层数]
**关系**: [独立/关联]
**步骤**: [步数]

**综合复杂度**: [简单/中等/复杂]
```
```

### 1.2 内容类型

```markdown
## 内容类型

### 类型判断
```markdown
**类型**: [概念解释/操作指南/比较分析/决策支持/问题诊断/其他]

**核心结构需求**:
- 概念解释: 定义→特点→示例
- 操作指南: 步骤1→步骤2→...
- 比较分析: A vs B → 对比 → 结论
- 决策支持: 选项→利弊→建议
- 问题诊断: 现象→原因→解决方案
```

### 结构适配原则
```markdown
**简单内容**: 线性叙述或简短列表
**中等内容**: 分层列表或小标题
**复杂内容**: 多级标题+表格+分章节
```
```

## 阶段 2：用户偏好识别

### 2.1 偏好类型

```markdown
## 用户结构偏好

### 常见偏好
```markdown
**列表偏好**: 喜欢用列表呈现
- 优点: 清晰、易扫描
- 适用: 步骤、特点、要点

**段落偏好**: 喜欢用段落叙述
- 优点: 连贯、完整
- 适用: 解释、背景、上下文

**混合偏好**: 列表+段落结合
- 优点: 结构清晰+连贯性好
- 适用: 大多数场景

**表格偏好**: 喜欢用表格对比
- 优点: 对比清晰
- 适用: 比较、规格、选项
```
```

### 2.2 偏好检测

```markdown
## 偏好检测

### 从历史交互推断
```markdown
**历史偏好**:
- 常用格式: [列表/段落/混合/表格]
- 标题使用: [常用/偶尔/从不]
- 列表样式: [bullet/ numbered/ dash]
```

### 明确偏好
```markdown
**用户声明的偏好**:
- [偏好1]
- [偏好2]
```
```

## 阶段 3：结构选择

### 3.1 结构选项

```markdown
## 结构选项

### 线性结构
```markdown
**适用**: 简单内容、步骤过程
**结构**: 开头→主体→结尾
**特点**: 流畅、连贯
```

### 层级结构
```markdown
**适用**: 复杂内容、多主题
**结构**: 大标题→小标题→内容
**特点**: 清晰、可导航
```

### 对比结构
```markdown
**适用**: 比较分析、选项评估
**结构**: 项目A ↔ 项目B
**特点**: 对比清晰
```

### 混合结构
```markdown
**适用**: 中等复杂度
**结构**: 分章节+列表/表格
**特点**: 结构清晰+信息完整
```
```

### 3.2 选择决策

```markdown
## 结构选择

### 决策因素
| # | 因素 | 影响 |
|---|------|------|
| 1 | 内容复杂度 | 决定结构深度 |
| 2 | 用户偏好 | 决定呈现方式 |
| 3 | 使用场景 | 影响结构侧重 |

### 最终选择
```markdown
**选择结构**: [结构类型]

**选择理由**:
1. [理由1]
2. [理由2]
```
```

## 阶段 4：结构执行

### 4.1 结构模板

```markdown
## 结构模板

### 层级结构模板
```markdown
## 主标题

### 子标题1
内容

### 子标题2
内容

### 子标题3
内容
```

### 列表结构模板
```markdown
**要点1**: 说明
**要点2**: 说明
**要点3**: 说明
```

### 表格结构模板
```markdown
| 项目 | 特征1 | 特征2 |
|------|-------|-------|
| A | 内容 | 内容 |
| B | 内容 | 内容 |
```
```

### 4.2 结构实现

```markdown
## 结构化响应

[按选定结构组织的内容]
```

## 阶段 5：输出模板

### 5.1 完整模板

```markdown
## 结构适配

### 内容分析
```markdown
**复杂度**: [简单/中等/复杂]
**类型**: [类型]
**信息量**: [点数]
```

### 用户偏好
```markdown
**偏好结构**: [列表/段落/混合/表格]
**其他偏好**: [偏好]
```

### 选择结果
```markdown
**选择结构**: [结构类型]
**理由**: [理由]
```

### 结构化输出
```markdown
[完整结构化响应]
```
