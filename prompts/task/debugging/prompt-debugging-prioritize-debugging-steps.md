---
id: prompt-debugging-prioritize-debugging-steps
name: Prioritize Debugging Steps
summary: 确定调试步骤的优先级顺序
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: debugging
sub_category: planning
tags:
  - prioritize
  - ordering
  - efficiency
  - debug-steps
keywords:
  - prioritize
  - order
  - efficiency
  - debug
  - steps
intent: |
  根据效率和信息价值确定调试步骤的最优顺序。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - possible_steps: string[] (required) 可能的调试步骤
  - context: string (required) 问题上下文
  - available_tools: string[] (optional) 可用的工具
output_requirements:
  - prioritized_steps: string[] 排序后的调试步骤
  - prioritization_rationale: string 优先级理由
  - estimated_time: string 每步预计时间
  - parallel_opportunities: string[] 可并行执行的步骤
tool_requirements:
  - Read 读取相关代码
preconditions: |
  - 应当有明确的调试目标
  - 应当有多个可能的调试步骤
anti_patterns: |
  - 不要随意排序，要有明确理由
  - 不要忽略信息价值高的步骤
  - 不要忽视快速验证步骤
failure_modes: |
  - 步骤不清: 帮助用户分解调试步骤
  - 优先级不当: 说明优先级判断依据
self_check: |
  - [ ] 排序是否有明确理由？
  - [ ] 是否考虑了信息价值？
  - [ ] 是否有快速验证步骤被优先处理？
related_skills:
  - skill-debugging
  - skill-planning
related_workflows:
  - workflow-bug-investigation
related_prompts:
  - prompt-debugging-generate-debug-plan
  - prompt-debugging-decide-what-to-check-first
---

# Context

调试效率很大程度上取决于步骤的顺序。先做信息价值高、耗时少的步骤可以帮助快速缩小范围，避免浪费时间在不必要的地方。

# Prompt Body

你是一个软件工程师。用户的输入是可能的调试步骤。请确定最优的调试顺序。

## 输入信息

```
可能的调试步骤：
{possible_steps}

问题上下文：
{context}

可用工具：
{available_tools}
```

## 优先级原则

### 1。 信息价值原则
— 优先选择能快速提供关键信息的步骤
— 选择能排除大量可能性的步骤
— 选择能直接验证或否定假设的步骤

### 2。 成本原则
— 优先选择耗时少的步骤
— 优先选择无需修改代码的步骤
— 优先选择可逆的步骤

### 3。 依赖关系
— 某些步骤可能依赖其他步骤的结果
— 无依赖的步骤可以优先执行
— 存在依赖时，需要按顺序执行

### 4。 快速验证
— 首先做最简单的验证，确认基本假设
— 排除明显不可能的原因
— 缩小搜索范围

## 排序框架

### 第一优先级：快速检查
— 验证基本假设
— 检查配置和环境
— 查看错误日志

### 第二优先级：信息收集
— 读取相关代码
— 分析调用链
— 检查最近变更

### 第三优先级：深入分析
— 详细代码审查
— 添加调试代码
— 运行诊断工具

### 第四优先级：假设验证
— 验证根因假设
— 测试修复方案

## 输出要求

### 1。 排序后的步骤

| 顺序 | 步骤 | 优先级 | 理由 | 预计时间 |
|------|------|--------|------|---------|
| 1 | …… | 高 | ... | X分钟 |
| 2 | …… | 中 | ... | X分钟 |
| ... | ... | ... | ... | ... |

### 2。 优先级理由
```
[解释为什么这样排序]
```

### 3。 可并行执行的步骤
```
[可以同时进行的步骤组合]
```

### 4。 时间估算
```
总预计时间：X分钟
关键路径时间：X分钟
```

## 约束条件

— 每个步骤的优先级必须有明确理由
— 考虑信息价值和执行成本的平衡
— 识别步骤间的依赖关系
— 给出时间估算帮助规划

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{possible_steps}` | 可能的调试步骤 | `["检查日志", "阅读代码", "添加断点", "运行测试"]` |
| `{context}` | 问题上下文 | `API 返回错误，怀疑是数据库连接问题` |
| `{available_tools}` | 可用的工具 | `["IDE 调试器", "数据库客户端", "Postman"]` |

# Usage Notes

— 适用于有多条调试路径时确定最优顺序
— 结合 generate—debug—plan 使用效果更好
— 优先级理由应清晰，便于与他人沟通
— 可并行步骤应明确标识以提高效率

# Example Input

```
可能的调试步骤：
1。 检查 API 网关的请求日志
2。 阅读订单服务的源代码
3。 检查数据库连接池配置
4。 查看 Redis 缓存状态
5。 分析订单状态机的状态转换逻辑
6。 对比测试环境和生产环境的差异

问题上下文：
用户下单后，订单状态一直停留在"处理中"，但支付已经成功。问题间歇性出现，难以稳定复现。

可用工具：
— Kibana 日志平台
— IntelliJ IDEA 调试器
- Redis CLI
— MySQL 客户端
```

# Example Output

```
排序后的步骤

| 顺序 | 步骤 | 优先级 | 理由 | 预计时间 |
|------|------|--------|------|---------|
| 1 | 检查 API 网关的请求日志 | 高 | 确认支付回调是否到达系统 | 10分钟 |
| 2 | 查看 Redis 缓存状态 | 高 | 快速验证缓存是否正常 | 5分钟 |
| 3 | 检查数据库连接池配置 | 中 | 排除连接池耗尽的可能 | 15分钟 |
| 4 | 阅读订单服务的源代码 | 中 | 理解状态转换逻辑 | 30分钟 |
| 5 | 分析订单状态机的状态转换逻辑 | 中 | 确认状态推进条件 | 20分钟 |
| 6 | 对比测试环境和生产环境的差异 | 低 | 耗时且不太可能 | 30分钟 |

优先级理由
首先检查日志和缓存，因为它们能快速提供关键信息且成本最低。如果日志显示回调未到达，则问题在支付平台；如果缓存异常，则问题在缓存层。这两个检查能快速排除大部分可能性。

可并行执行的步骤
— 步骤 2 和 3 可并行：Redis 检查和数据库连接池检查相互独立
— 步骤 4 和 5 可并行：阅读代码和理解状态机可以同时进行

时间估算
总预计时间：约 110 分钟（串行）
关键路径时间：约 25 分钟（日志 + 缓存）
如果快速验证发现问题，可大幅缩短总时间
```