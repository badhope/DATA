---
id: prompt-general-reflection-summarize-what-went-well-and-what-did-not-v1
name: Summarize What Went Well and What Did Not
summary: 总结做得好与可以改进的
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: reflection
tags:
  - summary
  - review
  - balance
  - learning
keywords:
  - 总结
  - 回顾
  - 平衡
  - 学习
intent: |
  帮助用户平衡地总结一段时间内的经历，既认可做得好的，也温和地识别可以改进的。
  强调平衡的重要性，避免只关注负面或只停留在正面。
  核心原则：好的总结是看到全局，看到进步也看到空间。
applicable_models:
  - "*"
input_requirements:
  - time_period: string 时间段
  - experiences: string 经历
output_requirements:
  - positive_summary: string 正面总结
  - improvement_areas: string 改进领域
  - balanced_view: string 平衡视角
tool_requirements: []
preconditions:
  - 用户想要总结一段时间的经历
anti_patterns:
  - 只关注负面
  - 只强调正面
  - 过度自责
failure_modes:
  - 失衡：平衡正负
  - 过度自责：保持建设性
  - 泛泛而谈：具体化
self_check: |
  总结前自检：
  □ 是否平衡了正面和需要改进的？
  □ 是否保持了建设性而非自责？
  □ 是否具体而非泛泛而谈？
related_skills:
  - skill-reflection
related_workflows: []
related_prompts:
  - prompt-general-reflection-guide-daily-reflection
  - prompt-general-reflection-turn-experience-into-actionable-lessons
---

# Context

平衡的总结帮助我们看到全局。本 prompt 的核心目标是：**帮助用户全面地总结一段时间的经历，既认可做得好的，也识别可以改进的**。

# Prompt Body

## 阶段 1：正面总结

### 1.1 认可做得好的

```markdown
## 做得好的

### 发现优点
```markdown
**做得好的方面**:
- [具体的好表现/好决定/好行动]

**成功的时刻**:
- [具体场景]

**保持的好习惯/做法**:
- [列表]
```
```

### 肯定表达
```markdown
**值得肯定的**:
- "你做到了..."（而不是泛泛的"还不错"）
- "这个决定很好，因为..."（具体化）
- "你克服了..."（认可努力）
```
```

## 阶段 2：改进领域

### 2.1 温和识别

```markdown
## 可以改进的

### 识别方式
```markdown
**观察而非评判**:
- "我注意到..."（而非"我总是..."）
- "这次..."（而非"你从不..."）
- "有时候..."（而非"从来都..."）
```

### 改进领域
```markdown
**可以改进的方面**:
1. [具体方面] - 例子: [具体场景]
2. [具体方面] - 例子: [具体场景]
```
```

## 阶段 3：平衡视角

### 3.1 整合观点

```markdown
## 平衡总结

### 并列呈现
```markdown
**做得好的 + 需要改进的**:
| 方面 | 状态 | 具体例子 |
|------|------|----------|
| 工作 | 做得好的 | [例子] | 需要改进 | [例子] |
| 人际 | 做得好的 | [例子] | 需要改进 | [例子] |
```
```

### 3.2 全局视角

```markdown
## 全局视角

**整体评估**:
- [这段时间的总体评价]

**不是**:
- 只有负面
- 只有正面

**而是**:
- 有做得好的
- 也有成长的空间
- 这才是正常的
```
```

## 阶段 4：学习提取

### 4.1 从经历学习

```markdown
## 从中学到的

**主要收获**:
- [从做得好的中] → [学到了什么]
- [从挫折中] → [学到了什么]

**可以带到下次的**:
- [具体的经验/教训/方法]
```
```

## 阶段 5：输出模板

### 5.1 总结模板

```markdown
## [时间段] 总结

### 做得好的 ⭐
- [1-3件做得好的具体事例]

### 成长的空间 📈
- [1-3件可以改进的具体事例]

### 平衡总结
[一两句话的全局评价，避免极端]

### 下次可以用到的
- [从这段经历中学到的可操作经验]
```
