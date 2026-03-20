---
id: prompt-debugging-summarize-bug-symptoms
name: Summarize Bug Symptoms
summary: 清晰准确地总结 Bug 症状
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: debugging
sub_category: documentation
tags:
  - summary
  - symptoms
  - documentation
  - bug-report
keywords:
  - summarize
  - symptoms
  - bug
  - documentation
  - report
intent: |
  将 Bug 的症状清晰地总结，便于后续调试和沟通。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - raw_error_info: string (required) 原始错误信息
  - user_description: string (optional) 用户的问题描述
  - additional_context: string (optional) 额外上下文
output_requirements:
  - summary: string 简洁清晰的问题总结
  - symptoms: string[] 关键症状列表
  - triggering_conditions: string[] 触发条件
  - impact: string 问题影响
  - environment: string 相关环境信息
tool_requirements:
  - Read 读取相关错误日志
preconditions: |
  - 应当有原始错误信息
  - 用户描述有助于理解问题
anti_patterns: |
  - 不要包含太多无关细节
  - 不要遗漏关键信息
  - 不要将推测当作事实
failure_modes: |
  - 信息混乱: 区分事实和推测
  - 细节不足: 要求补充关键信息
self_check: |
  - [ ] 总结是否清晰易懂？
  - [ ] 是否包含所有关键症状？
  - [ ] 是否区分了事实和推测？
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

清晰的 Bug 总结是有效调试的基础。一个好的总结应该包含足够的信息让调试者快速理解问题，同时避免无关细节干扰。

# Prompt Body

你是一个软件工程师。用户的输入是 Bug 的原始信息。请将其总结为清晰的症状描述。

## 输入信息

```
原始错误信息：
{raw_error_info}

用户描述（如果有）：
{user_description}

额外上下文：
{additional_context}
```

## 总结结构

### 1。 一句话总结
用一句话描述问题的本质。

### 2。 关键症状
列出问题的具体表现：
— 错误消息是什么？
— 什么操作触发了问题？
— 问题是否每次都复现？
— 是否有特定条件？

### 3。 触发条件
— 操作步骤
— 输入数据
— 环境状态

### 4。 问题影响
— 功能层面：哪些功能受损？
— 用户层面：用户体验如何？
— 系统层面：是否有资源泄漏？

### 5。 环境信息
— 相关文件
— 配置状态
— 版本信息

## 输出要求

### 1。 总结
```
[一句话清晰描述问题本质]
```

### 2。 症状清单
```
— [症状1]
— [症状2]
...
```

### 3。 触发条件
```
1。 [步骤1]
2。 [步骤2]
...
```

### 4。 影响评估
```
功能影响：[描述]
严重程度：[高/中/低]
```

### 5。 环境关联
```
相关文件：……
配置状态：……
版本信息：……
```

## 约束条件

— 总结应当简洁明了，不包含无关信息
— 区分事实（观察到的）和推测（可能的）
— 关键信息不能遗漏
— 措辞应当客观准确

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{raw_error_info}` | 原始错误信息 | `TypeError: Cannot read property 'map' of undefined at line 42` |
| `{user_description}` | 用户的问题描述 | `导出功能点击后页面变空白，控制台有报错` |
| `{additional_context}` | 额外上下文 | `该问题在 Chrome 最新版复现，Firefox 正常` |

# Usage Notes

— 适用于问题报告的初步整理阶段
— 区分事实和推测，便于后续分析
— 触发条件应具体可复现
— 避免引入无关细节

# Example Input

```
原始错误信息：
TypeError: Cannot read property 'map' of undefined
    at ProductList.render (ProductList.jsx:42)
    at processComponent (react-dom.development.js:xxx)

用户描述：
点击商品分类筛选后，页面显示空白。控制台出现上述错误。从来没有手动修改过 ProductList 组件。

额外上下文：
— 昨天执行了 npm update，今天首次测试筛选功能
— 只有在选择"电子产品"分类时复现
— 刷新页面后错误消失，但再次筛选又出现
```

# Example Output

```
总结
商品筛选功能在选择特定分类时崩溃，原因是数据结构不匹配。

症状清单
— 点击"电子产品"分类后页面空白
— 控制台显示 TypeError： Cannot read property 'map' of undefined
— 错误堆栈指向 ProductList。jsx：42
— 刷新页面可临时恢复，再次筛选复现
— 其他分类（服装、图书）正常

触发条件
1。 进入商品列表页面
2。 点击"电子产品"分类筛选
3。 ProductList 组件尝试 map() 遍历 undefined 数据

影响评估
功能影响：商品筛选功能完全不可用
严重程度：高

环境关联
相关文件：ProductList。jsx， ProductService。js
配置状态：默认
版本信息：react 18。2。0， node 18。16。0
```