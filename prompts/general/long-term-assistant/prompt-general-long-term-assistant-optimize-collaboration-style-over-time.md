---
id: prompt-general-long-term-assistant-optimize-collaboration-style-over-time-v1
name: Optimize Collaboration Style Over Time
summary: 随着时间优化协作风格
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: long-term-assistant
tags:
  - optimization
  - collaboration
  - style
  - improvement
keywords:
  - 协作优化
  - 风格优化
  - 持续改进
  - 协作效率
intent: |
  指导 AI 根据长期协作经验持续优化协作风格。
  强调协作风格需要随着对用户的了解加深而优化。
  核心原则：好的协作者会从经验中学习，不断改进服务方式。
applicable_models:
  - "*"
input_requirements:
  - collaboration_history: array 协作历史
  - user_feedback: array 用户反馈
  - current_style: object 当前风格
output_requirements:
  - style_evaluation: object 风格评估
  - optimization_opportunities: array 优化机会
  - optimization_plan: object 优化计划
tool_requirements:
  - Read tool (读取协作历史)
preconditions:
  - 有足够的协作历史
anti_patterns:
  - 风格固化
  - 不收集反馈
  - 优化过度
failure_modes:
  - 评估不客观：基于数据的评估
  - 优化过激：渐进式优化
  - 用户不适应：考虑用户接受度
self_check: |
  优化前自检：
  □ 是否有足够的数据支持优化决策？
  □ 优化是否渐进而不是突变？
  □ 用户是否能适应优化后的风格？
related_skills:
  - skill-long-term-assistant
  - skill-user-style-adaptation
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-long-term-assistant-act-as-consistent-long-term-collaborator
  - prompt-general-user-style-adaptation-refine-style-based-on-user-feedback
---

# Context

协作风格需要随着时间推移和经验积累不断优化。本 prompt 的核心目标是：**指导 AI 从协作历史中学习，优化协作风格，提升协作效率**。

# Prompt Body

## 阶段 1：风格评估

### 1.1 评估维度

```markdown
## 风格评估维度

### 效率维度
```markdown
**沟通效率**:
- 理解用户意图的时间
- 澄清问题的次数
- 返工的比例

**任务完成效率**:
- 一次完成率
- 平均迭代次数
- 用户满意度
```

### 质量维度
```markdown
**输出质量**:
- 用户采纳比例
- 错误率
- 完整性评分

**协作质量**:
- 理解偏差次数
- 方向调整次数
- 目标达成率
```
```

### 1.2 评估数据

```markdown
## 评估数据

### 历史数据
```markdown
**协作次数**: [次数]
**任务完成率**: [百分比]
**平均迭代次数**: [次数]
**用户满意度**: [评分]
```

### 反馈数据
```markdown
**正面反馈**: [列表]
**负面反馈**: [列表]
**改进建议**: [列表]
```
```

## 阶段 2：优化机会

### 2.1 机会识别

```markdown
## 优化机会

### 高价值机会
```markdown
**机会1**: [描述]
**当前状态**: [状态]
**优化后预期**: [预期]
**实施难度**: [难度]

**理由**:
[理由]
```

### 中价值机会
```markdown
**机会1**: [描述]
**当前状态**: [状态]
**优化后预期**: [预期]
**实施难度**: [难度]
```
```

### 2.2 优化优先级

```markdown
## 优化优先级

### 优先级排序
| # | 机会 | 价值 | 难度 | 优先级 |
|---|------|------|------|--------|
| 1 | [机会] | [高/中/低] | [高/中/低] | [P0/P1/P2] |
```

### 优先优化项
```markdown
**优先优化**:
1. [项] - 理由: [理由]
2. [项] - 理由: [理由]
```
```

## 阶段 3：优化计划

### 3.1 优化策略

```markdown
## 优化策略

### 渐进优化原则
```markdown
**原则**:
1. 一次只优化1-2个方面
2. 优化后观察效果
3. 根据反馈调整
4. 保持核心风格稳定
```

### 实施节奏
```markdown
**第一阶段**: [方面] - 周期: [周期]
**第二阶段**: [方面] - 周期: [周期]
**第三阶段**: [方面] - 周期: [周期]
```
```

### 3.2 优化实施

```markdown
## 优化实施

### 本次优化
```markdown
**优化方面**: [方面]
**当前状态**: [状态]
**目标状态**: [目标]
**实施方法**: [方法]
```

### 效果观察
```markdown
**观察指标**:
- [指标1]
- [指标2]

**观察周期**: [周期]

**成功标准**: [标准]
```
```

## 阶段 4：输出模板

### 4.1 评估模板

```markdown
## 协作风格评估

### 当前状态
```markdown
**协作效率**: [评估]
**输出质量**: [评估]
**用户满意度**: [评分]
```

### 优化机会
```markdown
**优先优化**:
1. [机会1]
2. [机会2]
```

### 优化计划
```markdown
**第一阶段**: [优化内容]
**第二阶段**: [优化内容]
```
