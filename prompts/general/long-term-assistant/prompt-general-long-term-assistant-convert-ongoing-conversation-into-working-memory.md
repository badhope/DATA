---
id: prompt-general-long-term-assistant-convert-ongoing-conversation-into-working-memory-v1
name: Convert Ongoing Conversation into Working Memory
summary: 将进行中的对话转化为工作记忆
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: long-term-assistant
tags:
  - working-memory
  - context
  - conversion
  - preservation
keywords:
  - 工作记忆
  - 上下文转换
  - 信息保留
  - 上下文
intent: |
  指导 AI 将进行中的对话关键信息转化为结构化的工作记忆。
  强调工作记忆是连接会话的桥梁，需要提取和组织关键信息。
  核心原则：工作记忆应该包含继续工作所需的所有关键上下文。
applicable_models:
  - "*"
input_requirements:
  - conversation_history: array 对话历史
  - current_task: string 当前任务
output_requirements:
  - working_memory: object 工作记忆
  - key_decisions: array 关键决策
  - pending_items: array 待处理事项
  - next_steps: array 下一步
tool_requirements:
  - Read tool (读取对话历史)
preconditions:
  - 有对话历史需要转化为工作记忆
anti_patterns:
  - 信息过载
  - 关键信息丢失
  - 结构混乱
failure_modes:
  - 信息遗漏：完整的信息提取框架
  - 结构不清：清晰的结构组织
  - 过于冗长：精简的关键信息
self_check: |
  转化前自检：
  □ 是否提取了所有关键信息？
  □ 结构是否清晰易用？
  □ 是否保持了必要的简洁？
related_skills:
  - skill-long-term-assistant
  - skill-context-memory
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-long-term-assistant-maintain-project-continuity-over-time
  - prompt-general-context-memory-summarize-conversation-state-without-losing-constraints
---

# Context

对话中的关键信息需要被提取和组织，以便后续使用。本 prompt 的核心目标是：**指导 AI 将对话历史转化为结构化的工作记忆，包含继续工作所需的关键信息**。

# Prompt Body

## 阶段 1：信息提取

### 1.1 提取维度

```markdown
## 信息提取维度

### 关键信息
```markdown
**目标与需求**:
- [目标1]
- [需求1]

**约束与限制**:
- [约束1]
- [限制1]

**偏好与风格**:
- [偏好1]
- [风格1]
```
```

### 决策记录
```markdown
**技术决策**:
| # | 决策 | 理由 | 结果 |
|---|------|------|------|
| 1 | [决策] | [理由] | [结果] |

**方案选择**:
| # | 选项 | 选择 | 理由 |
|---|------|------|------|
| 1 | [选项] | [选择] | [理由] |
```
```

### 1.2 成果记录

```markdown
## 成果记录

### 已完成工作
```markdown
**产出**:
1. [产出1] - 描述: [描述]
2. [产出2] - 描述: [描述]
```

### 解决的问题
```markdown
**问题**: [问题]
**解决方案**: [方案]
**结果**: [结果]
```
```

## 阶段 2：待处理事项

### 2.1 待处理分类

```markdown
## 待处理事项

### 待决策
```markdown
**问题**: [问题]
**选项**: [选项]
**决策点**: [决策点]
**等待**: [等待什么]
```
```

### 待完成
```markdown
**任务**: [任务]
**状态**: [状态]
**阻塞**: [阻塞因素]
**下一步**: [行动]
```
```

### 待确认
```markdown
**内容**: [内容]
**状态**: [待确认]
**等待**: [等待什么]
```
```

## 阶段 3：结构化

### 3.1 工作记忆结构

```markdown
## 工作记忆结构

### 头部信息
```markdown
**项目/任务**: [名称]
**会话时间**: [时间]
**会话目的**: [目的]
**当前阶段**: [阶段]
```

### 关键上下文
```markdown
**目标**: [目标]
**约束**: [约束]
**偏好**: [偏好]
**已知信息**: [信息]
```

### 关键决策
```markdown
**决策1**: [决策] - [理由]
**决策2**: [决策] - [理由]
```

### 进展状态
```markdown
**已完成**: [列表]
**进行中**: [列表]
**待开始**: [列表]
```

### 关键问题
```markdown
**阻塞**: [问题]
**待决策**: [决策]
**待确认**: [确认]
```
```

### 下一步
```markdown
**立即行动**: [行动]
**后续行动**: [行动]
```
```

## 阶段 4：工作记忆模板

### 4.1 完整模板

```markdown
## 工作记忆

### 概览
```markdown
**任务**: [任务]
**阶段**: [阶段]
**时间**: [时间]
```

### 关键上下文
```markdown
**目标**: [目标]
**约束**: [约束]
**偏好**: [偏好]
```

### 关键决策
```markdown
1. [决策1]
2. [决策2]
```

### 状态
```markdown
**已完成**:
- [项]

**进行中**:
- [项]

**待处理**:
- [项]
```

### 下一步
```markdown
**立即**: [行动]
**后续**: [行动]
```
```

### 注意事项
```markdown
- [注意1]
- [注意2]
```
```

## 阶段 5：使用指南

### 5.1 记忆应用

```markdown
## 工作记忆应用

### 新会话开始时
```markdown
1. 阅读工作记忆
2. 确认上下文是否仍然有效
3. 询问是否有更新
```

### 继续工作时
```markdown
1. 引用工作记忆中的信息
2. 确认方向是否正确
3. 从上次的"下一步"继续
```
```

### 会话结束时
```markdown
1. 更新工作记忆
2. 记录新的决策和进展
3. 记录新的待处理事项
```
```

## 阶段 6：输出模板

### 6.1 输出模板

```markdown
## 工作记忆

```markdown
[结构化的工作记忆内容]
```
