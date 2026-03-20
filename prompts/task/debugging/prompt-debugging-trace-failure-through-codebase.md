---
id: prompt-debugging-trace-failure-through-codebase
name: Trace Failure Through Codebase
summary: 追踪故障在代码库中的传播路径
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: debugging
sub_category: analysis
tags:
  - trace
  - propagation
  - failure
  - code-flow
keywords:
  - trace
  - propagate
  - failure
  - code-flow
  - follow
intent: |
  追踪故障在代码库中的传播路径，理解问题的完整影响范围。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - failure_point: string (required) 故障发生点
  - entry_point: string (optional) 入口点
  - trace_direction: string (optional) 追踪方向（forward/backward）
output_requirements:
  - trace_path: string[] 追踪路径
  - affected_modules: string[] 受影响的模块
  - data_flow: string 数据流动路径
  - impact_analysis: string 影响分析
  - propagation_mechanism: string 传播机制
tool_requirements:
  - Read 读取相关代码文件
  - Search 搜索调用关系
  - Grep 搜索数据流
preconditions: |
  - 故障点应当明确
  - 最好知道入口点
anti_patterns: |
  - 不要只追踪一层
  - 不要忽略数据流
  - 不要忽视间接影响
failure_modes: |
  - 调用链不清: 从已知点向外扩展搜索
  - 循环依赖: 识别并标注
self_check: |
  - [ ] 追踪是否完整？
  - [ ] 是否覆盖了所有传播路径？
  - [ ] 影响分析是否准确？
related_skills:
  - skill-debugging
  - skill-repo-analysis
related_workflows:
  - workflow-bug-investigation
related_prompts:
  - prompt-debugging-identify-root-cause
  - prompt-debugging-analyze-stack-trace
---

# Context

故障往往不是孤立的，会通过调用链和数据流传播到其他模块。理解故障的传播路径有助于全面评估问题影响和设计修复方案。

# Prompt Body

你是一个软件工程师。用户的输入是故障点。请追踪故障在代码库中的传播路径。

## 输入信息

```
故障点：{failure_point}
入口点：{entry_point}
追踪方向：{trace_direction}
```

## 追踪框架

### 1。 追踪方向

**前向追踪（从原因到结果）**
— 从故障点追踪到受影响的地方
— 理解问题的下游影响

**后向追踪（从结果到原因）**
— 从观察到的错误追溯到根本原因
— 理解问题的上游来源

### 2。 追踪维度

**调用链追踪**
```
A() → B() → C() → D()
      ↑ 如果 D 失败，追踪到 C、B、A
```

**数据流追踪**
```
输入 → 处理 → 输出
      ↑
      如果处理失败，追踪数据如何被污染
```

**状态传播追踪**
```
模块A状态变化 → 触发 → 模块B状态检查 → ……
```

### 3。 关键节点识别
— 入口点（问题的首次出现位置）
— 传播节点（故障经过的关键位置）
— 终止点（故障最终影响的位置）

## 输出要求

### 1。 追踪路径
```
1。 [位置1] — [调用/数据/状态]
2。 [位置2] — [调用/数据/状态]
...
```

### 2。 受影响的模块
```
直接影响：[模块列表]
间接影响：[模块列表]
```

### 3。 数据流动
```
[数据从何处来] → [经过哪些处理] → [最终影响什么]
```

### 4。 影响分析
| 影响范围 | 严重程度 | 描述 |
|----------|----------|------|
| ... | ... | ... |

### 5。 传播机制
```
[故障是如何从一个点传播到另一个点的]
```

## 约束条件

— 系统性追踪所有传播路径
— 区分直接影响和间接影响
— 说明传播机制
— 提供完整的影响分析

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{failure_point}` | 故障发生点 | `OrderService.processPayment 方法中的空指针异常` |
| `{entry_point}` | 入口点（可选） | `POST /api/orders/:id/pay` |
| `{trace_direction}` | 追踪方向（可选） | `forward`（前向）或 `backward`（后向） |

# Usage Notes

— 适用于理解故障的完整影响范围
— 前向追踪：从故障点追踪到下游影响
— 后向追踪：从症状追溯到根因
— 需要系统性搜索调用链和数据流

# Example Input

```
故障点：
PaymentService。charge() 方法在信用卡信息验证失败时抛出异常，但异常未被正确处理导致上层订单服务崩溃。

入口点：
用户点击"确认支付"按钮

追踪方向：
forward（前向追踪，了解问题的下游影响）
```

# Example Output

```
追踪路径
1。 PaymentService。charge() — 信用卡验证失败，抛出 PaymentException
2。 OrderService。processPayment() — 调用 charge()，未捕获异常
3。 OrderController。handlePayment() — 调用 processPayment()，异常向上传播
4。 Express middleware — 未捕获的异常导致请求挂起
5。 Client — 收到 500 错误响应

受影响的模块
直接影响：
— OrderService — 订单状态卡在"支付中"
— PaymentService — 支付记录不完整

间接影响：
— InventoryService — 库存未释放
— UserNotificationService — 用户未收到支付结果通知

数据流动
用户提交支付 → OrderController → OrderService → PaymentService → 第三方支付API
                                              ↓
                                       异常未捕获
                                              ↓
                                       事务未回滚
                                              ↓
                                   订单状态不一致

影响分析
| 影响范围 | 严重程度 | 描述 |
|----------|----------|------|
| 订单服务 | 高 | 订单状态不一致 |
| 支付服务 | 中 | 支付记录缺失 |
| 库存服务 | 中 | 库存释放延迟 |
| 用户体验 | 高 | 看到错误页面 |

传播机制
异常从 PaymentService 向上抛出，OrderService。processPayment() 方法没有 try—catch 块，导致异常继续向上传播。由于是异步操作，最终导致订单状态未更新，但用户已被扣款。
```