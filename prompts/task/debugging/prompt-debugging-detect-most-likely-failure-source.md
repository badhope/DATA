---
id: prompt-debugging-detect-most-likely-failure-source
name: Detect Most Likely Failure Source
summary: 基于证据概率分析定位最可能的故障源
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: debugging
sub_category: analysis
tags:
  - probability
  - likelihood
  - failure-source
  - analysis
keywords:
  - likely
  - failure
  - source
  - probability
  - analyze
intent: |
  通过概率分析确定最可能发生故障的代码位置或组件。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - error_context: string (required) 错误上下文信息
  - code_structure: string (optional) 代码结构信息
  - recent_changes: string (optional) 最近的代码变更
  - error_pattern: string (optional) 错误模式
output_requirements:
  - likely_sources: string[] 按概率排序的可能故障源
  - probability_analysis: string 每个源的概率分析
  - evidence_for_each: string[] 支持每个判断的证据
  - recommended_inspection_order: string[] 建议的检查顺序
tool_requirements:
  - Read 读取相关代码文件
  - Search 搜索变更历史
  - Grep 搜索错误模式
preconditions: |
  - 需要有足够的上下文信息
  - 错误信息或现象描述
anti_patterns: |
  - 不要忽略低概率但可能的故障源
  - 不要仅凭直觉排序
  - 不要忽视否定证据
failure_modes: |
  - 信息不足: 列出所有可能性并说明不确定性
  - 误导性线索: 交叉验证多个信息源
self_check: |
  - [ ] 排序是否有客观依据？
  - [ ] 是否考虑了所有可能的来源？
  - [ ] 证据是否充分支持排序？
related_skills:
  - skill-debugging
  - skill-repo-analysis
related_workflows:
  - workflow-bug-investigation
related_prompts:
  - prompt-debugging-identify-root-cause
  - prompt-debugging-generate-debug-plan
---

# Context

调试时需要在多个可能的故障源中确定最需要检查的地方。这个 prompt 帮助 AI 基于证据和概率分析，确定最可能的故障源并按优先级排序检查顺序。

# Prompt Body

你是一个软件工程师。用户的输入是错误上下文。请分析并确定最可能的故障源。

## 输入信息

```
错误上下文：
{error_context}

代码结构：
{code_structure}

最近的变更：
{recent_changes}

错误模式：
{error_pattern}
```

## 故障源分析框架

### 1。 代码层面
— 最近修改的代码
— 复杂的条件分支
— 边界条件处理
— 状态管理逻辑

### 2。 集成层面
— API 调用和返回
— 数据传递和转换
— 错误传播路径

### 3。 配置层面
— 环境变量
— 配置文件
— 启动参数

### 4。 依赖层面
— 第三方库版本
— 兼容性问题
— API 变更

### 5。 环境层面
— 运行时环境
— 资源限制
— 权限问题

## 概率分析维度

### 支持证据
— 错误消息直接指向
— 代码逻辑分析支持
— 变更历史关联
— 模式匹配

### 否定证据
— 该代码通常稳定
— 类似的调用没有问题
— 配置检查通过

## 输出要求

### 1。 故障源排序

| 排名 | 故障源 | 概率 | 主要证据 |
|------|--------|------|---------|
| 1 | …… | 高 | ... |
| 2 | …… | 中 | ... |
| ... | ... | ... | ... |

### 2。 概率分析

对于每个故障源：
```
故障源：{描述}
概率：高/中/低
分析：{为什么这么判断}
```

### 3。 建议检查顺序
```
1。 先检查：[故障源1] — 原因
2。 再检查：[故障源2] — 原因
...
```

### 4。 需要进一步验证
如果某些故障源无法确定，列出需要验证的内容。

## 约束条件

— 排序必须基于证据，而非猜测
— 需要考虑否定证据
— 低概率但可能的故障源不应被完全忽视
— 检查顺序应当高效，最大化快速定位问题的可能性

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{error_context}` | 错误上下文信息 | `用户在提交订单时收到错误提示，但订单已扣款` |
| `{code_structure}` | 代码结构信息 | `订单服务位于 orderservice/，使用微服务架构` |
| `{recent_changes}` | 最近的代码变更 | `昨天更新了支付模块的签名验证逻辑` |
| `{error_pattern}` | 错误模式 | `只在高并发场景下出现，单独测试正常` |

# Usage Notes

— 用于问题定位初期，快速缩小检查范围
— 概率分析应结合代码变更历史
— 否定证据同样重要，可以排除干扰
— 如果信息不足，列出所有可能性而非强行排序

# Example Input

```
错误上下文：
API 返回 500 错误，但错误消息只显示 "Internal Server Error"。错误发生在用户访问个人资料页面时，该页面需要加载用户信息、订单历史和推荐商品三个模块的数据。

代码结构：
— 用户服务：user—service
— 订单服务：order—service  
— 推荐服务：recommendation—service
— 使用 API 网关统一入口

最近的变更：
上周部署了 API 网关的限流中间件更新

错误模式：
— 间歇性出现，约 5% 请求受影响
— 错误出现后刷新页面通常成功
— 没有特定的输入模式触发
```

# Example Output

```
故障源排序

| 排名 | 故障源 | 概率 | 主要证据 |
|------|--------|------|---------|
| 1 | API 网关限流中间件 | 高 | 间歇性错误+近期部署变更 |
| 2 | 推荐服务响应超时 | 中 | 错误发生在数据加载阶段 |
| 3 | 用户服务缓存失效 | 低 | 刷新后恢复暗示状态问题 |
| 4 | 订单服务异常 | 低 | 订单数据加载在其他模块 |

概率分析

故障源 1：API 网关限流中间件
概率：高
分析：错误模式符合限流触发特征（间歇性、刷新恢复）。近期有相关变更。

故障源 2：推荐服务响应超时
概率：中
分析：推荐服务通常响应较慢，在慢请求场景下可能触发网关超时。

建议检查顺序
1。 先检查：API 网关限流配置和日志 — 最可能且最容易验证
2。 再检查：推荐服务的响应时间分布 — 间接验证
3。 再检查：网关超时配置 — 确认阈值是否合理
4。 最后检查：各服务的健康状态 — 排除其他可能

需要进一步验证
— [ ] API 网关的限流日志
— [ ] 各服务的响应时间 P99
— [ ] 网关的超时配置
```