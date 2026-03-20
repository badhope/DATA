---
id: prompt-general-long-term-assistant-remind-and-realign-when-goals-drift-v1
name: Remind and Realign When Goals Drift
summary: 当目标漂移时提醒并重新对齐
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: long-term-assistant
tags:
  - drift
  - reminder
  - realignment
  - goals
keywords:
  - 目标漂移
  - 提醒
  - 重新对齐
  - 纠偏
intent: |
  指导 AI 识别目标漂移并主动提醒用户，重新对齐方向。
  强调目标漂移是常见问题，主动纠偏比继续走错路更有效率。
  核心原则：方向比努力更重要，漂移需要及时发现和纠正。
applicable_models:
  - "*"
input_requirements:
  - current_direction: string 当前方向
  - original_goals: array 原始目标
  - current_progress: object 当前进展
output_requirements:
  - drift_detection: object 漂移检测
  - drift_impact: string 漂移影响
  - realignment_plan: object 重新对齐计划
tool_requirements: []
preconditions:
  - 有进行中的任务需要监控方向
anti_patterns:
  - 忽视漂移
  - 不主动提醒
  - 强行继续
failure_modes:
  - 漂移未识别：明确的漂移检测标准
  - 影响评估不足：漂移的全面影响评估
  - 纠偏不及时：及时的提醒和纠偏
self_check: |
  检测前自检：
  □ 当前方向是否仍然对齐目标？
  □ 是否存在漂移的迹象？
  □ 需要主动提醒用户吗？
related_skills:
  - skill-long-term-assistant
  - skill-context-memory
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-long-term-assistant-preserve-user-goals-across-iterations
  - prompt-general-long-term-assistant-summarize-progress-before-next-step
---

# Context

目标漂移是长任务中的常见问题，及时发现和纠正能避免大量返工。本 prompt 的核心目标是：**指导 AI 识别目标漂移，主动提醒并帮助用户重新对齐方向**。

# Prompt Body

## 阶段 1：漂移检测

### 1.1 检测标准

```markdown
## 漂移检测标准

### 方向偏差
```markdown
**定义**: 当前工作不再直接服务原始目标

**检测信号**:
- 工作内容与目标不相关
- 解决了不是目标的问题
- 过度优化非关键指标

**偏差阈值**: [定义阈值]
```

### 范围蔓延
```markdown
**定义**: 任务范围超出原始定义

**检测信号**:
- 新增功能不在原范围
- 讨论主题偏离项目
- 工作量远超预期

**蔓延程度**: [程度]
```
```

### 优先级偏移
```markdown
**定义**: 优先级与原始目标不一致

**检测信号**:
- 追求次要目标
- 忽视核心目标
- 紧急性取代重要性
```
```

### 1.2 漂移识别

```markdown
## 漂移识别

### 检测结果
```markdown
**是否存在漂移**: [是/否/边缘]

**漂移类型**:
- [类型1]
- [类型2]

**漂移程度**: [轻微/明显/严重]
```
```

## 阶段 2：影响评估

### 2.1 影响分析

```markdown
## 影响分析

### 对目标的影响
```markdown
**目标影响**:
- 影响目标: [目标]
- 影响程度: [程度]
- 是否阻断目标达成: [是/否]
```

### 对资源的影响
```markdown
**资源浪费**:
- 时间浪费: [估算]
- 精力浪费: [估算]

**机会成本**:
- 错过什么: [内容]
- 优先级损失: [损失]
```
```

### 对进度的影响
```markdown
**进度影响**:
- 进度延迟: [估算]
- 复杂度增加: [程度]

**对截止日期的影响**: [影响]
```
```

### 2.2 纠偏紧迫性

```markdown
## 纠偏紧迫性

### 紧迫性评估
```markdown
**紧迫性**: [高/中/低]

**理由**:
1. [理由1]
2. [理由2]
```

### 纠偏建议
```markdown
**建议**: [立即纠偏/继续观察/需要讨论]

**理由**: [理由]
```
```

## 阶段 3：重新对齐

### 3.1 对齐选项

```markdown
## 重新对齐选项

### 选项 1: 回到原始方向
```markdown
**方式**: 停止当前偏离工作，回到原方向

**优点**:
- 保持目标聚焦
- 控制范围蔓延

**缺点**:
- 浪费已有工作
- 可能需要调整

**适用**: 漂移严重时
```

### 选项 2: 调整目标
```markdown
**方式**: 确认新方向更有价值，更新目标

**优点**:
- 适应新认知
- 可能更有价值

**缺点**:
- 目标变更需要确认
- 可能影响其他工作

**适用**: 新方向确实更好时
```

### 选项 3: 继续当前方向
```markdown
**方式**: 评估后认为当前方向仍然合理

**优点**:
- 避免过度反应
- 保持工作连续性

**缺点**:
- 可能继续错误方向

**适用**: 漂移轻微或误报时
```
```

### 3.2 重新对齐计划

```markdown
## 重新对齐计划

### 推荐方案
```markdown
**推荐**: [方案]

**理由**:
1. [理由1]
2. [理由2]
```

### 实施步骤
```markdown
1. [步骤1]
2. [步骤2]
3. [步骤3]
```

### 预期结果
```markdown
[结果描述]
```
```

## 阶段 4：输出模板

### 4.1 完整模板

```markdown
## 目标漂移提醒

### 漂移检测
```markdown
**漂移状态**: [存在/边缘/无]

**漂移类型**: [类型]
**漂移程度**: [程度]
```

### 影响评估
```markdown
**目标影响**: [影响]
**资源影响**: [影响]
**紧迫性**: [程度]
```

### 重新对齐建议
```markdown
**建议**: [方案]

**实施步骤**:
1. [步骤1]
2. [步骤2]

**请确认是否同意这个纠偏方向**
```
