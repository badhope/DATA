---
id: prompt-general-context-memory-maintain-full-context-across-long-conversation-v1
name: Maintain Full Context Across Long Conversation
summary: 在长对话中维护完整上下文，确保任务连续性
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: context-memory
tags:
  - context
  - memory
  - long-conversation
  - continuity
keywords:
  - 上下文维护
  - 长对话
  - 上下文连续性
  - 任务持续
intent: |
  指导 AI 在长对话中系统性地维护上下文完整性和任务连续性。
  强调上下文维护是结构化的主动行为，而非被动记忆。
  核心原则：上下文维护必须基于可见信息做主动保持，而非声称拥有永久记忆。
applicable_models:
  - "*"
input_requirements:
  - conversation_history: array 对话历史
  - current_task: string 当前任务
  - user_constraints: array 用户约束
output_requirements:
  - context_summary: object 上下文摘要
  - active_constraints: array 活跃约束
  - pending_items: array 待处理事项
  - next_action: string 建议的下一步行动
tool_requirements:
  - Read tool (读取之前的上下文)
preconditions:
  - 对话超过 3 轮
anti_patterns:
  - 声称拥有对话历史外的记忆
  - 被动等待而非主动维护
  - 上下文碎片化
failure_modes:
  - 丢失关键约束：结构化记录约束
  - 任务目标漂移：明确当前任务状态
  - 重复确认已知信息：维护上下文摘要
self_check: |
  维护前自检：
  □ 是否识别了当前任务的阶段？
  □ 是否维护了所有活跃约束？
  □ 是否追踪了待处理事项？
  □ 是否避免了重复确认已知信息？
related_skills:
  - skill-context-memory
  - skill-reasoning
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-context-memory-summarize-conversation-state-without-losing-constraints
  - prompt-general-context-memory-restore-relevant-context-before-continuing-task
---

# Context

在长对话中，AI 需要主动维护上下文完整性和任务连续性。这不是"记忆"（因为 AI 没有真正的记忆），而是基于可见的对话历史进行的结构化上下文管理。本 prompt 的核心目标是：**指导 AI 在长对话中系统性地维护上下文，让任务推进不丢失关键信息**。

# Prompt Body

## 阶段 1：上下文识别

### 1.1 对话阶段判断

```markdown
## 对话阶段判断

### 当前阶段识别
| # | 阶段 | 特征 | 上下文维护重点 |
|---|------|------|----------------|
| 1 | 初始 | 任务刚提出 | 明确任务目标和约束 |
| 2 | 澄清 | 需求讨论中 | 记录澄清结果和决策 |
| 3 | 执行 | 任务进行中 | 追踪进度和待处理项 |
| 4 | 验证 | 结果确认中 | 维护验证标准和反馈 |
| 5 | 收尾 | 任务完成 | 记录最终结果和后续步骤 |

### 上下文完整性检查
| # | 检查项 | 状态 | 说明 |
|---|--------|------|------|
| 1 | 任务目标明确 | [✅/❌] | [说明] |
| 2 | 约束条件记录 | [✅/❌] | [说明] |
| 3 | 已完成事项追踪 | [✅/❌] | [说明] |
| 4 | 待处理事项清晰 | [✅/❌] | [说明] |
```

## 阶段 2：上下文结构化

### 2.1 上下文快照

```markdown
## 上下文快照

### 任务上下文
```markdown
**当前任务**: [任务描述]
**任务阶段**: [阶段]
**任务起源**: [最初需求]

**目标**:
1. [目标1]
2. [目标2]

**约束**:
- [约束1]
- [约束2]
```

### 技术上下文
```markdown
**技术栈**: [栈]
**代码位置**: [位置]
**已有代码**: [摘要]

**待处理代码变更**:
- [变更1]
- [变更2]
```

### 决策上下文
```markdown
**已做决策**:
| # | 决策 | 依据 | 日期 |
|---|------|------|------|
| 1 | [决策] | [依据] | [日期] |

**悬而未决问题**:
| # | 问题 | 状态 | 阻塞 |
|---|------|------|------|
| 1 | [问题] | [状态] | [是否] |
```
```

### 2.2 约束追踪

```markdown
## 约束追踪

### 用户声明的约束
| # | 约束 | 来源 | 有效性 | 说明 |
|---|------|------|--------|------|
| 1 | [约束] | [对话/需求] | [有效/已变更] | [说明] |

### 技术约束
| # | 约束 | 来源 | 说明 |
|---|------|------|------|
| 1 | [约束] | [代码/架构] | [说明] |
```

## 阶段 3：任务连续性维护

### 3.1 任务状态追踪

```markdown
## 任务状态追踪

### 当前任务状态
```markdown
**任务**: [任务]
**状态**: [进行中/暂停/等待反馈]
**开始时间**: [时间]
**最后更新时间**: [时间]

**进度**:
- [已完成部分]
- [进行中部分]
- [待处理部分]
```

### 待处理事项
| # | 事项 | 来源 | 优先级 | 状态 |
|---|------|------|--------|------|
| 1 | [事项] | [来源] | [优先级] | [状态] |
```

### 3.2 下一步行动

```markdown
## 下一步行动

### 建议的下一步
```markdown
**行动**: [行动描述]
**理由**: [理由]
**预期结果**: [预期]

**前置条件**:
- [条件1]
- [条件2]
```

### 需要用户确认的事项
| # | 事项 | 紧急程度 | 说明 |
|---|------|----------|------|
| 1 | [事项] | [程度] | [说明] |
```

## 阶段 4：上下文压缩（长对话）

### 4.1 压缩时机

```markdown
## 上下文压缩

### 压缩触发条件
| # | 条件 | 说明 | 操作 |
|---|------|------|------|
| 1 | 对话超过 20 轮 | 上下文过长 | 压缩历史 |
| 2 | 任务阶段切换 | 进入新阶段 | 重置上下文 |
| 3 | 用户明确要求 | 用户请求 | 按要求压缩 |

### 压缩原则
| 原则 | 说明 |
|------|------|
| 保留决策 | 所有已做决策必须保留 |
| 保留约束 | 所有活跃约束必须保留 |
| 保留进度 | 当前任务进度必须保留 |
| 压缩细节 | 重复的讨论细节可以压缩 |
```

### 4.2 压缩后的上下文模板

```markdown
## 压缩后上下文模板

### 任务概览
```markdown
**任务**: [任务]
**阶段**: [阶段]
**约束**: [约束列表]

**已完成**:
- [结果1]
- [结果2]

**进行中**:
- [当前事项]

**待处理**:
- [事项1]
- [事项2]

**决策历史**:
- [决策1]
- [决策2]

**悬而未决**:
- [问题]
```
```

## 阶段 5：上下文恢复

### 5.1 上下文丢失检测

```markdown
## 上下文丢失检测

### 检测信号
| # | 信号 | 说明 | 处理 |
|---|------|------|------|
| 1 | 任务目标不清晰 | 需要重新确认 | 询问用户 |
| 2 | 约束缺失 | 之前讨论的约束丢失 | 引用之前对话 |
| 3 | 重复确认 | 已经确认过的事项 | 参考已有上下文 |
| 4 | 进展矛盾 | 与之前进展矛盾 | 检查历史 |
```

### 5.2 主动恢复

```markdown
## 主动恢复机制

### 需要恢复的迹象
```markdown
当出现以下情况时，主动恢复上下文：
1. 用户提到"之前说的"、"刚才讨论的"
2. 任务与之前的任务相关
3. 需要引用之前的决策或约束
```

### 恢复操作
```markdown
**恢复步骤**:
1. 识别需要恢复的内容
2. 在对话历史中查找
3. 重建上下文
4. 确认恢复正确
```
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `conversation_history` | 对话历史 | `[{role: "user", content: "..."}]` |
| `current_task` | 当前任务 | `"实现用户登录功能"` |
| `user_constraints` | 用户约束 | `["不能改变现有API"]` |

# Usage Notes

1. **主动维护**：不要等用户提醒，主动维护上下文
2. **结构化记录**：使用结构化格式便于追踪
3. **压缩但不失真**：长对话压缩时保留关键信息
4. **明确阶段**：每个任务有明确的阶段标识
5. **不重复确认**：避免重复确认已知信息

# Example Input

```yaml
conversation_history:
  - role: "user"
    content: "帮我重构订单模块"
  - role: "assistant"
    content: "好的，请提供更多细节..."
  - role: "user"
    content: "主要问题是代码太复杂，要降低复杂度"
current_task: "重构订单模块"
user_constraints:
  - "不能改变现有API"
  - "测试覆盖率要保持"
```

# Example Output

```yaml
context_summary:
  task: "重构订单模块"
  phase: "澄清阶段"
  goal: "降低代码复杂度"
  constraints:
    - "不能改变现有API"
    - "测试覆盖率要保持"

active_constraints:
  - constraint: "不能改变现有API"
    source: "用户明确声明"
    valid: true
  - constraint: "测试覆盖率保持"
    source: "用户明确声明"
    valid: true

pending_items:
  - item: "了解当前代码复杂度"
      priority: "P0"
    status: "待处理"
  - item: "确定重构范围"
      priority: "P1"
    status: "待处理"

next_action: "请提供当前订单模块的代码位置或描述当前复杂度问题"
```
