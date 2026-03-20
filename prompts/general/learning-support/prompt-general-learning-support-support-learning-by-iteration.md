---
id: prompt-general-learning-support-support-learning-by-iteration-v1
name: Support Learning by Iteration
summary: 支持迭代学习
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: learning-support
tags:
  - iteration
  - learning
  - practice
  - improvement
keywords:
  - 迭代
  - 学习
  - 练习
  - 改进
intent: |
  支持用户通过迭代循环的方式学习，强调反复练习和渐进改进。
  强调迭代是学习的自然方式，不需要一次就完美。
  核心原则：好的学习是螺旋上升，不是直线进步。
applicable_models:
  - "*"
input_requirements:
  - learning_topic: string 学习主题
  - current_iteration: number 当前迭代次数
  - feedback: string 反馈
output_requirements:
  - iteration_summary: string 迭代总结
  - improvement_points: array 改进点
  - next_iteration_plan: string 下次迭代计划
tool_requirements: []
preconditions:
  - 用户在进行迭代学习
anti_patterns:
  - 期望一次就完美
  - 不从反馈中学习
  - 迭代过于频繁
failure_modes:
  - 不接受反馈：开放心态接受反馈
  - 改进过多：聚焦1-2个改进点
  - 失去动力：庆祝小进步
self_check: |
  迭代前自检：
  □ 是否聚焦了最重要的1-2个改进点？
  □ 是否保持了开放的学习心态？
  □ 是否庆祝了进步？
related_skills:
  - skill-learning-support
related_workflows: []
related_prompts:
  - prompt-general-learning-support-identify-knowledge-gaps
  - prompt-general-learning-support-generate-learning-plan-for-topic
---

# Context

迭代是学习的重要方式。本 prompt 的核心目标是：**帮助用户通过迭代循环学习，每次迭代聚焦改进，持续进步**。

# Prompt Body

## 阶段 1：迭代定位

### 1.1 当前状态

```markdown
## 当前状态

### 迭代阶段
```markdown
**当前迭代**: 第[X]次
**学习主题**: [主题]
**当前水平**: [描述]
**目标水平**: [目标]
```
```

### 已有基础
```markdown
## 已掌握的

**从之前迭代中学到的**:
- [列表]
**改进的点**:
- [列表]
```
```

## 阶段 2：反馈分析

### 2.1 反馈来源

```markdown
## 反馈分析

### 反馈类型
```markdown
**自我反馈**: [自己发现的不足]
**他人反馈**: [收到的建议]
**结果反馈**: [练习/测试的结果]
```
```

### 2.2 关键反馈点

```markdown
## 关键反馈

**做得好的**:
- [从反馈中看到的好表现]

**需要改进的**:
- [反馈指出的不足]

**新的发现**:
- [意外发现]
```
```

## 阶段 3：改进聚焦

### 3.1 改进选择

```markdown
## 改进选择

### 可能的改进点
```markdown
1. [改进点1]
2. [改进点2]
3. [改进点3]
...
```

### 选择标准
```markdown
**选择1-2个最重要的**:
- 哪个改进影响最大？
- 哪个改进最容易看到效果？
- 哪个是最基础的？
```
```

### 3.2 聚焦改进

```markdown
## 本次聚焦改进

**主要改进点**: [1个]
**次要改进点**: [可选1个]

**为什么选择这个**:
[理由]

**改进的具体目标**:
[具体、可衡量的目标]
```
```

## 阶段 4：迭代计划

### 4.1 下次迭代

```markdown
## 下次迭代计划

### 改进行动
```markdown
**针对[改进点]**:
- 具体做: [具体行动]
- 怎么练: [练习方法]
- 什么时候做: [时间]

**练习量**:
- 数量: [X次/题]
- 频率: [每天X次]
- 检验: [怎么知道进步了]
```
```

### 4.2 期望结果

```markdown
## 期望结果

**改进后应该能**:
- [具体表现]

**成功标准**:
- [可观察到的变化]

**如果成功了**:
- [下一步]
```
```

## 阶段 5：迭代循环

### 5.1 迭代周期

```markdown
## 迭代周期

```markdown
**学习 → 实践 → 反馈 → 改进 → 学习 → ...**

**每个迭代包括**:
1. 确定1-2个改进点
2. 针对性练习
3. 获取反馈
4. 评估改进
5. 进入下一迭代
```
```

### 5.2 保持耐心

```markdown
## 迭代心态

**不要期望**:
- 一次就完全掌握
- 所有问题同时解决
- 直线进步

**要期望**:
- 每次有一点进步
- 不断接近目标
- 螺旋上升
```
```

## 阶段 6：输出模板

### 6.1 迭代模板

```markdown
## 迭代[X]总结

### 做得好的
- [列表]

### 本次改进
**主要**: [改进点]
**次要**: [改进点]

### 下次迭代
**练习**: [具体行动]
**期望**: [期望结果]

### 心态提醒
[保持耐心，迭代是正常方式]
```
