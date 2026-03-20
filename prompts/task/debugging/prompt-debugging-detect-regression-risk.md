---
id: prompt-debugging-detect-regression-risk
name: Detect Regression Risk
summary: 检测代码修改的回归风险
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: debugging
sub_category: risk-analysis
tags:
  - regression
  - risk
  - impact
  - analysis
  - change
keywords:
  - regression
  - risk
  - impact
  - analysis
  - change
  - detect
intent: |
  在代码修改前评估潜在的回归风险。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - proposed_change: string (required) 提议的修改
  - affected_code: string (required) 受影响的代码
  - change_scope: string (optional) 变更范围
  - test_coverage: string (optional) 当前测试覆盖
output_requirements:
  - regression_risks: string[] 回归风险列表
  - risk_levels: string 每个风险的风险等级
  - affected_functions: string[] 可能受影响的函数
  - mitigation_strategies: string[] 风险缓解策略
  - testing_recommendations: string[] 测试建议
tool_requirements:
  - Read 读取相关代码
  - Search 搜索调用关系
preconditions: |
  - 修改方案应当明确
  - 应当了解受影响的代码范围
anti_patterns: |
  - 不要低估任何风险
  - 不要忽略间接影响
  - 不要假设测试覆盖足够
failure_modes: |
  - 影响范围不清: 帮助分析影响范围
  - 风险评估困难: 给出保守估计
self_check: |
  - [ ] 是否覆盖了所有可能的影响？
  - [ ] 风险等级是否合理？
  - [ ] 缓解策略是否可行？
related_skills:
  - skill-debugging
  - skill-coding
related_workflows:
  - workflow-change-verify
related_prompts:
  - prompt-debugging-fix-bug-safely
  - prompt-debugging-verify-fix-after-change
---

# Context

在修改代码前，评估回归风险可以帮助避免引入新问题。这个 prompt 帮助系统性评估修改的潜在回归风险。

# Prompt Body

你是一个软件工程师。用户的输入是修改信息。请评估回归风险。

## 输入信息

```
提议的修改：{proposed_change}
受影响的代码：{affected_code}
变更范围：{change_scope}
当前测试覆盖：{test_coverage}
```

## 风险评估框架

### 1。 影响范围分析

**直接影响的代码**
— 被修改的函数/方法
— 被修改的类/模块
— 被修改的文件

**间接影响的代码**
— 调用被修改代码的地方
— 依赖被修改功能的地方
— 共享状态的地方

### 2。 风险类型

| 风险类型 | 描述 | 可能性 |
|----------|------|--------|
| 功能破坏 | 修改导致现有功能不工作 | 高/中/低 |
| 接口破坏 | 修改破坏公共接口 | 高/中/低 |
| 性能退化 | 修改导致性能下降 | 高/中/低 |
| 资源泄漏 | 修改引入资源泄漏 | 高/中/低 |
| 安全漏洞 | 修改引入安全风险 | 高/中/低 |

### 3。 风险等级

| 等级 | 定义 | 行动 |
|------|------|------|
| Critical | 必须修复才能发布 | 停止修改，重新设计 |
| High | 应该修复才能发布 | 优先修复 |
| Medium | 可以在知道风险的情况下发布 | 添加监控 |
| Low | 风险可忽略 | 正常发布 |

### 4。 测试覆盖评估

| 覆盖类型 | 当前状态 | 风险影响 |
|----------|----------|----------|
| 单元测试 | …… | ... |
| 集成测试 | …… | ... |
| 端到端测试 | …… | ... |

## 输出要求

### 1。 回归风险列表
| 风险 | 风险类型 | 等级 | 影响范围 |
|------|----------|------|----------|
| ... | ... | ... | ... |

### 2。 可能受影响的函数
```
直接调用：
— [函数1]
— [函数2]

间接影响：
— [函数1]
— [函数2]
```

### 3。 风险缓解策略
| 风险 | 缓解策略 | 责任人 |
|------|---------|--------|
| ... | ... | ... |

### 4。 测试建议
```
建议添加的测试：
1。 [测试1]
2。 [测试2]
```

### 5。 整体评估
```
回归风险等级：[高/中/低]
建议：[是否应该继续修改]
```

## 约束条件

— 系统性评估所有可能的回归风险
— 区分直接和间接影响
— 给出明确的风险等级
— 提供可行的缓解策略

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{proposed_change}` | 提议的修改 | `在 UserService 中添加缓存机制` |
| `{affected_code}` | 受影响的代码 | `UserService.getUser 方法及其调用方` |
| `{change_scope}` | 变更范围（可选） | `影响 user、order、payment 三个模块` |
| `{test_coverage}` | 当前测试覆盖（可选） | `UserService 有 80% 单元测试覆盖` |

# Usage Notes

— 适用于修改代码前的风险评估
— 应该在设计修改方案时使用
— 帮助识别需要重点测试的区域
— 缓解策略应该具体可执行

# Example Input

```
提议的修改：
在 UserService 中添加用户数据的缓存机制，使用 Redis 缓存用户信息以减少数据库压力。

受影响的代码：
- UserService.getUser()
- UserService.getUserById()
- UserService.updateUser()
— 所有调用上述方法的控制器和服务

变更范围：
主要影响用户模块，但缓存失效逻辑可能影响所有使用用户数据的模块。

当前测试覆盖：
— UserService 单元测试覆盖率 85%
— 缺少缓存相关的集成测试
```

# Example Output

```
回归风险列表
| 风险 | 风险类型 | 等级 | 影响范围 |
|------|----------|------|----------|
| 缓存数据与数据库不一致 | 数据完整性 | High | 所有获取用户数据的地方 |
| 缓存键冲突 | 功能破坏 | Medium | 可能有相同 ID 的不同类型数据 |
| 缓存过期导致频繁查询 | 性能 | Low | 大量并发请求场景 |
| Redis 连接失败导致服务不可用 | 可用性 | High | 所有依赖用户数据的操作 |

可能受影响的函数
直接调用：
- UserController.getUser
- UserController.updateUser
- OrderService.getUserForOrder
- PaymentService.validateUser

间接影响：
— 所有需要用户信息的服务和 API

风险缓解策略
| 风险 | 缓解策略 | 责任人 |
|------|---------|--------|
| 数据不一致 | 添加缓存失效逻辑，确保数据更新时清除缓存 | @开发者 |
| Redis 不可用 | 实现缓存降级，Redis 不可用时直接查数据库 | @开发者 |
| 性能问题 | 合理设置缓存 TTL，添加监控 | @运维 |

测试建议
建议添加的测试：
1。 缓存命中/未命中场景的单元测试
2。 缓存失效时的数据一致性测试
3。 Redis 不可用时的降级逻辑测试
4。 缓存键冲突的边界测试
5。 高并发场景下的缓存性能测试

整体评估
回归风险等级：Medium
建议：可以继续修改，但需要实现缓存降级逻辑并添加足够的测试覆盖后再上线
```