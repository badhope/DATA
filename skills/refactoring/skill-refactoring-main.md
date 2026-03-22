---
id: skill-refactoring-main-v1
name: Code Refactoring
summary: 系统性代码重构流程，从分析到实施的完整指南
type: skill
category: refactoring
tags: [refactoring, code-quality, maintainability, architecture, improvement]
keywords: [重构, 代码优化, 架构改进, 设计模式, 技术债务]
intent: 通过系统性重构提升代码可读性、可维护性和性能，同时保持功能行为不变
use_cases:
  - 代码难以理解需要重构时
  - 存在重复代码需要提取时
  - 性能瓶颈需要优化时
  - 架构升级需要改造时
  - 技术债务需要偿还时
inputs:
  - name: code_context
    type: string
    required: true
    description: 需要重构的代码上下文
  - name: refactoring_goal
    type: string
    required: true
    description: 重构目标（可读性/性能/架构/测试性）
  - name: constraints
    type: object
    required: false
    description: 约束条件（时间、范围、兼容性）
outputs:
  - name: analysis_report
    type: markdown
    description: 代码分析报告
  - name: refactoring_plan
    type: markdown
    description: 重构计划
  - name: refactored_code
    type: code
    description: 重构后的代码
  - name: verification_report
    type: markdown
    description: 验证报告
prerequisites:
  - 理解原始代码功能
  - 了解目标代码的测试覆盖
  - 熟悉相关设计模式
steps:
  - step: 1
    action: 分析代码现状，识别重构点
  - step: 2
    action: 制定重构策略和计划
  - step: 3
    action: 建立安全网（测试备份）
  - step: 4
    action: 执行小步增量重构
  - step: 5
    action: 持续验证和测试
  - step: 6
    action: 清理和优化
examples:
  - input: "code: function with duplication, goal: reduce complexity"
    output: "extracted functions, reduced complexity score"
    notes: 演示如何通过提取函数减少重复
related_skills:
  - skill-coding-code-review-v1
  - skill-debugging-v1
  - skill-coding-v1
related_prompts:
  - prompt-task-refactoring-extract-reusable-module
  - prompt-task-refactoring-reduce-code-complexity
  - prompt-task-refactoring-improve-module-boundaries
  - prompt-task-refactoring-refactor-for-readability
notes: |
  重要原则：
  - 每次只做一个改变
  - 保持代码行为不变
  - 确保测试通过后再继续
  - 小步快跑，持续集成
created: 2026-03-22
updated: 2026-03-22
version: 1.0.0
deprecated: false
---

# Code Refactoring Skill

系统性代码重构的完整指南，帮助你安全、高效地改进代码质量。

## 核心原则

### 重构黄金法则

1. **行为不变**: 重构不改写功能，只改变实现方式
2. **小步快跑**: 每次只做一个改变
3. **持续验证**: 每步都要运行测试
4. **可逆操作**: 保持代码在可工作状态

### 重构前检查清单

- [ ] 有完整的测试覆盖吗？
- [ ] 了解代码的所有使用场景吗？
- [ ] 有版本控制可以回滚吗？
- [ ] 重构范围和时间框定了吗？

## 重构类型

### 1. 代码级重构

| 类型 | 目标 | 典型操作 |
|------|------|----------|
| 提取函数 | 可读性 | 长函数拆分 |
| 合并函数 | 简化 | 相似函数合并 |
| 重命名变量 | 可读性 | 语义化命名 |
| 简化条件 | 可读性 | 提取条件表达式 |

### 2. 模块级重构

| 类型 | 目标 | 典型操作 |
|------|------|----------|
| 提取模块 | 单一职责 | 分离关注点 |
| 内联模块 | 简化 | 合并小模块 |
| 移动函数 | 职责归属 | 调整位置 |
| 提取接口 | 解耦 | 定义抽象 |

### 3. 架构级重构

| 类型 | 目标 | 典型操作 |
|------|------|----------|
| 层次调整 | 清晰结构 | 分层重组 |
| 模式应用 | 设计优化 | 引入模式 |
| 依赖倒置 | 解耦 | 依赖抽象 |

## 重构流程

### Phase 1: 分析

```
1. 理解代码上下文
   ├── 阅读现有代码
   ├── 检查测试覆盖
   └── 了解使用场景

2. 识别问题
   ├── 代码重复
   ├── 过长函数
   ├── 过高复杂度
   └── 耦合过紧

3. 评估影响
   ├── 影响范围
   ├── 风险等级
   └── 重构收益
```

### Phase 2: 规划

```markdown
## 重构计划

### 问题列表
1. [问题1] - 影响/收益评估
2. [问题2] - 影响/收益评估

### 执行顺序
1. 低风险高收益优先
2. 建立依赖图
3. 确定增量步骤

### 安全措施
- [ ] 测试备份
- [ ] 集成策略
- [ ] 回滚方案
```

### Phase 3: 执行

**安全重构 checklist:**
- [ ] 确认测试通过
- [ ] 创建一个原子提交
- [ ] 执行单一改变
- [ ] 运行测试验证
- [ ] 提交当前状态

### Phase 4: 验证

**验证维度:**
- 功能正确性
- 性能影响
- 代码覆盖率
- 可读性提升

## 常用重构手法

### 提取函数 (Extract Function)

**Before:**
```python
def process_order(order):
    # 验证订单
    if not order.items:
        return None
    if order.total < 0:
        return None

    # 计算折扣
    discount = 0
    if order.customer.tier == 'gold':
        discount = order.total * 0.2
    elif order.customer.tier == 'silver':
        discount = order.total * 0.1

    # 应用折扣
    final_price = order.total - discount

    return final_price
```

**After:**
```python
def validate_order(order):
    if not order.items:
        raise ValueError("Order has no items")
    if order.total < 0:
        raise ValueError("Invalid total")

def calculate_discount(customer, total):
    discount_rates = {'gold': 0.2, 'silver': 0.1}
    rate = discount_rates.get(customer.tier, 0)
    return total * rate

def process_order(order):
    validate_order(order)
    discount = calculate_discount(order.customer, order.total)
    return order.total - discount
```

### 提取变量 (Extract Variable)

**Before:**
```python
def render_user_profile(user):
    return f"<div class='profile'><h1>{user.name}</h1><p>{user.bio}</p><img src='{user.avatar_url}' /></div>"
```

**After:**
```python
def render_user_profile(user):
    name_html = f"<h1>{user.name}</h1>"
    bio_html = f"<p>{user.bio}</p>"
    avatar_html = f"<img src='{user.avatar_url}' />"
    return f"<div class='profile'>{name_html}{bio_html}{avatar_html}</div>"
```

### 替换条件 (Replace Conditional)

**Before:**
```python
def get_priority(ticket):
    if ticket.type == 'bug':
        if ticket.severity == 'critical':
            return 1
        else:
            return 2
    elif ticket.type == 'feature':
        return 3
    else:
        return 4
```

**After:**
```python
PRIORITY_MAP = {
    ('bug', 'critical'): 1,
    ('bug', 'normal'): 2,
    ('feature', None): 3,
    ('other', None): 4,
}

def get_priority(ticket):
    return PRIORITY_MAP.get((ticket.type, ticket.severity), 4)
```

## 反模式警示

### 应该避免的模式

| 反模式 | 问题 | 解决方案 |
|--------|------|----------|
| 神类 | 职责过多 | 提取子模块 |
| 循环依赖 | 耦合过紧 | 依赖倒置 |
| 霰弹手术 | 改一处动全身 | 提取接口 |
| 重复开关 | 重复if-else | 规则引擎 |

## 重构度量

### 可维护性指标

| 指标 | 目标值 | 测量方法 |
|------|--------|----------|
| 圈复杂度 | < 10 | 静态分析 |
| 函数长度 | < 50行 | 代码统计 |
| 嵌套深度 | < 4层 | 静态分析 |
| 重复率 | < 5% | 代码相似度 |

### 重构效果评估

```markdown
## 重构前后对比

| 指标 | 重构前 | 重构后 | 变化 |
|------|--------|--------|------|
| 圈复杂度 | 18 | 6 | -67% |
| 函数长度 | 120行 | 30行 | -75% |
| 测试覆盖率 | 60% | 85% | +42% |
| 可读性评分 | 3/10 | 8/10 | +167% |
```

## 相关提示词

- `prompt-task-refactoring-propose-refactoring-plan` - 制定重构计划
- `prompt-task-refactoring-remove-duplication-safely` - 安全移除重复
- `prompt-task-refactoring-refactor-under-constraints` - 约束下重构
