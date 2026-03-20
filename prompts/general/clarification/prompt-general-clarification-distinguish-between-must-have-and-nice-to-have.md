---
id: prompt-general-clarification-distinguish-between-must-have-and-nice-to-have-v1
name: Distinguish Between Must-Have and Nice-to-Have
summary: 区分必须的和最好有的
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: clarification
tags:
  - clarification
  - requirements
  - prioritization
  - must-have
  - nice-to-have
keywords:
  - 必须有
  - 最好有
  - 需求优先级
  - 需求区分
  - MVP
intent: |
  指导 AI 帮助用户区分必须满足的需求和最好满足的需求，支持优先级排序。
  强调这种区分帮助聚焦最重要的需求，优化资源分配。
  核心原则：不是所有需求都同等重要，区分优先级可以提高交付效率。
applicable_models:
  - "*"
input_requirements:
  - requirements: array 需求列表
  - context: object 上下文
output_requirements:
  - requirement_analysis: array 需求分析
  - must_have: array 必须有
  - nice_to_have: array 最好有
  - prioritization_rationale: string 优先级理由
tool_requirements:
  - Read tool (读取上下文)
preconditions:
  - 有多个需求需要区分优先级
anti_patterns:
  - 所有需求同等对待
  - 优先级不清晰
  - 理由不充分
failure_modes:
  - 区分标准不明确：清晰的区分标准
  - 优先级不合理：基于业务价值的优先级
  - 理由不透明：透明的优先级理由
self_check: |
  区分前自检：
  □ 是否有清晰的区分标准？
  □ 是否考虑了业务价值？
  □ 是否说明了优先级理由？
  □ 是否得到了用户确认？
related_skills:
  - skill-clarification
  - skill-planning
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-clarification-confirm-goal-before-execution
  - prompt-general-clarification-narrow-down-broad-task-scope
---

# Context

用户提出的需求中，有些是必须满足的，有些是锦上添花的。区分这些需求可以聚焦最重要的功能，优化资源使用。本 prompt 的核心目标是：**指导 AI 帮助用户区分必须满足的需求和最好满足的需求，并说明优先级理由**。

# Prompt Body

## 阶段 1：需求收集

### 1.1 需求清单

```markdown
## 需求清单

### 从对话中提取的需求
| # | 需求 | 来源 | 原始表述 |
|---|------|------|----------|
| 1 | [需求] | [用户/推断] | [原始表述] |
```

### 需求特征
```markdown
**明确需求**: 用户直接说明的需求
**推断需求**: 从用户表述中推断的需求
**隐含需求**: 用户没有明说但可能需要的
```
```

## 阶段 2：区分标准

### 2.1 区分维度

```markdown
## 区分维度

### 必须有 (Must-Have)
```markdown
**定义**: 没有它整个方案就失败
**特征**:
- 核心功能缺失
- 安全性、合规性问题
- 无法满足基本业务需求

**判断问题**:
- 没有它，任务是否失去价值？
- 是否是用户明确必须满足的？
- 是否有法规或安全要求？
```

### 最好有 (Nice-to-Have)
```markdown
**定义**: 不是必需的，但能增加价值
**特征**:
- 体验优化
- 性能增强
- 锦上添花的功能

**判断问题**:
- 没有它，核心功能是否正常？
- 是否可以后续添加？
- 是否能显著提升体验？
```
```

### 2.2 区分检查清单

```markdown
## 区分检查清单

### 判断问题
| # | 问题 | 如果是"是" | 如果是"否" |
|---|------|----------|----------|
| 1 | 没有它方案是否失败？ | Must-Have | 继续判断 |
| 2 | 是核心功能吗？ | Must-Have | 继续判断 |
| 3 | 有法规/安全要求吗？ | Must-Have | Nice-to-Have |
| 4 | 能后续添加吗？ | Nice-to-Have | Must-Have |
```

## 阶段 3：需求分类

### 3.1 分类结果

```markdown
## 需求分类

### 必须有 (Must-Have)
| # | 需求 | 理由 | 如果没有 |
|---|------|------|----------|
| 1 | [需求] | [理由] | [后果] |
```

### 最好有 (Nice-to-Have)
| # | 需求 | 理由 | 价值增量 |
|---|------|------|----------|
| 1 | [需求] | [理由] | [增量] |
```

### 分类说明
```markdown
**分类标准**:
- Must-Have: 核心功能/安全要求/基本可用
- Nice-to-Have: 体验优化/性能增强/锦上添花

**分类依据**:
[简要说明为什么这样分]
```
```

### 3.2 优先级排序

```markdown
## 优先级排序

### Must-Have 排序
| # | 需求 | 优先级 | 理由 |
|---|------|--------|------|
| 1 | [需求] | P0 | [理由] |
| 2 | [需求] | P1 | [理由] |

### Nice-to-Have 排序
| # | 需求 | 优先级 | 理由 |
|---|------|--------|------|
| 1 | [需求] | P2 | [理由] |
| 2 | [需求] | P3 | [理由] |
```

## 阶段 4：验证确认

### 4.1 分类验证

```markdown
## 分类验证

### 验证问题
```markdown
**请确认这个分类**:

**Must-Have (必须有)**:
- [需求1]
- [需求2]

**Nice-to-Have (最好有)**:
- [需求1]
- [需求2]

**这个分类符合您的想法吗**?
```
```

### 4.2 调整机制

```markdown
## 调整机制

### 如果用户认为应该是 Nice-to-Have → Must-Have
```markdown
**需求**: [需求]
**移动到**: Must-Have
**需要确认**: [原因]
```

### 如果用户认为应该是 Must-Have → Nice-to-Have
```markdown
**需求**: [需求]
**移动到**: Nice-to-Have
**需要确认**: [原因]
```
```

## 阶段 5：交付建议

### 5.1 分阶段交付

```markdown
## 分阶段交付建议

### 第一阶段：Must-Have
```markdown
**包含**:
- [需求1]
- [需求2]

**交付目标**: 核心功能可用
**预计时间**: [时间]
```

### 第二阶段：Nice-to-Have
```markdown
**包含**:
- [需求1]
- [需求2]

**交付目标**: 体验优化
**预计时间**: [时间]
```
```

### 5.2 资源建议

```markdown
## 资源建议

### MVP 范围
```markdown
**最小可用版本 (MVP)**:
- 只包含 Must-Have
- 资源: [资源]
- 时间: [时间]
```

### 完整版本
```markdown
**完整版本**:
- 包含 Must-Have + 最重要的 Nice-to-Have
- 资源: [资源]
- 时间: [时间]
```
```

## 阶段 6：输出模板

### 6.1 完整分类模板

```markdown
## 需求优先级分类

### 必须有 (Must-Have)
| # | 需求 | 优先级 | 理由 |
|---|------|--------|------|
| 1 | [需求] | P0 | [理由] |
| 2 | [需求] | P1 | [理由] |

### 最好有 (Nice-to-Have)
| # | 需求 | 优先级 | 理由 |
|---|------|--------|------|
| 1 | [需求] | P2 | [理由] |
| 2 | [需求] | P3 | [理由] |

### 分类理由
```markdown
[简要说明分类依据]
```
```

### 确认
```markdown
**请确认分类是否正确**，或者告诉我需要调整的地方。
```
