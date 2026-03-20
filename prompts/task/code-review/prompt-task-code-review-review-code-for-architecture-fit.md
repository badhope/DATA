---
id: prompt-task-code-review-review-code-for-architecture-fit-v1
name: Review Code for Architecture Fit
summary: 评估代码是否符合整体架构设计，包括模式遵循、边界清晰、依赖方向正确
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: code-review
tags:
  - code-review
  - architecture
  - design-patterns
  - boundary
keywords:
  - 架构适配
  - 设计模式
  - 边界
  - 架构一致性
intent: |
  指导 AI 从架构角度审查代码。
  强调代码必须符合整体架构设计。
  核心原则：架构一致性是系统长期健康的基础。
applicable_models:
  - "*"
input_requirements:
  - code_path: string 代码路径
  - architecture_pattern: string 架构模式
  - context: string 代码上下文
output_requirements:
  - architecture_compliance: object 架构合规性
  - pattern_usage: array 模式使用情况
  - boundary_violations: array 边界违规
  - recommendations: array 建议
tool_requirements:
  - Read tool (读取代码)
  - Grep tool (分析依赖)
  - Glob tool (了解结构)
preconditions:
  - 有代码需要架构审查
anti_patterns:
  - 架构模式滥用
  - 边界不清
  - 依赖方向错误
failure_modes:
  - 模式过度：避免过度设计
  - 边界模糊：明确职责边界
  - 依赖混乱：确保单向依赖
self_check: |
  审查前自检：
  □ 是否理解了整体架构设计？
  □ 是否识别了架构模式？
  □ 是否检查了依赖方向？
  □ 是否发现了边界违规？
related_skills:
  - skill-architecture
  - skill-refactoring
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-task-code-review-review-code-for-maintainability
  - prompt-task-refactoring-improve-module-boundaries
---

# Context

架构一致性是软件系统长期健康的关键。代码必须符合整体架构设计，包括遵循既定模式、保持边界清晰、依赖方向正确。本 prompt 的核心目标是：**指导 AI 从架构角度审查代码**。

# Prompt Body

## 阶段 1：架构理解

### 1.1 架构模式

```markdown
## 架构模式

### 当前架构模式
| 项目 | 内容 |
|------|------|
| 模式类型 | [类型] |
| 层数 | [数量] |
| 核心原则 | [原则] |

### 架构层次
| # | 层次 | 职责 | 包含模块 |
|---|------|------|----------|
| 1 | [层次] | [职责] | [模块] |
| 2 | [层次] | [职责] | [模块] |
| 3 | [层次] | [职责] | [模块] |
```

### 1.2 设计原则

```markdown
## 设计原则

### SOLID 原则
| 原则 | 遵循程度 | 说明 |
|------|----------|------|
| 单一职责 | [程度] | [说明] |
| 开闭原则 | [程度] | [说明] |
| 里氏替换 | [程度] | [说明] |
| 接口隔离 | [程度] | [说明] |
| 依赖反转 | [程度] | [说明] |

### 架构原则
| 原则 | 遵循程度 | 说明 |
|------|----------|------|
| 单向依赖 | [程度] | [说明] |
| 边界清晰 | [程度] | [说明] |
| 职责单一 | [程度] | [说明] |
```

## 阶段 2：模式使用审查

### 2.1 设计模式使用

```markdown
## 设计模式使用

### 正确使用的模式
| # | 模式 | 位置 | 评估 |
|---|------|------|------|
| 1 | [模式] | [位置] | [好/需改进] |

### 不当使用的模式
| # | 模式 | 位置 | 问题 | 建议 |
|---|------|------|------|------|
| 1 | [模式] | [位置] | [问题] | [建议] |

### 缺失的合理模式
| # | 建议使用 | 位置 | 原因 |
|---|-----------|------|------|
| 1 | [模式] | [位置] | [原因] |
```

### 2.2 模式应用评估

```markdown
## 模式应用评估

### 模式一致性
| 模式类型 | 使用数量 | 一致性 | 评估 |
|----------|----------|--------|------|
| [类型] | [数量] | [一致/不一致] | [评估] |

### 模式复杂度
| 位置 | 模式 | 复杂度 | 评估 |
|------|------|--------|------|
| [位置] | [模式] | [值] | [评估] |
```

## 阶段 3：边界审查

### 3.1 层边界

```markdown
## 层边界审查

### 边界违规
| # | 位置 | 违规描述 | 违反的原则 | 建议 |
|---|------|----------|------------|------|
| 1 | [位置] | [描述] | [原则] | [建议] |

### 跨层调用
| # | 调用 | 位置 | 是否违规 | 说明 |
|---|------|------|----------|------|
| 1 | [调用] | [位置] | [是/否] | [说明] |
```

### 3.2 模块边界

```markdown
## 模块边界审查

### 边界违规
| # | 位置 | 违规描述 | 建议 |
|---|------|----------|------|
| 1 | [位置] | [描述] | [建议] |

### 循环依赖
| # | 路径 | 严重度 | 建议 |
|---|------|--------|------|
| 1 | [A→B→A] | [严重度] | [建议] |
```

## 阶段 4：依赖审查

### 4.1 依赖方向

```markdown
## 依赖方向审查

### 正确方向的依赖
| # | 从 | 到 | 评估 |
|---|-----|-----|------|
| 1 | [模块] | [模块] | [正确] |

### 错误方向的依赖
| # | 从 | 到 | 问题 | 建议 |
|---|-----|-----|------|------|
| 1 | [模块] | [模块] | [问题] | [建议] |
```

### 4.2 依赖层级

```markdown
## 依赖层级审查

### 层级违规
| # | 位置 | 当前层级 | 允许层级 | 违规类型 |
|---|------|----------|----------|----------|
| 1 | [位置] | [层级] | [层级] | [类型] |

### 依赖深度
| 指标 | 值 | 建议 | 评估 |
|------|-----|------|------|
| 最大深度 | [值] | ≤ 3 | [评估] |
| 平均深度 | [值] | ≤ 2 | [评估] |
```

## 阶段 5：架构合规性评估

### 5.1 合规性评分

```markdown
## 架构合规性评分

### 评分维度 (1-10)
| 维度 | 评分 | 说明 |
|------|------|------|
| 模式使用 | [分] | [说明] |
| 边界清晰 | [分] | [说明] |
| 依赖方向 | [分] | [说明] |
| 原则遵循 | [分] | [说明] |

### 综合评分
**架构合规性**: [总分]/10
**评级**: [A/B/C/D]
```

### 5.2 问题汇总

```markdown
## 架构问题汇总

### 严重问题 (P0)
| # | 问题 | 位置 | 影响 |
|---|------|------|------|
| 1 | [问题] | [位置] | [影响] |

### 重要问题 (P1)
| # | 问题 | 位置 | 影响 |
|---|------|------|------|
| 1 | [问题] | [位置] | [影响] |
```

## 阶段 6：改进建议

### 6.1 重构建议

```markdown
## 重构建议

### 高优先级
| # | 建议 | 位置 | 预期收益 | 难度 |
|---|------|------|----------|------|
| 1 | [建议] | [位置] | [收益] | [难度] |

### 中优先级
| # | 建议 | 位置 | 预期收益 | 难度 |
|---|------|------|----------|------|
| 1 | [建议] | [位置] | [收益] | [难度] |
```

### 6.2 架构演进建议

```markdown
## 架构演进建议

### 短期 (1-2周)
- [建议1]
- [建议2]

### 中期 (1个月)
- [建议1]
- [建议2]

### 长期 (3个月)
- [建议1]
- [建议2]
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `code_path` | 代码路径 | `src/services/order.service.ts` |
| `architecture_pattern` | 架构模式 | `"DDD 分层架构"` |
| `context` | 代码上下文 | `"订单领域服务"` |

# Usage Notes

1. **架构视角**：从整体架构角度评估
2. **模式合理**：确保模式使用得当
3. **边界清晰**：检查层和模块边界
4. **依赖正确**：确保依赖方向正确
5. **演进思维**：考虑架构演进需求

# Example Input

```yaml
code_path: "src/services/order.service.ts"
architecture_pattern: "分层架构"
context: "订单服务"
```

# Example Output

```yaml
architecture_compliance:
  overall_score: 6.5
  pattern_compliance: 7
  boundary_compliance: 5
  dependency_compliance: 7

pattern_usage:
  - pattern: "Repository Pattern"
    location: "OrderRepository"
    usage: "correct"
  - pattern: "Service Layer"
    location: "OrderService"
    usage: "incorrect"
    issue: "直接操作数据库，应通过 Repository"

boundary_violations:
  - type: "cross_layer_call"
    location: "OrderService.save"
    issue: "Service 层直接调用数据库连接"
    severity: high

recommendations:
  - priority: P0
    action: "OrderService 不应直接操作数据库，应通过 OrderRepository"
    effort: "2小时"
  - priority: P1
    action: "添加防腐层隔离外部服务依赖"
    effort: "4小时"
```
