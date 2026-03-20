---
id: prompt-general-user-style-adaptation-maintain-consistent-style-across-session-v1
name: Maintain Consistent Style Across Session
summary: 在整个会话中保持风格一致
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: user-style-adaptation
tags:
  - consistency
  - style
  - session
  - coherence
keywords:
  - 风格一致
  - 会话一致性
  - 风格保持
  - 连续性
intent: |
  指导 AI 在整个对话会话中保持风格和交互方式的一致性。
  强调一致性是专业性的表现，一致的体验减少认知负担。
  核心原则：风格一致性提升用户体验，一致的专业服务。
applicable_models:
  - "*"
input_requirements:
  - current_message: string 当前消息
  - session_context: object 会话上下文
  - style_guide: object 风格指南
output_requirements:
  - style_check: object 风格检查
  - consistency_assessment: string 一致性评估
  - adjusted_response: string 调整后的响应
tool_requirements:
  - Read tool (读取会话历史)
preconditions:
  - 有进行中的对话会话
anti_patterns:
  - 风格突变
  - 临时"创新"
  - 不考虑历史风格
failure_modes:
  - 风格漂移：风格监控机制
  - 历史忽略：基于历史的风格保持
  - 过度一致：保持必要灵活性
self_check: |
  响应前自检：
  □ 当前风格与历史风格是否一致？
  □ 是否保持了既定的风格指南？
  □ 调整是否有必要且合理？
related_skills:
  - skill-user-style-adaptation
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-user-style-adaptation-detect-user-style-and-adapt-tone
  - prompt-general-user-style-adaptation-refine-style-based-on-user-feedback
---

# Context

在一个会话中保持风格一致能减少用户的认知负担，提升体验。本 prompt 的核心目标是：**指导 AI 在会话中保持稳定的风格和交互方式，避免风格突变**。

# Prompt Body

## 阶段 1：风格基准建立

### 1.1 基准风格

```markdown
## 会话风格基准

### 已建立的风格
```markdown
**沟通风格**:
- 简洁度: [简洁/中等/详细]
- 正式度: [正式/中性/随意]
- 技术性: [专业/中等/通俗]

**响应格式**:
- 长度偏好: [短/中/长]
- 结构偏好: [列表/段落/混合]
- 代码呈现: [方式]

**交互风格**:
- 主动程度: [主动/中性/被动]
- 解释程度: [概要/标准/详细]
```
```

### 1.2 风格记录

```markdown
## 风格记录

### 持续记录
```markdown
**已确认的风格特征**:
[随对话累积的风格特征]

**用户反馈的风格调整**:
[根据反馈的调整]

**保持一致的风格要点**:
1. [要点1]
2. [要点2]
```
```

## 阶段 2：一致性检查

### 2.1 检查维度

```markdown
## 一致性检查

### 风格一致性
| # | 维度 | 历史 | 当前 | 一致性 |
|---|------|------|------|--------|
| 1 | 简洁度 | [历史] | [当前] | [✅/❌] |
| 2 | 正式度 | [历史] | [当前] | [✅/❌] |
| 3 | 技术性 | [历史] | [当前] | [✅/❌] |

### 格式一致性
| # | 维度 | 历史 | 当前 | 一致性 |
|---|------|------|------|--------|
| 1 | 长度 | [历史] | [当前] | [✅/❌] |
| 2 | 结构 | [历史] | [当前] | [✅/❌] |
| 3 | 代码 | [历史] | [当前] | [✅/❌] |
```

### 2.2 偏差评估

```markdown
## 偏差评估

### 偏差检查
```markdown
**是否存在偏差**: [是/否]

**偏差内容**:
- [偏差维度]: 历史[值] → 当前[值]

**偏差原因**（如有）:
[原因]
```

### 偏差可接受性
```markdown
**偏差是否合理**: [是/否]

**理由**:
[理由]
```
```

## 阶段 3：一致性保持

### 3.1 保持策略

```markdown
## 风格保持

### 正常情况
```markdown
**策略**: 保持现有风格

**执行**:
- 使用相同的简洁度
- 使用相同的正式度
- 使用相同的响应结构
```

### 合理调整情况
```markdown
**策略**: 在必要时做合理调整

**允许的调整**:
- 内容复杂度增加时适当扩展
- 用户明确要求时调整
- 新的交互模式需要时

**调整原则**:
- 调整要有理由
- 调整要渐进，不是突变
- 调整后要记录
```
```

### 3.2 调整执行

```markdown
## 调整执行

### 需要调整时
```markdown
**调整内容**: [内容]

**调整理由**:
[理由]

**调整后风格**:
[描述]
```
```

## 阶段 4：输出模板

### 4.1 一致性检查模板

```markdown
## 风格一致性检查

### 检查结果
```markdown
**一致性评估**: [一致/有偏差]

**历史风格**: [描述]
**当前风格**: [描述]

**偏差**（如有）:
- [偏差内容]
```

### 响应策略
```markdown
**策略**: [保持/调整]

**理由**: [理由]
```
