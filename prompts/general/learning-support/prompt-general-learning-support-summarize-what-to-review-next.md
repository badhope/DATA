---
id: prompt-general-learning-support-summarize-what-to-review-next-v1
name: Summarize What to Review Next
summary: 总结下次复习内容
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: learning-support
tags:
  - review
  - summary
  - next-steps
  - learning
keywords:
  - 复习
  - 总结
  - 下一步
  - 学习
intent: |
  帮助用户在学习后总结需要复习的内容，明确下一步学习计划。
  强调复习是学习的重要部分，不是可有可无。
  核心原则：好的总结让人知道下次从哪里开始。
applicable_models:
  - "*"
input_requirements:
  - learning_content: string 学习内容
  - understanding_level: string 理解水平
  - time_available: string 可用时间
output_requirements:
  - review_summary: string 复习总结
  - next_session_plan: string 下次学习计划
  - priority_content: array 优先复习内容
tool_requirements: []
preconditions:
  - 用户刚完成一个学习阶段
anti_patterns:
  - 复习内容过多
  - 计划不实际
  - 不考虑遗忘曲线
failure_modes:
  - 内容过多：聚焦最重要的
  - 计划不实际：考虑可用时间
  - 不考虑遗忘：遵循遗忘曲线
self_check: |
  总结前自检：
  □ 是否聚焦了最重要的复习内容？
  □ 计划是否考虑了可用时间？
  □ 是否遵循了遗忘曲线原理？
related_skills:
  - skill-learning-support
related_workflows: []
related_prompts:
  - prompt-general-learning-support-generate-learning-plan-for-topic
  - prompt-general-learning-support-turn-notes-into-study-guide
---

# Context

学习后需要明确复习计划。本 prompt 的核心目标是：**帮助用户总结学习内容，确定复习优先级，制定下次学习计划**。

# Prompt Body

## 阶段 1：学习总结

### 1.1 内容回顾

```markdown
## 内容回顾

### 本次学习的内容
```markdown
**核心主题**: [主题]
**主要概念**: [列表]
**关键技能**: [列表]
**重要例子**: [列表]
```
```

### 理解程度
```markdown
## 理解程度

**完全理解**:
- [列表]

**基本理解**:
- [列表]

**不太理解**:
- [列表]
```
```

## 阶段 2：复习优先级

### 2.1 遗忘曲线

```markdown
## 遗忘曲线

### 复习时机
```markdown
**学习后24小时内**: 遗忘最多，需要及时复习
**学习后1周**: 需要第二次复习
**学习后1个月**: 需要第三次复习
**之后**: 定期回顾即可

**核心原则**: 越早复习，记忆越深
```
```

### 2.2 优先级排序

```markdown
## 复习优先级

### 必须复习（高优先级）
```markdown
**内容**: [不太理解/重要的]
**原因**: [为什么需要优先]
**复习方法**: [具体方法]
```

### 应该复习（中优先级）
```markdown
**内容**: [基本理解的]
**原因**: [需要巩固]
**复习方法**: [方法]
```

### 可以以后复习（低优先级）
```markdown
**内容**: [已经理解的]
**复习时间**: [以后再说]
```
```

## 阶段 3：复习计划

### 3.1 短期复习

```markdown
## 近期复习计划

### 明天复习
```markdown
**复习内容**:
- [不太理解的内容1]
- [重要的内容]

**时间**: [X]分钟
**方法**: [复习方法]
```
```

### 本周复习
```markdown
**复习内容**:
- [本周学的主要内容]
- [上次没完全理解的]

**时间**: [X]分钟
**方法**: [复习方法]
```
```

## 阶段 4：下次学习计划

### 4.1 衔接计划

```markdown
## 下次学习

### 当前进度
```markdown
**已完成**: [列表]
**进行中**: [列表]
**待开始**: [列表]
```
```

### 下次内容
```markdown
## 下次学习内容

**主题**: [下一个主题]
**前置准备**: [需要提前知道的]
**目标**: [学习目标]
```
```

### 4.2 资源配置

```markdown
## 资源准备

**需要准备的**:
- [资源1]
- [资源2]

**需要做的练习**:
- [练习列表]
```
```

## 阶段 5：执行建议

### 5.1 执行技巧

```markdown
## 执行技巧

### 快速复习法
```markdown
**方法**:
1. 看标题回忆内容
2. 不记得的立刻翻看
3. 重点标记仍然不记得的

**时间**: 5-10分钟/次
```
```

### 间隔重复
```markdown
**技巧**:
- 第1天: 学习+当晚复习
- 第3天: 快速回顾
- 第7天: 再次回顾
- 第30天: 系统复习

**工具推荐**: [推荐工具]
```
```

## 阶段 6：输出模板

### 6.1 复习总结模板

```markdown
## 学习总结 & 复习计划

### 本次学习总结
```markdown
**主题**: [主题]
**理解程度**: [评估]
**关键内容**: [列表]
```

### 复习计划
```markdown
**明天**: [内容] - [时间]
**本周**: [内容] - [时间]
**下周**: [内容] - [时间]
```

### 下次学习
```markdown
**主题**: [主题]
**目标**: [目标]
**准备**: [需要准备的]
```
