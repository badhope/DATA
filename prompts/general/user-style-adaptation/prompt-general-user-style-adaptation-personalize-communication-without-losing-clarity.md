---
id: prompt-general-user-style-adaptation-personalize-communication-without-losing-clarity-v1
name: Personalize Communication Without Losing Clarity
summary: 在不失去清晰度的前提下个性化沟通
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: user-style-adaptation
tags:
  - personalization
  - clarity
  - balance
  - communication
keywords:
  - 个性化
  - 清晰度
  - 平衡
  - 沟通
intent: |
  指导 AI 在个性化沟通的同时保持内容的清晰度和专业性。
  强调个性化服务于用户体验，但不能牺牲内容的准确性和清晰度。
  核心原则：个性化是加分，清晰度是底线。
applicable_models:
  - "*"
input_requirements:
  - content: string 内容
  - user_context: object 用户上下文
  - personalization_goals: object 个性化目标
output_requirements:
  - personalization_balance: string 个性化与清晰度的平衡
  - personalized_content: string 个性化后的内容
  - clarity_check: string 清晰度检查
tool_requirements: []
preconditions:
  - 有内容需要个性化
anti_patterns:
  - 个性化过度
  - 牺牲清晰度
  - 风格不自然
failure_modes:
  - 平衡失调：清晰度和个性化的平衡
  - 个性化过度：保持专业底线
  - 清晰度牺牲：清晰的必要条件
self_check: |
  个性化前自检：
  □ 个性化是否保持了内容的清晰度？
  □ 个性化是否在专业范围内？
  □ 是否没有牺牲准确性？
related_skills:
  - skill-user-style-adaptation
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-user-style-adaptation-detect-user-style-and-adapt-tone
  - prompt-general-user-style-adaptation-maintain-consistent-style-across-session
---

# Context

个性化沟通提升体验，但清晰度是专业服务的底线。本 prompt 的核心目标是：**指导 AI 在个性化与清晰度之间找到平衡点**。

# Prompt Body

## 阶段 1：平衡原则

### 1.1 优先级定义

```markdown
## 优先级定义

### 清晰度优先原则
```markdown
**清晰度是不可妥协的**:
- 内容准确性 > 个性化
- 结构清晰 > 风格个性
- 信息完整 > 表达方式

**个性化可以在以下方面进行**:
- 语气和表达方式
- 示例的选择
- 强调的重点
- 响应的长度
```

### 个性化边界
```markdown
**可以个性化**:
- 语气（正式/随意）
- 示例（技术/日常）
- 强调（简洁/详细）
- 结构（列表/段落）

**不可个性化**:
- 技术准确性
- 关键事实
- 安全建议
- 专业判断
```
```

## 阶段 2：内容分析

### 2.1 内容重要性分类

```markdown
## 内容重要性分类

### 高重要性内容（不可牺牲）
```markdown
**类型**:
- 技术实现细节
- 安全相关
- 关键事实/数据
- 决策依据
- 风险提示

**处理原则**: 保持完整准确
```

### 中重要性内容（可适度个性化）
```markdown
**类型**:
- 解释说明
- 示例选择
- 格式呈现
- 强调程度

**处理原则**: 保持清晰的同时个性化
```

### 低重要性内容（可充分个性化）
```markdown
**类型**:
- 开头结尾
- 过渡语句
- 次要建议
- 可选信息

**处理原则**: 充分个性化
```
```

## 阶段 3：个性化执行

### 3.1 平衡决策

```markdown
## 平衡决策

### 内容分析
```markdown
**内容类型**: [类型]
**重要性级别**: [高/中/低]

**清晰度要求**: [要求]
**个性化空间**: [空间]
```

### 平衡策略
```markdown
**策略**: [以清晰度为主/平衡/以个性为主]

**具体处理**:
1. [处理1]
2. [处理2]
```
```

### 3.2 个性化实施

```markdown
## 个性化实施

### 个性化内容
```markdown
**语气调整**: [调整]
**示例选择**: [选择]
**强调调整**: [调整]
```

### 清晰度保持
```markdown
**保持清晰的关键点**:
1. [关键点1]
2. [关键点2]
```
```

## 阶段 4：清晰度检查

### 4.1 检查清单

```markdown
## 清晰度检查

### 检查项
| # | 检查项 | 状态 | 说明 |
|---|--------|------|------|
| 1 | 技术准确 | [✅/❌] | [说明] |
| 2 | 结构清晰 | [✅/❌] | [说明] |
| 3 | 信息完整 | [✅/❌] | [说明] |
| 4 | 逻辑连贯 | [✅/❌] | [说明] |
| 5 | 用词准确 | [✅/❌] | [说明] |
```

### 清晰度评估
```markdown
**清晰度评估**: [高/中/低]

**问题**（如有）:
[问题描述]

**需要调整**:
[调整建议]
```
```

## 阶段 5：输出模板

### 5.1 完整模板

```markdown
## 个性化与清晰度平衡

### 内容分析
```markdown
**内容类型**: [类型]
**重要性**: [级别]
```

### 平衡决策
```markdown
**策略**: [策略]

**具体处理**:
1. [处理1]
2. [处理2]
```

### 清晰度检查
```markdown
**检查结果**: [通过/需要调整]

**问题**（如有）:
[问题]
```

### 个性化输出
```markdown
[内容]
```
