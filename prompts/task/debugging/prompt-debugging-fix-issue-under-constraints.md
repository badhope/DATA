---
id: prompt-debugging-fix-issue-under-constraints
name: Fix Issue Under Constraints
summary: 在约束条件下修复问题
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: debugging
sub_category: fix
tags:
  - fix
  - constraints
  - limitations
  - workaround
keywords:
  - fix
  - constraint
  - limitation
  - workaround
  - restriction
intent: |
  在特定约束条件下找到可行的修复方案。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - issue: string (required) 问题描述
  - root_cause: string (required) 根因
  - constraints: string[] (required) 约束条件
  - code_context: string (required) 代码上下文
output_requirements:
  - feasible_fix: string 可行的修复方案
  - constraint_analysis: string 约束分析
  - tradeoffs: string[] 权衡取舍
  - alternatives: string[] 备选方案
  - implementation_notes: string 实施注意事项
tool_requirements:
  - Read 读取代码
  - Write 必要时修改
preconditions: |
  - 约束条件必须明确
  - 根因应当清晰
anti_patterns: |
  - 不要忽视任何约束条件
  - 不要假设约束可以被绕过
  - 不要选择违反约束的方案
failure_modes: |
  - 无可行方案: 说明原因并提供 workaround
  - 约束冲突: 指出冲突并建议优先级
self_check: |
  - [ ] 方案是否满足所有约束？
  - [ ] 是否有无法满足的约束？
  - [ ] 权衡取舍是否合理？
related_skills:
  - skill-debugging
  - skill-coding
related_workflows:
  - workflow-bug-investigation
related_prompts:
  - prompt-debugging-fix-bug-safely
  - prompt-debugging-propose-minimal-risk-fix
---

# Context

实际工作中，修复往往受到各种约束：不能修改某部分代码、必须保持 API 兼容、性能不能恶化等。这个 prompt 帮助在约束条件下找到可行的修复方案。

# Prompt Body

你是一个软件工程师。用户的输入是问题和约束条件。请在约束条件下找到可行的修复方案。

## 输入信息

```
问题：{issue}
根因：{root_cause}
约束条件：{constraints}
代码上下文：{code_context}
```

## 常见约束类型

### 技术约束
— 不能修改某些文件
— 必须保持 API 兼容
— 不能增加复杂度
— 性能不能恶化

### 时间约束
— 必须在某个时间点前修复
— 只能做最小改动
— 必须快速部署

### 环境约束
— 不能修改数据库结构
— 不能改变配置文件格式
— 必须在现有架构内解决

### 资源约束
— 不能添加新依赖
— 只能使用现有工具
— 人员技能限制

## 工作流程

1。 **分析约束**：理解每个约束的硬性和弹性
2。 **评估影响**：每个约束对修复方案的限制
3。 **寻找可行空间**：在约束范围内寻找方案
4。 **权衡取舍**：如果必须取舍，明确说明
5。 **验证方案**：确认方案满足所有硬性约束

## 输出要求

### 1。 约束分析
```
硬性约束（必须满足）：
— [约束1]

弹性约束（可以适度放宽）：
— [约束1]
— 可放宽程度：[说明]
```

### 2。 可行方案
```
方案：[描述]
满足的约束：[列表]
不满足的约束：[列表，如有]
```

### 3。 权衡取舍
| 取舍 | 原因 | 影响 |
|------|------|------|
| ... | ... | ... |

### 4。 备选方案
```
方案A：[描述] — 适用场景
方案B：[描述] — 适用场景
```

### 5。 实施注意
```
[在约束条件下实施时需要注意什么]
```

## 约束条件

— 必须满足所有硬性约束
— 如果无可行方案，明确说明原因
— 权衡取舍必须透明
— 给出备选方案以供参考

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{issue}` | 问题描述 | `用户上传文件时，如果文件名包含特殊字符会失败` |
| `{root_cause}` | 根因 | `文件名验证正则表达式过于严格，拒绝了合法的 Unicode 字符` |
| `{constraints}` | 约束条件 | `["不能修改数据库表结构", "必须保持 API 兼容性", "必须在今天内修复"]` |
| `{code_context}` | 代码上下文 | `file-upload.js 中的 validateFileName 方法` |

# Usage Notes

— 适用于生产环境紧急修复或遗留系统维护
— 约束条件必须全部明确，不能假设
— 如果约束无法同时满足，应指出冲突
— 权衡取舍必须透明，帮助决策者做判断

# Example Input

```
问题：
用户上传文件时，如果文件名包含中文或特殊字符（如「文件_2024。doc」），上传会失败。

根因：
文件名校验正则表达式 `/^[a-zA-Z0-9._-]+$/` 过于严格，不允许 Unicode 字符。

约束条件：
1。 硬性约束：不能修改数据库表结构（文件路径已存储）
2。 硬性约束：必须保持 API 兼容性（不能改变接口签名）
3。 弹性约束：希望在 4 小时内修复上线
4。 硬性约束：不能引入新依赖

代码上下文：
validateFileName(filename) 在文件上传前被调用，返回 false 时拒绝上传。
```

# Example Output

```
约束分析
硬性约束（必须满足）：
— 不能修改数据库表结构
— 必须保持 API 兼容性
— 不能引入新依赖

弹性约束（可以适度放宽）：
— 修复时间：希望 4 小时内，可协商

可行方案
方案：修改正则表达式为 `/^[^\\/:*?"<>|]+$/`
满足的约束：所有硬性约束
不满足的约束：无

权衡取舍
| 取舍 | 原因 | 影响 |
|------|------|------|
| 正则可能仍有边界情况 | 简化方案避免过度设计 | 需要后续监控 |
| 放弃原有正则的严格性 | 平衡兼容性和安全性 | 需评估安全风险 |

备选方案
方案A（推荐）：修改正则表达式 — 快速修复，4小时内可上线
方案B：重写文件名校验逻辑，支持白名单 — 需要更多时间（约2天）

实施注意
1。 修改后必须在测试环境完整测试
2。 上线后监控文件上传成功率
3。 考虑添加文件名校验日志
4。 建议后续评估是否需要更严格的校验
```