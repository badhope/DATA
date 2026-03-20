---
id: prompt-task-refactoring-reduce-code-complexity-v1
name: Reduce Code Complexity
summary: 降低代码的圈复杂度和认知负担，使代码更易于理解和维护
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: task
sub_category: refactoring
tags:
  - refactoring
  - complexity
  - simplification
keywords:
  - 降低复杂度
  - 圈复杂度
  - 简化代码
  - 认知负担
intent: |
  指导 AI 识别并降低代码复杂度。
  强调复杂代码是高维护成本和 bug 的根源。
  核心原则：简单即可靠，复杂代码需要被重构。
applicable_models:
  - "*"
input_requirements:
  - target_code: string 目标代码
  - complexity_threshold: number (可选) 复杂度阈值
output_requirements:
  - complexity_analysis: object 复杂度分析
  - identified_hotspots: array 复杂度热点
  - refactoring_suggestions: array 重构建议
  - simplified_code: string 简化后的代码
tool_requirements:
  - Read tool (读取代码)
  - Grep tool (分析调用模式)
  - RunCommand tool (运行复杂度分析)
preconditions:
  - 有代码需要降低复杂度
anti_patterns:
  - 简化过度导致可读性下降
  - 引入不必要的抽象
  - 改变原有逻辑
failure_modes:
  - 过度简化：保持必要的复杂度
  - 抽象过度：避免不必要的间接层
self_check: |
  重构前自检：
  □ 是否测量了当前复杂度？
  □ 是否理解了复杂度的来源？
  □ 简化方案是否保持了可读性？
  □ 是否验证了简化后行为不变？
related_skills:
  - skill-testing
  - skill-code-review
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-task-refactoring-refactor-code-without-changing-behavior
  - prompt-task-refactoring-propose-refactoring-plan
---

# Context

复杂代码是软件维护的主要敌人。高复杂度代码难以理解、难以测试、容易引入 bug。本 prompt 的核心目标是：**指导 AI 识别代码复杂度来源并安全地降低复杂度**。

# Prompt Body

## 阶段 1：复杂度分析

### 1.1 复杂度指标测量

```markdown
## 复杂度指标

### 圈复杂度 (Cyclomatic Complexity)
| 函数 | 当前值 | 阈值 | 风险等级 |
|------|--------|------|----------|
| [函数1] | [值] | [阈值] | [高/中/低] |
| [函数2] | [值] | [阈值] | [高/中/低] |

### 认知复杂度
| 函数 | 认知复杂度 | 问题描述 |
|------|------------|----------|
| [函数1] | [值] | [描述] |

### 代码行数
| 函数 | 行数 | 单函数行数限制 | 状态 |
|------|------|----------------|------|
| [函数1] | [行数] | 50-100 | [✓/✗] |
```

### 1.2 复杂度来源识别

```markdown
## 复杂度来源

### 类型 1: 条件嵌套过深
```markdown
**位置**: [文件:行号]
**问题**: 嵌套层级 [N] 层
**代码片段**:
```[语言]
[代码片段]
```
**建议**: 提取为独立函数或使用卫语句
```

### 类型 2: 条件分支过多
```markdown
**位置**: [文件:行号]
**问题**: 分支数量 [N] 个
**建议**: 使用策略模式或表驱动
```

### 类型 3: 循环嵌套
```markdown
**位置**: [文件:行号]
**问题**: 嵌套层级 [N] 层
**建议**: 提取为独立函数或使用流式 API
```

### 类型 4: 职责过多
```markdown
**位置**: [类/函数]
**问题**: 承担了 [N] 种职责
**建议**: 拆分职责
```
```

## 阶段 2：热点识别

### 2.1 高复杂度区域

```markdown
## 复杂度热点

### 必须重构区域 (复杂度 > 15)
| # | 位置 | 复杂度 | 主要问题 |
|---|------|--------|----------|
| 1 | [文件:函数] | [值] | [问题] |

### 建议重构区域 (复杂度 10-15)
| # | 位置 | 复杂度 | 主要问题 |
|---|------|--------|----------|
| 1 | [文件:函数] | [值] | [问题] |

### 可选重构区域 (复杂度 5-10)
| # | 位置 | 复杂度 | 主要问题 |
|---|------|--------|----------|
| 1 | [文件:函数] | [值] | [问题] |
```

### 2.2 重构优先级

```markdown
## 重构优先级

### 优先级 1 (必须处理)
| 位置 | 原因 | 收益 |
|------|------|------|
| [位置] | [原因] | [收益] |

### 优先级 2 (强烈建议)
| 位置 | 原因 | 收益 |
|------|------|------|
| [位置] | [原因] | [收益] |

### 优先级 3 (可以考虑)
| 位置 | 原因 | 收益 |
|------|------|------|
| [位置] | [原因] | [收益] |
```

## 阶段 3：降低复杂度策略

### 3.1 条件简化

```markdown
## 条件简化策略

### 策略 1: 卫语句 (Guard Clauses)
**适用场景**: 深层嵌套的条件判断
**示例**:
```[语言]
# 重构前
def process():
    if condition1:
        if condition2:
            if condition3:
                do_something()

# 重构后
def process():
    if not condition1:
        return
    if not condition2:
        return
    if not condition3:
        return
    do_something()
```

### 策略 2: 表驱动
**适用场景**: 多分支等效判断
**示例**:
```[语言]
# 重构前
if status == 'pending':
    handle_pending()
elif status == 'approved':
    handle_approved()
elif status == 'rejected':
    handle_rejected()

# 重构后
HANDLERS = {
    'pending': handle_pending,
    'approved': handle_approved,
    'rejected': handle_rejected,
}
handler = HANDLERS.get(status)
if handler:
    handler()
```

### 策略 3: 提取条件表达式
**适用场景**: 复杂条件判断
**示例**:
```[语言]
# 重构前
if user.is_active and user.has_permission and not user.is_banned:
    do_something()

# 重构后
def can_access(user):
    return user.is_active and user.has_permission and not user.is_banned

if can_access(user):
    do_something()
```
```

### 3.2 循环简化

```markdown
## 循环简化策略

### 策略 1: 提取循环体
**适用场景**: 循环体过于复杂
**示例**:
```[语言]
# 重构前
for item in items:
    # 50 行复杂逻辑

# 重构后
for item in items:
    process_item(item)

def process_item(item):
    # 50 行复杂逻辑
```

### 策略 2: 使用流式 API
**适用场景**: 简单循环转换
**示例**:
```[语言]
# 重构前
result = []
for item in items:
    result.append(item.value * 2)

# 重构后
result = [item.value * 2 for item in items]
```
```

### 3.3 函数简化

```markdown
## 函数简化策略

### 策略 1: 提取函数
**适用场景**: 函数过长
**原则**: 函数只做一件事

### 策略 2: 合并函数
**适用场景**: 过多细粒度函数
**原则**: 保持函数粒度合理

### 策略 3: 参数对象
**适用场景**: 参数过多
**原则**: 相关参数封装为对象
```

## 阶段 4：实施重构

### 4.1 重构步骤

```markdown
## 重构步骤

### 步骤 1: [热点位置]
**原始复杂度**: [值]
**目标复杂度**: [值]
**策略**: [采用策略]
**验证**: [验证方式]

### 步骤 2: [热点位置]
**原始复杂度**: [值]
**目标复杂度**: [值]
**策略**: [采用策略]
**验证**: [验证方式]
```

### 4.2 代码对比

```markdown
## 代码对比

### 重构前
```[语言]
[原始代码]
```

### 重构后
```[语言]
[重构后代码]
```

### 变更说明
- [变更1]
- [变更2]
```

## 阶段 5：验证

### 5.1 复杂度验证

```markdown
## 复杂度验证

### 重构后指标
| 函数 | 重构前 | 重构后 | 改善 |
|------|--------|--------|------|
| [函数] | [值] | [值] | [改善] |

### 总体改善
- 圈复杂度平均降低: [百分比]
- 认知复杂度平均降低: [百分比]
```

### 5.2 功能验证

```markdown
## 功能验证

### 测试验证
- [ ] 所有测试通过
- [ ] 行为与重构前一致

### 代码审查
- [ ] 可读性改善
- [ ] 无过度抽象
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `target_code` | 目标代码路径 | `src/services/order.service.ts` |
| `complexity_threshold` | 复杂度阈值 | `10` |

# Usage Notes

1. **测量优先**：先测量再重构
2. **目标明确**：设定合理的目标复杂度
3. **小步重构**：分步骤降低复杂度
4. **验证充分**：每步验证行为不变
5. **保持可读性**：简化不能降低可读性

# Example Input

```yaml
target_code: "src/utils/validation.helper.ts"
complexity_threshold: 10
```

# Example Output

```yaml
complexity_analysis:
  total_functions: 5
  high_complexity: 2
  medium_complexity: 1
  low_complexity: 2

identified_hotspots:
  - location: "validateOrder:15"
    complexity: 18
    type: "nested_conditions"
  - location: "processPayment:42"
    complexity: 15
    type: "too_many_branches"

refactoring_suggestions:
  - location: "validateOrder"
    strategy: "extract_guard_clauses"
    expected_reduction: "18 → 6"
  - location: "processPayment"
    strategy: "table_driven"
    expected_reduction: "15 → 4"

simplified_code:
  path: "src/utils/validation.helper.ts (重构后)"
  verification: "所有测试通过，行为一致"
```
