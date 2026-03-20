---
id: prompt-task-code-review-summarize-code-review-findings-v1
name: Summarize Code Review Findings
summary: 将代码审查发现汇总成结构化报告，适合人类阅读和团队共享
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: code-review
tags:
  - code-review
  - summary
  - report
  - findings
keywords:
  - 审查汇总
  - 报告
  - 发现
  - 团队共享
intent: |
  指导 AI 将代码审查发现汇总成结构化报告。
  强调报告必须清晰、可操作、适合团队共享。
  核心原则：好的审查报告是行动导向的。
applicable_models:
  - "*"
input_requirements:
  - review_findings: array 审查发现
  - review_scope: object 审查范围
  - code_path: string 代码路径
output_requirements:
  - executive_summary: string 执行摘要
  - prioritized_findings: array 优先级发现
  - detailed_report: object 详细报告
  - action_plan: array 行动方案
tool_requirements:
  - Read tool (读取代码)
preconditions:
  - 有代码审查发现需要汇总
anti_patterns:
  - 简单罗列问题
  - 没有优先级
  - 缺乏可操作性
failure_modes:
  - 报告太长：聚焦关键信息
  - 报告太短：遗漏重要细节
  - 建议不可操作：提供具体行动
self_check: |
  汇总前自检：
  □ 是否识别了关键发现？
  □ 是否设置了合理优先级？
  □ 建议是否具体可操作？
  □ 报告是否适合目标读者？
related_skills:
  - skill-documentation-for-code
  - skill-engineering-planning
related_workflows:
  - workflow-change-verify-report
related_prompts:
  - prompt-task-code-review-review-code-for-quality
  - prompt-task-engineering-planning-define-acceptance-criteria
---

# Context

代码审查的价值不仅在于发现问题，还在于将发现有效地传达给开发者和团队。一份好的审查报告应该清晰、结构化、可操作，适合不同读者（开发者、技术负责人、团队成员）阅读。本 prompt 的核心目标是：**指导 AI 将代码审查发现汇总成高质量的结构化报告**。

# Prompt Body

## 阶段 1：发现整理

### 1.1 发现分类

```markdown
## 发现分类

### 按类型分类
| 类型 | 数量 | 占比 |
|------|------|------|
| 功能问题 | [N] | [百分比] |
| 质量问题 | [N] | [百分比] |
| 安全问题 | [N] | [百分比] |
| 性能问题 | [N] | [百分比] |
| 其他 | [N] | [百分比] |

### 按严重度分类
| 严重度 | 数量 | 占比 |
|--------|------|------|
| Critical | [N] | [百分比] |
| High | [N] | [百分比] |
| Medium | [N] | [百分比] |
| Low | [N] | [百分比] |

### 按位置分类
| 模块/文件 | 问题数 | 严重度分布 |
|-----------|--------|------------|
| [模块] | [N] | Critical:N, High:N |
```

### 1.2 发现优先级排序

```markdown
## 发现优先级排序

### 必须立即处理 (Critical)
| # | 发现 | 位置 | 影响 |
|---|------|------|------|
| 1 | [发现] | [位置] | [影响] |

### 应该尽快处理 (High)
| # | 发现 | 位置 | 影响 |
|---|------|------|------|
| 1 | [发现] | [位置] | [影响] |

### 应该计划处理 (Medium)
| # | 发现 | 位置 | 影响 |
|---|------|------|------|
| 1 | [发现] | [位置] | [影响] |

### 可选处理 (Low)
| # | 发现 | 位置 | 建议 |
|---|------|------|------|
| 1 | [发现] | [位置] | [建议] |
```

## 阶段 2：执行摘要

### 2.1 审查概要

```markdown
## 审查概要

| 项目 | 内容 |
|------|------|
| 审查代码 | [代码路径] |
| 审查日期 | [日期] |
| 审查范围 | [范围] |
| 代码规模 | [规模] |
| 发现总数 | [N] |

### 关键指标
| 指标 | 值 | 评估 |
|------|-----|------|
| 总体质量 | [评分] | [评估] |
| 严重问题数 | [N] | [评估] |
| 建议覆盖率 | [百分比] | [评估] |
```

### 2.2 核心发现摘要

```markdown
## 核心发现摘要

### 最重要的 3 个发现
1. **[发现1]**
   - 位置: [位置]
   - 影响: [影响]
   - 紧急度: [紧急度]

2. **[发现2]**
   - 位置: [位置]
   - 影响: [影响]
   - 紧急度: [紧急度]

3. **[发现3]**
   - 位置: [位置]
   - 影响: [影响]
   - 紧急度: [紧急度]

### 整体评价
[2-3 句话的整体评价]
```

## 阶段 3：详细报告

### 3.1 Critical 问题详情

```markdown
## Critical 问题详情

### 问题 1: [问题标题]
**位置**: [位置]
**类型**: [类型]
**描述**: [详细描述]
**证据**:
```[语言]
[证据代码]
```
**影响**: [影响分析]
**建议修复**: [具体建议]
**预期工时**: [工时]
**优先级**: P0
```

### 3.2 High 问题详情

```markdown
## High 问题详情

### 问题 1: [问题标题]
**位置**: [位置]
**类型**: [类型]
**描述**: [详细描述]
**建议修复**: [具体建议]
**预期工时**: [工时]
**优先级**: P1
```

### 3.3 Medium/Low 问题汇总

```markdown
## Medium/Low 问题汇总

| # | 问题 | 位置 | 类型 | 建议 | 优先级 |
|---|------|------|------|------|--------|
| 1 | [问题] | [位置] | [类型] | [建议] | P2/P3 |
```

## 阶段 4：模式分析

### 4.1 重复问题模式

```markdown
## 重复问题模式

### 结构性模式
| 模式 | 出现次数 | 位置 | 根因 | 建议 |
|------|----------|------|------|------|
| [模式] | [N] | [位置] | [根因] | [建议] |

### 建议的系统性改进
```markdown
**系统性改进**: [改进描述]

**收益**:
- [收益1]
- [收益2]

**实施建议**: [建议]
```
```

### 4.2 根因分析

```markdown
## 根因分析

### 主要根因
| # | 根因 | 相关问题数 | 建议 |
|---|------|------------|------|
| 1 | [根因] | [N] | [建议] |

### 架构/设计问题
| # | 问题 | 影响 | 建议 |
|---|------|------|------|
| 1 | [问题] | [影响] | [建议] |
```

## 阶段 5：行动方案

### 5.1 立即行动 (24-48小时)

```markdown
## 立即行动

| # | 行动 | 负责人 | 截止日期 | 验证方式 |
|---|------|--------|----------|----------|
| 1 | [行动] | [负责人] | [日期] | [验证] |

### 行动详情
```markdown
**行动 1**: [行动描述]
- 问题: [问题]
- 方案: [方案]
- 风险: [风险]
- 回滚计划: [计划]
```
```

### 5.2 短期行动 (1-2周)

```markdown
## 短期行动

| # | 行动 | 负责人 | 截止日期 | 验证方式 |
|---|------|--------|----------|----------|
| 1 | [行动] | [负责人] | [日期] | [验证] |
```

### 5.3 中期计划 (1个月)

```markdown
## 中期计划

### 架构改进
| 改进 | 目标 | 里程碑 | 验收标准 |
|------|------|--------|----------|
| [改进] | [目标] | [里程碑] | [标准] |

### 代码质量改进
| 改进 | 目标 | 里程碑 | 验收标准 |
|------|------|--------|----------|
| [改进] | [目标] | [里程碑] | [标准] |
```

## 阶段 6：报告输出格式

### 6.1 适合开发者

```markdown
## 代码审查报告 (开发者版)

### 发现清单
**Critical**: [N] 个
**High**: [N] 个
**Medium**: [N] 个
**Low**: [N] 个

### 需要修复的问题
1. [问题1] - [位置] - [优先级]
2. [问题2] - [位置] - [优先级]

### 建议改进
- [改进1]
- [改进2]
```

### 6.2 适合技术负责人

```markdown
## 代码审查报告 (技术负责人版)

### 执行摘要
[2-3 句话摘要]

### 风险评估
| 风险类型 | 风险等级 | 关键问题 |
|----------|----------|----------|
| 安全性 | [等级] | [问题] |
| 稳定性 | [等级] | [问题] |
| 可维护性 | [等级] | [问题] |

### 需要关注的决策
1. [决策1]
2. [决策2]

### 资源需求
- 修复 Critical: [工时]
- 修复 High: [工时]
- 架构改进: [工时]
```

### 6.3 完整报告结构

```markdown
# [代码路径] 代码审查报告

## 1. 审查概要
[审查基本信息]

## 2. 执行摘要
[核心发现摘要]

## 3. 详细发现
[所有问题的详细描述]

## 4. 模式分析
[重复问题和根因分析]

## 5. 行动方案
[分阶段的行动计划]

## 6. 附录
[原始数据、工具输出等]
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `review_findings` | 审查发现列表 | `[{type, location, issue, severity, suggestion}]` |
| `review_scope` | 审查范围 | `{files: [...], date: "2024-01-01"}` |
| `code_path` | 代码路径 | `src/services/order.service.ts` |

# Usage Notes

1. **分读者**：根据读者调整报告详细程度
2. **聚焦关键**：突出最重要的发现
3. **可操作**：每个建议都必须可执行
4. **结构清晰**：使用标题和表格提高可读性
5. **适度量化**：用数据支持结论

# Example Input

```yaml
review_findings:
  - type: "security"
    location: "UserService.validate:45"
    issue: "未验证用户输入"
    severity: "critical"
    suggestion: "添加输入验证"
  - type: "maintainability"
    location: "UserService.format:20"
    issue: "函数过长"
    severity: "medium"
    suggestion: "拆分函数"

review_scope:
  files:
    - "src/services/user.service.ts"
  date: "2024-01-15"

code_path: "src/services/user.service.ts"
```

# Example Output

```yaml
executive_summary: |
  审查了 user.service.ts，发现 2 个问题。
  1 个 Critical 安全问题需要立即处理，
  1 个 Medium 可维护性问题建议计划处理。
  整体代码质量良好，建议优先修复安全问题。

prioritized_findings:
  - priority: P0
    finding: "未验证用户输入"
    location: "UserService.validate:45"
    impact: "可能导致注入攻击"
    action: "添加输入验证"
  - priority: P1
    finding: "函数过长 (150行)"
    location: "UserService.format:20"
    impact: "难以维护"
    action: "拆分为多个小函数"

action_plan:
  immediate:
    - action: "添加用户输入验证"
      owner: "开发者"
      deadline: "2024-01-17"
  short_term:
    - action: "重构 format 函数"
      owner: "开发者"
      deadline: "2024-01-22"
```
