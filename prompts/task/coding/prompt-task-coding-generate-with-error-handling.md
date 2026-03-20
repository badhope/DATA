---
id: prompt-coding-generate-with-error-handling
name: Generate Code with Error Handling
summary: 生成包含健壮错误处理的代码
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: coding
sub_category: generate
tags:
  - error-handling
  - robustness
  - defensive
  - validation
keywords:
  - error-handling
  - robust
  - defensive
  - validation
  - exception
intent: |
  生成包含健壮错误处理的代码，处理各种异常情况。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - code_concept: string (required) 代码概念/功能描述
  - language: string (required) 编程语言
  - error_strategy: string (optional) 错误处理策略
  - context: string (optional) 使用上下文
output_requirements:
  - code: string 包含错误处理的代码
  - error_cases: string[] 处理的错误情况
  - error_types: string 定义的自定义错误类型
  - recovery_strategies: string[] 恢复策略
tool_requirements:
  - Read 读取项目现有代码了解错误处理模式
  - Write 输出代码
preconditions: |
  - 功能需求应当清晰
  - 了解项目的错误处理规范会有帮助
anti_patterns: |
  - 不要只 catch 不处理
  - 不要使用过于宽泛的异常捕获
  - 不要在错误处理中引入新的异常
failure_modes: |
  - 错误情况不全: 指出可能遗漏的错误情况
  - 策略不明确: 说明推荐的错误处理策略
self_check: |
  - [ ] 是否覆盖了所有可能的错误情况？
  - [ ] 错误处理是否恰当（不过度也不不足）？
  - [ ] 是否有资源泄漏风险？
  - [ ] 错误信息是否足够用于调试？
related_skills:
  - skill-coding
  - skill-testing
related_workflows:
  - workflow-implementation
related_prompts:
  - prompt-coding-generate-from-requirement
  - prompt-coding-implement-from-spec
  - prompt-testing-write-unit
---

# Context

健壮的错误处理是高质量代码的标志。这个 prompt 帮助 AI 生成包含完整错误处理的代码，考虑各种异常情况并提供适当的恢复策略。

# Prompt Body

你是一个高级软件工程师。用户的输入是一个功能需求。请生成包含健壮错误处理的代码。

## 输入信息

```
功能描述：{code_concept}
编程语言：{language}
错误处理策略：{error_strategy}
使用上下文：{context}
```

## 错误处理策略

### 防御式编程
— 输入验证
— 边界检查
— 状态验证

### 异常安全
— 异常中性
— 异常透明
— 强异常保证

### 错误传播
— 本地处理 vs 向上传播
— 错误码 vs 异常
— 错误上下文

## 常见的错误情况

### 输入错误
— 空值 / undefined
— 类型错误
— 格式错误
— 范围错误

### 环境错误
— 文件不存在
— 权限不足
— 网络不可达
— 超时

### 业务错误
— 状态不一致
— 违反约束
— 超出配额

### 系统错误
— 内存不足
— 磁盘空间不足
— 连接池耗尽

## 输出要求

### 1。 错误处理设计
```
错误策略：{描述}
处理的错误情况：{列表}
自定义错误类型：{列表}
```

### 2。 代码实现
```language
{language}
{完整代码}
```

### 3。 错误处理说明

对于每种错误情况：
```
错误类型：……
触发条件：……
处理方式：……
恢复策略：……
日志级别：……
```

### 4。 测试建议
```language
{语言}
{错误处理测试代码}
```

## 约束条件

— 必须处理所有可预见的错误情况
— 错误处理不能引入新的异常
— 资源使用后必须正确释放
— 错误信息要足够用于调试
- 遵循项目的错误处理规范