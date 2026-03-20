---
id: prompt-general-reflection-guide-daily-reflection-v1
name: Guide Daily Reflection
summary: 引导每日反思
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: reflection
tags:
  - reflection
  - daily
  - mindfulness
  - growth
keywords:
  - 每日反思
  - 正念
  - 成长
  - 觉察
intent: |
  引导用户进行轻松的每日反思，不是深度剖析，而是温和的回顾和觉察。
  强调反思是为了更好地前进，不是自我批评。
  核心原则：好的反思是建设性的，让人更了解自己而非自我攻击。
applicable_models:
  - "*"
input_requirements:
  - reflection_topic: string 反思主题
  - time_period: string 时间段
output_requirements:
  - reflection_questions: array 反思问题
  - gentle_insights: string 温和洞察
  - positive_noticing: string 积极发现
tool_requirements: []
preconditions:
  - 用户想要进行每日反思
anti_patterns:
  - 过于深入的自我批评
  - 制造焦虑
  - 完美主义反思
failure_modes:
  - 反思变自我攻击：保持温和
  - 过于沉重：保持轻松的建设性
  - 忽视积极面：平衡觉察
self_check: |
  反思前自检：
  □ 是否保持了温和的建设性？
  □ 是否平衡了积极和需要改进的？
  □ 是否避免了自我攻击的语气？
related_skills:
  - skill-reflection
related_workflows: []
related_prompts:
  - prompt-general-reflection-summarize-what-went-well-and-what-did-not
  - prompt-general-reflection-structure-self-review-without-self-attack
---

# Context

每日反思是自我觉察的重要工具。本 prompt 的核心目标是：**引导用户进行轻松、建设性的每日反思，促进自我了解而非自我批评**。

# Prompt Body

## 阶段 1：反思准备

### 1.1 反思态度

```markdown
## 反思态度

### 正确的反思观
```markdown
**反思不是**:
- 自我审判
- 找出所有做错的事
- 为没做好的事自责

**反思是**:
- 好奇地观察自己
- 发现有用的模式
- 为明天更好地做准备
```
```

### 温和开场
```markdown
**开始语**:
"今天我们来做个轻松的反思。不是检讨会，更像是和自己聊聊天～"

"不用追求完美，就随便聊聊今天。"
```
```

## 阶段 2：回顾问题

### 2.1 轻松回顾

```markdown
## 回顾问题

### 基础问题
```markdown
**今天怎么样？**（1-10分，10分最好）
- 总体感觉: [分数]

**今天发生了什么？**
- [简单描述今天重要的事]

**今天的感觉如何？**
- 开心的时候: [时刻]
- 困难的时候: [时刻]
```
```

### 2.2 具体问题

```markdown
## 具体回顾

### 能量状态
```markdown
**精力**:
- 今天什么时候最有精力？
- 什么时候感觉疲惫？

**情绪**:
- 今天总体情绪怎么样？
- 有什么特别感受吗？
```
```

### 工作/任务
```markdown
**今天做了什么？**
- 完成的事: [列表]
- 没完成的事: [列表]（没完成也没关系）

**做得好的**:
- [至少一件今天做得好的事]

**可以改进的**:
- [可以改进的地方]（不是自责，是学习）
```
```

## 阶段 3：积极觉察

### 3.1 发现美好

```markdown
## 积极觉察

### 今天的美好
```markdown
**值得注意的积极时刻**:
- [如：和同事聊得很开心]
- [如：完成了一件事]
- [如：喝到了好喝的咖啡]

**感谢的事**:
- [可以感谢的事]
```
```

### 3.2 发现模式

```markdown
## 模式觉察

**注意到的模式**:
- [最近经常出现的感受/行为]

**有意思的发现**:
- [任何新发现]
```
```

## 阶段 4：温柔洞察

### 4.1 洞察分享

```markdown
## 洞察

**可能想对自己说的**:
- [温和的洞察，不批评]

**明天的可能尝试**:
- [不是必须，只是"如果想的话"]
```
```

## 阶段 5：反思模板

### 5.1 每日反思模板

```markdown
## 今日反思

### 今天感觉（1-10）
[分数]

### 关键词
[3个描述今天的词]

### 做得好的
- [至少1件]

### 今天学到的
- [如果有的话]

### 明天想尝试
- [可选]

### 想感谢的
- [可选]
```
