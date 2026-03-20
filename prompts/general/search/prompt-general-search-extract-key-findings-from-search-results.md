---
id: prompt-general-search-extract-key-findings-from-search-results-v1
name: Extract Key Findings from Search Results
summary: 从搜索结果中提取关键发现
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: search
tags:
  - search
  - extraction
  - findings
  - key-points
keywords:
  - 关键发现
  - 搜索结果提取
  - 信息提取
  - 要点提取
intent: |
  指导 AI 从大量搜索结果中提取关键发现，过滤噪音，聚焦核心信息。
  强调关键发现应该是可操作的、有依据的、与问题相关的。
  核心原则：不是把所有信息罗列，而是提取真正有价值的发现。
applicable_models:
  - "*"
input_requirements:
  - search_results: array 搜索结果
  - original_question: string 原始问题
  - extraction_criteria: array 提取标准
output_requirements:
  - key_findings: array 关键发现
  - finding_sources: object 发现来源
  - relevance_assessment: object 相关性评估
  - prioritized_findings: array 优先级排序的发现
tool_requirements:
  - Read tool (读取搜索结果)
preconditions:
  - 有搜索结果需要分析
anti_patterns:
  - 罗列所有信息
  - 忽略相关性
  - 没有优先级
failure_modes:
  - 提取不精准：明确的提取标准
  - 噪音过多：过滤低相关性内容
  - 优先级混乱：明确的优先级标准
self_check: |
  提取前自检：
  □ 是否明确了提取标准？
  □ 是否过滤了低相关性内容？
  □ 是否评估了来源可靠性？
  □ 是否给出了优先级？
related_skills:
  - skill-search
  - skill-reasoning
related_workflows:
  - workflow-research-to-summary
related_prompts:
  - prompt-general-search-gather-multiple-sources-before-conclusion
  - prompt-general-search-turn-search-results-into-structured-summary
---

# Context

搜索结果往往包含大量信息，需要系统性地提取关键发现。本 prompt 的核心目标是：**指导 AI 从搜索结果中提取真正有价值的关键发现，过滤噪音**。

# Prompt Body

## 阶段 1：结果分析准备

### 1.1 提取标准定义

```markdown
## 提取标准

### 关键发现标准
| # | 标准 | 说明 | 适用性 |
|---|------|------|--------|
| 1 | 相关性 | 与原始问题直接相关 | 必须 |
| 2 | 可靠性 | 来源可靠、有依据 | 必须 |
| 3 | 新颖性 | 提供新信息/视角 | 加分 |
| 4 | 可操作性 | 可以指导行动 | 加分 |
| 5 | 时效性 | 信息是最新/有效的 | 加分 |

### 不纳入标准
```markdown
**不纳入的情况**:
1. 与问题无关
2. 来源不可靠
3. 信息已过时
4. 重复信息
5. 纯观点无依据
```
```

### 1.2 结果分类

```markdown
## 结果分类

### 按相关性分类
| # | 来源 | 相关性 | 关键内容 | 优先级 |
|---|------|--------|----------|--------|
| 1 | [来源] | [高/中/低] | [内容] | [高/中/低] |
```

### 相关性判断
```markdown
**高相关**: 直接回答问题、包含核心数据
**中相关**: 提供背景、侧面支持
**低相关**: 间接相关、噪音
```
```

## 阶段 2：关键发现提取

### 2.1 提取方法

```markdown
## 提取方法

### 分层提取
```markdown
**第一层 - 核心发现**: 直接回答问题的发现
- 通常来自权威来源
- 有明确的数据或事实支持
- 是结论性的

**第二层 - 重要支持**: 支持核心发现的发现
- 提供证据和细节
- 帮助理解核心发现
- 可以验证或补充核心发现

**第三层 - 上下文**: 提供背景的发现
- 帮助理解问题背景
- 不是必需的但有价值
```

### 提取原则
```markdown
1. **事实优先**: 优先提取有依据的事实
2. **数据为王**: 优先提取具体数据
3. **来源标注**: 每个发现都要标注来源
4. **避免重复**: 合并重复的发现
```
```

### 2.2 发现提取

```markdown
## 关键发现提取

### 发现 1: [标题]
```markdown
**内容**: [发现内容]

**来源**:
- 来源: [来源]
- 原文摘要: [摘要]

**与问题相关性**: [高/中/低]
**可靠性**: [高/中/低]

**评估**:
- 新颖性: [程度]
- 可操作性: [程度]
```
```

## 阶段 3：发现组织

### 3.1 发现分类

```markdown
## 发现分类

### 事实发现
```markdown
| # | 发现 | 来源 | 可靠性 |
|---|------|------|--------|
| 1 | [发现] | [来源] | [高] |
```

### 数据发现
```markdown
| # | 发现 | 数据 | 来源 | 可靠性 |
|---|------|------|------|--------|
| 1 | [发现] | [数据] | [来源] | [高] |
```

### 观点发现
```markdown
| # | 发现 | 观点 | 来源 | 可靠性 |
|---|------|------|------|--------|
| 1 | [发现] | [观点] | [来源] | [中] |
```

### 建议发现
```markdown
| # | 发现 | 建议 | 来源 | 适用性 |
|---|------|------|------|--------|
| 1 | [发现] | [建议] | [来源] | [场景] |
```
```

### 3.2 发现整合

```markdown
## 发现整合

### 核心发现（直接回答问题）
```markdown
1. **[发现1]**: [内容]
   - 来源: [来源]
   - 置信度: [置信度]

2. **[发现2]**: [内容]
   - 来源: [来源]
   - 置信度: [置信度]
```

### 支持发现（提供证据和背景）
```markdown
1. **[发现]**: [内容]
   - 来源: [来源]
   - 作用: [证据/背景/细节]
```
```

## 阶段 4：优先级排序

### 4.1 优先级标准

```markdown
## 优先级标准

### 优先级因素
| # | 因素 | 权重 | 说明 |
|---|------|------|------|
| 1 | 相关性 | 高 | 与问题越相关优先级越高 |
| 2 | 可靠性 | 高 | 来源越可靠优先级越高 |
| 3 | 具体性 | 中 | 越具体越有价值 |
| 4 | 时效性 | 中 | 越新越有价值 |

### 优先级等级
```markdown
**P0 - 必须知道**: 直接回答问题、高可靠性
**P1 - 重要**: 支持问题回答、中高可靠性
**P2 - 有用**: 提供背景、中等可靠性
**P3 - 参考**: 低相关性或低可靠性
```
```

### 4.2 优先级评估

```markdown
## 优先级评估

### 排序后的发现
| # | 发现 | 优先级 | 理由 |
|---|------|--------|------|
| 1 | [发现] | P0 | [理由] |
| 2 | [发现] | P1 | [理由] |
| 3 | [发现] | P2 | [理由] |
```

## 阶段 5：发现呈现

### 5.1 呈现格式

```markdown
## 关键发现

### P0 - 必须知道
```markdown
1. **[发现1]** [来源]
   [内容]

2. **[发现2]** [来源]
   [内容]
```

### P1 - 重要
```markdown
3. **[发现3]** [来源]
   [内容]
```

### P2 - 有用
```markdown
4. **[发现4]** [来源]
   [内容]
```
```

### 5.2 精简呈现

```markdown
## 关键发现（精简版）

**核心发现**:
1. [发现1] [来源]
2. [发现2] [来源]

**支持发现**:
3. [发现3] [来源]

**参考发现**:
4. [发现4] [来源]
```
```

## 阶段 6：输出模板

### 6.1 完整提取模板

```markdown
## 关键发现提取报告

### 概览
```markdown
**搜索结果数**: [N]
**提取发现数**: [N]
**高相关性发现**: [N]
**平均可靠性**: [等级]
```

### 关键发现（按优先级）
```markdown
## P0 - 必须知道

1. **[发现]** [来源] [置信度]
   [内容]
   [相关性说明]

## P1 - 重要

2. **[发现]** [来源] [置信度]
   [内容]
```

### 发现来源索引
```markdown
| # | 发现 | 来源 | 原文位置 |
|---|------|------|----------|
| 1 | [发现] | [来源] | [位置] |
```
```

### 6.2 快速提取模板

```markdown
## 关键发现

**核心发现**:
- [发现1] [来源]
- [发现2] [来源]

**支持发现**:
- [发现3] [来源]

**优先级总结**: P0 [N]个, P1 [N]个
```
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `search_results` | 搜索结果 | `[{source: "...", content: "..."}]` |
| `original_question` | 原始问题 | `"React最新版本特性"` |
| `extraction_criteria` | 提取标准 | `["相关性", "可靠性"]` |

# Usage Notes

1. **标准明确**：提取前先定义标准
2. **过滤噪音**：不相关信息要过滤
3. **来源标注**：每个发现都要标注来源
4. **优先级清晰**：按重要性排序
5. **避免重复**：合并重复信息

# Example Input

```yaml
search_results:
  - source: "React官方博客"
    content: "React 18新特性：并发模式、Suspense改进"
  - source: "技术博客"
    content: "React 18性能优化技巧"
  - source: "论坛"
    content: "开发者对React 18的看法"
original_question: "React 18有哪些新特性"
extraction_criteria:
  - "相关性"
  - "可靠性"
```

# Example Output

```yaml
key_findings:
  - finding: "React 18引入并发模式"
    source: "React官方博客"
    reliability: "high"
    relevance: "high"
  - finding: "Suspense改进支持更多场景"
    source: "React官方博客"
    reliability: "high"
    relevance: "high"
  - finding: "Automatic batching默认启用"
    source: "React官方博客"
    reliability: "high"
    relevance: "medium"

finding_sources:
  "React官方博客": ["并发模式", "Suspense改进", "Automatic batching"]
  "技术博客": ["性能优化建议"]

prioritized_findings:
  - priority: "P0"
    finding: "React 18新特性"
    items: ["并发模式", "Suspense改进", "Automatic batching"]
```
