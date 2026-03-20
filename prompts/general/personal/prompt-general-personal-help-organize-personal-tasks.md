---
id: prompt-general-personal-help-organize-personal-tasks-v1
name: Help Organize Personal Tasks
summary: 帮助整理个人任务
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: personal
tags:
  - task
  - organization
  - planning
  - productivity
keywords:
  - 任务整理
  - 计划
  - 效率
  - 待办
intent: |
  帮助用户整理和组织个人任务，提高任务完成率。
  强调简单、可行、不给人压力的任务整理方式。
  核心原则：好的任务管理是让人更轻松，而不是更焦虑。
applicable_models:
  - "*"
input_requirements:
  - tasks: string 任务描述
  - context: string 上下文
output_requirements:
  - organized_tasks: array 整理后的任务
  - priority_suggestion: string 优先级建议
  - action_plan: string 行动计划
tool_requirements: []
preconditions:
  - 用户有任务需要整理
anti_patterns:
  - 任务过载
  - 过于复杂的管理系统
  - 忽视用户实际情况
failure_modes:
  - 任务过多：精简任务
  - 过于复杂：保持简单
  - 不切实际：考虑实际情况
self_check: |
  整理前自检：
  □ 任务是否过多需要精简？
  □ 任务是否简单可行？
  □ 优先级是否合理？
related_skills:
  - skill-personal
related_workflows: []
related_prompts:
  - prompt-general-personal-act-as-daily-life-assistant
  - prompt-general-personal-turn-chaotic-thoughts-into-clear-notes
---

# Context

任务整理是日常生活中的常见需求。本 prompt 的核心目标是：**帮助用户整理任务，让任务变得简单可行，减少焦虑**。

# Prompt Body

## 阶段 1：任务收集

### 1.1 收集任务

```markdown
## 任务收集

### 来源
```markdown
**用户描述的任务**:
- [任务1]
- [任务2]
...

**隐含的任务**:
- [发现的隐含任务]
```
```

### 澄清
```markdown
## 澄清问题

**问题**:
- "这个任务具体要做什么？"（具体化）
- "什么时候需要完成？"（时间）
- "完成的标准是什么？"（标准）
- "做不了会有什么影响？"（优先级）
```
```

## 阶段 2：任务精简

### 2.1 精简原则

```markdown
## 任务精简

### 问问题
```markdown
**必须做 vs 可以不做**:
- "如果只做一件事，是哪件？"
- "有没有可以推迟/委托/删除的？"

**太大 vs 太小**:
- "这个任务可以2分钟内完成吗？"
- "需要拆分成更小的步骤吗？"
```

### 精简清单
```markdown
**可考虑删除/推迟**:
- [列表]

**必须保留**:
- [列表]
```
```

## 阶段 3：任务组织

### 3.1 任务结构化

```markdown
## 任务结构化

### 分类
```markdown
**紧急且重要**:
- [任务] - 截止: [时间]

**重要不紧急**:
- [任务] - 计划: [时间]

**其他**:
- [任务]
```
```

### 3.2 任务拆分

```markdown
## 任务拆分

### 拆分示例
```markdown
**原始**: "整理房间"
↓
**拆分后**:
1. [ ] 把床上的衣服收起来 (2min)
2. [ ] 把桌子上的东西归位 (5min)
3. [ ] 拖地 (10min)
...
```
```

## 阶段 4：行动计划

### 4.1 简单计划

```markdown
## 今日/本周计划

### 今天可以做
```markdown
**任务1**: [任务] - 预计: [时间]
**任务2**: [任务] - 预计: [时间]

**总计**: [时间]
```
```

### 建议节奏
```markdown
**建议**:
- 先做[任务]，因为[理由]
- 中间休息一下
- 留一些缓冲时间
```
```

## 阶段 5：输出模板

### 5.1 整理模板

```markdown
## 任务整理

### 整理后任务清单
```markdown
**今天**:
1. [ ] [任务1] - [预计时间]
2. [ ] [任务2] - [预计时间]

**本周**:
1. [ ] [任务]
2. [ ] [任务]

**之后**:
1. [ ] [任务]
```
```

### 优先级说明
```markdown
**建议顺序**: [理由]
```
