---
id: prompt-task-refactoring-improve-module-boundaries-v1
name: Improve Module Boundaries
summary: 改善模块边界，使职责更清晰、依赖更合理、内聚更高
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: refactoring
tags:
  - refactoring
  - module-boundary
  - cohesion
  - coupling
keywords:
  - 模块边界
  - 职责划分
  - 内聚
  - 耦合
intent: |
  指导 AI 改善模块边界，提升代码结构质量。
  强调好的模块边界应该是高内聚、低耦合的。
  核心原则：模块边界应该反映职责划分，而不是随意划分。
applicable_models:
  - "*"
input_requirements:
  - module_structure: object 当前模块结构
  - problem_areas: array 问题区域
output_requirements:
  - boundary_analysis: object 边界分析
  - current_issues: array 当前问题
  - improvement_plan: array 改进计划
  - refactored_structure: object 重构后结构
tool_requirements:
  - Read tool (读取模块代码)
  - Grep tool (分析依赖关系)
  - Glob tool (了解整体结构)
preconditions:
  - 有模块边界问题需要改善
anti_patterns:
  - 模块职责不清
  - 模块间循环依赖
  - 模块过大或过小
  - 依赖方向错误
failure_modes:
  - 过度拆分：保持必要的模块大小
  - 拆分不足：确保职责单一
  - 依赖混乱：明确依赖方向
self_check: |
  改善前自检：
  □ 是否理解了当前模块结构和问题？
  □ 是否分析了依赖关系？
  □ 是否制定了合理的改善方案？
  □ 是否评估了重构风险？
related_skills:
  - skill-testing
  - skill-code-review
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-task-refactoring-extract-reusable-module
  - prompt-task-refactoring-propose-refactoring-plan
---

# Context

模块边界是软件架构的核心要素。良好的模块边界使系统易于理解、维护和扩展；糟糕的边界导致代码混乱、难以维护。本 prompt 的核心目标是：**指导 AI 分析和改善模块边界**。

# Prompt Body

## 阶段 1：当前结构分析

### 1.1 模块结构理解

```markdown
## 当前模块结构

### 模块列表
| 模块 | 路径 | 职责 | 复杂度 |
|------|------|------|--------|
| [模块1] | [路径] | [职责] | [值] |
| [模块2] | [路径] | [职责] | [值] |
| [模块3] | [路径] | [职责] | [值] |

### 模块大小分布
| 大小 | 模块数 | 理想范围 |
|------|--------|----------|
| < 100 行 | [N] | 正常 |
| 100-500 行 | [N] | 可接受 |
| > 500 行 | [N] | 过大 |

### 目录结构
```markdown
[目录树]
```
```

### 1.2 依赖关系分析

```markdown
## 依赖关系

### 依赖矩阵
| FROM/TO | 模块A | 模块B | 模块C |
|---------|-------|-------|-------|
| 模块A | - | ✓ | ✓ |
| 模块B | ✗ | - | ✓ |
| 模块C | ✗ | ✗ | - |

✓ = 有依赖, ✗ = 无依赖

### 循环依赖检测
```markdown
## 发现的循环依赖
| 循环路径 | 严重度 | 建议 |
|----------|--------|------|
| A → B → C → A | 高 | 必须消除 |
```

### 依赖深度
- 最大依赖深度: [N] 层
- 建议最大深度: 3 层
```

## 阶段 2：问题识别

### 2.1 边界问题

```markdown
## 模块边界问题

### 问题 1: 职责不清
**模块**: [模块名]
**问题**: [描述]
**证据**: [证据]

### 问题 2: 依赖不合理
**模块**: [模块名]
**问题**: [描述]
**影响**: [影响]

### 问题 3: 内聚不足
**模块**: [模块名]
**问题**: [描述]
**原因**: [原因]
```

### 2.2 问题分类

```markdown
## 问题分类

### 高优先级问题
| # | 问题 | 影响 | 建议 |
|---|------|------|------|
| 1 | [问题] | [影响] | [建议] |

### 中优先级问题
| # | 问题 | 影响 | 建议 |
|---|------|------|------|
| 1 | [问题] | [影响] | [建议] |
```

## 阶段 3：改善方案设计

### 3.1 原则检查

```markdown
## 设计原则检查

### 内聚性检查
| 模块 | 内聚类型 | 评分 | 状态 |
|------|----------|------|------|
| [模块] | 功能内聚 | [1-10] | [好/差] |

### 耦合性检查
| 模块对 | 耦合类型 | 评分 | 状态 |
|--------|----------|------|------|
| [模块对] | 内容耦合 | [1-10] | [好/差] |

### 原则违背
| 原则 | 违背模块 | 程度 |
|------|----------|------|
| 单一职责 | [模块] | [程度] |
| 开闭原则 | [模块] | [程度] |
```

### 3.2 改善策略

```markdown
## 改善策略

### 策略 1: 拆分过大的模块
**目标**: [模块名]
**方案**: [方案]
**预期收益**: [收益]

### 策略 2: 合并过小的模块
**目标**: [模块列表]
**方案**: [方案]
**预期收益**: [收益]

### 策略 3: 调整依赖方向
**目标**: [依赖关系]
**方案**: [方案]
**预期收益**: [收益]
```

## 阶段 4：实施计划

### 4.1 重构步骤

```markdown
## 重构步骤

### 步骤 1: [任务名称]
**操作**: [操作描述]
**变更**:
```yaml
变更前:
  - [变更前]

变更后:
  - [变更后]
```
**风险**: [风险]
**验证**: [验证方式]

### 步骤 2: [任务名称]
**操作**: [操作描述]
**变更**: [变更描述]
**风险**: [风险]
**验证**: [验证方式]
```

### 4.2 迁移策略

```markdown
## 迁移策略

### 直接迁移
**适用场景**: 独立模块，不影响其他代码
**步骤**: 1. 创建新模块 2. 迁移代码 3. 更新引用

### 平行迁移
**适用场景**: 涉及多个调用方
**步骤**: 1. 保留旧接口 2. 实现新逻辑 3. 逐步迁移调用方

### 特性切换
**适用场景**: 高风险重构
**步骤**: 1. 实现新模块 2. 添加开关 3. 灰度切换
```

## 阶段 5：验证

### 5.1 结构验证

```markdown
## 结构验证

### 依赖关系验证
```bash
# 验证无循环依赖
npm run depcheck

# 验证依赖方向
npm run dep-graph
```

### 结构改善
| 指标 | 改善前 | 改善后 | 变化 |
|------|--------|--------|------|
| 模块数量 | [N] | [N] | [变化] |
| 平均模块大小 | [值] | [值] | [变化] |
| 循环依赖 | [N] | [N] | [变化] |
```

### 5.2 功能验证

```markdown
## 功能验证

### 测试验证
- [ ] 所有测试通过
- [ ] 集成测试通过
- [ ] 端到端测试通过

### 代码审查
- [ ] 边界更清晰
- [ ] 职责更明确
- [ ] 依赖更合理
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `module_structure` | 当前模块结构 | `{modules: ["A", "B", "C"]}` |
| `problem_areas` | 问题区域 | `["循环依赖", "职责不清"]` |

# Usage Notes

1. **分析优先**：充分理解当前结构和问题
2. **原则指导**：遵循高内聚、低耦合原则
3. **渐进重构**：分步骤实施，逐步验证
4. **风险控制**：高风险重构需要更谨慎
5. **保持兼容**：确保对外接口兼容

# Example Input

```yaml
module_structure:
  modules:
    - name: "UserService"
      path: "src/services/user.service.ts"
      lines: 800
    - name: "OrderService"
      path: "src/services/order.service.ts"
      lines: 600
problem_areas:
  - "UserService 职责过多"
  - "两个服务存在循环依赖"
```

# Example Output

```yaml
boundary_analysis:
  module_count: 5
  avg_size: 450
  cohesion_score: 6.5
  coupling_score: 7.2

current_issues:
  - issue: "UserService 职责过多"
    evidence: "800 行代码，包含用户、权限、配置"
    severity: "high"
  - issue: "UserService ↔ OrderService 循环依赖"
    evidence: "User 调用 Order，Order 调用 User"
    severity: "critical"

improvement_plan:
  - action: "拆分 UserService"
    from: "UserService (800行)"
    to: "UserService(300) + AuthService(300) + ConfigService(200)"
  - action: "消除循环依赖"
    before: "UserService ↔ OrderService"
    after: "UserService → OrderService"

refactored_structure:
  modules:
    - name: "UserService"
      lines: 300
    - name: "AuthService"
      lines: 300
    - name: "ConfigService"
      lines: 200
  dependency_direction: "单向依赖，无循环"
```
