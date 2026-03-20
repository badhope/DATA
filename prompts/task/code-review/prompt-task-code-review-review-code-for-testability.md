---
id: prompt-task-code-review-review-code-for-testability-v1
name: Review Code for Testability
summary: 评估代码的可测试性，包括依赖管理、状态控制、接口设计
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: code-review
tags:
  - code-review
  - testability
  - mocking
  - isolation
keywords:
  - 可测试性
  - 依赖注入
  - Mock
  - 测试隔离
intent: |
  指导 AI 从可测试性角度审查代码。
  强调可测试性是代码质量的重要指标。
  核心原则：易于测试的代码往往是高质量的代码。
applicable_models:
  - "*"
input_requirements:
  - code_path: string 代码路径
  - existing_tests: array 现有测试
  - context: string 代码上下文
output_requirements:
  - testability_issues: array 可测试性问题
  - testing_barriers: array 测试障碍
  - refactoring_suggestions: array 重构建议
  - testability_score: number 可测试性评分
tool_requirements:
  - Read tool (读取代码)
  - Grep tool (分析依赖)
preconditions:
  - 有代码需要可测试性审查
anti_patterns:
  - 难以 Mock 的依赖
  - 硬编码依赖
  - 隐藏的副作用
failure_modes:
  - 依赖难以替换：使用依赖注入
  - 副作用隐藏：显式管理状态
  - 静态耦合：使用接口抽象
self_check: |
  审查前自检：
  □ 是否识别了所有依赖？
  □ 是否评估了 Mock 难度？
  □ 是否理解了状态管理？
  □ 是否发现了测试障碍？
related_skills:
  - skill-testing
  - skill-refactoring
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-task-code-review-review-code-for-maintainability
  - prompt-task-testing-generate-test-cases-for-code
---

# Context

可测试性是代码质量的重要指标。易于测试的代码通常也具有更好的设计：低耦合、单一职责、清晰的接口。本 prompt 的核心目标是：**指导 AI 评估和改进代码的可测试性**。

# Prompt Body

## 阶段 1：依赖分析

### 1.1 依赖识别

```markdown
## 依赖识别

### 外部依赖
| # | 依赖 | 类型 | 用途 | Mock 难度 |
|---|------|------|------|----------|
| 1 | [依赖] | [数据库/API/文件] | [用途] | [高/中/低] |

### 内部依赖
| # | 依赖 | 模块 | 用途 | Mock 难度 |
|---|------|------|------|----------|
| 1 | [依赖] | [模块] | [用途] | [高/中/低] |

### 系统依赖
| # | 依赖 | 用途 | 影响 |
|---|------|------|------|
| 1 | [依赖] | [用途] | [影响] |
```

### 1.2 依赖管理方式

```markdown
## 依赖管理方式

### 构造函数注入
| # | 位置 | 评估 |
|---|------|------|
| 1 | [位置] | [好/需改进] |

### 参数传入
| # | 位置 | 评估 |
|---|------|------|
| 1 | [位置] | [好/需改进] |

### 直接实例化
| # | 位置 | 问题 | 建议 |
|---|------|------|------|
| 1 | [位置] | [问题] | [建议] |
```

## 阶段 2：测试障碍识别

### 2.1 难以测试的模式

```markdown
## 难以测试的模式

### 静态方法调用
| # | 位置 | 问题 | 建议 |
|---|------|------|------|
| 1 | [位置] | [问题] | [建议] |

### 单例模式滥用
| # | 位置 | 问题 | 建议 |
|---|------|------|------|
| 1 | [位置] | [问题] | [建议] |

### 硬编码值
| # | 位置 | 问题 | 建议 |
|---|------|------|------|
| 1 | [位置] | [问题] | [建议] |
```

### 2.2 副作用

```markdown
## 副作用问题

### 全局状态修改
| # | 位置 | 问题 | 建议 |
|---|------|------|------|
| 1 | [位置] | [问题] | [建议] |

### 隐藏依赖
| # | 位置 | 问题 | 建议 |
|---|------|------|------|
| 1 | [位置] | [问题] | [建议] |

### 外部副作用
| # | 位置 | 问题 | 建议 |
|---|------|------|------|
| 1 | [位置] | [问题] | [建议] |
```

## 阶段 3：接口设计审查

### 3.1 接口复杂度

```markdown
## 接口复杂度

### 参数过多
| # | 函数 | 参数数量 | 问题 | 建议 |
|---|------|----------|------|------|
| 1 | [函数] | [数量] | [问题] | [建议] |

### 返回值复杂
| # | 函数 | 返回类型 | 问题 | 建议 |
|---|------|----------|------|------|
| 1 | [函数] | [类型] | [问题] | [建议] |
```

### 3.2 行为不确定性

```markdown
## 行为不确定性问题

### 时间依赖
| # | 位置 | 问题 | 建议 |
|---|------|------|------|
| 1 | [位置] | [问题] | [建议] |

### 随机行为
| # | 位置 | 问题 | 建议 |
|---|------|------|------|
| 1 | [位置] | [问题] | [建议] |

### 环境依赖
| # | 位置 | 问题 | 建议 |
|---|------|------|------|
| 1 | [位置] | [问题] | [建议] |
```

## 阶段 4：可测试性评分

### 4.1 评分维度

```markdown
## 可测试性评分

### 评分维度 (1-10)
| 维度 | 评分 | 说明 |
|------|------|------|
| 依赖注入 | [分] | [说明] |
| 接口设计 | [分] | [说明] |
| 状态管理 | [分] | [说明] |
| 副作用控制 | [分] | [说明] |
| 可观测性 | [分] | [说明] |

### 综合评分
**可测试性评分**: [总分]/10
**评级**: [A/B/C/D]
```

### 4.2 测试覆盖预测

```markdown
## 测试覆盖预测

### 容易测试的部分
| # | 代码 | 原因 |
|---|------|------|
| 1 | [代码] | [原因] |

### 难以测试的部分
| # | 代码 | 原因 | 建议 |
|---|------|------|------|
| 1 | [代码] | [原因] | [建议] |
```

## 阶段 5：改进建议

### 5.1 重构建议

```markdown
## 重构建议

### 高优先级 (P0)
| # | 建议 | 位置 | 预期收益 | 难度 |
|---|------|------|----------|------|
| 1 | [建议] | [位置] | [收益] | [难度] |

### 中优先级 (P1)
| # | 建议 | 位置 | 预期收益 | 难度 |
|---|------|------|----------|------|
| 1 | [建议] | [位置] | [收益] | [难度] |
```

### 5.2 测试策略建议

```markdown
## 测试策略建议

### 单元测试
**策略**: [策略]
**重点**: [重点]

### 集成测试
**策略**: [策略]
**重点**: [重点]

### Mock 策略
| 依赖 | Mock 方式 | 工具 |
|------|-----------|------|
| [依赖] | [方式] | [工具] |
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `code_path` | 代码路径 | `src/services/payment.service.ts` |
| `existing_tests` | 现有测试路径 | `tests/services/payment.test.ts` |
| `context` | 代码上下文 | `"支付服务"` |

# Usage Notes

1. **依赖注入**：优先使用依赖注入
2. **接口抽象**：通过接口隔离依赖
3. **状态显式**：避免隐藏状态
4. **副作用可控**：使副作用可控和可观测
5. **测试策略**：根据代码特点制定测试策略

# Example Input

```yaml
code_path: "src/services/payment.service.ts"
existing_tests:
  - "tests/services/payment.test.ts"
context: "支付服务"
```

# Example Output

```yaml
testability_issues:
  - type: "hardcoded_dependency"
    location: "PaymentService.constructor"
    issue: "直接实例化 StripeGateway"
    severity: high
  - type: "hidden_state"
    location: "PaymentService._cache"
    issue: "使用私有缓存变量，难以测试"
    severity: medium

testing_barriers:
  - barrier: "第三方 API 难以 Mock"
    location: "stripe.charge()"
    workaround: "使用接口包装"
  - barrier: "时间依赖"
    location: "isExpired()"
    workaround: "注入时钟服务"

refactoring_suggestions:
  - priority: P0
    action: "通过构造函数注入 StripeGateway"
    effort: "30分钟"
  - priority: P1
    action: "将缓存抽象为可注入的服务"
    effort: "1小时"

testability_score: 5.5
rating: "C"
```
