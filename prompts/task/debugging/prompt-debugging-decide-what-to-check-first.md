---
id: prompt-debugging-decide-what-to-check-first
name: Decide What to Check First
summary: 决定调试时首先检查什么
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: debugging
sub_category: decision
tags:
  - decision
  - first-step
  - check
  - triage
keywords:
  - decide
  - first
  - check
  - priority
  - triage
intent: |
  基于问题特征决定调试时首先应该检查什么。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - error_type: string (required) 错误类型
  - error_location: string (optional) 错误位置
  - symptoms: string (required) 问题现象
  - available_context: string[] (optional) 可用的上下文
output_requirements:
  - first_check: string 首先应该检查的内容
  - alternatives: string[] 其他可选检查项
  - rationale: string 判断理由
  - expected_findings: string 预期会发现什么
tool_requirements:
  - Read 读取相关文件
preconditions: |
  - 问题现象应当清晰
  - 错误类型应当明确
anti_patterns: |
  - 不要跳过基础检查
  - 不要基于猜测做决定
  - 不要忽视常见问题原因
failure_modes: |
  - 现象不清: 要求更详细的现象描述
  - 无法判断: 提供多个选项让用户选择
self_check: |
  - [ ] 判断是否有依据？
  - [ ] 是否考虑了常见问题原因？
  - [ ] 是否符合调试最佳实践？
related_skills:
  - skill-debugging
  - skill-repo-analysis
related_workflows:
  - workflow-bug-investigation
related_prompts:
  - prompt-debugging-prioritize-debugging-steps
  - prompt-debugging-generate-debug-plan
---

# Context

调试的第一步选择非常重要。选择正确的检查项可以快速缩小问题范围，选择错误则可能浪费时间。这个 prompt 帮助基于问题特征做出明智的决定。

# Prompt Body

你是一个经验丰富的软件工程师。用户的输入是问题信息。请决定首先检查什么。

## 输入信息

```
错误类型：{error_type}
错误位置（如果有）：{error_location}
问题现象：{symptoms}
可用上下文：{available_context}
```

## 决策框架

### 基于错误类型

| 错误类型 | 首先检查 |
|----------|---------|
| 编译错误 | 错误消息指向的位置、导入语句 |
| 运行时错误 | 堆栈跟踪、相关代码 |
| 逻辑错误 | 条件分支、状态变化 |
| 性能问题 | 资源使用、日志时间戳 |
| 配置错误 | 配置文件、环境变量 |

### 基于症状特征

**症状 → 首先检查**

— **崩溃** → 堆栈跟踪、最近修改
— **挂起** → 循环、日志、资源状态
— **返回错误** → 返回点、参数验证
— **输出错误** → 转换逻辑、边界条件
— **性能差** → 热点代码、资源使用

### 常见问题优先检查

1。 **配置问题**
   — 环境变量设置
   — 配置文件内容
   — 启动参数

2。 **简单问题**
   — 拼写错误
   — 导入错误
   — 类型错误

3。 **最近变更**
   — 最后修改的文件
   — 最近的 commit
   — 新增的依赖

## 输出要求

### 1。 首先检查
```
内容：[首先检查什么]
理由：[为什么首先检查这个]
预期发现：[预期会发现什么]
```

### 2。 备选检查项
| 优先级 | 检查项 | 何时检查 |
|--------|--------|---------|
| 1 | …… | 如果首先检查没有结果 |
| 2 | ... | ... |

### 3。 判断理由
```
[详细解释为什么做出这个决定]
```

## 约束条件

— 决定必须基于客观的症状和错误类型
— 考虑常见问题原因的概率
— 优先检查容易验证的项目

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{error_type}` | 错误类型 | `runtime_error` |
| `{error_location}` | 错误位置（如果有） | `user.service.ts:42` |
| `{symptoms}` | 问题现象 | `用户访问个人资料时收到 500 错误` |
| `{available_context}` | 可用的上下文 | `["错误日志", "最近部署记录"]` |

# Usage Notes

— 适用于调试初期快速确定检查方向
— 与 prioritize—debugging—steps 配合使用效果更好
— 如果无法判断，应请求更多信息
— 决策应基于证据和常见问题模式

# Example Input

```
错误类型：runtime_error
错误位置（如果有）：payment。controller。ts：58
问题现象：支付接口返回 502 Bad Gateway，但支付本身已成功
可用上下文：
— 支付网关返回成功
— 服务日志显示处理超时
— 问题在高峰时段出现
```

# Example Output

```
首先检查
内容：支付网关的响应处理代码
理由：错误位置指向网关响应处理，且问题与超时相关
预期发现：可能是响应处理超时或网关返回格式变化

备选检查项
| 优先级 | 检查项 | 何时检查 |
|--------|--------|---------|
| 1 | 网关超时配置 | 如果响应处理代码正常 |
| 2 | 网络代理配置 | 如果超时设置正常 |
| 3 | 服务资源使用 | 如果代理配置正常 |

判断理由
错误发生在网关响应处理位置（line 58），结合高峰时段出现和超时日志，最可能是：
1。 网关响应时间超过配置阈值
2。 响应处理逻辑效率问题
3。 网络代理层的超时配置

优先检查代码而非配置，因为代码问题概率更高（配置通常会提前测试）。
```