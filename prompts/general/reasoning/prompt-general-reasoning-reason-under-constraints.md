---
id: prompt-general-reasoning-reason-under-constraints-v1
name: Reason Under Constraints
summary: 在约束条件下进行推理
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: reasoning
tags:
  - reasoning
  - constraints
  - optimization
  - limitations
keywords:
  - 约束推理
  - 约束条件下
  - 优化问题
  - 限制条件
intent: |
  指导 AI 在明确的约束条件下进行推理，产生可行的解决方案。
  强调约束不是限制，而是定义问题边界的方式。
  核心原则：在约束内找到最优解，而非试图突破约束。
applicable_models:
  - "*"
input_requirements:
  - objective: string 目标
  - constraints: array 约束条件
  - resources: object 可用资源
output_requirements:
  - constraint_analysis: object 约束分析
  - feasible_solutions: array 可行解
  - optimal_solution: object 最优解
  - constraint_violation_risk: array 约束违反风险
tool_requirements:
  - Read tool (读取上下文)
preconditions:
  - 有明确的约束条件
anti_patterns:
  - 忽视约束
  - 假设可以突破约束
  - 约束分类不清
failure_modes:
  - 硬约束被违反：严格遵守硬约束
  - 约束冲突未识别：识别约束冲突
  - 可行域被误解：明确可行域边界
self_check: |
  推理前自检：
  □ 是否识别了所有约束？
  □ 是否区分了硬约束和软约束？
  □ 是否识别了约束冲突？
  □ 是否在可行域内寻找解？
related_skills:
  - skill-reasoning
  - skill-planning
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-reasoning-evaluate-tradeoffs-structurally
  - prompt-general-reasoning-compare-multiple-possible-solutions
---

# Context

现实决策总是在约束条件下进行的。理解、分类和处理约束是推理的重要部分。本 prompt 的核心目标是：**指导 AI 系统性地分析约束，在约束条件下找到最优解**。

# Prompt Body

## 阶段 1：约束识别

### 1.1 约束类型

```markdown
## 约束类型

### 硬约束（必须满足）
```markdown
**定义**: 必须满足的约束，违反则方案不可行
**示例**:
- 预算上限
- 法规要求
- 安全标准
- 技术上限

**处理方式**: 严格遵守，找出所有满足硬约束的方案
```

### 软约束（应当满足）
```markdown
**定义**: 应当满足的约束，但有一定弹性
**示例**:
- 交付时间（可适当延后）
- 性能目标（可适当放宽）
- 代码质量标准

**处理方式**: 尽量满足，评估违反代价
```

### 隐含约束（需要识别）
```markdown
**定义**: 隐含在不完整表述中的约束
**示例**:
- "快速开发"隐含时间约束
- "稳定系统"隐含可用性约束
- "简单方案"隐含复杂度约束

**处理方式**: 识别并明确化
```
```

### 1.2 约束来源

```markdown
## 约束来源

| # | 约束 | 类型 | 来源 | 明确程度 |
|---|------|------|------|----------|
| 1 | [约束] | [类型] | [来源] | [明确/隐含] |

### 常见约束来源
```markdown
**技术约束**: 技术限制、上游依赖、系统限制
**资源约束**: 时间、预算、人力
**业务约束**: 业务规则、法规合规、市场时机
**组织约束**: 流程、审批、文化
**质量约束**: 性能指标、安全标准、可用性要求
```
```

## 阶段 2：约束分析

### 2.1 约束明确化

```markdown
## 约束明确化

### 约束清单
| # | 约束 | 类型 | 量化指标 | 可变性 |
|---|------|------|----------|--------|
| 1 | [约束] | [硬/软] | [指标] | [固定/可协商] |

### 量化约束
```markdown
**约束1**: 时间 ≤ 3个月
**约束2**: 预算 ≤ 100万
**约束3**: 性能: QPS ≥ 1000
**约束4**: 可用性 ≥ 99.9%
```
```

### 2.2 约束冲突检测

```markdown
## 约束冲突检测

### 潜在冲突
| # | 冲突 | 约束A | 约束B | 分析 |
|---|------|-------|-------|------|
| 1 | [冲突] | [A] | [B] | [分析] |

### 冲突类型
```markdown
**直接冲突**: A 和 B 不能同时满足
**资源冲突**: 满足 A 会消耗满足 B 所需的资源
**时间冲突**: A 和 B 需要不同的时间安排
```

### 冲突解决策略
```markdown
**优先级策略**: 优先满足高优先级约束
**平衡策略**: 在冲突约束间找到平衡点
**分层策略**: 满足主要约束，次要约束尽量满足
**重协商策略**: 建议调整冲突约束之一
```
```

## 阶段 3：可行域分析

### 3.1 可行域定义

```markdown
## 可行域

### 约束边界
```markdown
**可行域**: 满足所有硬约束的解空间

**边界条件**:
- 约束1: [边界]
- 约束2: [边界]

**边界可视化**:
[如果有多个约束，可以用图示描述]
```
```

### 3.2 可行解搜索

```markdown
## 可行解搜索

### 搜索策略
```markdown
**穷举搜索**: 遍历所有可能的解
**启发式搜索**: 使用规则或经验指导搜索
**优化搜索**: 在满足约束的前提下优化目标
```

### 可行方案
| # | 方案 | 满足的约束 | 违反的约束 |
|---|------|------------|------------|
| 1 | [方案] | [约束] | [无/约束] |
```

## 阶段 4：约束下的优化

### 4.1 优化目标

```markdown
## 优化目标

### 主目标
```markdown
**目标**: [目标描述]
**优化方向**: [最大化/最小化]
**指标**: [具体指标]
```

### 约束下的优化
```markdown
**优化问题**:
最大化/最小化: [目标]
subject to: [约束列表]

**可行解空间**: [描述]
**最优解**: [描述]
```
```

### 4.2 解的质量评估

```markdown
## 解的质量评估

### 满足度评估
| # | 方案 | 硬约束满足 | 软约束满足 | 目标优化 |
|---|------|------------|------------|----------|
| 1 | [方案] | [✅/❌] | [度] | [值] |

### 帕累托最优
```markdown
**帕累托最优**: 不可能在不损害其他目标的情况下改善某个目标

**帕累托最优解**:
- 解A
- 解B
- 解C

**被支配的解**:
- 解D (被A支配)
```
```

## 阶段 5：约束违反风险管理

### 5.1 约束违反风险

```markdown
## 约束违反风险

### 风险识别
| # | 约束 | 违反风险 | 风险原因 | 缓解措施 |
|---|------|----------|----------|----------|
| 1 | [约束] | [高/中/低] | [原因] | [措施] |

### 高风险约束
```markdown
**约束**: [约束]
**风险等级**: 高
**触发条件**: [条件]
**影响**: [影响]
**缓解措施**: [措施]
```
```

### 5.2 应急计划

```markdown
## 应急计划

### 如果约束无法满足
```markdown
**场景**: [场景]
**触发条件**: [条件]
**影响**: [影响]
**应急方案**: [方案]
**决策者**: [谁决定]
```
```

## 阶段 6：输出模板

### 6.1 完整分析模板

```markdown
## 约束分析

### 约束清单
| # | 约束 | 类型 | 量化 | 可变性 |
|---|------|------|------|--------|
| 1 | [约束] | [硬/软] | [指标] | [固定/可协商] |

### 约束冲突
| # | 冲突 | 约束A | 约束B | 解决策略 |
|---|------|-------|-------|----------|
| 1 | [冲突] | [A] | [B] | [策略] |

### 可行解
```markdown
**可行域**: [描述]
**可行方案数**: [N]
**最优方案**: [方案]
```
```

### 6.2 解决方案模板

```markdown
## 解决方案

### 方案概述
```markdown
**方案**: [方案名称]

**约束满足情况**:
- ✅ 硬约束1: [满足情况]
- ✅ 硬约束2: [满足情况]
- ⚠️ 软约束1: [满足情况] (违反代价: [代价])

**优化目标达成**:
[目标]: [达成情况]
```
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `objective` | 目标 | `"优化系统性能"` |
| `constraints` | 约束条件 | `[{type: "hard", desc: "预算100万"}]` |
| `resources` | 可用资源 | `{budget: "100万", time: "3个月"}` |

# Usage Notes

1. **严格遵守硬约束**：硬约束是底线，不能突破
2. **量化约束**：尽可能量化约束，便于评估
3. **识别冲突**：约束冲突时要明确解决策略
4. **透明约束满足度**：清楚说明每个约束的满足情况
5. **提供应急计划**：高风险约束要准备应急计划

# Example Input

```yaml
objective: "设计一个高性能系统"
constraints:
  - type: "hard"
    desc: "预算不超过100万"
  - type: "hard"
    desc: "3个月内上线"
  - type: "soft"
    desc: "可用性99.9%以上"
resources:
  budget: "100万"
  time: "3个月"
  team: "5人"
```

# Example Output

```yaml
constraint_analysis:
  hard_constraints:
    - constraint: "预算不超过100万"
      quantified: "≤ 100万"
      satisfied: true
    - constraint: "3个月内上线"
      quantified: "≤ 90天"
      satisfied: true
  soft_constraints:
    - constraint: "可用性99.9%以上"
      quantified: "> 99.9%"
      satisfied: "partial"
      trade_off: "需要增加监控成本"

feasible_solutions:
  - name: "方案A: 云服务"
    constraints_met: ["预算", "时间"]
    constraints_partial: ["可用性(99.5%)"]
  - name: "方案B: 混合部署"
    constraints_met: ["预算", "时间", "可用性"]
    constraints_partial: []

optimal_solution:
  name: "方案B: 混合部署"
  rationale: "唯一满足所有硬约束和软约束的方案"
  cost: "85万"
  timeline: "2.5个月"
  availability: "99.95%"

constraint_violation_risk:
  - constraint: "预算"
    risk: "low"
    mitigation: "预留10%缓冲"
```
