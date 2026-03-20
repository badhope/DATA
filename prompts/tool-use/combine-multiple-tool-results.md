---
id: prompt-tool-use-combine-multiple-tool-results-v1
name: Combine Multiple Tool Results
summary: 整合多个工具的输出结果，形成统一、连贯的分析结论
type: tool-use
status: active
version: "1.0.0"
owner: skill-repository
category: tool-use
sub_category: result-integration
tags:
  - tool-use
  - result-integration
  - multi-tool
  - synthesis
keywords:
  - 工具结果整合
  - 多工具输出
  - 结果合并
  - 综合分析
intent: |
  整合来自多个工具的输出结果，消除重复信息，识别关联和矛盾，形成统一结论。
  强调不简单罗列结果，而是真正整合信息、提炼洞察。
  核心原则：整合而非堆砌，洞察而非罗列。
applicable_models:
  - "*"
input_requirements:
  - tool_results: array 多个工具的输出
  - context: string 整合上下文
  - goal: string 整合目标
output_requirements:
  - integrated_summary: object 整合后的摘要
  - findings: array 整合后的发现
  - conflicts: array 发现的信息矛盾
  - conclusions: array 最终结论
tool_requirements:
  - Multiple tool outputs
preconditions:
  - 有多个工具的输出需要整合
anti_patterns:
  - 简单罗列各工具输出
  - 不处理信息重复
  - 忽略信息矛盾
  - 没有形成统一结论
failure_modes:
  - 信息冲突：识别冲突，分析原因，给出判断
  - 信息重复：去重，保留最权威来源
  - 信息不足：识别信息缺口，建议补充
  - 结论不一致：分析原因，给出最可能的结论
self_check: |
  整合前自检：
  □ 是否理解了每个工具输出的内容？
  □ 是否识别了信息之间的关联？
  □ 是否发现了信息之间的矛盾？
  □ 是否形成了统一的结论？
related_skills:
  - tool-use-read-files-before-answering
  - tool-use-search-before-concluding
  - tool-use-produce-structured-tool-summary
related_workflows:
  - workflow-bug-investigation
  - workflow-feature-implementation
  - workflow-tool-assisted-debug
related_prompts:
  - prompt-tool-use-read-files-before-answering
  - prompt-tool-use-search-before-concluding
  - prompt-tool-use-produce-structured-tool-summary
---

# Context

这是一个约束 AI 行为方式的工具类 prompt。它的核心目标是：**整合多个工具的输出结果，形成统一分析**。

当需要整合以下类型的多个工具输出时，必须遵循此 prompt：
- 文件读取 + 搜索结果
- 多个文件的分析结果
- 命令执行 + 文件内容
- 多次搜索的结果

# Prompt Body

## 阶段 1：输入整理

### 1.1 结果分类

```markdown
## 工具输出分类

### 分类结果
| # | 工具 | 主要内容 | 信息类型 |
|---|------|----------|----------|
| 1 | [工具1] | [摘要] | [类型] |
| 2 | [工具2] | [摘要] | [类型] |
| 3 | [工具3] | [摘要] | [类型] |

### 信息类型分布
| 类型 | 数量 | 占比 |
|------|------|------|
| 文件内容 | [数量] | [百分比] |
| 搜索结果 | [数量] | [百分比] |
| 命令输出 | [数量] | [百分比] |
| 分析结果 | [数量] | [百分比] |
```
```

### 1.2 重复识别

```markdown
## 重复信息识别

### 重复项
| # | 信息 | 来源1 | 来源2 | 处理方式 |
|---|------|-------|-------|----------|
| 1 | [信息] | [来源] | [来源] | [保留/合并] |

### 去重策略
- **优先级保留**：权威来源 > 非权威来源
- **完整性保留**：信息完整 > 信息部分
- **时效性保留**：最新 > 旧版本
```

## 阶段 2：关联分析

### 2.1 信息关联

```markdown
## 信息关联分析

### 关联关系
| # | 信息A | 信息B | 关联类型 | 说明 |
|---|-------|-------|----------|------|
| 1 | [A] | [B] | 包含/依赖/补充/矛盾 | [说明] |

### 关联图谱
```markdown
[信息A] ──包含──> [信息B]
[信息C] ──依赖──> [信息A]
[信息D] ──补充──> [信息B]
[信息E] ──矛盾──> [信息F]
```
```

### 2.2 模式识别

```markdown
## 模式识别

### 识别到的模式
| # | 模式 | 涉及的信息 | 说明 |
|---|------|------------|------|
| 1 | [模式] | [信息列表] | [说明] |

### 模式类型
- **递进模式**：信息逐层深入
- **并列模式**：信息平行提供相同侧面的证据
- **补充模式**：多个信息互补完整
- **矛盾模式**：信息之间存在冲突
```

## 阶段 3：矛盾处理

### 3.1 矛盾识别

```markdown
## 矛盾识别

### 发现的矛盾
| # | 信息A | 信息B | 矛盾点 | 严重度 |
|---|-------|-------|--------|--------|
| 1 | [A] | [B] | [点] | 高/中/低 |

### 矛盾分类
| 类型 | 描述 | 处理方式 |
|------|------|----------|
| 事实矛盾 | 两信息在事实层面冲突 | 验证来源 |
| 解释矛盾 | 对同一事实的不同解释 | 分析上下文 |
| 优先级矛盾 | 重要性判断不一致 | 重新评估 |
```
```

### 3.2 矛盾解决

```markdown
## 矛盾解决

### 解决策略
| 矛盾 | 策略 | 结果 |
|------|------|------|
| [矛盾1] | [策略] | [结果] |

### 解决过程
```markdown
**矛盾**: [描述]
**分析**:
1. [分析点1]
2. [分析点2]
**判断**: [最终判断]
**依据**: [依据]
```
```

## 阶段 4：整合输出

### 4.1 整合摘要

```markdown
## 整合摘要

### 执行摘要
```markdown
[2-3 句话概括整合结果]
```

### 关键发现
1. [发现1]
2. [发现2]
3. [发现3]

### 信息来源
| 发现 | 来源 | 置信度 |
|------|------|--------|
| [发现1] | [来源] | 高/中/低 |
```
```

### 4.2 整合结论

```markdown
## 整合结论

### 结论列表
```yaml
conclusions:
  - text: "[结论1]"
    confidence: "[置信度]"
    evidence: ["[证据1]", "[证据2]"]
  - text: "[结论2]"
    confidence: "[置信度]"
    evidence: ["[证据1]", "[证据2]"]
```

### 置信度评估
| 因素 | 评估 |
|------|------|
| 证据一致性 | [1-5] |
| 证据完整性 | [1-5] |
| 来源可靠性 | [1-5] |
| **整体置信度** | **高/中/低** |
```
```

## 阶段 5：信息缺口

### 5.1 缺口识别

```markdown
## 信息缺口

### 识别到的缺口
| # | 缺口描述 | 影响 | 优先级 |
|---|----------|------|--------|
| 1 | [描述] | [影响] | P0/P1/P2 |

### 建议的补充
- [补充建议1]
- [补充建议2]
```
```

### 5.2 最终报告

```markdown
# 多工具结果整合报告

## 整合信息
| 来源 | 工具 | 主要内容 |
|------|------|----------|
| 1 | [工具] | [内容] |
| 2 | [工具] | [内容] |
| 3 | [工具] | [内容] |

## 信息关联
- [关联1]
- [关联2]

## 矛盾处理
| 矛盾 | 处理方式 | 结果 |
|------|----------|------|
| [矛盾] | [方式] | [结果] |

## 整合发现
1. [发现1]
2. [发现2]
3. [发现3]

## 结论
```yaml
conclusions:
  - text: "[结论]"
    confidence: "[置信度]"
    evidence: ["[证据列表]"]
```

## 信息缺口
- [缺口1]
- [缺口2]

## 后续建议
1. [建议1]
2. [建议2]

## 自检清单
- [ ] 是否整理了所有工具输出？
- [ ] 是否识别了信息关联？
- [ ] 是否处理了信息矛盾？
- [ ] 是否形成了统一结论？
- [ ] 是否识别了信息缺口？
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `tool_results` | 工具输出数组 | `[{tool: "Read", output: "..."}, {tool: "Grep", output: "..."}]` |
| `context` | 整合上下文 | `分析支付模块的实现` |
| `goal` | 整合目标 | `理解支付流程` |

# Usage Notes

1. **不简单罗列**：整合不是简单罗列，要分析关联
2. **处理矛盾**：识别矛盾，解决矛盾
3. **去重合并**：消除重复信息
4. **形成洞察**：提炼出单一输出无法提供的新洞察
5. **识别缺口**：识别信息不足的地方

# Example Input

```yaml
tool_results:
  - tool: "Read"
    output: |
      // payment.service.ts
      async processPayment(orderId: string, amount: number) {
        const order = await this.orderService.findById(orderId);
        if (order.status !== 'pending') {
          throw new Error('Order not in pending status');
        }
        return this.paymentGateway.charge(amount);
      }
  - tool: "Grep"
    output: |
      payment.service.ts:5: if (order.status !== 'pending')
      order.service.ts:12: status: 'pending' | 'paid' | 'cancelled'
  - tool: "Read"
    output: |
      // payment.gateway.ts
      async charge(amount: number) {
        // 调用第三方支付
        return { success: true, transactionId: 'txn_123' };
      }
context: "分析支付流程"
goal: "理解支付处理逻辑"
```

# Example Output

```yaml
integrated_summary:
  source_count: 3
  tools_used:
    - Read (payment.service.ts)
    - Grep (搜索 status 相关)
    - Read (payment.gateway.ts)
  processing: "去重 + 关联分析 + 矛盾处理"

findings:
  - type: "flow"
    description: "支付流程: 订单验证 → 状态检查 → 第三方扣款"
    confidence: "high"
  - type: "validation"
    description: "只处理 pending 状态的订单"
    confidence: "high"
  - type: "integration"
    description: "使用第三方支付网关"
    confidence: "high"

conflicts: []

conclusions:
  - text: "processPayment 方法只处理 pending 状态的订单"
    confidence: "high"
    evidence:
      - "payment.service.ts 第5行状态检查"
      - "order.service.ts 定义了 pending 状态"
  - text: "支付使用第三方网关，不直接处理金额"
    confidence: "high"
    evidence:
      - "payment.gateway.ts 的 charge 方法"
      - "只传递 amount 参数，未处理具体金额逻辑"

information_gaps:
  - gap: "第三方支付失败时的错误处理"
    impact: "无法了解支付失败后的重试逻辑"
    priority: "medium"
  - gap: "支付完成后的订单状态更新"
    impact: "不清楚支付成功后订单状态如何变为 paid"
    priority: "high"
```
