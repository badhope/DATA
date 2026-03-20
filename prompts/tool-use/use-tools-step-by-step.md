---
id: prompt-tool-use-use-tools-step-by-step-v1
name: Use Tools Step by Step
summary: 将复杂任务分解为一步步的工具调用，每步验证后再进入下一步，避免一次性调用过多工具导致信息混乱
type: tool-use
status: active
version: "1.0.0"
owner: skill-repository
category: tool-use
sub_category: sequential-execution
tags:
  - tool-use
  - step-by-step
  - complexity-management
  - sequential
keywords:
  - 逐步执行
  - 任务分解
  - 工具调用顺序
intent: |
  将复杂任务分解为一步步的工具调用，每步验证后再进入下一步。
  强调系统性执行，避免一次性调用过多工具。
  核心原则：复杂任务分步执行，每步验证后再继续。
applicable_models:
  - "*"
input_requirements:
  - task: string 需要完成的复杂任务
  - complexity: string 任务复杂度 (low/medium/high/very-high)
  - expected_steps: number (可选) 预估的步骤数
output_requirements:
  - execution_plan: array 执行计划，每步包含：
    - step: number 步骤序号
    - action: string 本步动作
    - tool: string 使用的工具
    - verification: string 验证方式
    - next_step_condition: string 进入下一步的条件
  - results: object 每步的执行结果
  - final_output: object 最终输出
tool_requirements:
  - All available tools as needed
preconditions:
  - 任务复杂，无法一步完成
anti_patterns:
  - 一次性调用多个不相关的工具
  - 不验证当前步骤结果就继续下一步
  - 不设定停步条件
failure_modes:
  - 步骤过多：识别可以合并的步骤
  - 步骤卡住：设定验证点和回退策略
  - 信息不足：每步明确需要什么信息
self_check: |
  每步执行前自检：
  □ 上一步的结果是否已验证？
  □ 本步需要什么信息？
  □ 是否有足够信息执行本步？
  □ 如果信息不足，是否先补充信息？
related_skills:
  - tool-use-read-files-before-answering
  - tool-use-combine-multiple-results
  - skill-debugging
related_workflows:
  - workflow-bug-investigation
  - workflow-feature-implementation
  - workflow-tool-assisted-debug
related_prompts:
  - prompt-tool-use-read-files-before-answering
  - prompt-tool-use-analyze-folder-then-plan
---

# Context

这是一个约束 AI 行为方式的工具类 prompt。它的核心目标是：**将复杂任务系统性地分解执行，每步验证后再继续**。

当遇到以下情况时，必须分步执行：
- 复杂的多模块分析任务
- 需要多种工具配合的任务
- 结果需要逐步验证的任务

# Prompt Body

## 阶段 1：任务分析和分解

### 1.1 任务复杂度评估

```markdown
## 任务复杂度评估

**任务描述**: [复述任务]

**复杂度判断**:
| 指标 | 评估 | 说明 |
|------|------|------|
| 涉及文件数 | [数量] | |
| 需要工具种类 | [数量] | |
| 验证点数量 | [数量] | |
| 可能的分支 | [数量] | |
| **综合复杂度** | **低/中/高/极高** | |

**是否需要分步执行**: [是/否]
- 是：进入分步执行流程
- 否：考虑是否真的不需要分步
```

### 1.2 任务分解

```markdown
## 任务分解

### 分解原则
1. **单一职责**：每步只完成一个明确的目标
2. **可验证**：每步结果可以验证
3. **有条件**：明确进入下一步的条件
4. **有停点**：明确在何处可以停止

### 分解结果
| 步骤 | 目标 | 工具 | 验证方式 | 停步条件 |
|------|------|------|----------|----------|
| 1 | [目标] | [工具] | [验证] | [条件] |
| 2 | [目标] | [工具] | [验证] | [条件] |
| 3 | [目标] | [工具] | [验证] | [条件] |
```

## 阶段 2：逐步执行

### 2.1 执行模板

```markdown
## 步骤执行记录

### 步骤 1: [步骤名称]
**目标**: [本步要达成什么]
**工具**: [使用的工具]
**输入**: [需要的输入]

**执行**:
```bash
[工具调用命令]
```

**结果**:
```json
[执行结果摘要]
```

**验证**:
- [ ] 结果是否符合预期？
- [ ] 是否可以进入下一步？

**进入下一步条件**: [条件描述]

**[如果条件满足，继续步骤 2；如果不满足，处理问题]**
```

### 2.2 分支处理

```markdown
## 分支处理

### 可能的分支

#### 分支 A: [条件描述]
如果遇到 [条件]，则：
1. [处理方式1]
2. [处理方式2]

#### 分支 B: [条件描述]
如果遇到 [条件]，则：
1. [处理方式1]
2. [处理方式2]

### 回退策略
如果某步骤完全失败：
1. 记录失败原因
2. 尝试替代方案
3. 如果无法继续，汇总已获取的信息并报告
```

## 阶段 3：结果整合

### 3.1 中间结果汇总

```markdown
## 中间结果汇总

### 步骤 1 结果
- 关键发现: [发现1]
- 数据: [数据1]

### 步骤 2 结果
- 关键发现: [发现2]
- 数据: [数据2]

### 步骤 3 结果
- 关键发现: [发现3]
- 数据: [数据3]
```

### 3.2 最终整合

```markdown
## 最终输出

### 整合逻辑
[如何将各步结果整合成最终输出]

### 最终结果
```json
[最终结果]
```

### 信息来源追踪
| 信息 | 来源步骤 | 置信度 |
|------|----------|--------|
| [信息1] | 步骤1 | 高/中/低 |
| [信息2] | 步骤2 | 高/中/低 |
```

## 阶段 4：执行总结

```markdown
## 执行总结

### 执行统计
| 指标 | 数值 |
|------|------|
| 总步骤数 | [数量] |
| 成功步骤 | [数量] |
| 分支处理 | [数量] |
| 总执行时间 | [估算] |

### 质量检查
- [ ] 每步是否都有验证？
- [ ] 是否有步骤被跳过或合并？
- [ ] 最终结果是否满足任务需求？

## 自检清单
- [ ] 是否按步骤执行？
- [ ] 每步是否验证了结果？
- [ ] 分支是否正确处理？
- [ ] 最终输出是否完整？
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `task` | 需要完成的任务 | `"分析这个微服务项目的架构"` |
| `complexity` | 复杂度 | `high` |
| `expected_steps` | 预估步骤 | `5` |

# Usage Notes

1. **单步验证**：每步执行后必须验证结果
2. **明确条件**：每步都要有明确的"进入下一步条件"
3. **处理分支**：提前规划可能的分支和回退策略
4. **信息追踪**：记录每步获取的信息和来源
5. **适时停止**：如果已满足需求，及时停止执行

# Example Input

```yaml
task: "分析这个电商项目的订单处理流程"
complexity: "high"
expected_steps: 6
```

# Example Output

```yaml
execution_plan:
  - step: 1
    action: "识别项目结构"
    tool: "Glob + Read"
    verification: "确认 src/orders/ 目录存在"
    next_step_condition: "找到订单相关的源代码目录"
  - step: 2
    action: "读取订单服务入口"
    tool: "Read"
    verification: "确认 OrderService 类存在"
    next_step_condition: "成功读取 OrderService"
  - step: 3
    action: "追踪订单创建流程"
    tool: "Grep + Read"
    verification: "找到 createOrder 方法"
    next_step_condition: "追踪到完整流程"

results:
  step_1:
    found: "src/orders/ 目录，包含 OrderService, OrderController"
  step_2:
    class: "OrderService"
    methods: ["create", "cancel", "getById"]
  step_3:
    flow: "Controller → Service → Repository → Database"

final_output:
  order_flow: "创建订单 → 验证库存 → 计算价格 → 支付 → 发货 → 完成"
  key_files:
    - "src/orders/OrderService.ts"
    - "src/orders/OrderController.ts"
    - "src/orders/repositories/OrderRepository.ts"
```
