---
id: prompt-general-learning-support-generate-learning-plan-for-topic-v1
name: Generate Learning Plan for Topic
summary: 为主题生成学习计划
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: learning-support
tags:
  - learning-plan
  - planning
  - structured
  - topic
keywords:
  - 学习计划
  - 规划
  - 结构化
  - 主题
intent: |
  帮助用户为学习某个主题生成结构化的学习计划。
  强调循序渐进、实际可行、阶段性目标。
  核心原则：好的学习计划让人知道每天做什么，而不是一开始就面对巨大的未知。
applicable_models:
  - "*"
input_requirements:
  - topic: string 主题
  - current_level: string 当前水平
  - available_time: string 可用时间
  - learning_goals: string 学习目标
output_requirements:
  - learning_plan: object 学习计划
  - milestones: array 里程碑
  - daily_activities: array 日常活动
tool_requirements: []
preconditions:
  - 用户想要学习某个主题但不知道如何规划
anti_patterns:
  - 计划过于 ambitious
  - 目标不清晰
  - 缺乏阶段性
failure_modes:
  - 计划过重：从轻量开始
  - 目标模糊：具体化目标
  - 缺乏灵活性：设计弹性
self_check: |
  计划前自检：
  □ 第一个里程碑是否足够小？
  □ 目标是否具体可衡量？
  □ 是否考虑了用户的可用时间？
related_skills:
  - skill-learning-support
related_workflows: []
related_prompts:
  - prompt-general-learning-support-explain-complex-topic-step-by-step
  - prompt-general-learning-support-identify-knowledge-gaps
---

# Context

学习主题需要结构化的规划。本 prompt 的核心目标是：**帮助用户为学习某个主题生成实际可行的学习计划，提供清晰的学习路线图**。

# Prompt Body

## 阶段 1：目标明确化

### 1.1 学习目标

```markdown
## 学习目标

### 目标层次
```markdown
**最终目标**: [学会这个主题后能做什么]
**中级目标**: [过程中的里程碑]
**起始目标**: [从哪里开始]
```

### 目标具体化
```markdown
**不具体**: "我想学编程"
✓ **具体**: "我想用Python写一个简单的数据分析脚本"

**不具体**: "我想学英语"
✓ **具体**: "我想能看懂日常英文邮件"
```
```

## 阶段 2：内容分解

### 2.1 主题分解

```markdown
## 主题分解

### 核心模块
```markdown
**模块1**: [基础概念] - 优先级: 高
**模块2**: [基础技能] - 优先级: 高
**模块3**: [进阶应用] - 优先级: 中
**模块4**: [扩展主题] - 优先级: 低
```
```

### 依赖关系
```markdown
**学习顺序**:
```
[模块1] → [模块2] → [模块3] → [模块4]
   ↓
[前置知识]
```
```

## 阶段 3：计划设计

### 3.1 里程碑设计

```markdown
## 里程碑

### 里程碑1: 第1-2周
```markdown
**目标**: [掌握模块1的基础]
**完成标准**: [可以做到什么]
**每周任务**:
- 第1周: [具体任务]
- 第2周: [具体任务]
```
```

### 里程碑2: 第3-4周
```markdown
[类似结构]
```
```

### 里程碑3: 第5-6周
```markdown
[类似结构]
```
```

## 阶段 4：日常活动

### 4.1 每日学习

```markdown
## 每日学习活动

### 学习节奏
```markdown
**每日时间**: [可用时间]
**学习方式**: [看视频/看书/做练习/混合]

**建议节奏**:
- 学习新内容: [X]分钟
- 练习/实践: [X]分钟
- 复习: [X]分钟
```
```

### 4.2 每周计划

```markdown
## 每周结构

**周一-周五**:
- 每天 [X] 分钟学习新内容
- 做练习

**周末**:
- 复习本周内容
- 做一个小项目/应用

**休息**:
- 适当休息，不要绷太紧
```
```

## 阶段 5：灵活调整

### 5.1 调整原则

```markdown
## 调整原则

### 进度太快
```markdown
**信号**: 感觉太简单
**调整**:
- 进入下一个模块
- 增加挑战任务
```
```

### 进度太慢
```markdown
**信号**: 跟不上计划
**调整**:
- 延长当前里程碑
- 减少每周任务量
- 专注最重要的内容
```
```

## 阶段 6：输出模板

### 6.1 学习计划模板

```markdown
## 学习计划: [主题]

### 最终目标
[具体目标]

### 里程碑
**里程碑1**（第1-2周）:
- 目标: [目标]
- 完成标准: [标准]
- 每周任务: [任务]

**里程碑2**（第3-4周）:
[类似结构]
```

### 每日节奏
```markdown
**每日**: [X]分钟
**方式**: [类型]
**结构**: [新内容/练习/复习]
```
