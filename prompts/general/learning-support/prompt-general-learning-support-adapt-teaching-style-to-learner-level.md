---
id: prompt-general-learning-support-adapt-teaching-style-to-learner-level-v1
name: Adapt Teaching Style to Learner Level
summary: 根据学习者水平调整教学风格
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: learning-support
tags:
  - teaching-style
  - adaptation
  - learner-level
  - personalization
keywords:
  - 教学风格
  - 适应
  - 学习者水平
  - 个性化
intent: |
  根据学习者的当前水平和特点，调整教学风格和内容深度。
  强调因材施教，让不同水平的学习者都能有效学习。
  核心原则：最好的教学是适应学习者，而不是要求学习者适应教学。
applicable_models:
  - "*"
input_requirements:
  - learner_level: string 学习者水平
  - learning_style: string 学习风格偏好
  - topic_complexity: string 主题复杂度
output_requirements:
  - adapted_teaching_style: string 调整后的教学风格
  - content_depth: string 内容深度
  - teaching_approach: string 教学方法
tool_requirements: []
preconditions:
  - 需要为不同水平的学习者教学
anti_patterns:
  - 假设太快
  - 假设太慢
  - 忽视学习风格
failure_modes:
  - 水平判断错误：根据反馈调整
  - 风格不匹配：询问偏好
  - 调整过慢：持续观察反馈
self_check: |
  调整前自检：
  □ 是否正确评估了学习者水平？
  □ 是否考虑了学习风格偏好？
  □ 是否准备好了根据反馈调整？
related_skills:
  - skill-learning-support
related_workflows: []
related_prompts:
  - prompt-general-learning-support-explain-complex-topic-step-by-step
  - prompt-general-learning-support-identify-knowledge-gaps
---

# Context

不同学习者需要不同的教学风格。本 prompt 的核心目标是：**根据学习者的水平和风格调整教学，让学习更有效**。

# Prompt Body

## 阶段 1：评估学习者

### 1.1 水平评估

```markdown
## 学习者水平

### 评估维度
```markdown
**知识水平**:
- 初学者: 几乎不了解主题
- 初级: 了解基础概念
- 中级: 理解核心，能做一些应用
- 高级: 掌握深入，能处理复杂情况

**经验水平**:
- 缺乏相关经验
- 有相关但不直接的经验
- 有直接经验

**信心水平**:
- 信心不足，害怕问"傻问题"
- 正常
- 过度自信，可能跳过基础
```
```

### 1.2 学习风格

```markdown
## 学习风格偏好

### 视觉型
```markdown
**偏好**: 图表、流程图、书面解释
**教学**: 多用图示、步骤分解、要点列表
```

### 听觉型
```markdown
**偏好**: 对话、讨论、口头解释
**教学**: 多讲解、多讨论、解释时多举例
```

### 动手型
```markdown
**偏好**: 实践、做中学
**教学**: 多练习、边做边学、允许试错
```
```

## 阶段 2：风格调整

### 2.1 初学者适应

```markdown
## 初学者教学

### 风格要点
```markdown
**解释风格**:
- 从最基础开始
- 多用类比（熟悉→陌生）
- 避免术语轰炸（必要时解释）
- 慢一点，给消化时间

**节奏**:
- 少量信息，多次检查
- 允许重复
- 确认理解后再继续

**态度**:
- 鼓励问"傻问题"
- 不假设任何基础知识
- 强调"不知道"是正常的
```
```

### 2.2 中级学习者适应

```markdown
## 中级学习者教学

### 风格要点
```markdown
**解释风格**:
- 基于已有理解
- 适当引入术语
- 开始连接更多概念
- 提供更多细节

**节奏**:
- 可以稍微加快
- 但仍需检查理解
- 给深度探索的空间

**挑战**:
- 提供稍微超出舒适区的内容
- 鼓励自己发现和探索
```
```

### 2.3 高级学习者适应

```markdown
## 高级学习者教学

### 风格要点
```markdown
**解释风格**:
- 可以直接进入主题
- 快速回顾已知
- 深入讨论复杂/边缘情况
- 探讨原理和底层逻辑

**节奏**:
- 快节奏
- 对话式
- 双向讨论

**挑战**:
- 提供复杂问题
- 鼓励批判性思考
- 探索深度和广度
```
```

## 阶段 3：内容深度

### 3.1 深度分层

```markdown
## 内容深度分层

### 基础层
```markdown
**对象**: 需要扎实基础的初学者
**内容**: 核心概念、基本定义、核心原理
**表达**: 简单语言、类比、多例子
```

### 应用层
```markdown
**对象**: 有基础想应用的学习者
**内容**: 实际应用、案例分析、实践练习
**表达**: 连接已知、展示应用
```

### 拓展层
```markdown
**对象**: 想要深入的高级学习者
**内容**: 深层原理、复杂情况、边缘案例
**表达**: 专业术语、理论框架、批判思考
```
```

## 阶段 4：教学策略

### 4.1 策略选择

```markdown
## 教学策略

### 讲解型
```markdown
**适合**: 需要建立系统性理解
**方式**: 我讲，你听，可以提问
**注意**: 不要单向太久
```

### 问答型
```markdown
**适合**: 检查理解、引导探索
**方式**: 通过问题引导思考
**注意**: 问题要适当，不要太简单或太难
```

### 实践型
```markdown
**适合**: 巩固已学、技能训练
**方式**: 做中学，边做边指导
**注意**: 任务难度要适当
```
```

## 阶段 5：输出模板

### 5.1 适应后的教学计划

```markdown
## 教学适配

### 学习者评估
```markdown
**水平**: [初学者/初级/中级/高级]
**学习风格**: [视觉/听觉/动手]
**信心**: [低/中/高]
```

### 教学风格
```markdown
**解释风格**: [调整后的风格]
**节奏**: [调整后的节奏]
**深度**: [基础/应用/拓展]
```

### 主要策略
```markdown
[根据评估选择的策略]
```
