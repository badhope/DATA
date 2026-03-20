---
id: prompt-general-clarification-clarify-ambiguous-user-request-v1
name: Clarify Ambiguous User Request
summary: 澄清模糊的用户请求
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: clarification
tags:
  - clarification
  - ambiguous
  - user-request
  - understanding
keywords:
  - 模糊请求
  - 请求澄清
  - 歧义消除
  - 需求澄清
intent: |
  指导 AI 识别和澄清模糊的用户请求，确保正确理解用户意图。
  强调澄清不是挑剔，而是专业负责的行为。
  核心原则：模糊请求的澄清应该在执行前而非执行后。
applicable_models:
  - "*"
input_requirements:
  - ambiguous_request: string 模糊请求
  - context: object 上下文
output_requirements:
  - ambiguity_points: array 模糊点识别
  - clarification_questions: array 澄清问题
  - interpreted_meaning: string 解释后的含义
  - recommended_action: string 建议行动
tool_requirements:
  - Read tool (读取上下文)
preconditions:
  - 有模糊请求需要澄清
anti_patterns:
  - 猜测用户意图
  - 模糊执行
  - 多次返工
failure_modes:
  - 模糊点未识别：系统化识别模糊点
  - 提问不精准：关键问题设计
  - 解释不验证：验证解释是否正确
self_check: |
  澄清前自检：
  □ 是否识别了所有模糊点？
  □ 是否提出了关键澄清问题？
  □ 是否验证了对请求的理解？
  □ 是否提供了可行的初始解释？
related_skills:
  - skill-clarification
  - skill-context-memory
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-clarification-ask-for-missing-required-inputs
  - prompt-general-clarification-detect-hidden-assumptions-in-user-request
---

# Context

用户请求经常是模糊的。识别和澄清模糊点是提供正确帮助的前提。本 prompt 的核心目标是：**指导 AI 系统性地识别模糊点，提出精准的澄清问题，确保正确理解用户意图**。

# Prompt Body

## 阶段 1：模糊点识别

### 1.1 模糊点类型

```markdown
## 模糊点类型

### 目标模糊
```markdown
**定义**: 目标不明确或不具体
**示例**: "帮我优化一下这个系统"
**问题**: 优化什么？性能？成本？用户体验？
```

### 范围模糊
```markdown
**定义**: 任务的边界不清晰
**示例**: "处理一下用户数据"
**问题**: 哪些数据？怎么处理？
```

### 标准模糊
```markdown
**定义**: 成功的标准不明确
**示例**: "做好一点"
**问题**: 什么叫"好一点"？
```

### 约束模糊
```markdown
**定义**: 限制条件不明确
**示例**: "尽快完成"
**问题**: 什么时候算"尽快"？
```

### 优先级模糊
```markdown
**定义**: 多目标时优先级不清
**示例**: "既要性能好又要成本低"
**问题**: 哪个更重要？
```
```

### 1.2 模糊点识别清单

```markdown
## 模糊点识别清单

### 请求分析
```markdown
**原始请求**: [请求]

**模糊点检查**:
| # | 检查项 | 状态 | 模糊描述 |
|---|--------|------|----------|
| 1 | 目标明确 | [✅/❌] | [描述] |
| 2 | 范围明确 | [✅/❌] | [描述] |
| 3 | 标准明确 | [✅/❌] | [描述] |
| 4 | 约束明确 | [✅/❌] | [描述] |
| 5 | 优先级明确 | [✅/❌] | [描述] |
```

### 识别到的模糊点
| # | 模糊点 | 类型 | 重要性 | 澄清必要性 |
|---|---------|------|--------|------------|
| 1 | [点] | [类型] | [高/中/低] | [✅/❌] |
```

## 阶段 2：澄清问题设计

### 2.1 问题优先级

```markdown
## 问题优先级

### 必须澄清（阻断性问题）
```markdown
**问题**: 会影响核心理解和执行方向
**示例**: "你想优化哪个方面？"
**优先级**: P0
```

### 应当澄清
```markdown
**问题**: 影响方案选择或细节
**示例**: "有什么性能要求？"
**优先级**: P1
```

### 可以澄清
```markdown
**问题**: 优化细节或用户体验
**示例**: "需要支持哪些浏览器？"
**优先级**: P2
```
```

### 2.2 澄清问题设计

```markdown
## 澄清问题

### 核心澄清问题
```markdown
**问题1**: [问题]
**目的**: 澄清 [模糊点]
**为什么问**: [原因]
**回答帮助**: [帮助]

**问题2**: [问题]
[同上]
```

### 澄清问题清单
| # | 问题 | 优先级 | 针对模糊点 | 类型 |
|---|------|--------|------------|------|
| 1 | [问题] | P0 | [模糊点] | [开放/封闭] |
```

## 阶段 3：多义性处理

### 3.1 多义性识别

```markdown
## 多义性识别

### 请求可能的多重含义
| # | 解释 | 可能性 | 需要确认 |
|---|------|--------|----------|
| 1 | [含义A] | [高/中/低] | [是/否] |
| 2 | [含义B] | [高/中/低] | [是/否] |
| 3 | [含义C] | [高/中/低] | [是/否] |

### 最可能的解释
```markdown
**解释**: [解释]
**理由**: [理由]
**置信度**: [置信度]
**需要确认**: [是/否]
```
```

### 3.2 选择引导

```markdown
## 选择引导

### 选项设计
```markdown
**问题**: [问题]

**可选方案**:
1. [方案A] - [适用场景]
2. [方案B] - [适用场景]
3. [方案C] - [适用场景]

**建议**: [如有任何偏好]
```
```

## 阶段 4：理解验证

### 4.1 理解确认

```markdown
## 理解确认

### 理解摘要
```markdown
**我的理解**:
1. 你想要 [理解1]
2. 你的约束是 [约束]
3. 成功的标准是 [标准]

**正确吗**? [是/否]
```
```

### 4.2 解释验证

```markdown
## 解释验证

### 验证问题
```markdown
**为了确认我的理解，请回答**:
1. [验证问题1]
2. [验证问题2]
```

### 反馈机制
```markdown
**如果我的理解不对**:
- 请告诉我哪里不对
- 请提供更多信息
```
```

## 阶段 5：澄清输出

### 5.1 澄清请求格式

```markdown
## 澄清请求

### 模糊点说明
```markdown
**您的请求可能包含以下模糊点**:

1. **[模糊点1]**: [说明]
   - 这个问题会影响到: [影响]

2. **[模糊点2]**: [说明]
   - 这个问题会影响到: [影响]
```

### 澄清问题
```markdown
**请帮我澄清**:

1. [问题1]?
   - 背景: [背景]
   - 如果您能告诉: [内容]

2. [问题2]?
   - 背景: [背景]
   - 如果您能告诉: [内容]
```

### 可选：基于最可能解释的初步响应
```markdown
**基于最可能的理解，我初步认为您想要**:
[初步理解]

**在我确认之前，我会先** [初步行动]
**等您确认后，我会** [完整行动]
```
```

### 5.2 简化澄清模板

```markdown
## 澄清

**您的请求有些地方不太清楚**:

1. [模糊点1]
2. [模糊点2]

**请问**:
- [问题1]?
- [问题2]?
```

## 阶段 6：输出模板

### 6.1 完整澄清模板

```markdown
## 澄清请求

### 模糊点分析
| # | 模糊点 | 类型 | 影响 | 澄清问题 |
|---|---------|------|------|----------|
| 1 | [点] | [类型] | [影响] | [问题] |

### 澄清问题
```markdown
**请帮我澄清**:

1. **[最重要的问题]**
   [问题]

2. **[次重要的问题]**
   [问题]
```

### 我的理解（待确认）
```markdown
**基于当前信息，我的理解是**:
[理解]

**请您确认是否正确**。
```
```

### 6.2 快速澄清模板

```markdown
## 需要澄清

**请求**: [请求]

**不清晰的地方**:
- [点1]
- [点2]

**请告诉我**: [问题]
```

# Variables

| 变量 | 说明 | 示例 |
|------|------|------|
| `ambiguous_request` | 模糊请求 | `"帮我优化一下系统"` |
| `context` | 上下文 | `{current_system: "...", pain_point: "慢"}` |

# Usage Notes

1. **精准提问**：问题要具体，不要泛泛地问
2. **解释确认**：给出自己的理解让用户确认
3. **多义性处理**：识别多种可能的含义
4. **不猜测执行**：不要在模糊时盲目执行
5. **专业态度**：澄清是专业的表现

# Example Input

```yaml
ambiguous_request: "帮我优化一下这个函数"
context:
  function_code: "function process(items) { ... }"
  known_issue: "可能性能不好"
```

# Example Output

```yaml
ambiguity_points:
  - ambiguity: "优化目标不明确"
    type: "目标模糊"
    importance: "high"
    clarification_needed: true
  - ambiguity: "性能问题的具体表现"
    type: "范围模糊"
    importance: "medium"
    clarification_needed: true

clarification_questions:
  - question: "你主要想优化什么？"
    options:
      - "执行速度"
      - "内存使用"
      - "代码可读性"
      - "其他"
    priority: "high"
  - question: "有具体的性能数据吗？比如执行时间或内存占用？"
    priority: "medium"

interpreted_meaning: |
  基于上下文，我初步理解为：用户可能想优化函数性能。

  但具体是速度还是内存问题，需要确认。

recommended_action: |
  建议先询问用户具体的优化目标，再根据目标制定优化方案。
```
