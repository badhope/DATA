---
id: prompt-general-learning-support-identify-knowledge-gaps-v1
name: Identify Knowledge Gaps
summary: 识别知识缺口
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: learning-support
tags:
  - knowledge-gaps
  - assessment
  - learning
  - awareness
keywords:
  - 知识缺口
  - 评估
  - 学习
  - 觉察
intent: |
  帮助用户识别学习过程中的知识缺口，不是全面评估，而是发现关键缺口。
  强调知识缺口是学习的方向，不是能力的否定。
  核心原则：识别缺口是为了更有效地学习，而不是给自己贴标签。
applicable_models:
  - "*"
input_requirements:
  - topic: string 主题
  - current_understanding: string 当前理解
  - expected_level: string 期望水平
output_requirements:
  - gap_identification: array 缺口识别
  - priority_gaps: array 优先缺口
  - filling_strategy: string 填补策略
tool_requirements: []
preconditions:
  - 用户想知道自己学习的缺口在哪里
anti_patterns:
  - 过于苛刻
  - 全面否定
  - 缺乏建设性
failure_modes:
  - 缺口过多：聚焦关键缺口
  - 过于打击：保持建设性
  - 缺乏方向：提供填补建议
self_check: |
  识别前自检：
  □ 是否聚焦了最重要的缺口？
  □ 是否保持了建设性的态度？
  □ 是否提供了填补方向？
related_skills:
  - skill-learning-support
related_workflows: []
related_prompts:
  - prompt-general-learning-support-quiz-user-to-check-understanding
  - prompt-general-learning-support-generate-learning-plan-for-topic
---

# Context

学习中的缺口需要被识别才能被填补。本 prompt 的核心目标是：**帮助用户识别学习中的关键知识缺口，提供填补方向，保持学习的信心和动力**。

# Prompt Body

## 阶段 1：理解期望

### 1.1 明确期望

```markdown
## 期望水平

### 目标水平
```markdown
**目标**: [学会这个主题后能做什么]
**期望程度**: [精通/能用/了解]

**具体期望**:
- [期望1]
- [期望2]
```
```

### 差距感知
```markdown
**感觉**: "学了不少，但..."
"知道这个，但..."
"这里总是卡住..."
```
```

## 阶段 2：缺口识别

### 2.1 自我检测

```markdown
## 自我检测

### 主题自查
```markdown
**关于这个主题，你能**:
- [ ] 解释什么是X（概念理解）
- [ ] 用X解决问题（应用）
- [ ] 辨别X和Y的区别（辨别）
- [ ] 在复杂情况下使用X（深度）

**勾选"不能"或"不确定"的，就是可能的缺口**
```
```

### 具体化缺口
```markdown
## 具体缺口

**缺口1**:
- **不知道的**: [具体内容]
- **知道一点的**: [具体内容]
- **总是混淆的**: [具体内容]

**缺口2**:
[类似结构]
```
```

## 阶段 3：缺口分类

### 3.1 缺口类型

```markdown
## 缺口分类

### 基础缺口
```markdown
**类型**: 基础概念没打牢
**表现**: 涉及这个概念就开始糊涂
**影响**: 影响上层理解
**优先级**: 高
```

### 应用缺口
```markdown
**类型**: 知道但不会用
**表现**: 概念懂但做题就错
**影响**: 理论与实践脱节
**优先级**: 高
```

### 连接缺口
```markdown
**类型**: 知识碎片化
**表现**: 知道很多但串不起来
**影响**: 缺乏整体理解
**优先级**: 中
```
```

### 3.2 优先级排序

```markdown
## 缺口优先级

| # | 缺口 | 类型 | 影响程度 | 优先级 |
|---|------|------|----------|--------|
| 1 | [缺口] | [类型] | [高/中/低] | [P0/P1/P2] |
```
```

## 阶段 4：填补策略

### 4.1 策略建议

```markdown
## 填补策略

### 基础缺口
```markdown
**策略**: 回到基础
**方法**:
1. 重新理解基础概念
2. 找具体例子
3. 做基础练习

**建议资源**:
- [具体建议]
```
```

### 应用缺口
```markdown
**策略**: 做中学
**方法**:
1. 找练习题
2. 模仿例子
3. 刻意练习

**建议资源**:
- [具体建议]
```
```

### 连接缺口
```markdown
**策略**: 构建知识地图
**方法**:
1. 画概念关系图
2. 讲解给他人听
3. 找跨主题的联系

**建议资源**:
- [具体建议]
```
```

## 阶段 5：行动计划

### 5.1 下一步

```markdown
## 行动计划

### 最优先填补的缺口
```markdown
**缺口**: [最重要的1-2个]
**填补方法**: [具体行动]
**预计时间**: [多久能填补]
```
```

### 日常练习
```markdown
**每日一点**: 每天花[X]分钟专门练习缺口
**方法**: [具体做法]
```
```

## 阶段 6：输出模板

### 6.1 缺口识别模板

```markdown
## 知识缺口识别

### 主题: [主题]

### 已掌握的
- [列表]

### 缺口
**缺口1**: [描述]
- 类型: [类型]
- 填补: [方法]

**缺口2**: [类似结构]

### 优先填补
1. [缺口]
2. [缺口]

### 行动计划
[具体行动]
```
