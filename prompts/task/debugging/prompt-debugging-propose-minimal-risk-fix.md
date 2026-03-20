---
id: prompt-debugging-propose-minimal-risk-fix
name: Propose Minimal Risk Fix
summary: 提出最小风险的修复方案
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: debugging
sub_category: fix
tags:
  - fix
  - minimal-risk
  - proposal
  - conservative
keywords:
  - fix
  - minimal
  - risk
  - proposal
  - conservative
intent: |
  提出最小风险、最保守的修复方案。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - root_cause: string (required) 根因
  - code_context: string (required) 代码上下文
  - problem_scope: string (optional) 问题范围
output_requirements:
  - proposed_fix: string 提出的修复方案
  - alternatives: string[] 其他可能的方案
  - risk_comparison: string 各方案风险对比
  - recommendation: string 推荐方案及理由
tool_requirements:
  - Read 读取相关代码
preconditions: |
  - 根因应当明确
  - 代码上下文应当完整
anti_patterns: |
  - 不要提出过于激进的修复
  - 不要忽略保守方案
  - 不要忽视潜在风险
failure_modes: |
  - 根因不明确: 返回分析阶段
  - 风险无法评估: 说明不确定性
self_check: |
  - [ ] 方案是否足够保守？
  - [ ] 风险是否可接受？
  - [ ] 是否提供了替代方案？
related_skills:
  - skill-debugging
  - skill-coding
related_workflows:
  - workflow-bug-investigation
  - workflow-change-verify
related_prompts:
  - prompt-debugging-fix-bug-safely
  - prompt-debugging-patch-without-unnecessary-refactor
---

# Context

当存在多个修复方案时，选择最小风险的方案可以减少引入新问题的可能性。这个 prompt 帮助 AI 分析并提出最小风险的修复方案。

# Prompt Body

你是一个软件工程师。用户的输入是根因和代码上下文。请提出最小风险的修复方案。

## 输入信息

```
根因：{root_cause}
代码上下文：{code_context}
问题范围：{problem_scope}
```

## 风险评估维度

### 1。 代码影响范围
— 影响多少代码行
— 影响多少函数/模块
— 是否改变公共 API

### 2。 功能影响
— 是否改变功能行为
— 是否影响边界情况
— 是否有副作用

### 3。 可逆性
— 修复是否容易回滚
— 是否需要数据迁移
— 是否有持久影响

### 4。 测试覆盖
— 是否有测试覆盖
— 是否需要新增测试
— 回归测试的复杂度

## 方案设计原则

### 保守方案特征
— 最少的代码改动
— 不改变现有逻辑结构
— 保持 API 兼容性
— 易于回滚

### 激进方案特征
— 可能改进整体设计
— 可能解决更多问题
— 但风险更高

## 输出要求

### 1。 推荐方案
```
方案：[简要描述]
改动范围：[具体范围]
风险等级：[高/中/低]
理由：[为什么推荐这个方案]
```

### 2。 替代方案

| 方案 | 改动范围 | 风险 | 收益 | 适用场景 |
|------|---------|------|------|---------|
| 保守 | …… | 低 | 低 | ... |
| 中等 | …… | 中 | 中 | ... |
| 激进 | …… | 高 | 高 | ... |

### 3。 风险对比
```
[对比各方案的风险]
```

### 4。 实施建议
```
[如果选择推荐方案，实施时需要注意什么]
```

## 约束条件

— 方案必须能解决根因
— 必须评估每个方案的风险
— 推荐最小风险方案，但不失合理性
— 说明为什么选择该方案

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{root_cause}` | 根因 | `缓存键生成逻辑在并发时产生冲突` |
| `{code_context}` | 代码上下文 | `cache.js 第 23 行，缓存键使用时间戳+随机数` |
| `{problem_scope}` | 问题范围（可选） | `影响订单模块，高并发场景` |

# Usage Notes

— 用于在多个可行方案中选择最优方案
— 需要权衡风险和收益
— 保守方案不等于不解决问题
— 应明确说明选择理由

# Example Input

```
根因：
缓存键生成使用 Date。now() + Math。random()，在高并发场景下可能产生相同键值，导致缓存数据相互覆盖。

代码上下文：
```javascript
// cache.js:23
function generateKey(prefix, id) {
  return `${prefix}:${id}:${Date.now()}:${Math.random()}`;
}
```

问题范围：
影响订单模块的缓存，在秒杀活动时约 0。1% 请求出现数据错乱。
```

# Example Output

```
推荐方案
方案：使用 UUID 或 crypto。randomUUID() 替代时间戳+随机数
改动范围：修改 1 行代码
风险等级：低
理由：最小改动解决问题，保持函数签名不变，向后兼容

替代方案

| 方案 | 改动范围 | 风险 | 收益 | 适用场景 |
|------|---------|------|------|---------|
| A： UUID | 1 行 | 低 | 解决键冲突 | 通用场景（推荐） |
| B： 锁机制 | 多处 | 中 | 完全解决 | 高一致性要求 |
| C： 重构缓存层 | 全局 | 高 | 长期优化 | 有充足测试时间 |

风险对比
保守方案 A（UUID）：
— 风险：极低，标准库方法
— 收益：基本解决键冲突问题
— 缺点：键长度增加

激进方案 B（锁机制）：
— 风险：可能影响性能，引入复杂性
— 收益：完全避免并发问题
— 缺点：实现复杂，需要仔细测试

实施建议
1。 先在测试环境验证方案 A
2。 如有性能顾虑，对比 UUID vs crypto。randomUUID 性能
3。 上线后监控缓存命中率变化
4。 准备方案 B 作为备选
```