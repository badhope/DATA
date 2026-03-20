---
id: prompt-general-personal-provide-gentle-structured-life-planning-v1
name: Provide Gentle Structured Life Planning
summary: 提供温和的结构性生活规划
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: personal
tags:
  - life-planning
  - structure
  - gentle
  - guidance
keywords:
  - 生活规划
  - 结构化
  - 温和引导
  - 长期
intent: |
  帮助用户进行轻量、温和的生活规划，而不是 rigid 的计划。
  强调灵活性而非完美性，让规划成为助力而非压力。
  核心原则：好的生活规划是帮助人前进，不是制造焦虑。
applicable_models:
  - "*"
input_requirements:
  - life_areas: string 生活领域
  - user_aspirations: string 用户愿景
output_requirements:
  - life_structure: object 生活结构
  - gentle_plan: string 温和计划
  - flexible_guidelines: array 灵活指南
tool_requirements: []
preconditions:
  - 用户想要一些生活方向
anti_patterns:
  - 过于 rigid 的计划
  - 完美主义标准
  - 忽视用户实际情况
failure_modes:
  - 计划过于 rigid：保持灵活
  - 目标过多：精简聚焦
  - 标准过高：设定合理期望
self_check: |
  规划前自检：
  □ 计划是否过于 rigid？
  □ 目标是否过多？
  □ 是否考虑了用户的实际情况？
related_skills:
  - skill-personal
related_workflows: []
related_prompts:
  - prompt-general-personal-help-organize-personal-tasks
  - prompt-general-reflection-create-next-step-improvement-plan
---

# Context

生活规划不应该是令人焦虑的 rigid 表格。本 prompt 的核心目标是：**帮助用户建立轻量、灵活、温和的生活结构，让规划成为助力**。

# Prompt Body

## 阶段 1：愿景探索

### 1.1 愿景问题

```markdown
## 愿景探索

### 核心问题
```markdown
**大问题**: "你想让生活是什么样的？"

**分解问题**:
- "3年后，你希望生活有什么不同？"
- "最近有什么让你觉得'这就是我想过的生活'的时刻？"
- "有什么小改变会让你感觉更好？"
```
```

### 方向探索
```markdown
## 生活领域

**个人发展**:
- [想发展的方向]

**日常生活**:
- [想让生活包含的内容]

**关系/社交**:
- [想要的社交状态]

**健康/身心**:
- [想关注的健康方面]

**创造/兴趣**:
- [想投入的领域]
```
```

## 阶段 2：灵活结构

### 2.1 轻量框架

```markdown
## 生活结构框架

### 不是"必须做"的列表
```markdown
**而是这样想**:
- "我想让生活中有更多X"
- "我可以每周做一点Y"
- "Z是我想保护的时间"

**原则**:
1. 方向 > 具体计划
2. 弹性 > 严格
3. 渐进 > 大跃进
```
```

### 2.2 周/日节奏

```markdown
## 节奏设计

### 问题
```markdown
"你希望一周大概是什么节奏？"
- 有工作/学习日
- 有休息/放松日
- 有创造/兴趣日
```

### 示例节奏
```markdown
**平衡周**:
- 工作/学习日: X天
- 整理/维护日: X天（购物、洗衣、简单家务）
- 休息/放空日: X天
- 兴趣/创造日: X天
```
```

## 阶段 3：温和目标

### 3.1 目标设定

```markdown
## 温和目标

### 设定原则
```markdown
**SMART不是必须**:
- 更看重"方向感"而非"精确目标"
- 设定"尝试"而非"必须"
- 接受"做了就好"而非"完美完成"

**示例对比**:
❌ "每天必须锻炼1小时"
✓ "尝试每周锻炼3次，有空多动动"

❌ "每天早起"
✓ "尽量早点睡，争取不太晚起"
```
```

### 3.2 目标分类

```markdown
## 目标示例

### 方向型目标
```markdown
"我想让生活更有节奏感"
↓
**可行的尝试**:
- 尝试设定固定的起床时间
- 周末尽量不超过平时2小时
- 晚上提前30分钟放下手机
```
```

### 探索型目标
```markdown
"我想知道自己喜欢什么"
↓
**可行的尝试**:
- 每周尝试一个新东西（哪怕很小）
- 记录做完什么让我开心
- 允许自己"三分钟热度"
```
```

## 阶段 4：保护性设计

### 4.1 边界设置

```markdown
## 保护性设计

### 想说No的事
```markdown
**我想保护的时间/活动**:
- [如：晚上9点后的时间]
- [如：周末上午]
- [如：不被打扰的时间]

**为什么重要**:
- [理由]
```
```

### 自动化/习惯化
```markdown
## 习惯锚点

**已有好习惯**:
- [习惯1]

**想尝试的小习惯**:
- [习惯] → 锚点: [已有习惯后]
- [习惯] → 锚点: [特定时间/事件]
```
```

## 阶段 5：计划模板

### 5.1 温和计划模板

```markdown
## 生活方向

### 我想让生活包含
```markdown
**必须有的**:
- [列表]

**希望有的**:
- [列表]

**尽量少有的**:
- [列表]
```
```

### 简单节奏
```markdown
**周节奏**:
- [日] 主要: [活动]
- ...
```

### 本月尝试
```markdown
**一件小事**:
- [尝试]

**为什么是它**:
- [理由]

**什么时候试**:
- [时间/场景]
```
