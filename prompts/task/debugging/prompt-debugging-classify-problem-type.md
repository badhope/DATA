---
id: prompt-debugging-classify-problem-type
name: Classify Problem Type
summary: 对问题进行分类以确定调试方向
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: debugging
sub_category: classification
tags:
  - classification
  - problem-type
  - triage
keywords:
  - classify
  - problem-type
  - triage
  - category
  - identify
intent: |
  根据问题特征将其分类到正确的类别，确定后续调试的方向和优先级。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - error_message: string (optional) 错误消息
  - symptoms: string (required) 问题现象描述
  - error_type: string (optional) 错误类型（如果有）
output_requirements:
  - problem_category: string 问题类别
  - sub_category: string 子类别
  - severity: string 严重程度（critical/major/minor）
  - urgency: string 紧急程度（high/medium/low）
  - suggested_approach: string[] 建议的调试方向
  - related_diagnostics: string[] 相关的诊断命令/步骤
tool_requirements:
  - Read 读取相关代码
  - Search 搜索类似问题
preconditions: |
  - 用户应当描述问题的具体现象
  - 如果有错误消息，应当提供
anti_patterns: |
  - 不要仅根据错误消息的表面文字分类
  - 不要忽略问题现象中隐含的线索
  - 不要在分类不确定时强行分类
failure_modes: |
  - 现象不清: 要求更详细的现象描述
  - 分类模糊: 提供最可能的分类并说明原因
self_check: |
  - [ ] 分类是否基于足够的证据？
  - [ ] 严重程度是否合理？
  - [ ] 建议的方向是否与分类匹配？
related_skills:
  - skill-debugging
  - skill-coding
related_workflows:
  - workflow-bug-investigation
related_prompts:
  - prompt-debugging-identify-root-cause
  - prompt-debugging-generate-debug-plan
---

# Context

问题分类是调试的重要起点。不同类型的问题需要不同的调试方法和工具。正确的分类可以大大加速调试过程。

# Prompt Body

你是一个软件工程师。用户的输入是问题现象。请对问题进行分类。

## 输入信息

```
错误消息（如果有）：
{error_message}

问题现象：
{symptoms}

错误类型（如果有）：
{error_type}
```

## 问题分类体系

### 按问题来源分类

| 主类别 | 子类别 | 典型特征 |
|--------|--------|---------|
| 代码逻辑 | 空指针、数组越界、状态错误、算法错误 | 特定输入触发、可复现 |
| 语法/类型 | 编译错误、类型不匹配、导入错误 | 编译阶段暴露 |
| 配置 | 环境变量、配置文件、启动参数 | 检查配置可解决 |
| 环境 | 权限、网络、资源、版本 | 环境相关 |
| 依赖 | 版本冲突、依赖缺失、API变更 | 包管理器信息 |
| 并发 | 竞态条件、死锁、状态共享 | 非确定性 |
| 集成 | API调用、服务通信、数据格式 | 跨系统边界 |
| 数据 | 输入格式、编码、边界值 | 数据相关 |

### 按严重程度分类

| 严重程度 | 定义 | 示例 |
|----------|------|------|
| Critical | 导致系统不可用或数据丢失 | 服务崩溃、数据损坏 |
| Major | 功能严重受损但有 workaround | 核心功能不可用 |
| Minor | 功能部分受损或体验问题 | UI显示错误、日志噪音 |

### 按紧急程度分类

| 紧急程度 | 定义 | 考虑因素 |
|----------|------|---------|
| High | 需要立即处理 | 影响核心功能、用户无法工作 |
| Medium | 短期内需要处理 | 有 workaround、影响部分用户 |
| Low | 可以稍后处理 | 边缘情况、影响很小 |

## 工作流程

1。 **分析现象**：理解问题的具体表现
2。 **匹配类别**：根据特征匹配最可能的类别
3。 **评估影响**：判断严重程度和紧急程度
4。 **建议方向**：给出调试建议

## 输出要求

### 1。 分类结果
```
问题类别：{主类别}
子类别：{子类别}
```

### 2。 影响评估
```
严重程度：{Critical/Major/Minor}
紧急程度：{High/Medium/Low}
```

### 3。 建议的调试方向
```
1。 [第一步建议]
2。 [第二步建议]
...
```

### 4。 相关诊断
```
建议检查：
— [诊断项1]
— [诊断项2]
```

## 约束条件

— 分类应当基于具体证据，而非猜测
— 如果现象不典型，说明假设并提供最可能的分类
— 严重程度应当客观评估，避免过度升级或降级

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{error_message}` | 错误消息（如果有） | `ECONNREFUSED: Connection refused to port 5432` |
| `{symptoms}` | 问题现象描述 | `数据库连接在高峰时段失败，但几分钟后自动恢复` |
| `{error_type}` | 错误类型（如果有） | `network_error` |

# Usage Notes

— 适用于问题初筛阶段，快速确定调试方向
— 如果现象不足以分类，请求补充信息
— 严重程度应客观评估，避免过度升级
— 建议的调试方向应与分类匹配

# Example Input

```
错误消息（如果有）：
Error: connect ETIMEDOUT 203.0.113.42:443

问题现象：
支付接口在生产环境中偶发超时，但本地测试正常。超时通常发生在整点时刻，与日志显示的定时任务执行时间吻合。

错误类型（如果有）：
timeout_error
```

# Example Output

```
问题类别：集成
子类别：服务通信超时

影响评估
严重程度：Major
紧急程度：High

建议的调试方向：
1。 检查整点时刻定时任务的网络请求配置
2。 对比生产网络和本地网络的差异
3。 查看支付接口的超时配置
4。 检查是否有连接池耗尽的情况

建议检查：
— 支付接口的超时设置（connect timeout vs read timeout）
— 定时任务的并发数量限制
— 生产环境的网络出口 IP 是否有频率限制
— 连接池配置和实际使用情况
```