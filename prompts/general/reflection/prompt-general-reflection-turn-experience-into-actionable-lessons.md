---
id: prompt-general-reflection-turn-experience-into-actionable-lessons-v1
name: Turn Experience into Actionable Lessons
summary: 将经验转化为可操作的教训
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: reflection
tags:
  - learning
  - experience
  - actionable
  - growth
keywords:
  - 经验
  - 教训
  - 可操作
  - 成长
intent: |
  帮助用户从具体经历中提取可操作的学习点，而不是泛泛的"经验教训"。
  强调具体性、可操作性、实际应用。
  核心原则：好的学习是从经历中提炼出下次可以真正使用的智慧。
applicable_models:
  - "*"
input_requirements:
  - experience: string 经历
  - outcome: string 结果
output_requirements:
  - lesson_extraction: object 教训提取
  - actionable_steps: array 可操作步骤
  - application_scenarios: array 应用场景
tool_requirements: []
preconditions:
  - 用户有一段经历想要从中学习
anti_patterns:
  - 泛泛而谈
  - 过于理论化
  - 难以执行
failure_modes:
  - 教训太抽象：具体化到行动
  - 教训太多：聚焦1-3个关键点
  - 难以执行：确保可操作性
self_check: |
  提取前自检：
  □ 教训是否具体到可以立刻执行？
  □ 是否考虑了应用的场景和条件？
  □ 是否聚焦而不是贪多？
related_skills:
  - skill-reflection
related_workflows: []
related_prompts:
  - prompt-general-reflection-summarize-what-went-well-and-what-did-not
  - prompt-general-reflection-create-next-step-improvement-plan
---

# Context

从经历中学习是成长的关键。本 prompt 的核心目标是：**帮助用户从具体经历中提取可操作的学习点，形成下次可以使用的智慧**。

# Prompt Body

## 阶段 1：经历还原

### 1.1 具体经历

```markdown
## 经历还原

### 发生了什么
```markdown
**情况**: [具体场景]
**我做的**: [具体行动]
**结果**: [实际结果]
**期望结果**: [原本期望]
```

### 结果差异
```markdown
**期望 vs 实际**:
- [期望]
↓
[实际]

**关键差异点**:
- [差异1]
- [差异2]
```
```

## 阶段 2：原因分析

### 2.1 归因分析

```markdown
## 原因分析

### 可能的原因
```markdown
**成功因素**（如果结果好）:
- [因素1]
- [因素2]

**失败因素**（如果结果不好）:
- [因素1]
- [因素2]

**外部因素**:
- [列表]

**可控制的因素**:
- [列表]
```
```

### 2.2 关键洞察

```markdown
## 关键洞察

**最重要的发现**:
[1-2句话的核心洞察，不要多]

**有意思的点**:
[其他值得注意的发现]
```
```

## 阶段 3：教训提取

### 3.1 从具体到抽象

```markdown
## 教训提炼

### 模式识别
```markdown
**这件事让我意识到**:
[不要写"要更加努力"这种，要具体]

**更深的理解**:
[从具体事件中抽出的更深层道理]
```
```

### 3.2 可操作的教训

```markdown
## 可操作教训

### 教训格式
```markdown
**教训**: [从这件事中学到的]
**为什么有用**: [背后的原理]
**什么时候用**: [应用场景]
**怎么做**: [具体行动步骤]
```

### 教训示例
```markdown
❌ 泛泛教训: "要更好地管理时间"
✓ 具体教训: "当有多个deadline时，先花5分钟评估哪个更紧急，而不是默认做最近想到的那个"
原因: 避免被"心理距离"误导
场景: 多任务时
做法: 停下来，列出deadline，评估优先级后再开始
```
```

## 阶段 4：应用规划

### 4.1 下次应用

```markdown
## 下次应用

### 触发场景
```markdown
**当遇到这种情况时**:
- [具体场景描述]

**我就做**:
1. [具体行动1]
2. [具体行动2]
```
```

### 4.2 预设方案

```markdown
## 预设方案

**情况**: [情况描述]
**方案**:
1. [步骤1]
2. [步骤2]
[而不是等到时候再想]
```
```

## 阶段 5：输出模板

### 5.1 教训模板

```markdown
## 经历 → 教训

### 经历
```markdown
**情况**: [描述]
**结果**: [结果]
```

### 关键教训
```markdown
**教训**: [1-2句话]
**原理**: [为什么这个教训有价值]
```

### 应用
```markdown
**下次遇到[场景]**:

**我就做**:
1. [具体行动]
2. [具体行动]
```
