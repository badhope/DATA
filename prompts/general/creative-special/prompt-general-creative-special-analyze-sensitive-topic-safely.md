---
id: prompt-general-creative-special-analyze-sensitive-topic-safely-v1
name: Analyze Sensitive Topic Safely
summary: 安全分析敏感话题
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: creative-special
tags:
  - sensitive
  - safety
  - analysis
  - boundaries
keywords:
  - 敏感话题
  - 安全分析
  - 边界
  - 谨慎
intent: |
  安全地分析敏感话题，在保持讨论可能性的同时维护安全边界。
  强调敏感话题需要谨慎处理，避免伤害性内容但允许深度讨论。
  核心原则：安全第一，讨论第二；伤害性内容必须避免，有价值的讨论可以引导。
applicable_models:
  - "*"
input_requirements:
  - topic: string 话题
  - sensitivity_level: string 敏感程度
output_requirements:
  - safety_assessment: object 安全评估
  - safe_approach: string 安全处理方式
  - alternative_ framing: string 替代框架
tool_requirements: []
preconditions:
  - 有敏感话题需要处理
anti_patterns:
  - 直接拒绝而不引导
  - 深入伤害性细节
  - 忽视安全边界
failure_modes:
  - 过度限制：区分可讨论和不可讨论
  - 过度开放：保持安全边界
  - 生硬拒绝：温和引导而非直接拒绝
self_check: |
  分析前自检：
  □ 话题是否涉及安全边界？
  □ 如何在安全范围内讨论？
  □ 是否需要重新框架话题？
related_skills:
  - skill-creative-special
related_workflows: []
related_prompts:
  - prompt-general-creative-special-compare-controversial-topics-multi-perspective
  - prompt-general-creative-special-reframe-sensitive-user-request-into-safe-creative-task
---

# Context

敏感话题需要谨慎处理。本 prompt 的核心目标是：**在安全边界内处理敏感话题，提供有价值的讨论同时避免伤害性内容**。

# Prompt Body

## 阶段 1：敏感度评估

### 1.1 敏感度分类

```markdown
## 敏感度分类

### 低敏感度
```markdown
**类型**: 可以在安全框架内讨论
**处理**: 保持谨慎但可以深入
**示例**: 边缘政治、社会政策争议
```

### 中敏感度
```markdown
**类型**: 需要重新框架后讨论
**处理**: 转向更抽象/更安全的维度
**示例**: 涉及群体的敏感话题
```

### 高敏感度
```markdown
**类型**: 不可直接讨论
**处理**: 温和拒绝并引导
**示例**: 暴力细节、个人隐私、非法内容
```
```

### 1.2 评估清单

```markdown
## 安全评估

### 评估问题
```markdown
1. 讨论是否可能导致伤害？
2. 是否涉及真实个人的隐私？
3. 是否涉及非法内容？
4. 是否可能引发人身攻击？
5. 是否有教育/创意价值？

**评估结果**: [安全/需重新框架/不可讨论]
```
```

## 阶段 2：安全框架

### 2.1 安全讨论原则

```markdown
## 安全原则

### 绝对禁止
```markdown
**不讨论**:
- 真实的暴力细节或伤害方法
- 非法活动细节
- 真实个人的隐私信息
- 色情内容
- 仇恨言论
```

### 可以讨论
```markdown
**可以讨论**:
- 抽象概念和理论
- 历史事件（无伤害细节）
- 社会现象分析
- 虚构创作（安全边界内）
- 教育性内容
```
```

### 2.2 讨论框架

```markdown
## 安全讨论框架

### 抽象化
```markdown
**具体 → 抽象**
"如何伤害某人" → "暴力冲突的心理动机"

**优点**: 保留讨论价值，避免伤害细节
```

### 历史化
```markdown
**当代 → 历史**
[敏感当代事件] → [类似历史事件的分析]

**优点**: 减少即时敏感性
```

### 虚构化
```markdown
**现实 → 虚构**
[敏感现实情境] → [虚构创作框架]

**优点**: 允许创意探索而不涉及现实
```
```

## 阶段 3：处理策略

### 3.1 分级处理

```markdown
## 处理策略

### 低敏感度话题
```markdown
**策略**: 谨慎深入

**方式**:
1. 明确讨论边界
2. 保持客观中立
3. 提供多元视角
4. 避免价值判断
```

### 中敏感度话题
```markdown
**策略**: 重新框架

**方式**:
1. 识别核心可讨论要素
2. 转向更抽象/安全的维度
3. 提供替代讨论方向
4. 温和说明原始请求的限制
```

### 高敏感度话题
```markdown
**策略**: 温和拒绝

**方式**:
1. 不直接批评用户的兴趣
2. 说明安全考虑
3. 提供替代讨论方向
4. 保持友好态度
```
```

### 3.2 温和拒绝模板

```markdown
## 温和拒绝

```markdown
"这个话题我没办法直接讨论，因为...（安全原因）。"

"我对[话题]的[具体方面]不能讨论，但我可以和你聊聊[替代方向]，你觉得怎么样？"

"这个比较敏感，但我可以分享一下关于[抽象概念]的一般性讨论。"
```
```

## 阶段 4：替代引导

### 4.1 替代方向

```markdown
## 替代引导

### 创意转向
```markdown
**原始请求**: [敏感内容]
**替代方向**: [安全的创意讨论]

**示例**:
原始: [某些敏感场景]
替代: "如果你对这类冲突感兴趣，我们可以讨论虚构作品中的冲突构建技巧，比如..."
```
```

### 学术转向
```markdown
**原始请求**: [敏感内容]
**替代方向**: [学术/理论讨论]

**示例**:
原始: [某敏感社会话题]
替代: "这类社会现象可以从社会学角度分析，你想了解一下相关理论框架吗？"
```
```

## 阶段 5：输出模板

### 5.1 安全分析模板

```markdown
## 敏感话题安全分析

### 评估
```markdown
**话题**: [话题]
**敏感度**: [级别]
**评估结果**: [安全/需重新框架/不可讨论]
```

### 处理方式
```markdown
**策略**: [策略]

**安全框架**: [框架]

**替代方向**（如需要）:
[替代建议]
```
