---
id: prompt-general-reflection-identify-patterns-in-repeated-problems-v1
name: Identify Patterns in Repeated Problems
summary: 识别重复问题中的模式
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: reflection
tags:
  - patterns
  - problems
  - awareness
  - insight
keywords:
  - 模式识别
  - 问题
  - 觉察
  - 洞察
intent: |
  帮助用户识别反复出现的问题背后的模式，不只是解决表面问题，而是找到根本原因。
  强调模式识别是自我了解的重要部分，不是给自己贴标签。
  核心原则：识别模式是为了增加自我了解，而不是自我批评。
applicable_models:
  - "*"
input_requirements:
  - repeated_problems: array 反复出现的问题
  - context: string 上下文
output_requirements:
  - pattern_identification: object 模式识别
  - root_causes: array 根本原因
  - awareness_insights: string 觉察洞察
tool_requirements: []
preconditions:
  - 用户注意到有反复出现的问题
anti_patterns:
  - 给自己贴标签
  - 过度归纳
  - 归咎于性格
failure_modes:
  - 过度泛化：具体而非泛化
  - 绝对化标签：行为而非性格
  - 忽视情境：考虑情境因素
self_check: |
  识别前自检：
  □ 是否避免了绝对化的标签？
  □ 是否考虑了情境因素？
  □ 是否是好奇而非自责的态度？
related_skills:
  - skill-reflection
related_workflows: []
related_prompts:
  - prompt-general-reflection-structure-self-review-without-self-attack
  - prompt-general-reflection-turn-experience-into-actionable-lessons
---

# Context

反复出现的问题往往背后有模式。本 prompt 的核心目标是：**帮助用户识别反复问题背后的模式，增加自我了解而不是自我批评**。

# Prompt Body

## 阶段 1：问题收集

### 1.1 列举问题

```markdown
## 问题列举

### 反复出现的问题
```markdown
**问题1**: [描述]
**出现次数**: [大概频率]
**最近一次**: [时间]
**典型场景**: [场景]

**问题2**: [类似结构]
...
```
```

### 触发条件
```markdown
## 触发条件

**通常在什么情况下出现**:
- [情境1]
- [情境2]

**通常和什么相关**:
- [时间/压力/关系/特定场景]
```
```

## 阶段 2：模式识别

### 2.1 横向比较

```markdown
## 横向比较

### 问题对比
```markdown
| 问题 | 共同点 | 不同点 |
|------|--------|--------|
| 问题1 | | |
| 问题2 | | |
| 问题3 | | |
```
```

### 共同模式
```markdown
## 共同模式

**表面共同点**:
- [列表]

**行为模式**:
- [行为]

**反应模式**:
- [反应]

**情境模式**:
- [情境]
```
```

## 阶段 3：深入分析

### 3.1 可能的原因

```markdown
## 可能的原因

### 习惯/自动化反应
```markdown
**可能的习惯性反应**:
- [描述]

**什么时候形成的**:
- [可能的来源]

**为什么很难改变**:
- [分析]
```
```

### 3.2 深层因素

```markdown
## 深层因素

### 可能的影响因素
```markdown
**信念/价值观因素**:
- [如：完美主义/取悦他人/害怕冲突]

**过往经历因素**:
- [如：过去的经验形成了现在的反应]

**当前压力因素**:
- [如：当前的压力源放大了某些反应]

**情境因素**:
- [如：特定环境触发了某些反应]
```
```

## 阶段 4：洞察形成

### 4.1 觉察洞察

```markdown
## 觉察洞察

### 有意思的发现
```markdown
**我注意到**:
[用好奇的语气，不是"我发现了我有问题"]

**这让我理解到**:
[对自己的新理解]

**有意思的是**:
[任何意外发现]
```
```

### 4.2 去标签化

```markdown
## 去标签化

### 不是给自己贴标签
```markdown
❌ "我是拖延症"
✓ "我在某些情况下会拖延"

❌ "我总是逃避"
✓ "面对压力时，我有时会倾向于先做简单的事"

❌ "我没有意志力"
✓ "在某些条件下，我很难保持动力"
```
```

## 阶段 5：应用建议

### 5.1 模式转化

```markdown
## 模式转化

### 识别后的选择
```markdown
**如果想改变某个模式**:
- 触发条件是什么？ → [识别]
- 可以改变触发条件吗？ → [调整环境]
- 可以改变反应吗？ → [练习新反应]
- 这个模式有什么保护作用吗？ → [理解功能]

**如果这个模式有保护作用**:
- [理解它为什么存在]
- [寻找更健康的方式满足同样的需求]
```
```

## 阶段 6：输出模板

### 6.1 模式识别模板

```markdown
## 模式识别

### 反复的问题
```markdown
1. [问题]
2. [问题]
```

### 识别到的模式
```markdown
**行为模式**: [描述]
**触发情境**: [描述]
**可能的深层因素**: [分析]
```

### 觉察
```markdown
[好奇的自我观察，不是自责]
```

### 下一步
```markdown
[可选：理解这个模式/尝试改变触发条件/练习新反应]
```
