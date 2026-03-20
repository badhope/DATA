---
id: prompt-debugging-identify-root-cause
name: Identify Root Cause
summary: 系统性识别问题根因
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: debugging
sub_category: analysis
tags:
  - root-cause
  - analysis
  - investigation
keywords:
  - root-cause
  - identify
  - analyze
  - investigation
  - hypothesis
intent: |
  基于证据系统性识别问题的根本原因，通过假设验证的方式定位真正的问题源。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - error_information: string (required) 错误信息（错误消息、堆栈跟踪）
  - expected_behavior: string (required) 期望行为
  - actual_behavior: string (required) 实际行为
  - context: string (optional) 额外上下文信息
output_requirements:
  - root_cause: string 识别出的根本原因
  - confidence_level: string 置信度（高/中/低）及依据
  - evidence_chain: string[] 支持结论的证据链
  - eliminated_hypotheses: string[] 被排除的假设及排除原因
  - next_steps: string[] 建议的后续步骤
tool_requirements:
  - Read 读取相关代码文件
  - Search 搜索相关错误和实现
  - Grep 搜索特定模式
preconditions: |
  - 用户应当提供尽可能多的错误信息
  - 期望行为和实际行为的描述有助于定位问题
anti_patterns: |
  - 不要在证据不足时直接假设根因
  - 不要忽略用户提供的任何错误信息
  - 不要跳过假设验证直接进行修复
  - 不要选择第一个看起来对的假设而不验证
failure_modes: |
  - 信息不足: 请求用户提供更多错误信息或上下文
  - 假设过多: 先验证最可能的原因，逐步缩小范围
  - 误导性信息: 交叉验证多个信息源
self_check: |
  - [ ] 是否有足够的证据支持这个结论？
  - [ ] 是否验证了其他可能的假设？
  - [ ] 置信度是否合理？
  - [ ] 是否需要更多信息来确认？
related_skills:
  - skill-debugging
  - skill-repo-analysis
related_workflows:
  - workflow-bug-investigation
  - workflow-tool-assisted-debug
related_prompts:
  - prompt-debugging-generate-debug-plan
  - prompt-debugging-analyze-stack-trace
  - prompt-debugging-analyze-error-log
---

# Context

调试的第一步是识别真正的问题根因，而不是表面现象。很多问题看起来类似，但根因可能完全不同。这个 prompt 帮助 AI 通过系统性的假设验证流程，基于证据定位问题的真正来源。

# Prompt Body

你是一个高级软件工程师和调试专家。用户的输入是问题信息。请系统性地识别问题的根本原因。

## 输入信息

```
错误信息：
{error_information}

期望行为：
{expected_behavior}

实际行为：
{actual_behavior}

额外上下文：
{context}
```

## 工作流程

### 1。 信息收集与分析

仔细分析用户提供的信息：
— 错误消息的核心内容是什么？
— 错误发生在哪个阶段？（编译/运行/构建/测试）
— 这个问题是首次出现还是重复出现？
— 最近有什么变更可能与这个问题相关？

### 2。 假设生成

基于分析结果，提出可能的假设：

**可能的原因类别：**
— 代码逻辑错误（空指针、数组越界、状态不一致）
— 数据问题（输入格式错误、数据不完整、类型不匹配）
— 配置问题（环境变量、配置文件、启动参数）
— 依赖问题（版本冲突、依赖缺失、API 变更）
— 环境问题（权限、网络、资源限制）
— 并发问题（竞态条件、死锁、状态共享）

### 3。 假设验证

对每个假设进行验证：
— 找到支持或反驳这个假设的证据
— 检查相关代码、配置、日志
— 确定每个假设的置信度

### 4。 结论得出

基于验证结果：
— 确定最可能的根因
— 说明排除其他假设的原因
— 如果无法确定根因，说明需要进一步收集什么信息

## 输出要求

### 1。 根因分析
```
根本原因：[具体描述]
置信度：[高/中/低]
置信依据：[说明为什么这么判断]
```

### 2。 证据链
```
1。 [证据1] → 说明 [结论1]
2。 [证据2] → 说明 [结论2]
...
```

### 3。 被排除的假设
| 假设 | 排除原因 |
|------|---------|
| ... | ... |

### 4。 待验证项（如有）
如果信息仍然不足，列出需要用户补充的信息。

## 约束条件

— 必须基于证据进行判断，不能凭空猜测
— 需要验证多个假设后才能得出结论
— 如果信息不足，明确说明需要什么信息
— 区分现象和根因，不要将现象当作原因

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{error_information}` | 错误信息（错误消息、堆栈跟踪） | `TypeError: Cannot read property 'x' of null at line 42` |
| `{expected_behavior}` | 期望行为 | `函数应返回用户对象而不是 null` |
| `{actual_behavior}` | 实际行为 | `函数返回 null 且后续调用抛出异常` |
| `{context}` | 额外上下文信息 | `该问题在用户登录后首次访问个人资料时出现` |

# Usage Notes

— 当用户报告问题时，首先使用此 prompt 进行根因分析
— 如果信息不足，应先请求补充而非强行分析
— 分析过程中应及时向用户反馈进展和发现
— 对于复杂问题，可能需要多次迭代分析
— 置信度应基于证据的充分性和一致性

# Example Input

```
错误信息：
TypeError: Cannot read property 'name' of undefined
    at UserService.getProfile (user.service.ts:42)
    at UserController.get (user.controller.ts:28)

期望行为：
获取用户个人资料并返回包含 name、email、avatar 的用户信息对象

实际行为：
在调用 getProfile 时抛出 TypeError，错误信息提示 undefined

额外上下文：
该接口在用户首次登录后访问个人资料时触发，是新部署版本引入的问题
```

# Example Output

```
根本原因：用户服务中 getProfile 方法在用户数据不存在时未做空值检查
置信度：高
置信依据：错误堆栈直接指向 user。service。ts：42，且问题出现在新版本部署后

证据链：
1。 错误堆栈显示 TypeError 发生在 user。service。ts：42 的 getProfile 方法
2。 检查代码发现该方法直接访问 user。name 而未检查 user 是否存在
3。 问题出现在新部署版本，对比代码发现新增了用户资料获取逻辑
4。 数据库查询显示该用户记录确实不存在

被排除的假设：
| 假设 | 排除原因 |
|------|---------|
| 数据库连接问题 | 其他 API 调用正常 |
| 权限问题 | 错误发生在数据访问层而非权限验证 |
| 网络问题 | 错误是确定的类型错误而非网络超时 |

待验证项：
— [x] 确认用户数据是否真的不存在
— [ ] 验证其他用户是否有相同问题
— [ ] 检查是否有缓存层导致数据不一致

后续步骤：
1。 在 getProfile 中添加空值检查
2。 确定用户数据缺失的原因
3。 添加适当的错误处理和日志记录
4。 编写测试用例覆盖此场景
```