---
id: prompt-general-reflection-create-next-step-improvement-plan-v1
name: Create Next Step Improvement Plan
summary: 创建下一步改进计划
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: reflection
tags:
  - improvement
  - planning
  - action
  - growth
keywords:
  - 改进计划
  - 下一步
  - 行动
  - 成长
intent: |
  帮助用户基于反思创建可操作的改进计划，强调小步前进和实际可行。
  强调改进是渐进的过程，不是大转变。
  核心原则：好的改进计划是让人愿意开始，而不是让人望而却步。
applicable_models:
  - "*"
input_requirements:
  - improvement_area: string 改进领域
  - current_state: string 当前状态
  - desired_state: string 期望状态
output_requirements:
  - improvement_plan: object 改进计划
  - small_steps: array 小步骤
  - success_indicators: array 成功指标
tool_requirements: []
preconditions:
  - 用户有想要改进的领域
anti_patterns:
  - 计划过于 ambitious
  - 过于复杂
  - 不切实际
failure_modes:
  - 计划过大：从最小步骤开始
  - 不够具体：具体到可执行
  - 期望过高：设定合理的成功标准
self_check: |
  计划前自检：
  □ 第一步是否足够小？
  □ 是否有明确的起点？
  □ 期望是否合理？
related_skills:
  - skill-reflection
related_workflows: []
related_prompts:
  - prompt-general-reflection-turn-experience-into-actionable-lessons
  - prompt-general-reflection-identify-patterns-in-repeated-problems
---

# Context

改进计划需要实际可行。本 prompt 的核心目标是：**帮助用户创建小步可行的改进计划，让改变真正发生而不是停留在"计划"阶段**。

# Prompt Body

## 阶段 1：起点确认

### 1.1 当前状态

```markdown
## 当前状态

### 现在的情况
```markdown
**改进领域**: [具体是什么]
**当前状态**: [客观描述，不要评判]
**期望状态**: [想要达到的状态]

**差距**: [现状到期望的距离]
```
```

### 起点确认
```markdown
## 起点

**从哪里开始**:
- [具体的起点，不要比这更前]

**不要从哪里开始**（不是起点）:
- ❌ [不要从比起点更前的地方开始]
- ✓ [从上面确认的起点开始]
```
```

## 阶段 2：目标分解

### 2.1 渐进路径

```markdown
## 渐进路径

### 不是直达
```markdown
**不要想**:
[期望状态]
↓
一步到位

**要这样想**:
[当前] → [小目标1] → [小目标2] → [期望]

**小目标要够小**:
- 当前 → 小目标1 应该是: 抬脚就能到
- 而不是: 到达终点
```
```

### 2.2 具体里程碑

```markdown
## 里程碑

### 里程碑1: [最小第一步]
```markdown
**目标**: [具体的第一个小目标]
**成功标准**: [怎么算达到了]
**预计时间**: [多快能到]
```
```

### 里程碑2: [第二步]
```markdown
[类似结构]
```
```

## 阶段 3：小步计划

### 3.1 第一步

```markdown
## 第一步

### 最小行动
```markdown
**第一步行动**: [最简单的、马上能做的]
**不需要**:
- 完美
- 准备好
- 全部理解

**只需要**:
- 开始做这一件事

**示例对比**:
❌ "开始养成每天锻炼的习惯"
✓ "换上运动服"（不需要真的运动）

❌ "改善睡眠"
✓ "比平时早10分钟放下手机"
```
```

### 3.2 行动计划

```markdown
## 行动计划

### 今天/本周可以做的
```markdown
**行动**: [具体的最小行动]
**什么时候做**: [时间/场景]
**如果-那么**: [如果出现什么情况，就怎么做]
```
```

## 阶段 4：成功指标

### 4.1 合理期望

```markdown
## 成功指标

### 不要这样想
```markdown
❌ "如果不能每天做到，就是失败"

✓ "做到X次就是进步"
✓ "比之前多了就是成功"
✓ "开始了就是成功"
```
```

### 4.2 渐进标准

```markdown
## 渐进标准

### 阶段1成功
```markdown
**标准**: [第一步做到了就算成功]
**最低成功**: [还能接受的最低标准]
```

### 阶段2成功
```markdown
**标准**: [里程碑1达到后的下一个目标]
```
```

## 阶段 5：支持系统

### 5.1 支持方式

```markdown
## 支持

### 可能需要的支持
```markdown
**提醒**: [是否需要提醒，怎么提醒]
**记录**: [是否需要简单记录，怎么记]
** accountability**: [是否需要告诉别人，怎么告诉]
**奖励**: [完成后怎么奖励自己]
```
```

### 5.2 障碍预设

```markdown
## 障碍预设

### 可能遇到的障碍
```markdown
**障碍**: [可能的问题]
**应对**: [如果障碍出现，就这么做]

**障碍1**: [如：太累了不想做
**应对**: 就做最小的版本，或者明天再说
```
```

## 阶段 6：输出模板

### 6.1 改进计划模板

```markdown
## 改进计划

### 起点
[当前状态]

### 终点愿景
[期望状态]

### 渐进路径
```
[起点] → [里程碑1] → [里程碑2] → [期望]
```

### 第一步
```markdown
**行动**: [最小行动]
**时间/场景**: [什么时候做]
**如果-那么**: [障碍应对]
```

### 成功标准
```markdown
**做到了就算成功**: [标准]
**渐进目标**: [里程碑1/2]
```
