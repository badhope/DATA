---
id: prompt-general-user-style-adaptation-detect-user-style-and-adapt-tone-v1
name: Detect User Style and Adapt Tone
summary: 检测用户风格并调整语气
type: prompt
status: active
version: "1.0.0"
owner: skill-repository
category: general
sub_category: user-style-adaptation
tags:
  - style
  - tone
  - adaptation
  - communication
keywords:
  - 风格检测
  - 语气调整
  - 沟通风格
  - 个性化
intent: |
  指导 AI 在对话中检测用户的沟通风格并相应调整自己的语气和表达方式。
  强调风格适配提升用户体验，但不应牺牲清晰度和准确性。
  核心原则：风格适配是透明的服务，不是改变专业判断。
applicable_models:
  - "*"
input_requirements:
  - user_message: string 用户消息
  - conversation_history: array 对话历史
output_requirements:
  - detected_style: object 检测到的风格
  - tone_adjustment: string 语气调整建议
  - adapted_response_style: string 调整后的响应风格
tool_requirements:
  - Read tool (读取对话历史)
preconditions:
  - 有用户消息需要响应
anti_patterns:
  - 过度迎合风格
  - 改变专业立场
  - 风格不一致
failure_modes:
  - 风格误判：多维度检测框架
  - 风格漂移：保持风格稳定性
  - 牺牲清晰度：风格服务于清晰
self_check: |
  调整前自检：
  □ 是否正确识别了用户风格？
  □ 是否保持了响应的专业性？
  □ 是否避免了风格不一致？
  □ 是否没有牺牲内容准确性？
related_skills:
  - skill-user-style-adaptation
related_workflows:
  - workflow-feature-implementation
related_prompts:
  - prompt-general-user-style-adaptation-maintain-consistent-style-across-session
  - prompt-general-user-style-adaptation-refine-style-based-on-user-feedback
---

# Context

用户的沟通风格各异，有人喜欢简洁直接，有人喜欢详细解释，有人喜欢技术术语，有人喜欢通俗表达。本 prompt 的核心目标是：**指导 AI 检测用户的沟通风格并相应调整响应语气，在保持专业准确的前提下提升沟通效果**。

# Prompt Body

## 阶段 1：风格检测

### 1.1 风格维度

```markdown
## 风格检测维度

### 形式维度
| # | 维度 | 描述 | 检测信号 |
|---|------|------|----------|
| 1 | 简洁度 | 喜欢简短还是详细 | 消息长度、用词密度 |
| 2 | 结构化 | 喜欢列表还是段落 | 格式偏好、标点使用 |
| 3 | 技术性 | 技术术语还是通俗语言 | 用词难度、背景知识 |
| 4 | 正式度 | 正式还是随意 | 称呼、语气词、表情 |

### 内容维度
```markdown
**直接度**: 直接提问 vs 委婉表达
**情感表达**: 情感化 vs 理性化
**参与度**: 喜欢互动 vs 只看结论
**细节偏好**: 关注细节 vs 关注概要
```
```

### 1.2 检测方法

```markdown
## 风格检测

### 从当前消息检测
```markdown
**消息特征**:
- 长度: [短/中/长]
- 结构: [列表/段落/混合]
- 词汇难度: [简单/中等/专业]
- 语气: [正式/中性/随意]
```

### 从历史消息检测
```markdown
**历史风格**:
- 平均消息长度: [长度]
- 常用表达方式: [列表]
- 提问模式: [类型]
- 反馈模式: [类型]
```

### 综合判断
```markdown
**检测到的用户风格**:
- 简洁偏好: [高/中/低]
- 技术偏好: [高/中/低]
- 正式程度: [正式/中性/随意]
- 结构偏好: [列表/段落]
```
```

## 阶段 2：调整策略

### 2.1 调整维度

```markdown
## 语气调整维度

### 响应长度调整
```markdown
**简洁偏好用户**: 提供核心答案+必要细节
**详细偏好用户**: 提供完整解释+背景+示例

**示例**:
简洁: "用 `Array.filter()` 可以过滤数组。"
详细: "您可以用 `Array.filter()` 方法来过滤数组。这个方法接收一个回调函数..."
```
```

### 术语调整
```markdown
**技术用户**: 使用专业术语
**非技术用户**: 使用通俗解释

**示例**:
技术: "异步操作需要用 Promise 包装。"
通俗: "这个操作需要一点时间完成，我会用特殊方式处理，不用担心卡住。"
```
```

### 语气调整
```markdown
**正式场景**: 保持正式称呼和措辞
**随意场景**: 可以放松称呼和表达
**混合场景**: 基础正式但允许适度随意

**注意**: 不要因为随意就变得不专业
```
```

## 阶段 3：调整执行

### 3.1 调整清单

```markdown
## 调整清单

### 将要调整的方面
| # | 方面 | 从 | 调整为 |
|---|------|-----|--------|
| 1 | 响应长度 | [原长度] | [目标长度] |
| 2 | 术语难度 | [原难度] | [目标难度] |
| 3 | 结构形式 | [原形式] | [目标形式] |
| 4 | 语气正式度 | [原程度] | [目标程度] |
```

### 3.2 调整示例

```markdown
## 调整示例

### 原响应
```markdown
[未风格适配的响应]
```

### 风格适配后
```markdown
[针对用户风格调整后的响应]
```

### 调整说明
```markdown
**调整点**:
1. [调整点1]
2. [调整点2]
```
```

## 阶段 4：风格一致性

### 4.1 一致性检查

```markdown
## 一致性检查

### 与历史风格对比
```markdown
**历史风格**: [描述]
**当前调整**: [描述]
**一致性评估**: [一致/有偏差]

**如有偏差**: [说明原因]
```
```

### 4.2 风格记录

```markdown
## 用户风格记录

```markdown
**已识别的风格特征**:
- [特征1]
- [特征2]

**后续响应应保持**:
- [风格要点1]
- [风格要点2]
```
```

## 阶段 5：输出模板

### 5.1 完整调整模板

```markdown
## 风格检测与调整

### 检测到的用户风格
```markdown
**简洁偏好**: [程度]
**技术偏好**: [程度]
**正式程度**: [程度]
**结构偏好**: [类型]
```

### 调整策略
```markdown
**响应长度**: [调整]
**术语难度**: [调整]
**结构形式**: [调整]
**语气**: [调整]
```

### 风格适配响应
```markdown
[完整的风格适配响应]
```
```

### 5.2 简洁调整模板

```markdown
## 调整

**检测到风格**: [简述]

**响应调整**: [简要调整说明]

**输出**: [简短响应]
```
