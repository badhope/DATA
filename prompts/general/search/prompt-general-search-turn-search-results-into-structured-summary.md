---
id: prompt-general-search-turn-search-results-into-structured-summary-v1
name: Turn Search Results into Structured Summary
summary: 将搜索结果转化为结构化摘要
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: search
tags:
  - search
  - summary
  - structured
  - synthesis
keywords:
  - 结构化摘要
  - 搜索结果整理
  - 信息综合
  - 摘要生成
intent: |
  指导 AI 将零散的搜索结果转化为结构化、层次清晰的摘要。
  强调结构化摘要应该便于理解和后续使用，而非简单的信息堆砌。
  核心原则：好的摘要结构应该让读者快速获取关键信息。
applicable_models:
  - "*"
input_requirements:
  - search_results: array 搜索结果
  - question: string 问题
  - target_audience: string 目标读者
output_requirements:
  - structured_summary: object 结构化摘要
  - key_takeaways: array 关键要点
  - detailed_content: object 详细内容
  - action_items: array 行动项
tool_requirements:
  - Read tool (读取搜索结果)
preconditions:
  - 有搜索结果需要整理
anti_patterns:
  - 信息堆砌无结构
  - 层次不清
  - 重点不突出
failure_modes:
  - 结构不合理：基于问题设计结构
  - 信息丢失：确保完整性
  - 可读性差：优化表达方式
self_check: |
  整理前自检：
  □ 是否明确了摘要结构？
  □ 是否突出了关键信息？
  □ 是否保持了完整性？
  □ 是否便于理解和使用？
related_skills:
  - skill-search
  - skill-reasoning
related_workflows:
  - workflow-research-to-summary
related_prompts:
  - prompt-general-search-extract-key-findings-from-search-results
  - prompt-general-search-identify-information-gaps-after-search
---

# Context

零散的搜索结果需要整理成结构化的摘要才能发挥价值。本 prompt 的核心目标是：**指导 AI 将搜索结果转化为结构清晰、层次分明、便于使用的摘要**。

# Prompt Body

## 阶段 1：结构设计

### 1.1 摘要结构类型

```markdown
## 摘要结构类型

### 问题-解决方案结构
```markdown
**适用**: 解决特定问题的搜索
**结构**:
1. 问题定义
2. 解决方案
3. 实现细节
4. 注意事项
```

### 比较-对比结构
```markdown
**适用**: 比较多个选项的搜索
**结构**:
1. 选项概览
2. 逐项比较
3. 优缺点分析
4. 适用场景
```

### 时间线结构
```markdown
**适用**: 发展历程、版本变化的搜索
**结构**:
1. 当前状态
2. 发展历程
3. 趋势分析
4. 未来展望
```

### 分类-组织结构
```markdown
**适用**: 多主题、多分类的搜索
**结构**:
1. 分类概览
2. 逐类说明
3. 类别关系
4. 总结
```
```

### 1.2 结构选择

```markdown
## 结构选择

### 选择依据
| # | 依据 | 选项 |
|---|------|------|
| 1 | 问题类型 | [结构类型] |
| 2 | 信息特点 | [特点] |
| 3 | 使用目的 | [目的] |

### 选择结果
```markdown
**选择结构**: [结构类型]
**选择理由**: [理由]
```
```

## 阶段 2：信息组织

### 2.1 内容分类

```markdown
## 内容分类

### 分类结果
| # | 类别 | 包含内容 | 来源 |
|---|------|----------|------|
| 1 | [类别] | [内容] | [来源] |
| 2 | [类别] | [内容] | [来源] |
```

### 层级设计
```markdown
## 层级结构

### 一级标题
**内容概要**: [简要描述]

### 二级标题
**具体内容**:
- [内容1]
- [内容2]

### 三级标题（如需要）
**细节**:
[详细说明]
```
```

## 阶段 3：关键要点提取

### 3.1 要点提炼

```markdown
## 关键要点提炼

### 要点清单
| # | 要点 | 类别 | 重要性 | 来源 |
|---|------|------|--------|------|
| 1 | [要点] | [类别] | [高/中/低] | [来源] |
```

### 要点优先级
```markdown
## 关键要点（按重要性）

### 必须知道的要点
1. **[要点1]** [来源]
   [简要说明]

### 应该知道的要点
2. **[要点2]** [来源]
   [简要说明]

### 可以参考的要点
3. **[要点3]** [来源]
   [简要说明]
```
```

## 阶段 4：结构化摘要生成

### 4.1 摘要框架

```markdown
## 结构化摘要框架

### 标题
[主题]

### 快速概览
```markdown
**问题**: [问题]
**核心发现**: [1-2句话概括]
**关键建议**: [核心建议]
```

### 详细内容
```markdown
## [章节1]

[内容]

## [章节2]

[内容]
```
```

### 4.2 详细结构

```markdown
## 详细结构

### 一、问题背景
```markdown
[背景信息]
```

### 二、核心发现
```markdown
**发现1**: [内容]
**来源**: [来源]
**说明**: [说明]

**发现2**: [内容]
[同上]
```

### 三、详细分析
```markdown
**方面1**: [内容]

**方面2**: [内容]
```

### 四、建议/结论
```markdown
**建议**: [建议内容]

**适用条件**: [条件]

**注意事项**: [注意]
```
```

## 阶段 5：行动项整理

### 5.1 行动项提取

```markdown
## 行动项整理

### 行动项清单
| # | 行动项 | 来源 | 优先级 | 适用场景 |
|---|--------|------|--------|----------|
| 1 | [行动] | [来源] | [高/中/低] | [场景] |
```

### 行动项详情
```markdown
## 行动项详情

### 行动项 1: [标题]
```markdown
**行动**: [具体行动]
**理由**: [为什么这样做]
**预期结果**: [结果]
**注意事项**: [注意]
```
```

## 阶段 6：输出模板

### 6.1 完整结构化摘要模板

```markdown
## 结构化摘要

### 标题
[主题]

### 快速概览
```markdown
**核心问题**: [问题]
**主要发现**: [发现1, 发现2, 发现3]
**关键建议**: [建议]
```

### 详细内容

#### 一、[主题1]
[内容]

#### 二、[主题2]
[内容]

### 关键要点
```markdown
1. **[要点1]**: [内容]
2. **[要点2]**: [内容]
3. **[要点3]**: [内容]
```

### 行动建议
```markdown
**立即行动**:
- [行动1]
- [行动2]

**后续行动**:
- [行动1]
- [行动2]
```

### 参考来源
```markdown
| # | 来源 | 内容 |
|---|------|------|
| 1 | [来源] | [内容摘要] |
```
```

### 6.2 精简摘要模板

```markdown
## 摘要

**问题**: [问题]

**关键发现**:
1. [发现1]
2. [发现2]
3. [发现3]

**建议**: [建议]

**来源数**: [N] 个
```

### 6.3 问答格式摘要

```markdown
## Q: [问题]

**A**: [简短回答]

**详细说明**:
1. [要点1]
2. [要点2]
3. [要点3]

**建议**: [建议]
```
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `search_results` | 搜索结果 | `[{source: "...", content: "..."}]` |
| `question` | 问题 | `"如何优化React性能"` |
| `target_audience` | 目标读者 | `"前端开发"` |

# Usage Notes

1. **结构清晰**：层次分明，便于阅读
2. **突出重点**：关键信息要突出
3. **来源可查**：便于追溯来源
4. **便于行动**：行动项要具体可执行
5. **平衡深度和简洁**：详细但不冗长

# Example Input

```yaml
search_results:
  - source: "React官方文档"
    content: "React性能优化指南"
  - source: "技术博客"
    content: "React渲染性能优化实践"
  - source: "GitHub"
    content: "React项目性能问题案例"
question: "如何优化React应用性能"
target_audience: "前端开发者"
```

# Example Output

```yaml
structured_summary:
  title: "React应用性能优化指南"
  quick_overview: |
    **核心问题**: React应用性能下降
    **主要发现**: 6个主要优化方向
    **关键建议**: 从渲染优化入手
  sections:
    - title: "渲染优化"
      content: "减少不必要的渲染、使用React.memo、useMemo等"
    - title: "代码分割"
      content: "使用React.lazy和Suspense"
    - title: "状态管理优化"
      content: "合理拆分状态、避免状态嵌套"

key_takeaways:
  - "React.memo可以避免不必要的子组件渲染"
  - "useMemo和useCallback可以缓存计算结果和函数"
  - "代码分割可以减少初始加载时间"
  - "合理的状态设计是性能的基础"

action_items:
  - action: "检查组件是否有不必要的重渲染"
    priority: "high"
  - action: "对长列表使用虚拟化"
    priority: "high"
  - action: "实现代码分割"
    priority: "medium"
```
