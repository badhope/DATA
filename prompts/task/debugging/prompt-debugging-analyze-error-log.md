---
id: prompt-debugging-analyze-error-log
name: Analyze Error Log
summary: 分析错误日志提取关键信息
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: debugging
sub_category: analysis
tags:
  - error-log
  - analysis
  - log
  - troubleshooting
keywords:
  - error-log
  - analyze
  - log
  - troubleshooting
  - extract
intent: |
  从错误日志中提取关键信息，识别问题模式。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - log_content: string (required) 日志内容
  - log_type: string (optional) 日志类型
  - time_range: string (optional) 时间范围
output_requirements:
  - key_events: string[] 关键事件
  - error_patterns: string[] 错误模式
  - timeline: string 事件时间线
  - root_cause_hypothesis: string 根因假设
  - next_steps: string[] 建议的后续步骤
tool_requirements:
  - Read 读取日志文件
  - Search 搜索特定模式
preconditions: |
  - 日志内容应当足够
  - 最好有时间信息
anti_patterns: |
  - 不要只看错误行
  - 不要忽略上下文
  - 不要忽略时间顺序
failure_modes: |
  - 日志不足: 说明需要什么日志
  - 日志混乱: 帮助梳理时间线
self_check: |
  - [ ] 是否提取了所有关键事件？
  - [ ] 时间线是否合理？
  - [ ] 模式识别是否准确？
related_skills:
  - skill-debugging
  - skill-repo-analysis
related_workflows:
  - workflow-bug-investigation
related_prompts:
  - prompt-debugging-analyze-stack-trace
  - prompt-debugging-identify-root-cause
---

# Context

错误日志往往包含大量信息，需要系统性地分析才能提取有价值的内容。这个 prompt 帮助 AI 从日志中识别模式、提取关键信息并形成假设。

# Prompt Body

你是一个软件工程师。用户的输入是日志内容。请分析日志并提取关键信息。

## 输入信息

```
日志内容：
{log_content}

日志类型：{log_type}
时间范围：{time_range}
```

## 分析框架

### 1。 时间线构建
按时间顺序梳理事件：
— 识别起始事件
— 追踪关键变化
— 找到错误发生的时刻

### 2。 事件分类

| 类型 | 特征 | 重要性 |
|------|------|--------|
| 错误 | ERROR/FATAL | 高 |
| 警告 | WARN | 中 |
| 信息 | INFO | 低 |
| 调试 | DEBUG | 视情况 |

### 3。 模式识别
— 重复出现的错误
— 相关的错误序列
— 时间相关性
— 资源使用模式

### 4。 上下文关联
— 错误前发生了什么
— 错误后发生了什么
— 有没有前置条件

### 5。 根因假设
基于分析形成假设：
— 什么导致了问题
— 问题的触发条件
— 需要验证什么

## 输出要求

### 1。 关键事件
```
| 时间 | 事件 | 重要性 |
|------|------|--------|
| ... | ... | ... |
```

### 2。 错误模式
```
重复出现的错误：[描述]
模式：[解释]
```

### 3。 时间线
```
[按时间顺序描述关键事件]
```

### 4。 根因假设
```
假设：[描述]
支持证据：[列表]
待验证：[列表]
```

### 5。 后续步骤
```
1。 [建议的下一步]
2。 [建议的下一步]
```

## 约束条件

— 按时时间顺序分析
— 不要只看错误行，要看上下文
— 识别重复模式和相关性
— 形成可验证的假设

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{log_content}` | 日志内容 | 完整的日志文本或日志文件路径 |
| `{log_type}` | 日志类型（可选） | application、system、access、error 等 |
| `{time_range}` | 时间范围（可选） | 2024—01—01 10：00：00 — 10：30：00 |

# Usage Notes

— 适用于分析大量日志信息
— 应结合上下文理解错误
— 模式识别比单条日志更重要
— 日志不足时，应说明需要什么日志

# Example Input

```
日志内容：
[2024-03-15 10:23:01] INFO: UserService: User login attempt for user_id=12345
[2024-03-15 10:23:01] INFO: AuthService: Validating token for user_id=12345
[2024-03-15 10:23:02] WARN: DatabaseService: Connection pool size approaching limit (45/50)
[2024-03-15 10:23:02] ERROR: AuthService: Token validation failed for user_id=12345 - TokenExpired
[2024-03-15 10:23:02] INFO: UserService: User login failed for user_id=12345, reason=TOKEN_EXPIRED
[2024-03-15 10:23:05] INFO: UserService: User login attempt for user_id=12346
[2024-03-15 10:23:05] ERROR: DatabaseService: Connection pool exhausted - Cannot acquire connection
[2024-03-15 10:23:05] ERROR: UserService: Database error for user_id=12346 - POOL_EXHAUSTED

日志类型：application
时间范围：2024—03—15 10：23：00 — 10：23：10
```

# Example Output

```
关键事件
| 时间 | 事件 | 重要性 |
|------|------|--------|
| 10：23：01 | 用户 12345 登录尝试 | 低 |
| 10：23：01 | Token 验证失败 — TokenExpired | 高 |
| 10：23：02 | 数据库连接池接近上限 (45/50) | 高 |
| 10：23：05 | 用户 12346 登录，数据库连接池耗尽 | 高 |

错误模式
重复出现的错误：用户登录失败
模式：
1。 用户 12345 因 Token 过期登录失败
2。 数据库连接池接近上限
3。 用户 12346 尝试登录时连接池完全耗尽

时间线
1。 用户 12345 发起登录请求
2。 Token 验证因过期失败
3。 同时数据库连接池接近上限
4。 用户 12346 发起登录请求
5。 因连接池已耗尽，请求完全失败

根因假设
假设：数据库连接池配置过小，在高并发或连接泄漏场景下快速耗尽
支持证据：
— 连接池从 45/50 在短时间内达到耗尽
— Token 过期是独立问题，但加剧了用户重试
待验证：
— [ ] 检查连接池最大连接数配置
— [ ] 检查是否有连接泄漏（连接未正确释放）
— [ ] 验证 Token 过期时间设置

后续步骤
1。 检查数据库连接池配置，增加上限或调查泄漏
2。 检查 Token 过期时间，考虑延长或实现刷新机制
3。 添加连接池使用率监控告警
```