---
id: prompt-task-refactoring-refactor-under-constraints-v1
name: Refactor Under Constraints
summary: 在约束条件下进行重构，包括时间、范围、技术债务、兼容性约束
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: refactoring
tags:
  - refactoring
  - constraints
  - technical-debt
  - incremental
keywords:
  - 约束下重构
  - 技术债务
  - 增量重构
  - 限制条件
intent: |
  指导 AI 在有限约束条件下进行有效的重构。
  强调重构不一定要一次性完成，可以是渐进式的。
  核心原则：在约束内最大化改善价值。
applicable_models:
  - "*"
input_requirements:
  - target_code: string 目标代码
  - constraints: object 约束条件
  - available_time: string 可用时间
output_requirements:
  - constraint_analysis: object 约束分析
  - prioritized_plan: array 优先级计划
  - incremental_approach: object 增量方案
  - quick_wins: array 快速改善
tool_requirements:
  - Read tool (读取代码)
  - Grep tool (分析依赖)
preconditions:
  - 有代码需要在约束下重构
anti_patterns:
  - 试图一次性解决所有问题
  - 忽略约束强行重构
  - 过度工程化
failure_modes:
  - 范围蔓延：严格控制范围
  - 时间超支：设定明确边界
  - 质量下降：保证基本质量底线
self_check: |
  重构前自检：
  □ 是否理解了所有约束条件？
  □ 是否在约束内制定了可行计划？
  □ 是否优先处理高价值目标？
  □ 是否设置了质量底线？
related_skills:
  - skill-testing
  - skill-code-review
  - skill-engineering-planning
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-task-refactoring-propose-refactoring-plan
  - prompt-task-engineering-planning-plan-incremental-delivery
---

# Context

实际工程中，重构很少能"完美"进行。常常需要在时间紧迫、技术债务严重、兼容性要求高等约束下进行重构。本 prompt 的核心目标是：**指导 AI 在明确约束下制定和执行有效的重构计划**。

# Prompt Body

## 阶段 1：约束分析

### 1.1 约束识别

```markdown
## 约束识别

### 时间约束
| 项目 | 约束 |
|------|------|
| 可用时间 | [时间] |
| 截止日期 | [日期] |
| 时间紧迫度 | [高/中/低] |

### 范围约束
| 项目 | 约束 |
|------|------|
| 可修改范围 | [范围] |
| 不可修改范围 | [范围] |
| 核心功能限制 | [限制] |

### 技术约束
| 约束 | 影响 | 缓解措施 |
|------|------|----------|
| [约束] | [影响] | [措施] |
| 旧版兼容 | API 不能改变 | 保持接口兼容 |
| 性能要求 | 不能降低性能 | 性能测试验证 |
```

### 1.2 约束冲突分析

```markdown
## 约束冲突分析

### 潜在冲突
| 约束1 | 约束2 | 冲突描述 | 解决方案 |
|--------|--------|----------|----------|
| [约束] | [约束] | [描述] | [方案] |

### 优先级判定
| 约束 | 优先级 | 理由 |
|------|--------|------|
| [约束] | [P0/P1] | [理由] |
```

## 阶段 2：价值分析

### 2.1 改善价值评估

```markdown
## 改善价值评估

### 候选区域
| # | 区域 | 复杂度 | 价值 | 风险 | 得分 |
|---|------|--------|------|------|------|
| 1 | [区域] | [值] | [值] | [值] | [分] |
| 2 | [区域] | [值] | [值] | [值] | [分] |

### 评分标准
| 维度 | 权重 | 评分标准 |
|------|------|----------|
| 复杂度 | 30% | 越低越高分 |
| 价值 | 40% | 越重要越高分 |
| 风险 | 30% | 越低越高分 |
```

### 2.2 快速改善识别

```markdown
## 快速改善 (Quick Wins)

### 高价值、低风险
| 改善 | 价值 | 风险 | 时间 | 优先级 |
|------|------|------|------|--------|
| [改善] | [高] | [低] | [短] | P0 |

### 立即可做
- [ ] 命名改善
- [ ] 添加注释
- [ ] 简单提取
```

## 阶段 3：渐进式计划

### 3.1 增量策略

```markdown
## 增量重构策略

### 策略 1: 逐步替换
**适用场景**: 无法一次性修改所有代码
**步骤**:
1. 创建新实现
2. 保持旧接口
3. 逐步迁移调用方

### 策略 2: 包装器模式
**适用场景**: 需要改变核心逻辑但保持接口
**步骤**:
1. 创建包装器
2. 内部调用新逻辑
3. 验证功能

### 策略 3: 特性开关
**适用场景**: 高风险重构
**步骤**:
1. 实现新逻辑
2. 添加开关
3. 灰度切换
```

### 3.2 分阶段计划

```markdown
## 分阶段计划

### 阶段 1: 基础改善 (第 [N] 天)
**目标**: [目标]
**任务**:
- [ ] [任务1]
- [ ] [任务2]
**交付**: [交付物]
**验收标准**: [标准]

### 阶段 2: 核心重构 (第 [N] 天)
**目标**: [目标]
**任务**:
- [ ] [任务1]
- [ ] [任务2]
**交付**: [交付物]
**验收标准**: [标准]

### 阶段 3: 完善收尾 (第 [N] 天)
**目标**: [目标]
**任务**:
- [ ] [任务1]
- [ ] [任务2]
**交付**: [交付物]
**验收标准**: [标准]
```

## 阶段 4：约束下的执行

### 4.1 质量底线

```markdown
## 质量底线

### 必须保证
| 项目 | 底线 | 验证方式 |
|------|------|----------|
| 功能正确 | 行为不变 | 测试通过 |
| 性能 | 不明显下降 | 性能测试 |
| 兼容性 | 接口兼容 | 兼容性测试 |
| 可读性 | 不降低 | 代码审查 |

### 红线
- [ ] 不能破坏核心功能
- [ ] 不能引入安全漏洞
- [ ] 不能降低测试覆盖率
```

### 4.2 风险管理

```markdown
## 约束下的风险管理

### 风险识别
| # | 风险 | 触发条件 | 缓解措施 |
|---|------|----------|----------|
| 1 | [风险] | [条件] | [措施] |

### 时间风险应对
| 场景 | 应对策略 |
|------|----------|
| 时间不足 | 缩小范围，只做最高价值改善 |
| 发现更多问题 | 记录问题，先完成计划内任务 |
| 回归问题 | 立即停止，优先修复 |
```

## 阶段 5：验证与收尾

### 5.1 约束验证

```markdown
## 约束验证

### 时间验证
| 任务 | 计划 | 实际 | 状态 |
|------|------|------|------|
| [任务] | [时间] | [时间] | [✓/✗] |

### 范围验证
- [ ] 在允许范围内修改
- [ ] 未触及禁止修改区域
```

### 5.2 价值验证

```markdown
## 价值验证

### 改善完成度
| 目标 | 状态 | 完成度 |
|------|------|--------|
| [目标] | [完成/未完成] | [百分比] |

### 投入产出比
- **投入时间**: [时间]
- **价值收获**: [描述]
- **评估**: [评估]
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `target_code` | 目标代码路径 | `src/services/order.service.ts` |
| `constraints` | 约束条件 | `{time: "2天", scope: "仅内部重构", backwardCompat: true}` |
| `available_time` | 可用时间 | `"2天"` |

# Usage Notes

1. **约束优先**：先理解约束，再制定计划
2. **价值导向**：在有限时间内最大化价值
3. **渐进改善**：不能一次性解决，保持增量
4. **底线保证**：在约束下也要保持质量底线
5. **记录债务**：无法现在解决的问题要记录

# Example Input

```yaml
target_code: "src/services/order.service.ts"
constraints:
  time: "3天"
  scope: "order 服务内部"
  backward_compatible: true
  test_coverage_min: 70
available_time: "3天"
```

# Example Output

```yaml
constraint_analysis:
  time_constraint: "3天"
  scope_constraint: "order 服务内部"
  compatibility: "必须向后兼容"
  min_coverage: 70

prioritized_plan:
  phase1:
    title: "快速改善"
    duration: "1天"
    tasks: ["命名改善", "添加注释", "消除简单重复"]
  phase2:
    title: "核心重构"
    duration: "1.5天"
    tasks: ["拆分过函数", "提取可复用逻辑", "改善模块边界"]
  phase3:
    title: "验证收尾"
    duration: "0.5天"
    tasks: ["运行测试", "性能验证", "代码审查"]

incremental_approach:
  strategy: "逐步替换"
  approach: "保持旧接口，内部调用新实现"

quick_wins:
  - "统一命名风格"
  - "添加关键注释"
  - "消除 3 处明显重复"
```
