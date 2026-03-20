---
id: prompt-general-user-style-adaptation-avoid-style-drift-over-time-v1
name: Avoid Style Drift Over Time
summary: 避免风格随时间漂移
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: user-style-adaptation
tags:
  - drift
  - consistency
  - monitoring
  - stability
keywords:
  - 风格漂移
  - 风格监控
  - 一致性保持
  - 长期稳定
intent: |
  指导 AI 监控风格稳定性，避免在长会话中风格逐渐偏离基准。
  强调风格漂移是常见问题，需要主动监控和纠正。
  核心原则：风格基准是锚点，所有响应都应以此为参考。
applicable_models:
  - "*"
input_requirements:
  - current_response: string 当前响应
  - session_style基准: object 风格基准
  - session_progress: number 会话进度
output_requirements:
  - drift_check: object 漂移检查
  - drift_correction: string 漂移纠正
  - corrected_response: string 纠正后的响应
tool_requirements:
  - Read tool (读取会话历史)
preconditions:
  - 有进行中的会话需要监控风格
anti_patterns:
  - 不监控风格
  - 漂移不纠正
  - 纠正过度
failure_modes:
  - 漂移未识别：明确的漂移标准
  - 纠正过度：保持必要自然
  - 纠正不足：及时有效的纠正
self_check: |
  检查前自检：
  □ 是否建立了风格基准？
  □ 当前响应是否在基准范围内？
  □ 是否存在漂移趋势？
related_skills:
  - skill-user-style-adaptation
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-user-style-adaptation-maintain-consistent-style-across-session
  - prompt-general-user-style-adaptation-refine-style-based-on-user-feedback
---

# Context

在长会话中，风格容易逐渐漂移。本 prompt 的核心目标是：**指导 AI 监控风格稳定性，及时发现和纠正漂移**。

# Prompt Body

## 阶段 1：基准建立

### 1.1 风格基准定义

```markdown
## 风格基准

### 核心风格要素
```markdown
**沟通风格**:
- 简洁度: [基准值]
- 正式度: [基准值]
- 技术性: [基准值]
- 解释深度: [基准值]

**响应格式**:
- 平均长度: [长度]
- 结构类型: [类型]
- 代码比例: [比例]
```

### 基准范围
```markdown
**可接受范围**:
- 简洁度: [min] - [max]
- 正式度: [min] - [max]
- 长度: [min] - [max]

**超出范围视为漂移**
```
```

## 阶段 2：漂移监控

### 2.1 监控维度

```markdown
## 漂移监控

### 监控指标
| # | 指标 | 基准值 | 当前值 | 偏差 |
|---|------|--------|--------|------|
| 1 | 响应长度 | [基准] | [当前] | [偏差] |
| 2 | 简洁度 | [基准] | [当前] | [偏差] |
| 3 | 技术性 | [基准] | [当前] | [偏差] |
| 4 | 结构类型 | [基准] | [当前] | [偏差] |
```

### 漂移判断
```markdown
**是否漂移**: [是/否/边缘]

**漂移程度**: [无/轻微/明显/严重]

**漂移维度**:
- [维度1]: [漂移情况]
- [维度2]: [漂移情况]
```
```

### 2.2 漂移分析

```markdown
## 漂移分析

### 漂移原因
```markdown
**可能原因**:
1. [原因1]
2. [原因2]

**最可能原因**: [原因]
```

### 漂移趋势
```markdown
**趋势**: [加剧/稳定/减缓]

**判断依据**:
- 最近N次响应: [趋势描述]
- 偏离基准的程度: [程度]
```
```

## 阶段 3：漂移纠正

### 3.1 纠正策略

```markdown
## 纠正策略

### 轻微漂移
```markdown
**处理**: 轻微调整，回到基准

**调整方法**:
- 稍微调整响应长度
- 稍微调整简洁度
```

### 明显漂移
```markdown
**处理**: 主动纠正，回到基准

**调整方法**:
- 明确调整多个维度
- 参考历史最佳响应
```

### 严重漂移
```markdown
**处理**: 显著调整，回到基准

**调整方法**:
- 重新建立风格基准
- 显著改变响应方式
- 可能需要告知用户
```
```

### 3.2 纠正执行

```markdown
## 纠正执行

### 当前问题
```markdown
**问题**: [问题描述]

**偏离基准**: [描述]
```

### 纠正措施
```markdown
**纠正内容**:
1. [纠正1]
2. [纠正2]

**纠正后目标**: [目标]
```
```

## 阶段 4：输出模板

### 4.1 监控模板

```markdown
## 风格漂移监控

### 监控结果
```markdown
**漂移状态**: [无/轻微/明显/严重]

**漂移维度**:
- [维度1]: [状态]
```

### 纠正措施
```markdown
**措施**: [措施]

**预期效果**: [效果]
```
