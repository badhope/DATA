---
id: prompt-general-user-style-adaptation-refine-style-based-on-user-feedback-v1
name: Refine Style Based on User Feedback
summary: 根据用户反馈优化风格
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: user-style-adaptation
tags:
  - feedback
  - refinement
  - improvement
  - adaptation
keywords:
  - 反馈优化
  - 风格调整
  - 持续改进
  - 风格反馈
intent: |
  指导 AI 根据用户的直接和间接反馈持续优化风格适配。
  强调反馈是风格优化的重要依据，要积极采纳有效反馈。
  核心原则：将用户反馈转化为具体的风格调整行为。
applicable_models:
  - "*"
input_requirements:
  - user_feedback: string 用户反馈
  - feedback_type: string 反馈类型
  - current_style: object 当前风格
output_requirements:
  - feedback_analysis: object 反馈分析
  - style_adjustment: object 风格调整
  - adjustment_justification: string 调整理由
tool_requirements: []
preconditions:
  - 有用户反馈需要处理
anti_patterns:
  - 忽视用户反馈
  - 过度依赖反馈
  - 调整过于频繁
failure_modes:
  - 反馈误读：正确理解反馈意图
  - 过度调整：保持风格稳定性
  - 反馈噪音：区分有效反馈和无效反馈
self_check: |
  调整前自检：
  □ 是否正确理解了反馈？
  □ 调整是否针对有效反馈？
  □ 调整是否保持了稳定性？
related_skills:
  - skill-user-style-adaptation
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-user-style-adaptation-detect-user-style-and-adapt-tone
  - prompt-general-user-style-adaptation-maintain-consistent-style-across-session
---

# Context

用户的反馈是风格优化的重要依据。本 prompt 的核心目标是：**指导 AI 分析用户反馈并据此优化风格适配策略**。

# Prompt Body

## 阶段 1：反馈分析

### 1.1 反馈类型

```markdown
## 反馈类型

### 直接反馈
```markdown
**类型**: 用户明确表达的意见
**示例**:
- "太复杂了，简短点"
- "我喜欢详细解释"
- "能不能用表格呈现"

**处理方式**: 直接采纳
```

### 间接反馈
```markdown
**类型**: 从用户行为推断的意见
**示例**:
- 用户跳过了解释部分 → 可能太详细
- 用户追问细节 → 可能解释不足
- 用户修改输出格式 → 格式不满意

**处理方式**: 谨慎推断
```

### 隐性反馈
```markdown
**类型**: 通过选择或行为暗示的偏好
**示例**:
- 选择某种格式的输出
- 重复某种类型的请求
- 对相似请求的满意度

**处理方式**: 模式分析
```
```

### 1.2 反馈分析

```markdown
## 反馈分析

### 反馈内容
```markdown
**原始反馈**: [反馈]

**反馈类型**: [直接/间接/隐性]

**反馈焦点**:
- [焦点1]
- [焦点2]
```

### 有效性评估
```markdown
**有效性**: [有效/无效/不确定]

**理由**:
[理由]

**是否采纳**: [是/否/部分]
```
```

## 阶段 2：调整决策

### 2.1 调整范围

```markdown
## 调整范围

### 可能调整的方面
| # | 方面 | 当前 | 建议调整 | 优先级 |
|---|------|------|----------|--------|
| 1 | [方面] | [当前] | [调整] | [P0/P1/P2] |
```

### 调整优先级
```markdown
**高优先级**: [调整]
**原因**: [原因]

**中优先级**: [调整]
**原因**: [原因]

**低优先级/暂不调整**: [调整]
**原因**: [原因]
```
```

### 2.2 调整决策

```markdown
## 调整决策

### 决策结果
```markdown
**决策**: [采纳/部分采纳/不采纳]

**采纳的调整**:
1. [调整1]
2. [调整2]

**不采纳的调整**:
1. [调整] - 理由: [理由]
```

### 调整原则
```markdown
**调整原则**:
- 一次只做小幅调整
- 调整后观察用户反应
- 重大变化要分步进行
```
```

## 阶段 3：调整执行

### 3.1 调整实施

```markdown
## 调整实施

### 本次调整
```markdown
**调整内容**: [具体调整]

**调整原因**: [原因]

**调整后风格**: [描述]
```

### 调整记录
```markdown
**记录**:
- 调整时间: [时间]
- 反馈来源: [来源]
- 调整内容: [内容]
- 预期效果: [效果]
```
```

### 3.2 效果观察

```markdown
## 效果观察

### 观察计划
```markdown
**观察指标**:
- 用户是否继续反馈类似问题
- 用户满意度是否提升
- 风格是否稳定

**观察周期**: [周期]
```
```

## 阶段 4：输出模板

### 4.1 完整模板

```markdown
## 反馈处理

### 反馈分析
```markdown
**反馈**: [反馈]
**类型**: [类型]
**有效性**: [评估]
```

### 调整决策
```markdown
**决策**: [采纳/部分采纳/不采纳]

**采纳的调整**:
1. [调整1]
2. [调整2]
```

### 调整记录
```markdown
**本次调整**:
- 调整方面: [方面]
- 调整内容: [内容]
- 调整理由: [理由]
```
