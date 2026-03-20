---
id: prompt-general-personal-help-maintain-personal-routine-v1
name: Help Maintain Personal Routine
summary: 帮助维持个人作息
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: personal
tags:
  - routine
  - habit
  - daily
  - consistency
keywords:
  - 作息
  - 习惯
  - 日常
  - 一致性
intent: |
  帮助用户建立和维持简单的个人作息/习惯。
  强调小步渐进、可坚持，让routine成为自然的节奏而非负担。
  核心原则：好的routine是让生活更顺滑，不是制造新的压力源。
applicable_models:
  - "*"
input_requirements:
  - current_routine: string 当前作息
  - desired_changes: string 期望改变
output_requirements:
  - routine_suggestion: object 作息建议
  - small_steps: array 小步骤
  - accountability_tips: string 持续建议
tool_requirements: []
preconditions:
  - 用户想要建立/改善作息
anti_patterns:
  - 目标过于 ambitious
  - 全面改变
  - 过于严格
failure_modes:
  - 变化过大：从小的、具体的开始
  - 过于 rigid：保持灵活性
  - 完美主义：允许偶尔中断
self_check: |
  建立前自检：
  □ 改变是否足够小？
  □ 是否考虑了用户的实际情况？
  □ 是否允许灵活性和中断？
related_skills:
  - skill-personal
related_workflows: []
related_prompts:
  - prompt-general-personal-provide-gentle-structured-life-planning
  - prompt-general-personal-help-organize-personal-tasks
---

# Context

建立routine是很多人的挑战。本 prompt 的核心目标是：**帮助用户从小处开始，建立可持续的个人作息，让改变自然发生**。

# Prompt Body

## 阶段 1：现状理解

### 1.1 当前状态

```markdown
## 当前作息

### 典型一天
```markdown
**早上**: [通常几点起床/做什么]
**白天**: [工作/学习状态]
**晚上**: [通常几点睡/睡前做什么]

**感觉**:
- 什么时候最有精力？
- 什么时候最累？
- 什么时候感觉"没做什么但很累"？
```
```

### 1.2 痛点识别

```markdown
## 痛点

**主要问题**:
- [如：睡得太晚/早上起不来/效率不高/没时间做想做的事]

**尝试过的方法**:
- [列表]
- [效果如何]

**最大的阻碍**:
- [如：手机/工作太晚/不知道从何开始]
```
```

## 阶段 2：小步设计

### 2.1 从最小开始

```markdown
## 小步原则

### 越小越好
```markdown
**例子对比**:
❌ "养成每天锻炼的习惯"
✓ "下班到家后，换上运动服就站在窗边深呼吸3次"（不需要真的运动，只是建立联结）

❌ "早睡早起"
✓ "比平时早10分钟放下手机"

**关键**: 让开始变得无比简单
```
```

### 锚点策略
```markdown
## 锚点设计

### 已有习惯 → 新习惯
```markdown
**如果-那么**:
- 如果 [已有习惯]，那么 [新习惯的开始]

**示例**:
- 如果 起床后喝水的习惯，那么 喝完水后打开窗户深呼吸
- 如果 坐到工位上的习惯，那么 先列出今天最重要的3件事
```
```

## 阶段 3：渐进计划

### 3.1 渐进路线

```markdown
## 渐进路线

### 第1周：只建立锚点
```markdown
**目标**: 建立"触发"
**行动**: 
- [已有习惯] → [只做新习惯的"第一步"]

**成功标准**: 能做到就算成功，不需要完美
```
```

### 第2-3周：开始建立
```markdown
**目标**: 开始新习惯
**行动**: 
- 开始执行新习惯，但时间/强度降到最低

**成功标准**: 做了就记录，不做也不责怪
```
```

### 第4周后：保持节奏
```markdown
**目标**: 找到适合自己的节奏
**调整**:
- 如果感觉太轻松，可以稍微增加
- 如果感觉太难，回到更小的版本

**重点**: 持续比强度重要
```
```

## 阶段 4：持续支持

### 4.1 追踪简单化

```markdown
## 追踪

### 超级简单的记录
```markdown
**每日一格**:
```
✅ 喝水时做伸展
□ 睡前阅读
```
只用"做/没做"两种状态，不用记录细节。
```
```

### 允许中断
```markdown
## 中断不是失败

**连续做了X天** → 中断了1天 → **继续做**

**关键**:
- 中断是正常的
- 重要的是重新开始
- 不需要"补上"
- 不因为一次中断放弃整个计划
```
```

### 4.2 障碍应对

```markdown
## 常见障碍

**障碍**: 太累了/没动力
**应对**: 
- 降到最低版本
- 只做"开始"的动作（不一定完成）

**障碍**: 忘了
**应对**: 
- 设置提醒
- 和已有习惯绑定

**障碍**: 不想做
**应对**: 
- 允许不做
- 但尝试问自己"就做5分钟？"
- 答应自己"如果5分钟后还是不想做就不做"
```
```

## 阶段 5：输出模板

### 5.1 Routine模板

```markdown
## 个人作息建议

### 目标作息
```markdown
**想要建立的节奏**:
- 早上: [想要的节奏]
- 晚上: [想要的节奏]

**从小开始**:
- 第1步（最小）: [行动]
- 锚点: [在什么时候做]
```

### 本周尝试
```markdown
**本周尝试**:
- [只做这一件事]

**触发条件**:
- 如果 [条件]，那么 [行动]

**记录**:
- 就用最简单的✅/□
```
