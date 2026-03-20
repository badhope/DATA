---
id: prompt-general-learning-support-quiz-user-to-check-understanding-v1
name: Quiz User to Check Understanding
summary: 测验用户以检查理解
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: learning-support
tags:
  - quiz
  - understanding
  - check
  - assessment
keywords:
  - 测验
  - 理解
  - 检查
  - 评估
intent: |
  通过测验帮助用户检查对某个主题的理解程度，而不是评判对错。
  强调测验是学习工具，帮助发现不足而非打击信心。
  核心原则：好的测验帮助学习，而不是制造焦虑。
applicable_models:
  - "*"
input_requirements:
  - topic: string 主题
  - user_level: string 用户水平
  - quiz_type: string 测验类型
output_requirements:
  - quiz_questions: array 测验问题
  - understanding_assessment: string 理解评估
  - follow_up_suggestions: string 后续建议
tool_requirements: []
preconditions:
  - 用户学习后需要检查理解
anti_patterns:
  - 问题过于刁难
  - 缺乏建设性反馈
  - 不考虑信心因素
failure_modes:
  - 问题不反映核心理解：聚焦关键问题
  - 反馈过于负面：保持建设性
  - 不提供后续方向：给出具体建议
self_check: |
  测验前自检：
  □ 问题是否覆盖了核心理解？
  □ 反馈是否建设性而非打击性？
  □ 是否提供了改进方向？
related_skills:
  - skill-learning-support
related_workflows: []
related_prompts:
  - prompt-general-learning-support-explain-complex-topic-step-by-step
  - prompt-general-learning-support-identify-knowledge-gaps
---

# Context

测验是检查学习效果的重要工具。本 prompt 的核心目标是：**通过测验帮助用户检查理解，发现不足并提供建设性的改进方向**。

# Prompt Body

## 阶段 1：测验设计

### 1.1 测验类型

```markdown
## 测验类型

### 概念检查型
```markdown
**目的**: 检查基本概念是否理解
**问题类型**: 定义、解释、辨别
**适合**: 初学者、学习早期
```

### 应用型
```markdown
**目的**: 检查是否能应用所学
**问题类型**: 情景题、计算题、案例分析
**适合**: 有一定基础后
```

### 综合型
```markdown
**目的**: 检查整体理解
**问题类型**: 混合、综合性问题
**适合**: 学习后总检
```
```

## 阶段 2：问题设计

### 2.1 核心问题

```markdown
## 核心测验问题

### 概念问题
```markdown
**问题1**: [用你自己的话说，什么是X？]

**评估标准**:
- ✓ 理解: 能用自己的话解释
- △ 部分理解: 能说出关键词但不会用自己的话
- ✗ 不理解: 无法解释

**问题2**: [X和Y有什么区别？]

**评估标准**:
- ✓ 理解: 能清晰区分
- △ 部分理解: 知道不同但说不清
- ✗ 不理解: 混淆两者
```
```

### 2.2 应用问题

```markdown
## 应用测验问题

**问题**: [如果遇到X情况，你会怎么做？]

**评估标准**:
- ✓ 理解: 能正确应用
- △ 部分理解: 知道但不完整
- ✗ 不理解: 无法应用
```
```

## 阶段 3：反馈风格

### 3.1 建设性反馈

```markdown
## 反馈原则

### 反馈模板
```markdown
**正确**: "很好！你理解了X。"（肯定）
"你的解释抓住了核心..."（具体肯定）

**部分理解**: "你有基本的理解..."
"可以再思考一下..."（温和指出）
"也许可以这样理解..."（提供帮助）

**需要加强**: "这部分还需要再学习..."
"建议回顾..."（具体建议）
"不要担心，这是正常的..."（保持鼓励）
```
```

### 3.2 避免的方式

```markdown
## 避免的反馈

❌ "错了"
✗ "你怎么连这个都不知道"
✗ "完全错误"

✓ "这部分再加强一下"
✓ "需要回顾一下X"
✓ "这是常见的难点，我们一起来看"
```
```

## 阶段 4：理解评估

### 4.1 评估标准

```markdown
## 理解评估

### 分级
```markdown
**完全理解**: 能用自己的话解释，能应用
**基本理解**: 知道关键概念，能做简单应用
**部分理解**: 有印象但不完整，需要加强
**需要重来**: 基础没打好，需要重新学习
```
```

### 4.2 评估输出

```markdown
## 理解评估

### 总体评估
```markdown
**概念理解**: [评级]
**应用能力**: [评级]
**整体水平**: [评级]
```

### 强项
```markdown
- [做得好的]
```

### 需要加强
```markdown
- [需要改进的]
```
```

## 阶段 5：后续建议

### 5.1 改进建议

```markdown
## 后续建议

### 针对薄弱点
```markdown
**需要加强的部分**: [具体]
**建议的资源**: [资源]
**建议的练习**: [练习]
```
```

### 5.2 下一步

```markdown
## 下一步

**继续当前内容**: [如果理解足够]
**回顾再学**: [如果需要加强]
**做更多练习**: [如果需要巩固]
```
```

## 阶段 6：输出模板

### 6.1 测验模板

```markdown
## 理解测验: [主题]

### 问题
```markdown
1. [问题]
2. [问题]
3. [问题]
```

### 你的回答
[等待用户回答]

### 反馈与评估
```markdown
**问题1反馈**: [建设性反馈]
**问题2反馈**: [建设性反馈]
**问题3反馈**: [建设性反馈]

**总体评估**: [评级]
**强项**: [列表]
**需加强**: [列表]
**建议**: [具体建议]
```
