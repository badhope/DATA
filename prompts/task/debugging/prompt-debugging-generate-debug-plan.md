---
id: prompt-debugging-generate-debug-plan
name: Generate Debug Plan
summary: 生成系统性调试计划
type: prompt
status: draft
version: 1.0.0
owner: skill-repository
category: debugging
sub_category: planning
tags:
  - debug-plan
  - planning
  - strategy
  - systematic
keywords:
  - debug-plan
  - plan
  - strategy
  - systematic
  - steps
intent: |
  基于问题分析生成系统性的调试计划。
applicable_models:
  - gpt-4
  - gpt-4-turbo
  - claude-3-opus
  - claude-3-sonnet
  - qwen-max
  - deepseek-v3
input_requirements:
  - problem_summary: string (required) 问题总结
  - root_cause_hypothesis: string (optional) 根因假设
  - available_resources: string (optional) 可用的调试资源
  - constraints: string (optional) 约束条件
output_requirements:
  - debug_plan: object 完整的调试计划
  - steps: string[] 具体调试步骤
  - expected_outcomes: string[] 每步的预期结果
  - decision_points: string[] 需要做决策的地方
  - risk_mitigation: string[] 风险缓解措施
tool_requirements:
  - Read 读取相关代码和配置
  - Search 搜索相关实现和文档
preconditions: |
  - 问题已经被清晰描述
  - 最好有初步的根因分析
anti_patterns: |
  - 不要制定过于笼统的计划
  - 不要忽略验证步骤
  - 不要跳过风险评估
failure_modes: |
  - 假设不可靠: 说明不确定性并设计验证步骤
  - 计划不可行: 调整计划使其更实际
self_check: |
  - [ ] 计划是否具体可执行？
  - [ ] 每个步骤是否可验证？
  - [ ] 是否有明确的停止条件？
related_skills:
  - skill-debugging
  - skill-planning
related_workflows:
  - workflow-bug-investigation
  - workflow-tool-assisted-debug
related_prompts:
  - prompt-debugging-identify-root-cause
  - prompt-debugging-fix-bug-safely
  - prompt-debugging-verify-fix-after-change
---

# Context

一个好的调试计划是成功调试的关键。调试计划应该系统、具体、可验证，包含明确的步骤和决策点。

# Prompt Body

你是一个软件工程师和调试专家。用户的输入是问题信息。请生成系统性的调试计划。

## 输入信息

```
问题总结：
{problem_summary}

根因假设（如果有）：
{root_cause_hypothesis}

可用资源：
{available_resources}

约束条件：
{constraints}
```

## 调试计划结构

### 1。 计划概览
— 问题概述
— 目标
— 总体策略

### 2。 阶段划分

#### 阶段 1：信息收集
— 需要收集什么信息
— 如何收集
— 验证信息完整性的标准

#### 阶段 2：假设验证
— 需要验证哪些假设
— 验证方法
— 成功/失败标准

#### 阶段 3：定位确认
— 如何确认根因
— 需要什么证据
— 确认的标准

#### 阶段 4：修复实施
— 修复策略
— 最小改动原则
— 风险评估

#### 阶段 5：验证确认
— 如何验证修复
— 测试策略
— 回归测试范围

### 3。 决策点

在调试过程中可能遇到需要决策的情况：

| 决策点 | 选项 | 建议 |
|--------|------|------|
| ... | ... | ... |

### 4。 风险与缓解

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| ... | ... | ... |

## 输出要求

### 1。 计划概览
```
目标：[具体目标]
策略：[总体策略]
预计步骤数：X
```

### 2。 详细步骤

| 步骤 | 操作 | 预期结果 | 验证方法 |
|------|------|---------|---------|
| 1 | ... | ... | ... |
| 2 | ... | ... | ... |

### 3。 决策流程
```
如果 [条件]，则 [行动]
如果 [条件]，则 [行动]
```

### 4。 停止条件
— [条件1] → 停止调试，转向其他方向
— [条件2] → 停止调试，问题超出范围

### 5。 所需资源
```
工具：……
权限：……
时间：……
```

## 约束条件

— 计划应当具体，每个步骤应当可执行
— 每个步骤应当有明确的验证方法
— 需要有决策点和备选方案
— 应当包含停止条件，避免无限调试
— 遵循最小改动原则进行修复

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `{problem_summary}` | 问题总结 | `用户登录后无法访问个人资料，返回 401 错误` |
| `{root_cause_hypothesis}` | 根因假设（如果有） | `可能是 Token 验证逻辑有问题` |
| `{available_resources}` | 可用的调试资源 | `本地开发环境、生产日志访问权限` |
| `{constraints}` | 约束条件 | `不能直接修改生产代码，需要先本地验证` |

# Usage Notes

— 适用于复杂问题的系统性调试
— 结合 identify—root—cause 的结果使用效果更好
— 决策点帮助在多种可能时做出选择
— 停止条件避免无限调试

# Example Input

```
问题总结：
用户反馈在完成支付后，订单状态没有正确更新。支付平台已扣款，但系统中订单仍显示"待支付"。该问题约影响 5% 的用户。

根因假设（如果有）：
可能是支付回调处理和订单状态更新之间存在竞态条件。

可用资源：
— 本地开发环境
— 生产环境日志（最近 7 天）
— 支付回调记录表
— 订单状态变更日志

约束条件：
— 不能直接在生产环境测试
— 修改需要通过 Code Review
— 只能在非高峰期部署
```

# Example Output

```
计划概览
目标：定位支付回调后订单状态未更新的根因
策略：从支付回调入口开始，逐步追踪状态变更链路
预计步骤数：6

详细步骤

| 步骤 | 操作 | 预期结果 | 验证方法 |
|------|------|---------|---------|
| 1 | 检查支付回调日志 | 确认回调是否成功到达 | 对比支付平台日志和系统日志 |
| 2 | 检查订单状态变更日志 | 确认状态更新是否被触发 | 查看 order_status_log 表 |
| 3 | 分析回调处理代码 | 确认处理逻辑是否正确 | 代码审查 |
| 4 | 检查数据库事务 | 确认状态更新是否在事务内 | 查看事务日志 |
| 5 | 分析竞态条件可能 | 确认是否存在并发问题 | 请求时序分析 |
| 6 | 设计并验证修复方案 | 确认修复有效 | 本地测试 |

决策流程
如果回调未到达 → 检查支付平台配置和网络路由
如果回调已到达但未处理 → 检查回调处理服务日志
如果回调处理正常但状态未更新 → 检查数据库事务和锁
如果确认竞态条件 → 设计事务或锁方案

停止条件
— 确认问题在第三方服务 → 停止调试，联系支付平台
— 确认需要架构调整 → 记录问题，规划后续重构
— 2小时内未定位 → 升级问题，召集更多资源

所需资源
工具：数据库客户端、日志分析工具
权限：生产日志只读访问
时间：预计 2—4 小时
```