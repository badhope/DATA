---
id: prompt-debugging-analyze-stack-trace
name: Analyze Stack Trace
summary: 分析堆栈跟踪定位问题
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: debugging
sub_category: analysis
tags:
  - stack-trace
  - analysis
  - trace
  - call-stack
keywords:
  - stack-trace
  - analyze
  - trace
  - call-stack
  - error
intent: |
  系统性分析堆栈跟踪，提取关键信息并定位问题。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - stack_trace: string (required) 堆栈跟踪信息
  - error_type: string (optional) 错误类型
  - language: string (optional) 编程语言
output_requirements:
  - error_summary: string 错误摘要
  - call_sequence: string[] 调用序列
  - likely_source: string 最可能的错误源
  - relevant_code_locations: string[] 相关代码位置
  - suggestions: string[] 调试建议
tool_requirements:
  - Read 读取相关代码文件
preconditions: |
  - 堆栈跟踪应当完整
  - 最好知道编程语言
anti_patterns: |
  - 不要只看第一行
  - 不要忽略异常类型
  - 不要忽略用户代码和框架代码的区别
failure_modes: |
  - 堆栈不完整: 要求提供完整堆栈
  - 混淆调用方向: 明确是调用方还是被调用方问题
self_check: |
  - [ ] 是否正确识别了错误源？
  - [ ] 是否区分了用户代码和框架代码？
  - [ ] 调用序列是否合理？
related_skills:
  - skill-debugging
  - skill-repo-analysis
related_workflows:
  - workflow-bug-investigation
related_prompts:
  - prompt-debugging-identify-root-cause
  - prompt-debugging-analyze-error-log
---

# Context

堆栈跟踪是调试的重要信息来源，但需要系统性分析才能提取有价值的信息。这个 prompt 帮助 AI 从堆栈跟踪中提取关键信息并定位问题。

# Prompt Body

你是一个软件工程师。用户的输入是堆栈跟踪。请系统性地分析堆栈跟踪。

## 输入信息

```
堆栈跟踪：
{stack_trace}

错误类型：{error_type}
编程语言：{language}
```

## 分析框架

### 1。 错误类型识别
— 检查异常类型
— 识别常见错误模式
— 确定错误严重程度

### 2。 调用序列分析
— 从下往上阅读（通常是入口点）
— 识别关键方法调用
— 追踪数据流

### 3。 代码位置区分
```
用户代码（最可能是问题源）：
— [位置1]
— [位置2]

框架代码（通常不是问题源）：
— [位置1]
— [位置2]
```

### 4。 根因定位
— 找到第一个出错的调用
— 检查参数是否合法
— 追踪状态变化

### 5。 信息提取
— 提取关键变量值（如有）
— 识别数据传递问题
— 检查边界条件

## 输出要求

### 1。 错误摘要
```
错误类型：[类型]
错误消息：[核心消息]
严重程度：[高/中/低]
```

### 2。 调用序列
```
1。 [函数/方法] @ [文件：行号]
2。 [函数/方法] @ [文件：行号]
...
```

### 3。 错误源分析
```
最可能的错误源：[位置]
理由：[为什么这么判断]
```

### 4。 相关代码位置
| 位置 | 代码片段 | 分析 |
|------|---------|------|
| ... | ... | ... |

### 5。 调试建议
```
建议检查：
1。 [建议1]
2。 [建议2]
```

## 约束条件

— 从下往上系统阅读堆栈
— 区分用户代码和框架代码
— 关注错误类型和消息
— 结合代码上下文分析

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{stack_trace}` | 堆栈跟踪信息 | 完整的错误堆栈，包含方法调用链和行号 |
| `{error_type}` | 错误类型（可选） | TypeError、NullPointerException 等 |
| `{language}` | 编程语言（可选） | JavaScript、Python、Java 等 |

# Usage Notes

— 适用于有堆栈跟踪的错误分析
— 堆栈跟踪应该完整，包含所有调用帧
— 应区分用户代码和框架/库代码
— 关注错误类型和错误消息，而非仅行号

# Example Input

```
堆栈跟踪：
TypeError: Cannot read property 'map' of undefined
    at ProductService.getActiveProducts (ProductService.js:42)
    at ProductController.list (ProductController.js:18)
    at Router.handle (router.js:95)
    at Layer.handle [as handle_request] (node_modules/express/lib/router/router.js:284)
    at next (node_modules/express/lib/router/route.js:398)
    at MiddlewareManager.trigger (node_modules/express/node_modules/middlewareManager.js:30)
    at processRequest (node_modules/express/lib/application.js:178)

错误类型：TypeError
编程语言：JavaScript (Node。js)
```

# Example Output

```
错误摘要
错误类型：TypeError
错误消息：Cannot read property 'map' of undefined
严重程度：高

调用序列
1。 application。js：processRequest [Node。js 框架]
2。 middlewareManager。js：trigger [Node。js 框架]
3。 route。js：next [Express 框架]
4。 router。js：handle [Express 框架]
5。 ProductController。js：18：list [用户代码]
6。 ProductService。js：42：getActiveProducts [用户代码] ← 错误发生处

错误源分析
最可能的错误源：ProductService。js：42
理由：
— 这是堆栈中第一个用户代码位置
— 错误消息表明尝试对 undefined 调用 map 方法
— getActiveProducts 可能在某处返回了 undefined

相关代码位置
| 位置 | 代码片段 | 分析 |
|------|---------|------|
| ProductService。js：42 | products。map(……) | 这里的 products 是 undefined |
| ProductController。js：18 | getActiveProducts() | 调用了 getActiveProducts |

调试建议
1。 检查 getActiveProducts 方法的返回值
2。 确认 products 数据源是否正确
3。 检查是否有条件导致 products 未被赋值
4。 验证数据库查询结果是否可能为空
```