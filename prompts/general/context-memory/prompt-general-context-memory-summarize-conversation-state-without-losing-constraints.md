---
id: prompt-general-context-memory-summarize-conversation-state-without-losing-constraints-v1
name: Summarize Conversation State Without Losing Constraints
summary: 在不丢失约束的前提下总结对话状态
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: context-memory
tags:
  - context
  - summary
  - constraints
  - conversation
keywords:
  - 对话总结
  - 约束保持
  - 状态摘要
  - 上下文压缩
intent: |
  指导 AI 在总结对话状态时系统性地保留所有关键约束。
  强调约束是对话上下文的核心，必须在总结中明确标注。
  核心原则：好的对话总结让接手者能立即了解当前状态而不遗漏任何约束。
applicable_models:
  - "*"
input_requirements:
  - conversation_history: array 对话历史
  - current_state: object 当前状态
  - known_constraints: array 已知约束
output_requirements:
  - state_summary: object 状态摘要
  - constraint_list: array 约束列表
  - decision_log: array 决策日志
  - action_items: array 行动项
tool_requirements:
  - Read tool (读取对话历史)
preconditions:
  - 有对话历史需要总结
anti_patterns:
  - 总结时遗漏约束
  - 约束与决策混淆
  - 行动项不明确
failure_modes:
  - 约束丢失：明确标注每个约束
  - 决策追溯困难：完整的决策日志
  - 行动项模糊：具体的行动描述
self_check: |
  总结前自检：
  □ 是否识别了所有约束？
  □ 是否记录了每个决策的依据？
  □ 是否明确了行动项？
  □ 是否标注了悬而未决的问题？
related_skills:
  - skill-context-memory
  - skill-reasoning
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-context-memory-maintain-full-context-across-long-conversation
  - prompt-general-context-memory-compress-context-for-long-running-collaboration
---

# Context

对话总结是在不丢失关键信息的前提下，将冗长的对话压缩为结构化的状态摘要。约束是对话上下文的核心部分，必须在总结中明确保留。本 prompt 的核心目标是：**指导 AI 创建完整保留约束的对话状态摘要**。

# Prompt Body

## 阶段 1：约束识别

### 1.1 约束来源

```markdown
## 约束来源

### 显式约束
| # | 约束 | 来源 | 原话 | 有效性 |
|---|------|------|------|--------|
| 1 | [约束] | [用户明确声明] | [原话] | [有效] |

### 隐式约束
| # | 约束 | 推断来源 | 推断依据 | 有效性 |
|---|------|----------|----------|--------|
| 1 | [约束] | [代码/架构/行业] | [依据] | [需确认] |
```

### 1.2 约束分类

```markdown
## 约束分类

### 功能约束
| # | 约束 | 说明 | 优先级 |
|---|------|------|--------|
| 1 | [约束] | [说明] | [优先级] |

### 技术约束
| # | 约束 | 说明 | 优先级 |
|---|------|------|--------|
| 1 | [约束] | [说明] | [优先级] |

### 业务约束
| # | 约束 | 说明 | 优先级 |
|---|------|------|--------|
| 1 | [约束] | [说明] | [优先级] |

### 时间约束
| # | 约束 | 说明 | 优先级 |
|---|------|------|--------|
| 1 | [约束] | [说明] | [优先级] |
```

## 阶段 2：决策追踪

### 2.1 决策记录

```markdown
## 决策记录

### 决策清单
| # | 决策 | 依据 | 日期 | 决策者 |
|---|------|------|------|--------|
| 1 | [决策] | [依据] | [日期] | [人] |
```

### 2.2 决策影响

```markdown
## 决策影响

### 对后续工作的影响
| # | 决策 | 约束 | 行动项 |
|---|------|------|--------|
| 1 | [决策] | [约束] | [项] |
```

## 阶段 3：状态摘要

### 3.1 核心状态

```markdown
## 核心状态摘要

### 任务状态
```markdown
**当前任务**: [任务]
**任务阶段**: [阶段]

**已完成**:
- [完成项1]
- [完成项2]

**进行中**:
- [进行中项]

**待处理**:
- [待处理项1]
- [待处理项2]
```

### 关键约束（必须保留）
```markdown
**P0 必须满足的约束**:
1. [约束1] - 来源: [来源]
2. [约束2] - 来源: [来源]

**P1 应当满足的约束**:
1. [约束] - 来源: [来源]

**P2 最好满足的约束**:
1. [约束] - 来源: [来源]
```
```

### 3.2 悬而未决

```markdown
## 悬而未决

### 待确认事项
| # | 事项 | 影响 | 阻塞 | 确认人 |
|---|------|------|------|--------|
| 1 | [事项] | [影响] | [是/否] | [人] |

### 已提出但未回答的问题
| # | 问题 | 上下文 | 重要程度 |
|---|------|--------|----------|
| 1 | [问题] | [上下文] | [程度] |
```

## 阶段 4：行动项

### 4.1 待执行行动

```markdown
## 待执行行动

### AI 待完成
| # | 行动 | 前置条件 | 优先级 | 状态 |
|---|------|----------|--------|------|
| 1 | [行动] | [条件] | [优先级] | [状态] |

### 需要用户确认/提供
| # | 事项 | 类型 | 紧急程度 | 说明 |
|---|------|------|----------|------|
| 1 | [事项] | [类型] | [程度] | [说明] |
```

### 4.2 行动追踪

```markdown
## 行动追踪

### 行动状态
| # | 行动 | 负责人 | 截止时间 | 状态 |
|---|------|--------|----------|------|
| 1 | [行动] | [人] | [时间] | [状态] |
```

## 阶段 5：总结输出

### 5.1 完整状态摘要

```markdown
## 对话状态摘要

### 基本信息
| 项目 | 内容 |
|------|------|
| 对话主题 | [主题] |
| 摘要时间 | [时间] |
| 对话轮数 | [N] |

### 关键约束（必须保留）
```markdown
**约束1**: [约束内容]
  - 来源: [来源]
  - 类型: [类型]
  - 优先级: P0

**约束2**: [约束内容]
  - 来源: [来源]
  - 类型: [类型]
  - 优先级: P1
```

### 决策摘要
```markdown
**决策1**: [决策内容]
  - 依据: [依据]
  - 日期: [日期]

**决策2**: [决策内容]
  - 依据: [依据]
  - 日期: [日期]
```

### 当前状态
```markdown
**任务进度**: [进度]
**已完成**: [列表]
**进行中**: [列表]
**待处理**: [列表]
```

### 悬而未决
```markdown
**待确认**: [列表]
**待回答**: [列表]
```

### 下一步
```markdown
**AI 行动**: [行动]
**需要用户**: [事项]
```
```

### 5.2 交接检查清单

```markdown
## 交接检查清单

### 必须包含
- [ ] 所有 P0 约束已记录
- [ ] 所有决策有依据
- [ ] 当前任务状态清晰
- [ ] 行动项明确

### 确认已保留
- [ ] 功能约束
- [ ] 技术约束
- [ ] 时间约束
- [ ] 质量约束
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `conversation_history` | 对话历史 | `[{role: "user", content: "..."}]` |
| `current_state` | 当前状态 | `{task: "进行中", phase: "执行"}` |
| `known_constraints` | 已知约束 | `["API不能改", "测试覆盖率保持"]` |

# Usage Notes

1. **约束优先**：总结时首先识别和保留约束
2. **决策可追溯**：每个决策记录依据
3. **行动具体**：行动项必须具体可执行
4. **交接友好**：让接手者能立即上手
5. **版本化**：标注摘要时间，便于追踪

# Example Input

```yaml
conversation_history:
  - role: "user"
    content: "我要重构用户服务"
  - role: "assistant"
    content: "好的，你有什么具体要求？"
  - role: "user"
    content: "主要是降低圈复杂度，要保持API不变"
current_state:
  task: "重构用户服务"
  phase: "规划阶段"
known_constraints:
  - "API保持不变"
  - "圈复杂度降到10以下"
  - "测试覆盖率保持100%"
```

# Example Output

```yaml
state_summary:
  topic: "重构用户服务"
  phase: "规划阶段"
  progress: "已完成需求澄清，待技术方案设计"

constraint_list:
  - constraint: "API保持不变"
    source: "用户明确声明"
    type: "功能约束"
    priority: "P0"
  - constraint: "圈复杂度降到10以下"
    source: "用户明确声明"
    type: "质量约束"
    priority: "P0"
  - constraint: "测试覆盖率保持100%"
    source: "用户明确声明"
    type: "质量约束"
    priority: "P1"

decision_log:
  - decision: "确定重构范围为用户服务"
    rationale: "用户指定"
    date: "2024-01-15"

action_items:
  - item: "设计技术方案"
    owner: "assistant"
    priority: "P0"
    status: "进行中"
  - item: "用户确认技术方案"
    owner: "user"
    priority: "P0"
    status: "待确认"
```
